<template>
  <!-- No positioning here: the page owns it, so a sibling card can stack
       beneath this one. (Was md:fixed, which took it out of flow.) -->
  <div>
    <div
      class="w-full rounded-2xl border border-edge/80 bg-surface/90 supports-[backdrop-filter]:bg-surface/45 backdrop-blur-3xl backdrop-saturate-[1.8] p-6 ring-1 ring-[rgb(var(--c-shadow)/0.14)] shadow-xl shadow-[rgb(var(--c-shadow)/0.16)] md:w-72"
    >
      <div class="flex flex-col items-center text-center">
        <!--
          Rendered at 160/192px, so 384 covers 2x displays. eager, not lazy:
          it's above the fold, and deferring it just delays the one image
          visitors see first.
        -->
        <nuxt-img
          :src="author.author_image"
          :alt="author.name"
          width="384"
          height="384"
          sizes="160px md:192px"
          format="webp"
          quality="82"
          loading="eager"
          class="h-40 w-40 rounded-full object-cover shadow-xl md:h-48 md:w-48"
        />
        <h1
          v-if="showName"
          class="mt-4 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
        >
          {{ author.name }}
        </h1>
        <div
          class="text-sm font-medium tracking-wide text-accent md:text-base"
          :class="showName ? 'mt-1' : 'mt-4'"
        >
          {{ author.position }}
        </div>
      </div>

      <!--
        Icon-only links: the label lives in aria-label and title rather than
        visible text, so screen readers and hover still identify each one.
        Location is deliberately not repeated here — the hero terminal shows it.
      -->
      <div
        class="mt-5 flex flex-wrap items-center justify-center gap-3 border-t border-line/70 pt-5"
      >
        <a
          v-for="contact in contactLinks"
          :key="contact.id"
          :href="contact.href"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/80 bg-surface/70 text-ink-soft transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2"
          :target="contact.external ? '_blank' : undefined"
          :rel="contact.external ? 'noopener noreferrer' : undefined"
          :aria-label="contact.label"
          :title="contact.label"
        >
          <component :is="contact.icon" class="h-5 w-5" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import author from "@/data/author.js";

defineProps({
  // Home shows the name as the hero <h1>, so the card hides its own to avoid
  // a duplicate heading. Skills has no other heading, so it keeps it.
  showName: { type: Boolean, default: true },
});

import Github from "assets/icons/github_new.svg?skipsvgo";
import LinkedIn from "assets/icons/linkeding.svg?skipsvgo";
import Youtube from "assets/icons/youtube.svg?skipsvgo";
import Medium from "assets/icons/medium.svg?skipsvgo";

// Email deliberately absent — it lives behind the reveal on ContactCard, so
// putting a plain mailto: here would hand harvesters the address anyway.
const contactLinks = [
  {
    id: "github",
    label: "GitHub",
    href: `https://github.com/${author.socials.github}`,
    icon: Github,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: `https://linkedin.com/in/${author.socials.linkedin}`,
    icon: LinkedIn,
    external: true,
  },
  {
    id: "medium",
    label: "Medium",
    href: `https://medium.com/${author.socials.medium}`,
    icon: Medium,
    external: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: `https://youtube.com/${author.socials.youtube}`,
    icon: Youtube,
    external: true,
  },
];
</script>
