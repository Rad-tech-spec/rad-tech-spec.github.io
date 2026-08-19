<template>
  <!--
    The grouped skills rendered as a branching tree: a spine down the left with
    a node per category and a branch out to each card. A pulse runs the spine on
    a loop and lights each node and branch in turn as it passes.

    Geometry is deterministic — everything derives from a handful of custom
    properties, so nothing is measured in JS, nothing shifts on resize, it
    renders correctly server-side, and with JS or CSS off it degrades to a
    plain readable list of headings and links.

    The connectors are CSS, not SVG, and the leaves stay HTML tiles. That's
    deliberate: the tiles carry real brand logos which keep their own colours
    (see the note on .st-tile below), and an all-SVG diagram would cost that.
  -->
  <div class="st mt-10">
    <div class="st__rows">
      <span class="st__spine" aria-hidden="true"></span>

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
  /*
   * Four values drive the whole diagram.
   *
   * --st-anchor is the one that matters: the vertical line every node and
   * branch sits on, measured to the centre of the category heading rather than
   * guessed, so it stays correct if the type scale moves —
   *   1.5rem   card padding (p-6)
   * + 1px      card border
   * + 0.875rem half of the heading's 1.75rem line box
   */
  --st-anchor: calc(1.5rem + 1px + 0.875rem);
  --st-branch: 2.75rem; /* spine → card */
  --st-node: 13px;

  /* How far the branch keeps clear of the node: the node's radius plus the
     4px page-coloured ring around it. Without this the branch starts at the
     spine and emerges from inside the circle, while the spine above and below
     is masked by that same ring — so the horizontal line looked attached and
     the vertical ones didn't. Deriving it from the ring rather than picking a
     number keeps all three gaps identical if --st-node ever changes. */
  --st-node-clear: calc(var(--st-node) / 2 + 4px);

  /* One clock for the whole animation. Each branch fires --st-stagger after
     the one above it, which lands it roughly where the spine pulse is. */
  --st-cycle: 11s;
  --st-stagger: calc(var(--st-cycle) / 7);
}

/* ---- spine ------------------------------------------------------------- */

.st__rows {
  position: relative;
  padding-left: var(--st-branch);
}

/*
 * Faded at both ends rather than stopped exactly on the first and last nodes:
 * card heights vary with their content, so the exact endpoints aren't
 * knowable in CSS. The fade reads as intentional and survives any content
 * change, where a hard stop would drift.
 */
.st__spine {
  position: absolute;
  left: 0;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 2px;
  overflow: hidden;
  border-radius: 2px;
  background: linear-gradient(
    to bottom,
    rgb(var(--c-line) / 0) 0%,
    rgb(var(--c-line)) 7%,
    rgb(var(--c-line)) 93%,
    rgb(var(--c-line) / 0) 100%
  );
}

/*
 * The travelling pulse. A moving background rather than a child element with a
 * pixel height: percentage background-position resolves against the spine's
 * own height, so one rule works however tall the page grows. Overshooting to
 * -25%/125% lets it enter and leave cleanly.
 */
.st__spine::after {
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
  animation: st-flow var(--st-cycle) linear infinite;
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

.st__node {
  position: absolute;
  top: calc(var(--st-anchor) - var(--st-node) / 2);
  left: calc(-1 * var(--st-branch) - (var(--st-node) - 2px) / 2);
  height: var(--st-node);
  width: var(--st-node);
  border-radius: 9999px;
  background: rgb(var(--c-canvas));
  border: 2px solid rgb(var(--c-line));
  /* The ring is painted in the page colour so the node reads as sitting on
     top of the spine rather than being crossed by it. */
  box-shadow: 0 0 0 4px var(--page-bg);
  transition: border-color 0.3s ease;
}

/* Lit as the pulse passes. A separate ring element rather than animating the
   node's own box-shadow, so the resting shadow above stays untouched. */
.st__node::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 9999px;
  border: 2px solid rgb(var(--c-accent));
  opacity: 0;
  animation: st-node-lit var(--st-cycle) linear infinite;
  animation-delay: calc(var(--i) * var(--st-stagger));
}

@keyframes st-node-lit {
  0%,
  100% {
    opacity: 0;
    box-shadow: 0 0 0 0 rgb(var(--c-accent) / 0);
  }
  5% {
    opacity: 1;
    box-shadow: 0 0 10px 0 rgb(var(--c-accent) / 0.5);
  }
  18% {
    opacity: 0;
    box-shadow: 0 0 0 0 rgb(var(--c-accent) / 0);
  }
}

.st__branch {
  position: absolute;
  top: var(--st-anchor);
  left: calc(-1 * var(--st-branch) + var(--st-node-clear));
  width: calc(var(--st-branch) - var(--st-node-clear));
  height: 2px;
  transform: translateY(-1px);
  background: rgb(var(--c-line));
  border-radius: 2px;
}

/* Accent sweep along the branch, timed to arrive with the node. */
.st__branch::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 2px;
  background: linear-gradient(to right, rgb(var(--c-accent)), rgb(var(--c-accent) / 0.15));
  opacity: 0;
  animation: st-branch-lit var(--st-cycle) linear infinite;
  animation-delay: calc(var(--i) * var(--st-stagger));
}

@keyframes st-branch-lit {
  0%,
  100% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  20% {
    opacity: 0;
  }
}

/* ---- cards, chips, tiles ----------------------------------------------- */

.st-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.15rem 0.55rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.st-chip--accent {
  background: rgb(var(--c-accent-soft));
  color: rgb(var(--c-accent));
}

.st-tile {
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease,
    transform 0.2s ease;
}

.st-tile--link:hover {
  border-color: rgb(var(--c-accent) / 0.45);
  color: rgb(var(--c-accent));
  transform: translateY(-1px);
}

/*
 * Deliberately NOT forcing fill: currentColor on these icons. They are brand
 * logos — Python, Docker, AWS, Postgres — and each carries its own palette.
 * Recolouring them to the ink colour flattens the whole grid to grey and makes
 * the logos unrecognisable, which is the one thing they are there to do.
 */

/* ---- narrow screens ----------------------------------------------------- */

/* Tighter gutter on phones so the cards keep as much width as possible. */
@media (max-width: 767px) {
  .st {
    --st-branch: 1.75rem;
  }
}

/* ---- reduced motion ----------------------------------------------------- */

@media (prefers-reduced-motion: reduce) {
  .st__spine::after,
  .st__node::after,
  .st__branch::after {
    animation: none;
    opacity: 0;
  }
}
</style>
