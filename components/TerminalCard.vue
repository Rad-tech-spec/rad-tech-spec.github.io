<template>
  <div
    class="overflow-hidden rounded-2xl border border-edge/70 bg-surface-2/90 supports-[backdrop-filter]:bg-surface-2/75 backdrop-blur-2xl ring-1 ring-[rgb(var(--c-shadow)/0.14)] shadow-xl shadow-[rgb(var(--c-shadow)/0.16)]"
  >
    <!--
      A screen reader would otherwise hear every keystroke as the text mutates,
      so the animated view is hidden from the a11y tree and this static copy
      carries the same content.
    -->
    <div class="sr-only">
      <p v-for="(line, i) in terminal.lines" :key="`sr-${i}`">
        {{ line.cmd }} — {{ stripEmphasis(line.out) }}
      </p>
    </div>

    <div aria-hidden="true">
      <div
        class="flex items-center gap-[7px] border-b border-line bg-surface/60 px-4 py-2.5"
      >
        <span class="h-[11px] w-[11px] rounded-full bg-[#d9a08c]"></span>
        <span class="h-[11px] w-[11px] rounded-full bg-[#ddc493]"></span>
        <span class="h-[11px] w-[11px] rounded-full bg-[#b9c8a4]"></span>
        <span class="ml-2 font-mono text-xs text-ink-muted">{{ terminal.title }}</span>
      </div>

      <div class="px-5 pb-6 pt-4 font-mono text-[13px] leading-[1.75] text-ink-soft">
        <div v-for="(line, i) in state" :key="i">
          <p class="whitespace-pre-wrap">
            <span class="mr-2 font-bold text-accent-mid">$</span><span class="text-ink">{{ line.typed }}</span>
          </p>
          <p v-if="line.outVisible" class="whitespace-pre-wrap pl-[18px] text-ink-muted">
            <template v-for="(seg, j) in parseEmphasis(line.out)" :key="j">
              <strong v-if="seg.strong" class="font-semibold text-accent">{{ seg.text }}</strong>
              <span v-else>{{ seg.text }}</span>
            </template>
          </p>
        </div>

        <p>
          <span class="mr-2 font-bold text-accent-mid">$</span>
          <span class="term-cursor"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import terminal from "@/data/terminal.js";

// Server-render every line complete: the content must be in the HTML for
// crawlers and for anyone without JS, exactly like the timeline.
const state = ref(
  terminal.lines.map((line) => ({ typed: line.cmd, out: line.out, outVisible: true }))
);

let cancelled = false;
const timers = [];

function wait(ms) {
  return new Promise((resolve) => timers.push(setTimeout(resolve, ms)));
}

function stripEmphasis(text) {
  return (text || "").replace(/\*/g, "");
}

// Split "plain *strong* plain" into runs. Avoids v-html entirely.
function parseEmphasis(text) {
  return (text || "")
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith("*") && chunk.endsWith("*")
        ? { text: chunk.slice(1, -1), strong: true }
        : { text: chunk, strong: false }
    );
}

async function play() {
  for (let i = 0; i < terminal.lines.length; i++) {
    const source = terminal.lines[i];

    for (let c = 0; c < source.cmd.length; c++) {
      if (cancelled) return;
      state.value[i].typed = source.cmd.slice(0, c + 1);
      await wait(38);
    }

    if (cancelled) return;
    await wait(260);
    state.value[i].outVisible = true;
    await wait(420);
  }
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Rewind to empty, then type it out.
  state.value = terminal.lines.map((line) => ({
    typed: "",
    out: line.out,
    outVisible: false,
  }));

  play();
});

onBeforeUnmount(() => {
  cancelled = true;
  timers.forEach(clearTimeout);
});
</script>

<style scoped>
.term-cursor {
  display: inline-block;
  width: 7px;
  height: 15px;
  vertical-align: -3px;
  background: rgb(var(--c-accent-mid));
  animation: term-blink 1s step-end infinite;
}

@keyframes term-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .term-cursor {
    animation: none;
  }
}
</style>
