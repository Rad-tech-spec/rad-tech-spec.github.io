<template>
  <div class="mt-8">
    <p class="mb-6 text-gray-700 dark:text-blue-100 text-lg">
      Here are the programming languages, technologies, and tools I work with — spanning backend development, DevOps automation, and AI/ML projects. These reflect both my professional experience and personal research initiatives.</p>
    <img src="../assets/icons/scrum@2x.png" alt="Skills Overview" class="w-64 h-auto rounded-lg" />
    <div
      v-for="key in Object.keys(expertises)"
      class="mt-8 md:mt-10 first:mt-0"
    >
      <h2 class="mb-2 text-xl text-gray-700 font-bold dark:text-blue-200 capitalize flex items-center gap-2">
        {{ key }}
        <span v-if="isCurrentlyExploring(key)" class="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Currently Exploring</span>
      </h2>
      <p v-if="groupDescriptions[key]" class="mb-2 text-gray-600 dark:text-blue-100">
        {{ groupDescriptions[key] }}
      </p>
      <ul class="flex flex-wrap gap-6 items-start">
        <li v-for="(expertise, index) in getGroupItems(key)" :key="`${key}-${expertise.name || index}`" class="flex flex-col items-center text-center">
          <component :is="expertise.icon" class="h-10 w-10"></component>
          <a v-if="expertiseLinks[key] && expertiseLinks[key][index]" :href="expertiseLinks[key][index].href" target="_blank" rel="noopener noreferrer"
            class="mt-2 inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:border-blue-400/60 dark:text-blue-100 dark:hover:bg-blue-800/30 dark:focus:ring-blue-300 dark:focus:ring-offset-gray-900">
            {{ expertiseLinks[key][index].label }}
            <ExternalIcon class="h-4 w-4" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ExternalIcon from "assets/icons/external.svg?component";
import author from "@/data/author.js";
const expertises = author.expertises;

function isCurrentlyExploring(key) {
  const group = expertises[key];
  return group && typeof group === 'object' && group.currentlyExploring === true;
}

function getGroupItems(key) {
  const group = expertises[key];
  if (Array.isArray(group)) return group;
  if (group && Array.isArray(group.items)) return group.items;
  return [];
}
const expertiseLinks = computed(() => {
  return Object.keys(expertises).reduce((acc, key) => {
    const group = expertises[key];
    const items = getGroupItems(key);

    acc[key] = items.map((item) => {
      let link = null;
      let label = null;

      if (item && typeof item === "object") {
        if (typeof item.link === "string" && item.link.length > 0) {
          link = item.link;
        }
        if (typeof item.linkLabel === "string" && item.linkLabel.length > 0) {
          label = item.linkLabel;
        }
      }

      if (!link && group && typeof group === "object" && !Array.isArray(group)) {
        if (typeof group.link === "string" && group.link.length > 0) {
          link = group.link;
        }
        if (typeof group.linkLabel === "string" && group.linkLabel.length > 0) {
          label = group.linkLabel;
        }
      }

      if (link) {
        return {
          href: link,
          label: label || (item && item.name ? "Learn more about " + item.name : "Learn more about " + key),
        };
      }

      return null;
    });

    return acc;
  }, {});
});
// To add descriptions for each group, update the object below
const groupDescriptions = {
  "Programming Languages": "Core languages I use for backend, scripting, and database interaction, with a strong foundation in OOP, functional programming, and data structures.",
  "AI & LLM": "Exploring conversational AI, RAG pipelines, and LangChain workflows. Primarily using Microsoft Teams 365 tools to build multi-agent chatbots that enhance productivity. Using FastAPI and function calling to build modular backends that support multi-agent orchestration and scalable chatbot interactions.",
  "Backend & Databases": "Technologies I use to build scalable backend services and manage structured and unstructured data. Familiar with RESTful APIs, GraphQL, and relational models and NoSQL databases.",
  "Cloud & DevOps": "Hands-on with IaC, containerization, and CI/CD pipelines for scalable systems. Experienced with AWS services like EC2, S3, RDS, Aurora, and Lambda.",
  "Version Control & Collaboration": "Tools that support source code management, team collaboration, and streamlined project workflows."
};
</script>
