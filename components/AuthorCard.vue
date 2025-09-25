<template>
  <div class="md:fixed">
    <div class="md:block flex justify-center items-center">
      <nuxt-img
        :src="author.author_image"
        loading="lazy"
        alt="me"
        class="shadow-xl md:h-60 md:w-60 h-40 w-40 rounded-full"
      />
      <div class="mb-2 mx-7 mt-4 justify-center items-center">
        <h1
          class="md:text-3xl text-2xl text-gray-800 font-bold dark:text-blue-100"
        >
          {{ author.name }}
        </h1>
        <div class="md:text-lg text-gray-600 dark:text-blue-100">
          {{ author.position }}
        </div>
      </div>
    </div>

    <div class="mx-7 mt-3 flex flex-wrap items-center justify-center gap-3 md:hidden">
      <a
        v-for="contact in contactLinks"
        :key="`mobile-${contact.id}`"
        :href="contact.href"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:border-blue-400/50 dark:bg-slate-800 dark:text-blue-100 dark:hover:bg-blue-700/40 dark:focus:ring-blue-300"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="contact.label"
      >
        <component :is="contact.icon" class="h-5 w-5" />
      </a>
    </div>

    <div class="mx-7 hidden md:flex md:flex-col md:gap-2">
      <div class="my-2 text-gray-600 flex items-center gap-2 dark:text-blue-100">
        <Mail />
        <a :href="`mailto:${author.email}`" class="hover:underline"> {{ author.email }}</a>
      </div>
      <div class="my-2 text-gray-600 flex items-center gap-2 dark:text-blue-100">
        <Glob />
        <p>{{ author.location }}</p>
      </div>
      <div
        v-for="social in socialLinks"
        :key="`desktop-${social.id}`"
        class="my-2 text-gray-600 flex items-center gap-2 dark:text-blue-200"
      >
        <component :is="social.icon" class="w-6 h-6" />
        <a
          :href="social.href"
          class="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ social.display }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import author from "@/data/author.js";
import Mail from "assets/icons/mail.svg?skipsvgo";
import Glob from "assets/icons/glob.svg?skipsvgo";
import Github from "assets/icons/github_new.svg?skipsvgo";
import LinkedIn from "assets/icons/linkeding.svg?skipsvgo";
import Youtube from "assets/icons/youtube.svg?skipsvgo";
import Medium from "assets/icons/medium.svg?skipsvgo";

const contactLinks = [
  {
    id: "email",
    label: "Email",
    display: author.email,
    href: `mailto:${author.email}`,
    icon: Mail,
  },
  {
    id: "github",
    label: "GitHub",
    display: author.socials.github,
    href: `https://github.com/${author.socials.github}`,
    icon: Github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    display: author.socials.linkedin,
    href: `https://linkedin.com/in/${author.socials.linkedin}`,
    icon: LinkedIn,
  },
  {
    id: "medium",
    label: "Medium",
    display: author.socials.medium,
    href: `https://medium.com/@${author.socials.medium}`,
    icon: Medium,
  },
  {
    id: "youtube",
    label: "YouTube",
    display: author.socials.youtube,
    href: `https://youtube.com/${author.socials.youtube}`,
    icon: Youtube,
  },
];

const socialLinks = contactLinks.filter((link) => link.id !== "email");
</script>
