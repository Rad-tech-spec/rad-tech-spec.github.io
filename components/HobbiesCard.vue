<template>
  <section
    class="w-full rounded-2xl border border-edge/80 bg-surface/90 supports-[backdrop-filter]:bg-surface/45 backdrop-blur-3xl backdrop-saturate-[1.8] p-6 ring-1 ring-[rgb(var(--c-shadow)/0.14)] shadow-xl shadow-[rgb(var(--c-shadow)/0.16)] md:w-72"
  >
    <h2 class="font-display text-xl font-bold tracking-tight text-ink">Off hours</h2>
    <p class="mt-1.5 text-sm text-ink-soft">When I'm away from the terminal.</p>

    <ul class="mt-5 grid grid-cols-2 gap-2.5">
      <li v-for="hobby in hobbies" :key="hobby.label">
        <div
          class="hb-tile flex h-full flex-col items-center gap-2 rounded-xl border border-line/70 bg-surface/50 px-2 py-3.5 text-center"
        >
          <!--
            Icons are inline rather than imported SVG assets: the ones in
            assets/icons ship with their own fill/stroke baked in, which is what
            made the timeline icons render black. Inline paths inherit
            currentColor cleanly.
          -->
          <svg
            class="h-5 w-5 shrink-0 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path v-for="(d, i) in icons[hobby.icon]" :key="i" :d="d" />
          </svg>
          <span class="text-xs font-medium leading-tight text-ink-soft">
            {{ hobby.label }}
          </span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import hobbies from "@/data/hobbies.js";

// Path data only — the <svg> wrapper above supplies sizing, stroke, and colour.
const icons = {
  gamepad: [
    "M6 12h4",
    "M8 10v4",
    "M15 13h.01",
    "M18 11h.01",
    "M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
  ],
  chess: [
    "M12 3.5a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5Z",
    "M9.5 10.5h5c0 2.2-1 3.3-1.4 4.4h-2.2c-.4-1.1-1.4-2.2-1.4-4.4Z",
    "M7.5 20.5c.4-2.3 1.6-3.7 2.8-5.1h3.4c1.2 1.4 2.4 2.8 2.8 5.1Z",
  ],
  dumbbell: [
    "M7 12h10",
    "M3 9.5h1.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z",
    "M19.5 9.5H21a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z",
    "M6.5 10.5h1v3h-1z",
    "M16.5 10.5h1v3h-1z",
  ],
  code: ["m16 18 6-6-6-6", "m8 6-6 6 6 6"],
};
</script>

<style scoped>
.hb-tile {
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.hb-tile:hover {
  border-color: rgb(var(--c-accent) / 0.35);
  background: rgb(var(--c-accent-soft) / 0.55);
  transform: translateY(-1px);
}

@media (prefers-reduced-motion: reduce) {
  .hb-tile,
  .hb-tile:hover {
    transition: none;
    transform: none;
  }
}
</style>
