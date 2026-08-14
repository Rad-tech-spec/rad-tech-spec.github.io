<template>
  <div class="mt-12">
    <h3 class="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
      Experience &amp; Education
    </h3>

    <ol ref="listEl" class="tl">
      <!--
        The rail carries two background layers: a static gradient that runs
        muted at the bottom (earliest) to accent at the top (present), and a
        travelling highlight that rises through it — same upward read as the
        career itself, and the same idiom as the grid beams behind the page.
      -->
      <span class="tl__rail" aria-hidden="true"></span>

      <li
        v-for="(time, index) in timeline"
        :key="`${time.title}-${index}`"
        :ref="(el) => (itemEls[index] = el)"
        class="tl__item"
        :class="{ 'is-visible': visible[index] }"
        :style="{ transitionDelay: `${index * 90}ms` }"
      >
        <span
          class="tl__node"
          :class="time.current ? 'tl__node--current' : 'tl__node--past'"
          aria-hidden="true"
        >
          <component :is="time.icon" class="h-3 w-3" />
        </span>

        <div class="tl__card">
          <!--
            The whole header is the control, so the hit area matches what looks
            clickable. aria-expanded/aria-controls tell assistive tech what the
            button does and which region it owns.
          -->
          <button
            type="button"
            class="tl__trigger"
            :aria-expanded="open[index]"
            :aria-controls="`tl-panel-${index}`"
            @click="toggle(index)"
          >
            <span class="min-w-0">
              <span class="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span class="font-display text-lg font-semibold tracking-tight text-ink">
                  {{ time.title }}
                </span>
                <span v-if="time.current" class="tl__badge">
                  <span class="tl__pulse" aria-hidden="true"></span>
                  Present
                </span>
              </span>
              <span v-if="time.org" class="mt-0.5 block text-sm font-medium text-accent">
                {{ time.org }}
              </span>
              <time class="mt-1 block text-sm text-ink-muted">{{ time.subtitle }}</time>
            </span>

            <svg
              class="tl__chevron"
              :class="{ 'tl__chevron--open': open[index] }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <!-- 0fr -> 1fr animates to the content's natural height without
               measuring it in JS. -->
          <div
            :id="`tl-panel-${index}`"
            class="tl__panel"
            :class="{ 'tl__panel--open': open[index] }"
          >
            <div class="overflow-hidden">
              <ul class="tl__bullets">
                <li v-for="(bullet, b) in time.bullets" :key="b">
                  <span class="tl__dot" aria-hidden="true"></span>
                  <span>
                    <template v-for="(seg, s) in parseEmphasis(bullet)" :key="s">
                      <strong v-if="seg.strong" class="font-semibold text-ink">{{ seg.text }}</strong>
                      <span v-else>{{ seg.text }}</span>
                    </template>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import author from "@/data/author.js";

const timeline = author.timeline;

const listEl = ref(null);
const itemEls = ref([]);

// Server-render everything expanded and visible: without JS the timeline must
// still be fully readable rather than a column of collapsed, empty cards.
const visible = ref(timeline.map(() => true));
const open = ref(timeline.map(() => true));

let observer = null;

function toggle(index) {
  open.value[index] = !open.value[index];
}

// Split "plain *emphasised* plain" into runs. Avoids v-html entirely.
function parseEmphasis(text) {
  return (text || "")
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith("*") && chunk.endsWith("*")
        ? { text: chunk.slice(1, -1), strong: true }
        : { text: chunk, strong: false }
    );
}

onMounted(() => {
  // Only the most recent entry stays open once JS is running.
  open.value = timeline.map((_, i) => i === 0);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  visible.value = timeline.map(() => false);

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = itemEls.value.indexOf(entry.target);
        if (index !== -1) visible.value[index] = true;
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
  );

  itemEls.value.forEach((el) => el && observer.observe(el));
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped>
.tl {
  /* accent.mid (#b8663a) as channels so rgb(... / a) can vary the alpha */
  --tl-accent: var(--c-accent-mid);
  /* Warm neutral so the unlit end of the rail sits on the cream rather than
     reading cold against it. */
  --tl-rail: rgb(var(--c-line));
  --tl-node-size: 26px;

  position: relative;
  padding-left: 2.75rem;
}

.tl__rail {
  position: absolute;
  top: 4px;
  bottom: 0;
  /* centre the 2px rail under the node: (26 / 2) - 1 */
  left: 12px;
  width: 2px;
  border-radius: 2px;
  background-image: linear-gradient(
      to top,
      transparent 0%,
      rgb(var(--tl-accent) / 0.85) 8%,
      transparent 18%
    ),
    linear-gradient(to top, var(--tl-rail) 15%, rgb(var(--tl-accent) / 0.55) 100%);
  background-size: 100% 260%, 100% 100%;
  background-repeat: no-repeat, no-repeat;
  background-position: 0 130%, 0 0;
  animation: tl-rise 6s linear infinite;
}

@keyframes tl-rise {
  from {
    background-position: 0 130%, 0 0;
  }
  to {
    background-position: 0 -160%, 0 0;
  }
}

.tl__item {
  position: relative;
  margin-bottom: 1.25rem;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.tl__item.is-visible {
  opacity: 1;
  transform: none;
}

.tl__node {
  position: absolute;
  left: calc(-2.75rem + 12px - var(--tl-node-size) / 2 + 1px);
  top: 18px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--tl-node-size);
  height: var(--tl-node-size);
  border-radius: 9999px;
  /* Ring in the page background so the rail appears to pass behind the node */
  box-shadow: 0 0 0 5px var(--page-bg);
  transform: scale(0.4);
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
  transition-delay: inherit;
}

.tl__item.is-visible .tl__node {
  transform: scale(1);
  opacity: 1;
}

/*
 * Icons inherit the node's `color`. SVGO can drop a fill attribute it thinks
 * is redundant, so assert it here as well. Stroke-drawn icons opt out with
 * fill="none" and are excluded — filling them would turn them into blobs.
 */
.tl__node :deep(svg:not([fill="none"])) {
  fill: currentColor;
}

.tl__node--past {
  background: rgb(var(--c-surface));
  border: 1.5px solid rgb(var(--tl-accent) / 0.35);
  color: rgb(var(--tl-accent));
}

.tl__node--current {
  background: rgb(var(--tl-accent));
  border: 1.5px solid rgb(var(--tl-accent));
  color: #fff;
}

/* Halo on the ongoing role only — marks "you are here" without extra chrome */
.tl__node--current::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  border: 1.5px solid rgb(var(--tl-accent) / 0.5);
  animation: tl-halo 2.4s ease-out infinite;
}

@keyframes tl-halo {
  0% {
    transform: scale(0.85);
    opacity: 0.8;
  }
  70%,
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.tl__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 9999px;
  background: rgb(var(--c-accent-soft));
  padding: 0.15rem 0.65rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: rgb(var(--c-accent));
  white-space: nowrap;
}

.tl__pulse {
  height: 5px;
  width: 5px;
  border-radius: 9999px;
  background: currentColor;
  animation: tl-blink 2s ease-in-out infinite;
}

@keyframes tl-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

.tl__card {
  border-radius: 1rem;
  border: 1px solid rgb(var(--c-edge) / 0.7);
  background: rgb(var(--c-surface) / 0.55);
  box-shadow: 0 1px 2px rgb(var(--c-shadow) / 0.10), 0 12px 28px -18px rgb(var(--c-shadow) / 0.35);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

@supports (backdrop-filter: blur(1px)) {
  .tl__card {
    background: rgb(var(--c-surface) / 0.4);
    backdrop-filter: blur(20px) saturate(1.4);
  }
}

.tl__card:hover {
  background: rgb(var(--c-surface) / 0.6);
}

.tl__trigger {
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  text-align: left;
  cursor: pointer;
  border-radius: 1rem;
}

.tl__trigger:focus-visible {
  outline: 2px solid rgb(var(--tl-accent));
  outline-offset: 2px;
}

.tl__chevron {
  width: 1.15rem;
  height: 1.15rem;
  flex-shrink: 0;
  margin-top: 0.3rem;
  color: rgb(var(--tl-accent));
  transition: transform 0.25s ease;
}

.tl__chevron--open {
  transform: rotate(180deg);
}

.tl__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.tl__panel--open {
  grid-template-rows: 1fr;
}

.tl__bullets {
  padding: 0 1.25rem 1.25rem;
  display: grid;
  /* auto-fit: two (or more) columns whenever a 24rem track fits, one when it
     doesn't — so the card decides by available width rather than a fixed
     breakpoint, and narrow screens still get a single readable column. */
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 0.75rem 2rem;
  align-items: start;
}

.tl__bullets li {
  display: flex;
  gap: 0.65rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgb(var(--c-ink-soft));
}

.tl__dot {
  margin-top: 0.6rem;
  height: 5px;
  width: 5px;
  flex-shrink: 0;
  border-radius: 9999px;
  background: rgb(var(--tl-accent) / 0.55);
}

@media (prefers-reduced-motion: reduce) {
  .tl__rail,
  .tl__pulse {
    animation: none;
  }

  .tl__node--current::after {
    animation: none;
    opacity: 0.5;
    transform: scale(1);
  }

  .tl__item,
  .tl__node {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .tl__panel,
  .tl__chevron {
    transition: none;
  }
}
</style>
