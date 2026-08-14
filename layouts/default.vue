<template>
  <div class="relative min-h-screen">
    <GridBackground />

    <div class="relative z-10">
      <!-- Header sits outside the padded section so its bar reaches both
           edges of the viewport instead of being inset by the page gutter. -->
      <TheHeader />
      <NuxtLoadingIndicator />

      <section class="w-full px-6 pb-12 antialiased">
        <NuxtPage />
        <TheFooter />
      </section>
    </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";

export default {
  component: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style></style>
