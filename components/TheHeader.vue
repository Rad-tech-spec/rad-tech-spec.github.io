<template>
  <nav class="sticky top-0 z-50 w-full">
    <div
      class="bg-cream-nav/90 supports-[backdrop-filter]:bg-cream-nav/60 backdrop-blur-2xl backdrop-saturate-150 flex flex-wrap items-center justify-center gap-2 px-10 md:py-4 py-2 overflow-hidden border-b border-edge/50 shadow-sm shadow-[rgb(var(--c-shadow)/0.10)] font-2xl sm:px-4 md:overflow-visible md:px-2"
    >
      <ul class="flex justify-center list-reset m-0 md:w-auto">
        <li v-for="item in navLinks" :key="item.path" class="px-1">
          <NuxtLink
            :to="item.path"
            :active-class="item.path === '/' ? '' : activeClass"
            :exact-active-class="item.path === '/' ? activeClass : ''"
            class="block md:inline-block px-4 py-2 no-underline text-ink-soft hover:text-ink font-bold text-lg md:text-2xl border border-transparent rounded-full transition-all duration-200 ease-out"
            >{{ item.name }}</NuxtLink
          >
        </li>
      </ul>

      <ThemeToggle class="ml-1 shrink-0" />
    </div>
  </nav>
</template>

<script setup>
import menu from "@/data/menu";

const navLinks = menu;

// "/" is a prefix of every route, so the Home link needs exact matching while
// the others use prefix matching (keeps Projects lit on /projects/<slug>).
const activeClass = "border-accent/25 bg-accent-soft text-accent shadow-sm";
</script>

<style>
.nuxt-link-exact-active {
  @apply text-accent;
}
</style>
