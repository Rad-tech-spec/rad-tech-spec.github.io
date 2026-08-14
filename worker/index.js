/**
 * Chat endpoint for the site agent — a standalone Cloudflare Worker.
 *
 * The site itself stays on GitHub Pages (which only serves files and can't run
 * code), so this lives on its own origin and the browser calls it cross-origin.
 * It runs server-side because the API key must never reach the browser.
 * Everything the agent knows comes from agent/context.js, generated from the
 * built site by scripts/build-agent-context.mjs.
 *
 * Deploy:  npx wrangler deploy
 *
 * Required secret:
 *   ANTHROPIC_API_KEY   — npx wrangler secret put ANTHROPIC_API_KEY
 *                         (a secret, encrypted — never a plaintext [vars] entry)
 * Optional binding:
 *   RATE_LIMIT          — a KV namespace. Without it the per-IP limit below is
 *                         skipped and the spend cap is your only backstop.
 */
import Anthropic from "@anthropic-ai/sdk";
import { SITE_CONTEXT } from "../agent/context.js";

/**
 * Browsers refuse cross-origin responses that don't name their origin, so this
 * list is what lets the site talk to the worker at all.
 *
 * Be clear-eyed about what it is: CORS is enforced by the browser, not by us.
 * curl ignores it entirely. It stops other people's *websites* from quietly
 * spending your tokens; it does not stop a determined person with a terminal.
 * The rate limit below and the spend cap on the API key are the real ceilings.
 */
const ALLOWED_ORIGINS = [
  "https://rad-tech-spec.github.io",
  "http://localhost:3000", // local preview of the built site
];

// Keep these tight — this endpoint is public, so every one of them is a cost
// ceiling as much as a correctness check.
const MAX_TOKENS = 700;
const MAX_TURNS = 12;
const MAX_CHARS_PER_MESSAGE = 1000;
const RATE_LIMIT_REQUESTS = 20;
const RATE_LIMIT_WINDOW_SECONDS = 3600;

const SYSTEM_PROMPT = `You are the assistant on Rad Eshghi's personal portfolio site. Visitors are usually recruiters, hiring managers, or engineers looking into his background.

Answer questions about Rad using ONLY the site content provided below. It is the complete record of what you know about him.

Rules that matter:
- If the content doesn't answer the question, say so plainly and suggest emailing him. Never guess at an employer, a date, a technology, or a detail that isn't stated. An invented fact about someone's career is worse than no answer.
- Don't restate his whole background when a specific question was asked.
- Keep answers to a few sentences unless the question genuinely needs more.
- Speak about Rad in the third person. You are his site's assistant, not Rad.
- If asked something unrelated to Rad or his work, say that's outside what you can help with and steer back.

--- SITE CONTENT ---

${SITE_CONTEXT}`;

function corsHeaders(origin) {
  // Echo the origin rather than sending "*", so the allowlist actually means
  // something. Vary tells caches the response differs per origin.
  const allowed = origin && ALLOWED_ORIGINS.includes(origin);
  return {
    ...(allowed ? { "access-control-allow-origin": origin } : {}),
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

const json = (body, status, cors) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...cors },
  });

function validate(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return "No messages provided.";
  if (messages.length > MAX_TURNS) return "This conversation is too long. Please start a new one.";
  for (const m of messages) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) return "Malformed message.";
    if (typeof m.content !== "string" || !m.content.trim()) return "Malformed message.";
    if (m.content.length > MAX_CHARS_PER_MESSAGE) return "That message is too long.";
  }
  // Anthropic requires the conversation to start with, and end on, a user turn.
  if (messages[0].role !== "user" || messages[messages.length - 1].role !== "user") {
    return "Malformed conversation.";
  }
  return null;
}

async function rateLimited(env, ip) {
  if (!env.RATE_LIMIT || !ip) return false; // no KV bound — skip
  const key = `rl:${ip}:${Math.floor(Date.now() / 1000 / RATE_LIMIT_WINDOW_SECONDS)}`;
  const count = Number((await env.RATE_LIMIT.get(key)) || 0);
  if (count >= RATE_LIMIT_REQUESTS) return true;
  await env.RATE_LIMIT.put(key, String(count + 1), {
    expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
  });
  return false;
}

async function handleChat(request, env, cors) {
  if (!env.ANTHROPIC_API_KEY) {
    return json({ error: "The agent isn't configured yet." }, 503, cors);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400, cors);
  }

  const problem = validate(body?.messages);
  if (problem) return json({ error: problem }, 400, cors);

  const ip = request.headers.get("cf-connecting-ip");
  if (await rateLimited(env, ip)) {
    return json({ error: "Too many messages for now — try again later." }, 429, cors);
  }

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  try {
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: MAX_TOKENS,
      // Low effort suits short factual Q&A and keeps latency and cost down.
      // Thinking is left ON (the default on Opus 5): disabling it can leak
      // <thinking> tags into the visible reply.
      output_config: { effort: "low" },
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          // ~1.8k tokens of stable prefix — cached reads cost ~0.1x.
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: body.messages.map((m) => ({ role: m.role, content: m.content })),
    });

    if (response.stop_reason === "refusal") {
      return json(
        { reply: "I can't help with that one. Try asking about Rad's work instead." },
        200,
        cors
      );
    }

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    return json({ reply: reply || "Sorry — I didn't catch that. Could you rephrase?" }, 200, cors);
  } catch (err) {
    // Typed chain: distinguish "your fault", "slow down", and "we broke".
    if (err instanceof Anthropic.RateLimitError) {
      return json({ error: "The agent is busy right now. Try again shortly." }, 429, cors);
    }
    if (err instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic auth failed — check the ANTHROPIC_API_KEY secret.");
      return json({ error: "The agent isn't configured correctly." }, 503, cors);
    }
    if (err instanceof Anthropic.APIConnectionError) {
      return json({ error: "Couldn't reach the agent. Try again." }, 502, cors);
    }
    console.error("Agent error:", err);
    return json({ error: "Something went wrong. Try again." }, 500, cors);
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin);

    // Preflight. The browser sends this before the real POST because we set a
    // content-type header; answering it is what unlocks the actual request.
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const { pathname } = new URL(request.url);
    if (pathname !== "/api/chat") {
      return json({ error: "Not found. The agent lives at /api/chat." }, 404, cors);
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405, cors);
    }

    return handleChat(request, env, cors);
  },
};
