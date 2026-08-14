<template>
  <!--
    The same grouped skills as Expertise.vue, rendered as a branching spine:
    one trunk down the page, a junction node per category, a branch out to each
    card. A pulse travels the trunk and lights each branch in turn.

    All of the geometry is deterministic — the trunk, nodes, and branches sit at
    positions derived from a single gutter variable, so nothing has to be
    measured in JS and nothing shifts on resize. That also means it renders
    correctly server-side and degrades to a plain readable list without JS.
  -->
  <div class="st mt-10">
    <span class="st__trunk" aria-hidden="true"></span>

    <section v-for="(key, i) in groupKeys" :key="key" class="st__row" :style="{ '--i': i }">
      <span class="st__node" aria-hidden="true"></span>
      <span class="st__branch" aria-hidden="true"></span>

      <div
        class="st__card rounded-2xl border border-edge/80 bg-surface/90 supports-[backdrop-filter]:bg-surface/45 backdrop-blur-2xl backdrop-saturate-[1.6] p-6 ring-1 ring-[rgb(var(--c-shadow)/0.14)] shadow-xl shadow-[rgb(var(--c-shadow)/0.12)]"
      >
        <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 class="font-display text-lg font-bold tracking-tight text-ink">{{ key }}</h2>
          <span v-if="isCurrentlyExploring(key)" class="st-chip st-chip--accent">
            Currently exploring
          </span>
        </div>

        <p v-if="groupDescriptions[key]" class="mt-2.5 text-sm leading-relaxed text-ink-soft">
          {{ groupDescriptions[key] }}
        </p>

        <ul class="mt-5 flex flex-wrap gap-2">
          <li v-for="(item, index) in getGroupItems(key)" :key="`${key}-${item.name || index}`">
            <!--
              Items with a credential link become anchors; the rest are static.
              Every item shows its name — icons alone left most of these
              unidentifiable unless you happened to recognise the logo.
            -->
            <component
              :is="item.link ? 'a' : 'div'"
              v-bind="
                item.link
                  ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
                  : {}
              "
              class="st-tile flex items-center gap-2 rounded-xl border border-line/70 bg-surface/50 px-2.5 py-2 text-sm font-medium text-ink-soft"
              :class="item.link ? 'st-tile--link' : ''"
            >
              <component :is="item.icon" class="h-5 w-5 shrink-0" />
              <span>{{ item.name }}</span>
              <ExternalIcon v-if="item.link" class="h-3 w-3 shrink-0 text-accent" />
            </component>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ExternalIcon from "assets/icons/external.svg?component";
import author from "@/data/author.js";

const expertises = author.expertises;
const groupKeys = computed(() => Object.keys(expertises));

// A group is either a plain array of items, or an object wrapping `items`
// with extra flags like `currentlyExploring`.
function getGroupItems(key) {
  const group = expertises[key];
  if (Array.isArray(group)) return group;
  if (group && Array.isArray(group.items)) return group.items;
  return [];
}

function isCurrentlyExploring(key) {
  const group = expertises[key];
  return Boolean(group && !Array.isArray(group) && group.currentlyExploring);
}

const groupDescriptions = {
  "Programming Languages":
    "Core languages for backend work, scripting, and database access.",
  "AI & LLM":
    "Conversational AI and RAG pipelines — multi-agent chatbots on Teams 365, with FastAPI and function calling behind them.",
  "Backend & Databases":
    "Building scalable services and managing structured and unstructured data across REST, relational, and NoSQL.",
  "Cloud & DevOps":
    "Infrastructure as code, containerisation, and CI/CD. Hands-on with AWS including EC2, S3, RDS, and Lambda.",
  "Version Control & Collaboration":
    "Source control, code review, and the tooling teams coordinate through.",
  Certifications: "Credentials, with links to verify.",
};
</script>

<style scoped>
.st {
  /* One variable drives the whole layout: the trunk sits at --st-rail-x, the
     cards start at --st-pad, and every node and branch is derived from those
     two. Changing the gutter for small screens is a one-line media query. */
  --st-pad: 46px;
  --st-rail-x: 15px;
  --st-node: 13px;

  /*
   * Vertical line the node and branch sit on: the centre of the category
   * heading. Derived from the card's own box rather than guessed, so it stays
   * correct if the type scale moves —
   *   1.5rem   card padding (p-6)
   * + 1px      card border
   * + 0.875rem half of the heading's 1.75rem line box
   */
  --st-anchor: calc(1.5rem + 1px + 0.875rem);

  position: relative;
  padding-left: var(--st-pad);
}

/* ---- trunk ------------------------------------------------------------- */

.st__trunk {
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  left: var(--st-rail-x);
  width: 2px;
  overflow: hidden;
  border-radius: 2px;
  background: linear-gradient(
    to bottom,
    rgb(var(--c-line) / 0) 0%,
    rgb(var(--c-line)) 8%,
    rgb(var(--c-line)) 92%,
    rgb(var(--c-line) / 0) 100%
  );
}

/*
 * The travelling pulse. Sized and positioned as a background rather than a
 * child element with a fixed pixel height: percentage background-position is
 * resolved against the trunk's own height, so one rule works whatever the page
 * grows to. Overshooting to -25%/125% lets it enter and leave cleanly.
 */
.st__trunk::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    to bottom,
    rgb(var(--c-accent) / 0) 0%,
    rgb(var(--c-accent) / 0.85) 50%,
    rgb(var(--c-accent) / 0) 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 20%;
  animation: st-flow 11s linear infinite;
}

@keyframes st-flow {
  0% {
    background-position: 0 -25%;
  }
  100% {
    background-position: 0 125%;
  }
}

/* ---- rows, nodes, branches --------------------------------------------- */

.st__row {
  position: relative;
}

.st__row + .st__row {
  margin-top: 1.5rem;
}

/*
 * Node and branch are pulled back out of the card's own box with negative
 * offsets, so they land on the trunk without needing a wrapper grid.
 * top is measured to the card's heading baseline.
 */
.st__node {
  position: absolute;
  top: calc(var(--st-anchor) - var(--st-node) / 2);
  left: calc(var(--st-rail-x) - var(--st-pad) - (var(--st-node) - 2px) / 2);
  height: var(--st-node);
  width: var(--st-node);
  border-radius: 9999px;
  border: 2px solid rgb(var(--c-accent) / 0.55);
  background: rgb(var(--c-surface));
  /* Punches a hole in the trunk so the line doesn't run under the node —
     same trick the timeline uses to sit its markers on the rail. */
  box-shadow: 0 0 0 4px var(--page-bg);
  animation: st-node-pulse 11s ease-in-out infinite;
  animation-delay: calc(var(--i) * 1.15s);
}

@keyframes st-node-pulse {
  0%,
  12%,
  100% {
    border-color: rgb(var(--c-accent) / 0.55);
    background: rgb(var(--c-surface));
  }
  4% {
    border-color: rgb(var(--c-accent));
    background: rgb(var(--c-accent) / 0.35);
  }
}

.st__branch {
  position: absolute;
  top: calc(var(--st-anchor) - 1px);
  left: calc(var(--st-rail-x) + 2px - var(--st-pad));
  height: 2px;
  width: calc(var(--st-pad) - var(--st-rail-x) - 2px);
  overflow: hidden;
  background: linear-gradient(
    to right,
    rgb(var(--c-line)) 0%,
    rgb(var(--c-line) / 0.35) 100%
  );
}

/* The spark that runs out along a branch, staggered so the six fire in
   sequence down the page rather than all at once. */
.st__branch::after {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  height: 4px;
  width: 12px;
  border-radius: 9999px;
  background: rgb(var(--c-accent));
  opacity: 0;
  animation: st-spark 11s ease-out infinite;
  animation-delay: calc(var(--i) * 1.15s);
}

@keyframes st-spark {
  0% {
    left: 0;
    opacity: 0;
  }
  2% {
    opacity: 1;
  }
  9% {
    left: 100%;
    opacity: 0;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

/* ---- card + tiles ------------------------------------------------------ */

.st__card {
  transition: border-color 0.25s ease;
}

.st__row:hover .st__card {
  border-color: rgb(var(--c-accent) / 0.3);
}

.st-tile {
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease,
    transform 0.2s ease;
}

.st-tile--link:hover {
  border-color: rgb(var(--c-accent) / 0.35);
  background: rgb(var(--c-accent-soft) / 0.6);
  color: rgb(var(--c-accent));
  transform: translateY(-1px);
}

.st-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid rgb(var(--c-line) / 0.7);
  padding: 0.1rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: rgb(var(--c-ink-soft));
  white-space: nowrap;
}

.st-chip--accent {
  border-color: rgb(var(--c-accent) / 0.25);
  background: rgb(var(--c-accent-soft));
  color: rgb(var(--c-accent));
  font-weight: 600;
}

/*
 * Deliberately NOT forcing fill: currentColor here. Unlike the timeline's
 * single-colour icons, these are brand logos with their own palettes — Python's
 * blue/yellow, Docker's blue, AWS orange. Overriding fill would flatten every
 * one of them to a single grey.
 */

@media (max-width: 640px) {
  .st {
    --st-pad: 30px;
    --st-rail-x: 10px;
    --st-node: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .st__trunk::after,
  .st__node,
  .st__branch::after {
    animation: none;
  }

  .st__branch::after {
    display: none;
  }

  .st-tile,
  .st-tile--link:hover {
    transition: none;
    transform: none;
  }
}
</style>
