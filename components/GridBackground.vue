<template>
  <div class="grid-bg" aria-hidden="true">
    <!--
      Lines and beams live inside a masked wrapper so both fade out toward the
      page edges together. The white canvas stays on the outer element, since
      masking it would punch holes through to whatever sits behind.
    -->
    <div class="grid-bg__fade">
      <div class="grid-bg__lines"></div>

      <!--
        Beams are randomised per-instance, so rendering them during SSR would
        produce different values on the client and trip a hydration mismatch.
        ClientOnly keeps the static grid server-rendered and defers just these.
      -->
      <ClientOnly>
        <div
          v-for="beam in beams"
          :key="beam.key"
          class="grid-bg__beam"
          :class="beam.horizontal ? 'grid-bg__beam--h' : 'grid-bg__beam--v'"
          :style="beamStyle(beam)"
          @animationend="respawn(beam.id)"
        ></div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

// Must match --grid-size in the stylesheet so beams land on the lines.
const GRID = 88;
const BEAM_COUNT = 10;

const beams = ref([]);

function makeBeam(id) {
  const horizontal = Math.random() < 0.5;
  // A horizontal beam travels along x, so it sits on one of the horizontal
  // lines — i.e. its offset is measured down the viewport height.
  const span = horizontal ? window.innerHeight : window.innerWidth;
  const lineCount = Math.max(1, Math.floor(span / GRID));

  return {
    id,
    // Changing the key remounts the node, which restarts the CSS animation.
    key: `${id}-${Math.random().toString(36).slice(2)}`,
    horizontal,
    offset: Math.floor(Math.random() * lineCount) * GRID,
    length: 160 + Math.random() * 200,
    duration: 5 + Math.random() * 7,
    delay: Math.random() * 8,
    reverse: Math.random() < 0.5,
  };
}

function beamStyle(beam) {
  const shared = {
    animationDuration: `${beam.duration}s`,
    animationDelay: `${beam.delay}s`,
    animationDirection: beam.reverse ? "reverse" : "normal",
  };

  return beam.horizontal
    ? { ...shared, top: `${beam.offset}px`, width: `${beam.length}px` }
    : { ...shared, left: `${beam.offset}px`, height: `${beam.length}px` };
}

// Each beam runs once, then respawns somewhere else — that's what keeps the
// pulses landing on random lines instead of looping in fixed places.
function respawn(id) {
  const index = beams.value.findIndex((beam) => beam.id === id);
  if (index !== -1) beams.value[index] = makeBeam(id);
}

onMounted(() => {
  beams.value = Array.from({ length: BEAM_COUNT }, (_, i) => makeBeam(i));
});
</script>

<style scoped>
.grid-bg {
  /* All three follow the theme tokens, so dark mode needs no override here. */
  --grid-size: 88px;
  --grid-canvas: rgb(var(--c-canvas));
  --grid-line: rgb(var(--c-line-soft));
  --grid-beam: rgb(var(--c-grid-beam));

  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background-color: var(--grid-canvas);
  pointer-events: none;
}

.grid-bg__fade {
  position: absolute;
  inset: 0;
  /* Strong through the middle, gone by the edges. */
  -webkit-mask-image: radial-gradient(
    ellipse 80% 70% at 50% 45%,
    #000 35%,
    rgba(0, 0, 0, 0.35) 70%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse 80% 70% at 50% 45%,
    #000 35%,
    rgba(0, 0, 0, 0.35) 70%,
    transparent 100%
  );
}

.grid-bg__lines {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
}

.grid-bg__beam {
  position: absolute;
  opacity: 0;
  will-change: transform;
}

.grid-bg__beam--h {
  left: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--grid-beam), transparent);
  animation-name: beam-h;
  animation-timing-function: linear;
}

.grid-bg__beam--v {
  top: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, var(--grid-beam), transparent);
  animation-name: beam-v;
  animation-timing-function: linear;
}

@keyframes beam-h {
  0% {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
  12%,
  88% {
    opacity: 1;
  }
  100% {
    transform: translate3d(100vw, 0, 0);
    opacity: 0;
  }
}

@keyframes beam-v {
  0% {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }
  12%,
  88% {
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 100vh, 0);
    opacity: 0;
  }
}

/* Static grid only for anyone who has asked the OS to reduce motion. */
@media (prefers-reduced-motion: reduce) {
  .grid-bg__beam {
    display: none;
  }
}
</style>
