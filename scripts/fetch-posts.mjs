/**
 * Pulls the Medium RSS feed and writes data/posts.json.
 *
 *   npm run posts
 *
 * Build-time rather than client-side: Medium's feed sends no CORS headers, so
 * a browser request from the site would be blocked. Fetching here also means
 * no third-party proxy (rss2json and friends) sits between your visitors and
 * your content.
 *
 * The generated JSON is committed, so the site still builds when Medium is
 * unreachable — it just serves the last synced set.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HANDLE = process.env.MEDIUM_HANDLE || "@codewithrad";
const FEED = `https://medium.com/feed/${HANDLE}`;
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../data/posts.json");

const pick = (block, tag) => {
  const cdata = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`).exec(block);
  if (cdata) return cdata[1];
  const plain = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(block);
  return plain ? plain[1] : "";
};

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");

const stripTags = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

try {
  const res = await fetch(FEED, { headers: { "User-Agent": "rad-tech-spec-site" } });
  if (!res.ok) throw new Error(`feed returned ${res.status}`);
  const xml = await res.text();

  const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, block]) => {
    const body = pick(block, "content:encoded");
    const text = stripTags(body);
    const cover = /<img[^>]+src="([^"]+)"/.exec(body)?.[1] || "";

    return {
      title: decode(pick(block, "title")).trim(),
      link: pick(block, "link").trim().split("?")[0],
      date: new Date(pick(block, "pubDate")).toISOString().slice(0, 10),
      // Medium's own estimate is ~265 wpm; 200 is a safer, slower read.
      readingMinutes: Math.max(1, Math.round(text.split(" ").length / 200)),
      excerpt: text.slice(0, 180).trim() + (text.length > 180 ? "…" : ""),
      tags: [...block.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)]
        .map((m) => m[1])
        .slice(0, 4),
      cover,
    };
  });

  if (!posts.length) throw new Error("feed parsed but contained no items");

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(
    OUT,
    JSON.stringify({ handle: HANDLE, syncedAt: new Date().toISOString().slice(0, 10), posts }, null, 2)
  );
  console.log(`wrote ${OUT}\n  ${posts.length} posts`);
  posts.forEach((p) => console.log(`   - ${p.date}  ${p.title}`));
} catch (err) {
  console.error("Failed to sync Medium posts:", err.message);
  console.error("data/posts.json left as-is; the site will build with the previous set.");
  process.exit(1);
}
