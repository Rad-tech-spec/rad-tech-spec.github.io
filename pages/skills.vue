<template>
  <div class="dark:bg-gray-900 mt-6">
    <div class="max-w-screen-lg md:flex mx-auto dark:bg-gray-900">
      <div class="md:w-1/3 p-2 md:flex md:justify-center">
        <AuthorCard />
      </div>
      <div class="md:w-2/3 px-8">
        <Expertise></Expertise>
      </div>
    </div>
  </div>
</template>

<script setup>
import Expertise from '@/components/Expertise.vue';
</script>
