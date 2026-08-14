<template>
  <div class="mt-6">
    <div class="w-full md:flex md:gap-8">
      <!--
        Fixed sidebar width: the card itself is a set width, so a percentage
        column would just add dead space at full page width.

        Deliberately NOT sticky. Three stacked cards are taller than a short
        viewport, and a sticky column taller than the screen pins in place with
        its bottom permanently unreachable. Capping the height and scrolling
        inside fixes that but puts a second scrollbar on the page. Plain flow
        avoids both: the sidebar scrolls with the page and stays fully readable.
      -->
      <div class="p-2 md:w-80 md:shrink-0">
        <div class="flex flex-col items-center gap-4">
          <AuthorCard :show-name="false" />
          <ContactCard />
          <HobbiesCard />
        </div>
      </div>
      <div class="md:flex-1 md:min-w-0 px-8">
        <AuthorIntro></AuthorIntro>
        <TimeLine></TimeLine>
      </div>
    </div>
  </div>
</template>

<script setup>
import siteMetaInfo from "@/data/sitemetainfo";

useSeoMeta({
  // useSeoMeta takes flat properties — a `meta` array is useHead's API, and
  // passing one here shadowed the global <meta charset>. Charset, viewport,
  // and the favicon are identical on every page, so they live in nuxt.config.
  title: siteMetaInfo.title,
  description: siteMetaInfo.description,
});
</script>

<style></style>
