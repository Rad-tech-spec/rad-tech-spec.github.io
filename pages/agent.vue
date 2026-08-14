<template>
  <!-- The chat is the whole page here, so the column is centred and runs wide
       rather than sitting in the left-aligned text measure the other pages use. -->
  <div class="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 md:py-14">
    <header class="mx-auto max-w-2xl text-center">
      <h1 class="sr-only">Agent</h1>

      <div class="font-mono text-sm leading-relaxed sm:text-base">
        <p class="text-ink">
          <span class="mr-2 font-bold text-accent-mid">$</span>./ask-rad --interactive
        </p>
        <p class="mt-1.5 text-ink-muted">
          # grounded in this site only!
        </p>
      </div>

      <p class="mt-5 text-lg leading-relaxed text-ink-soft">
        Ask about my experience, the projects I've shipped, or the tools I work with. If
        something isn't covered on this site, it'll tell you that instead of guessing.
      </p>
    </header>

    <div class="mt-8">
      <AgentChat />
    </div>
  </div>
</template>

<script setup>
import siteMetaInfo from "@/data/sitemetainfo.js";

useSeoMeta({
  title: `${siteMetaInfo.title} | Agent`,
  description:
    "Ask questions about Rad Eshghi's experience, projects, and stack — answered from his own site content.",
});
</script>
