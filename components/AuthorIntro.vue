<template>
  <div class="mb-6">
    <!--
      Two columns from the very top, so the terminal's first row lines up with
      the name. Done structurally rather than with a large negative margin, so
      the alignment holds however many lines the tagline wraps to.
    -->
    <div class="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)]">
      <div>
        <!-- The name is the page's main heading here, so AuthorCard hides its
             own copy on this page (see :show-name on pages/index.vue). -->
        <h1
          class="mt-6 font-display text-4xl font-bold leading-[0.95] tracking-tightest text-ink sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {{ intro.title }}
        </h1>

        <!--
          Optional headline from the `tagline` frontmatter field. Segments
          wrapped in *asterisks* render italic and darker, matching the
          mixed-weight look of the reference design.
        -->
        <p
          v-if="taglineParts.length"
          class="mt-5 font-display text-2xl leading-[1.15] tracking-tight text-ink-muted sm:text-3xl lg:text-4xl"
        >
          <template v-for="(part, i) in taglineParts" :key="i">
            <em v-if="part.emphasis" class="italic font-semibold text-ink">{{ part.text }}</em>
            <span v-else>{{ part.text }}</span>
          </template>
        </p>

        <ContentRenderer
          class="prose mt-10 mb-4 max-w-xl text-left text-ink-soft prose-p:leading-relaxed prose-strong:font-semibold prose-strong:text-ink prose-a:font-medium prose-a:text-accent"
          :value="intro"
        >
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a
            v-for="action in actions"
            :key="action.label"
            :href="action.href"
            class="group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
            :class="
              action.primary
                ? 'bg-accent text-accent-contrast hover:bg-accent-deep'
                : 'border border-ink/20 text-ink hover:border-accent hover:text-accent'
            "
          >
            {{ action.label }}
            <svg
              class="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>

      <!-- mt-6 mirrors the h1's own top margin, so their top edges meet. -->
      <TerminalCard class="lg:mt-6" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const {data: intro} = await useAsyncData('intro', () => queryContent("/author")
    .where({
      page: "intro"
    })
    .findOne(), {
      server: true, // cache on server
      default: () => ({}),
      transform: data => data,
      watch: false, // don't refetch unless page reloads
      pick: ['title', 'body', 'page', 'tagline'], // only pick needed fields
      extractPayload: true // enable Nuxt payload extraction for faster client navigation
    }
);

const actions = [
  { label: "Talk to my agent", href: "/agent", primary: true },
  { label: "See the work", href: "/projects", primary: false },
];

// Split "plain *emphasised* plain" into styled runs.
const taglineParts = computed(() => {
  const raw = intro.value?.tagline;
  if (!raw) return [];

  return raw
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith("*") && chunk.endsWith("*")
        ? { text: chunk.slice(1, -1), emphasis: true }
        : { text: chunk, emphasis: false }
    );
});
</script>
