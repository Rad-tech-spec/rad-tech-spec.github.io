<template>
  <div class="mb-6">
    <h2
      class="mt-6 text-4xl text-gray-700 font-bold capitalize dark:text-blue-200"
    >
      {{ intro.title }}
    </h2>
    <ContentRenderer class="prose mt-8 mb-4 dark:bg-gray-800 dark:text-blue-200 text-left" :value="intro">
      <template #empty>
        <p>No content found.</p>
      </template>
    </ContentRenderer>
  </div>
</template>

<script setup>
const {data: intro} = await useAsyncData('intro', () => queryContent("/author")
    .where({
      page: "intro"
    })
    .findOne(), {
      server: true, // cache on server
      default: () => ({}),
      transform: data => data,
      watch: false, // don't refetch unless page reloads
      pick: ['title', 'body', 'page'], // only pick needed fields
      extractPayload: true // enable Nuxt payload extraction for faster client navigation
    }
);
</script>
