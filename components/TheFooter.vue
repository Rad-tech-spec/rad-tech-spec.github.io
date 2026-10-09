<template>
  <footer class="mt-20 border-t border-line/70">
    <!-- Same gutters as the page content above, so the copyright and the links
         line up with its edges instead of floating in a narrower centred box. -->
    <div
      class="flex flex-col items-center gap-3 px-4 py-8 text-sm text-ink-muted sm:flex-row sm:justify-between sm:px-6"
    >
      <p>&copy; {{ new Date().getFullYear() }} {{ author.name }}</p>

      <div class="flex items-center gap-4">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="-my-3 py-3 transition-colors hover:text-accent"
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
