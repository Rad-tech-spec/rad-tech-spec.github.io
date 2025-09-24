<template>
  <div class="mt-8">
    <p class="mb-6 text-gray-700 dark:text-blue-100 text-lg">
      Here are the main programming languages, technologies, and tools I work with — from backend development and DevOps automation to AI/ML research and side projects.
    </p>
    <img src="/assets/icons/scrum@2x.png" alt="Skills Overview" class="w-64 h-auto rounded-lg" />
    <div v-for="key in Object.keys(expertises)" class="mt-2">
      <h2 class="mb-2 text-xl text-gray-700 font-bold dark:text-blue-200 capitalize flex items-center gap-2">
        {{ key }}
  <span v-if="isCurrentlyExploring(key)" class="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Currently Exploring</span>
      </h2>
      <p v-if="groupDescriptions[key]" class="mb-2 text-gray-600 dark:text-blue-100">
        {{ groupDescriptions[key] }}
      </p>
      <ul class="flex flex-wrap gap-4 items-center">
        <li v-for="expertise in getGroupItems(key)" class="flex items-center">
          <component :is="expertise.icon" class="h-10 w-10"></component>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
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
// To add descriptions for each group, update the object below
const groupDescriptions = {
  "Programming Languages": "Core languages I use for backend, scripting, and database interaction. Also experienced with concepts of OOP, functional programming, and data structures.",
  "AI & LLM": "Exploring conversational AI, RAG pipelines, and LangChain workflows. Mainly using Teams 365 tool to create multi-agent chatbots for productivity enhancement. Using FastAPI and function calling to build modular backends that support multi-agent orchestration and scalable chatbot interactions.",
  "Backend & Databases": "Technologies I use to build scalable backend services and manage structured and unstructured data. Familiar with RESTful APIs, GraphQL, and relational models and NoSQL databases.",
  "Cloud & DevOps": "Hands-on with IaC, containerization, and CI/CD pipelines for scalable systems. Experienced with AWS services like EC2, S3, RDS, Aurora, and Lambda.",
  "Version Control & Collaboration": "Tools that support source code management, team collaboration, and streamlined project workflows."
};
</script>
