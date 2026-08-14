/**
 * Where the agent's chat endpoint lives.
 *
 * The site is static on GitHub Pages, which can't run server code, so the
 * endpoint is a separate Cloudflare Worker (see worker/index.js) and the
 * browser calls it cross-origin.
 *
 * Fill this in with the URL `npx wrangler deploy` prints, keeping the
 * /api/chat path. Until it's set, the chat UI says so instead of failing with
 * a confusing network error.
 *
 * This is baked into the built JS at generate time, so rebuild after changing
 * it. That's fine — it's a public URL, not a secret. The only secret is the
 * API key, and that never leaves the worker.
 */
export const AGENT_API = "https://ask-rad.radeshghi.workers.dev/api/chat";
