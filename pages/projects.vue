<template>
  <div class="w-full px-4 py-12 sm:px-6 md:py-16">
    <header class="max-w-2xl">
      <!--
        Kept as sr-only rather than deleted: a page with no <h1> loses its
        anchor for screen-reader navigation and for search engines. Hidden
        visually, still announced and indexed.
      -->
      <h1 class="sr-only">Projects</h1>

      <div class="font-mono text-sm leading-relaxed sm:text-base">
        <p class="text-ink">
          <span class="mr-2 font-bold text-accent-mid">$</span>ls -la /projects
        </p>
        <!-- Count comes from the data, so it can't drift when you add one. -->
        <p class="mt-1.5 text-ink-muted">
          # {{ projectsData.length }} directories — a few shipped, the rest taught me
          something
        </p>
      </div>
    </header>

    <div class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <ProjectCard
        v-for="item in projectsData"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :href="item.href"
        :github="item.github"
        :techs="item.techs"
        :visibility="item.visibility"
        :current="item.current"
        :video="item.video"
      />
    </div>
  </div>
</template>

<script setup>
import projectsData from "@/data/projects";
import siteMetaInfo from "@/data/sitemetainfo.js";

useSeoMeta({
  title: `${siteMetaInfo.title} | Projects`,
  description:
    "Selected projects by Rad Eshghi — cloud microservices on AWS, multi-agent chatbots, automation tooling, and systems programming.",
});
</script>
