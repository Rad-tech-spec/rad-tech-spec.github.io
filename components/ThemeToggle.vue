<template>
  <button
    type="button"
    class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/60 text-ink-soft transition-colors hover:border-accent/40 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-canvas"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
    :aria-pressed="isDark"
    @click="toggle"
  >
    <!--
      Client-only: during SSR we don't know the visitor's stored preference, so
      committing to an icon here would guarantee a wrong first paint for half of
      them. The fallback keeps the button's size stable so the nav doesn't shift.
    -->
    <ClientOnly>
      <svg
        v-if="isDark"
        class="h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" /><path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" /><path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
      </svg>
      <svg
        v-else
        class="h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <template #fallback>
        <span class="h-[18px] w-[18px]" />
      </template>
    </ClientOnly>
  </button>
</template>

<script setup>
const { isDark, toggle } = useTheme();
</script>
