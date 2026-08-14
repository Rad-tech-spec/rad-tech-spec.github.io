<template>
  <footer class="mt-20 border-t border-line/70">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-8 text-sm text-ink-muted sm:flex-row sm:justify-between"
    >
      <p>&copy; {{ new Date().getFullYear() }} {{ author.name }}</p>

      <div class="flex items-center gap-4">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors hover:text-accent"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import author from "@/data/author.js";

// Text links rather than icons: the profile card already carries the icon row,
// and repeating it here added a second set of the same targets.
const links = [
  { label: "GitHub", href: `https://github.com/${author.socials.github}` },
  { label: "LinkedIn", href: `https://linkedin.com/in/${author.socials.linkedin}` },
  { label: "Medium", href: `https://medium.com/${author.socials.medium}` },
  { label: "YouTube", href: `https://youtube.com/${author.socials.youtube}` },
];
</script>
