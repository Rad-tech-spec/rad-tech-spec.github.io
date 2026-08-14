<template>
  <div class="w-full px-4 py-12 sm:px-6 md:py-16">
    <header class="max-w-2xl">
      <!--
        AuthorCard used to supply this page's <h1> (the name). With the profile
        card removed, the page would otherwise have no top-level heading at all,
        which breaks screen-reader navigation and costs the main SEO signal.
      -->
      <h1 class="sr-only">Skills</h1>

      <div class="font-mono text-sm leading-relaxed sm:text-base">
        <p class="text-ink">
          <span class="mr-2 font-bold text-accent-mid">$</span>cat ~/.stack
        </p>
        <p class="mt-1.5 text-ink-muted">
          # what I reach for, grouped by where it lives
        </p>
      </div>
    </header>

    <SkillTree />
  </div>
</template>

<script setup>
import SkillTree from "@/components/SkillTree.vue";
import siteMetaInfo from "@/data/sitemetainfo.js";

useSeoMeta({
  title: `${siteMetaInfo.title} | Skills`,
  description:
    "Languages, cloud platforms, and DevOps tooling Rad Eshghi works with — Python, SQL, Docker, Jenkins, Ansible, Terraform, AWS, and Azure.",
});
</script>
