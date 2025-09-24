<template>
  <div class="p-4 md:w-1/2 md" style="max-width: 544px">
    <div
      class="h-full overflow-hidden border-2 border-gray-200 rounded-lg border-opacity-60 dark:border-gray-700 shadow-lg transition-shadow hover:shadow-2xl"
    >
      <div class="p-6">
        <div class="flex flex-row justify-between items-center">
          <div class="my-2">
            <FolderIcon class="w-10 h-10 text-indigo-800"></FolderIcon>
          </div>
          <div class="flex flex-row justify-between">
<!--             <div class="mx-1">
              <a
                class="text-sm text-gray-500 transition hover:text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
                :href="projectHref"
                ><span class="sr-only"></span
                ><ExternalIcon class="w-6 h-6 text-black"
              /></a>
            </div> -->
            <div class="mx-1">
              <a
                class="text-sm text-gray-500 transition hover:text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
                :href="projectGithub"
                ><span class="sr-only">github</span
                ><GithubIcon class="w-10 h-10 text-black" />
              </a>
            </div>
          </div>
        </div>
        <h2 class="text-2xl font-bold leading-8 tracking-tight mb-3 flex items-center gap-2">
          {{ projectTitle }}
          <span v-if="visibility === 'private'" class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Private</span>
          <span v-else-if="visibility === 'public'" class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Public</span>
          <span v-if="current" class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Current</span>
        </h2>
        <p class="prose text-gray-500 max-w-none dark:text-gray-400 mb-3">
          {{ projectDescription }}
        </p>
        <div class="flex flex-row justify-between">
          <div class="text-gray-400 text-sm font-extralight">
            <span v-for="(tech, idx) in techs" :key="idx">
              {{ tech }}<span v-if="idx < techs.length - 1"> • </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FolderIcon from "assets/icons/folder.svg?component";
import ExternalIcon from "assets/icons/external.svg?component";
import GithubIcon from "assets/icons/github_new.svg?component";
export default {
  props: ["title", "description", "href", "github", "techs", "visibility", "current"],
  components: { FolderIcon, ExternalIcon, GithubIcon },
  computed: {
    projectTitle() { return this.title; },
    projectDescription() { return this.description; },
    projectHref() { return this.href; },
    projectGithub() { return this.github; },
    techs() { return this.$props.techs || []; }
  }
};
</script>

<style></style>
