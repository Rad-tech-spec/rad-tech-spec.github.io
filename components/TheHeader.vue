<template>
  <nav class="md:max-w-6xl mx-auto sticky top-0 z-50">
    <div
      class="bg-white flex flex-wrap items-center justify-center px-10 md:py-4 py-2 overflow-hidden border-b border-gray-200 font-2xl sm:px-4 md:overflow-visible md:px-2"
    >
      <input class="menu-btn hidden" type="checkbox" id="menu-btn" />
      <label
        class="menu-icon block cursor-pointer md:hidden px-2 relative select-none"
        for="menu-btn"
      >
        <span class="bg-grey-darkest flex items-center relative"></span>
      </label>

      <ul class="flex justify-center list-reset m-0 w-full md:w-auto">
        <li v-for="item in navLinks" :key="item.path" class="px-1">
          <NuxtLink
            :to="item.path"
            exact-active-class="nav-link-active"
            class="block md:inline-block px-4 py-2 no-underline text-grey-darkest hover:text-grey-darker font-bold text-lg md:text-2xl border border-transparent rounded-full transition-all duration-200 ease-out"
            >{{ item.name }}</NuxtLink
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import menu from "../data/menu";

export default {
  name: "TheHeader",
  data() {
    return {
      navLinks: menu,
    };
  },
};
</script>

<style>
.nuxt-link-exact-active {
  @apply text-indigo-600;
}

.nav-link-active {
  @apply border-indigo-200 bg-indigo-50 text-indigo-600 shadow-sm dark:border-indigo-400/40 dark:bg-indigo-900/40 dark:text-indigo-200;
}
</style>
