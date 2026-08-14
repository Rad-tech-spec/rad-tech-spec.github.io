<template>
  <div class="w-full px-4 py-12 sm:px-6 md:py-16">
    <header class="max-w-2xl">
      <h1 class="sr-only">Blog</h1>

      <div class="font-mono text-sm leading-relaxed sm:text-base">
        <p class="text-ink">
          <span class="mr-2 font-bold text-accent-mid">$</span>cat ~/writing/*.md
        </p>
        <p class="mt-1.5 text-ink-muted">
          # {{ data.posts.length }} posts, published on Medium
        </p>
      </div>
    </header>

    <div class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="post in data.posts"
        :key="post.link"
        class="bp group flex h-full flex-col overflow-hidden rounded-2xl border border-edge/80 bg-surface/90 supports-[backdrop-filter]:bg-surface/45 backdrop-blur-2xl backdrop-saturate-[1.6] ring-1 ring-[rgb(var(--c-shadow)/0.14)] shadow-xl shadow-[rgb(var(--c-shadow)/0.12)]"
      >
        <a
          :href="post.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex h-full flex-col"
        >
          <div class="aspect-video w-full overflow-hidden border-b border-edge/70 bg-cream">
            <!--
              Cover images are hotlinked from Medium's CDN rather than copied
              into the repo: they're Rad's own post images, Medium serves them
              with caching, and mirroring them would bloat the repo and go
              stale whenever a post is edited.
            -->
            <img
              v-if="post.cover"
              :src="post.cover"
              :alt="''"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div v-else class="flex h-full w-full items-center justify-center">
              <span class="font-mono text-xs text-ink-muted">no cover image</span>
            </div>
          </div>

          <div class="flex flex-1 flex-col p-5">
            <p class="font-mono text-xs text-ink-muted">
              {{ formatDate(post.date) }} · {{ post.readingMinutes }} min read
            </p>

            <h2
              class="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent"
            >
              {{ post.title }}
            </h2>

            <p class="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
              {{ post.excerpt }}
            </p>

            <ul v-if="post.tags.length" class="mt-4 flex flex-wrap gap-1.5">
              <li v-for="tag in post.tags" :key="tag" class="bp-chip">{{ tag }}</li>
            </ul>

            <span
              class="mt-5 inline-flex items-center gap-1.5 border-t border-line/70 pt-4 text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft transition-colors group-hover:text-accent"
            >
              Read on Medium
              <svg
                class="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          </div>
        </a>
      </article>
    </div>
  </div>
</template>

<script setup>
import posts from "@/data/posts.json";
import siteMetaInfo from "@/data/sitemetainfo.js";

const data = posts;

function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

useSeoMeta({
  title: `${siteMetaInfo.title} | Blog`,
  description:
    "Writing by Rad Eshghi on backend engineering, DevOps, AI tooling, and learning to program.",
});
</script>

<style scoped>
.bp {
  transition: transform 0.2s ease;
}

.bp:hover {
  transform: translateY(-2px);
}

.bp-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid rgb(var(--c-line) / 0.7);
  background: rgb(var(--c-surface) / 0.6);
  padding: 0.1rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: rgb(var(--c-ink-soft));
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .bp,
  .bp:hover {
    transition: none;
    transform: none;
  }
}
</style>
