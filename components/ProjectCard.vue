<template>
  <article
    class="pc group flex h-full flex-col overflow-hidden rounded-2xl border border-edge/80 bg-surface/90 supports-[backdrop-filter]:bg-surface/45 backdrop-blur-2xl backdrop-saturate-[1.6] ring-1 ring-[rgb(var(--c-shadow)/0.14)] shadow-xl shadow-[rgb(var(--c-shadow)/0.12)]"
  >
    <!-- Media -->
    <div class="relative aspect-video w-full overflow-hidden border-b border-edge/70 bg-cream">
      <!-- Loaded embed -->
      <iframe
        v-if="playing && embedUrl"
        :src="embedUrl"
        class="absolute inset-0 h-full w-full"
        :title="`${title} walkthrough`"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <!-- Local file -->
      <video
        v-else-if="video.src"
        :src="video.src"
        :poster="video.poster || undefined"
        controls
        preload="none"
        class="absolute inset-0 h-full w-full bg-black object-cover"
      ></video>

      <!--
        Facade for YouTube: clicking loads the iframe. Embedding it eagerly
        would pull YouTube's player and cookies into every page load, for every
        card, whether or not anyone watches.
      -->
      <button
        v-else-if="video.youtube"
        type="button"
        class="absolute inset-0 flex h-full w-full items-center justify-center"
        :aria-label="`Play ${title} walkthrough`"
        @click="playing = true"
      >
        <img
          v-if="video.poster"
          :src="video.poster"
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
        />
        <span
          class="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-lg transition-transform duration-200 group-hover:scale-105"
        >
          <svg class="ml-0.5 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>

      <!-- Nothing configured yet -->
      <div
        v-else
        class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center"
      >
        <span
          class="flex h-11 w-11 items-center justify-center rounded-full border border-accent/25 bg-accent-soft text-accent"
        >
          <svg
            class="ml-0.5 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m5 3 14 9-14 9V3Z" />
          </svg>
        </span>
        <span class="text-xs font-medium tracking-wide text-ink-muted">
          Walkthrough coming soon
        </span>
      </div>
    </div>

    <!-- Body -->
    <div class="flex flex-1 flex-col p-5">
      <div class="flex flex-wrap items-center gap-2">
        <h2 class="font-display text-lg font-bold tracking-tight text-ink">{{ title }}</h2>
        <span v-if="current" class="pc-chip pc-chip--accent">Current</span>
        <span v-if="visibility === 'private'" class="pc-chip">Private</span>
      </div>

      <p class="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
        {{ description }}
      </p>

      <ul class="mt-4 flex flex-wrap gap-1.5">
        <li v-for="tech in techs" :key="tech" class="pc-chip">{{ tech }}</li>
      </ul>

      <div
        v-if="links.length"
        class="mt-5 flex flex-wrap items-center gap-4 border-t border-line/70 pt-4"
      >
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-accent"
        >
          <component :is="link.icon" class="h-4 w-4" />
          {{ link.label }}
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from "vue";
import GithubIcon from "assets/icons/github_new.svg?component";
import ExternalIcon from "assets/icons/external.svg?component";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  href: { type: String, default: "" },
  github: { type: String, default: "" },
  techs: { type: Array, default: () => [] },
  visibility: { type: String, default: "public" },
  current: { type: Boolean, default: false },
  video: { type: Object, default: () => ({}) },
});

const playing = ref(false);

const embedUrl = computed(() =>
  props.video?.youtube
    ? `https://www.youtube-nocookie.com/embed/${props.video.youtube}?autoplay=1&rel=0`
    : ""
);

// "#" and "" are placeholders in the data, not destinations — rendering them
// would give visitors links that go nowhere.
function isReal(url) {
  return typeof url === "string" && url.length > 0 && url !== "#";
}

const links = computed(() => {
  const out = [];
  if (isReal(props.github)) out.push({ label: "Source", href: props.github, icon: GithubIcon });
  if (isReal(props.href)) out.push({ label: "Live", href: props.href, icon: ExternalIcon });
  return out;
});
</script>

<style scoped>
.pc {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.pc:hover {
  transform: translateY(-2px);
}

.pc-chip {
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

.pc-chip--accent {
  border-color: rgb(var(--c-accent) / 0.25);
  background: rgb(var(--c-accent-soft));
  color: rgb(var(--c-accent));
  font-weight: 600;
}

/* SVGO can drop a fill it considers redundant; stroke-drawn icons opt out
   with fill="none" and must not be filled. */
.pc :deep(svg:not([fill="none"])) {
  fill: currentColor;
}

@media (prefers-reduced-motion: reduce) {
  .pc,
  .pc:hover {
    transition: none;
    transform: none;
  }
}
</style>
