<template>
  <div class="mt-10 grid gap-6 lg:grid-cols-2">
    <section
      v-for="key in groupKeys"
      :key="key"
      class="ex-card flex flex-col rounded-2xl border border-edge/80 bg-surface/90 supports-[backdrop-filter]:bg-surface/45 backdrop-blur-2xl backdrop-saturate-[1.6] p-6 ring-1 ring-[rgb(var(--c-shadow)/0.14)] shadow-xl shadow-[rgb(var(--c-shadow)/0.12)]"
    >
      <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 class="font-display text-lg font-bold tracking-tight text-ink">{{ key }}</h2>
        <span v-if="isCurrentlyExploring(key)" class="ex-chip ex-chip--accent">
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
            class="ex-tile flex items-center gap-2 rounded-xl border border-line/70 bg-surface/50 px-2.5 py-2 text-sm font-medium text-ink-soft"
            :class="item.link ? 'ex-tile--link' : ''"
          >
            <component :is="item.icon" class="h-5 w-5 shrink-0" />
            <span>{{ item.name }}</span>
            <ExternalIcon v-if="item.link" class="h-3 w-3 shrink-0 text-accent" />
          </component>
        </li>
      </ul>
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
.ex-tile {
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease,
    transform 0.2s ease;
}

.ex-tile--link:hover {
  border-color: rgb(var(--c-accent) / 0.35);
  background: rgb(var(--c-accent-soft) / 0.6);
  color: rgb(var(--c-accent));
  transform: translateY(-1px);
}

.ex-chip {
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

.ex-chip--accent {
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

@media (prefers-reduced-motion: reduce) {
  .ex-tile,
  .ex-tile--link:hover {
    transition: none;
    transform: none;
  }
}
</style>
