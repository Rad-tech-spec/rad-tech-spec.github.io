<template>
  <section
    class="w-full rounded-2xl border border-edge/80 bg-surface/90 supports-[backdrop-filter]:bg-surface/45 backdrop-blur-3xl backdrop-saturate-[1.8] p-6 ring-1 ring-[rgb(var(--c-shadow)/0.14)] shadow-xl shadow-[rgb(var(--c-shadow)/0.16)] md:w-72"
  >
    <h2 class="font-display text-xl font-bold tracking-tight text-ink">Let's talk</h2>
    <!-- &lt; is escaped so the template parser doesn't read it as a tag start. -->
    <p class="mt-1.5 text-sm leading-relaxed text-ink-soft">
      Typical response &lt; 24h
    </p>

    <!-- idle -->
    <button
      v-if="state === 'idle'"
      type="button"
      class="mt-5 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent-contrast transition-colors hover:bg-accent-deep"
      @click="reveal"
    >
      Show contacts
    </button>

    <!-- checking -->
    <div
      v-else-if="state === 'checking'"
      class="mt-5 flex items-center gap-2.5 text-sm text-ink-muted"
      role="status"
    >
      <span class="cc-spinner" aria-hidden="true"></span>
      <span>{{ checkLine }}</span>
    </div>

    <!-- revealed -->
    <dl v-else class="mt-5 divide-y divide-line/70 border-t border-line/70">
      <div
        v-for="(item, i) in revealed"
        :key="item.id"
        class="cc-row flex items-baseline justify-between gap-3 py-3"
        :style="{ animationDelay: `${i * 80}ms` }"
      >
        <dt class="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {{ item.label }}
        </dt>
        <dd class="min-w-0">
          <a
            :href="item.href"
            class="group inline-flex items-center gap-1 break-all text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            {{ item.text }}
            <svg
              class="h-3 w-3 shrink-0 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </dd>
      </div>
    </dl>
  </section>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import contact from "@/data/contact.js";

const state = ref("idle");
const revealed = ref([]);
const checkLine = ref("");

const lines = ["Checking you're not a crawler…", "Assembling details…"];
const timers = [];

function decode(value) {
  // atob is browser-only, which is the point: the decoded string never exists
  // during SSR, so it can't end up in the served HTML.
  return typeof atob === "function" ? atob(value) : "";
}

function reveal() {
  state.value = "checking";
  checkLine.value = lines[0];

  timers.push(setTimeout(() => (checkLine.value = lines[1]), 900));

  timers.push(
    setTimeout(() => {
      revealed.value = contact.entries
        .filter((entry) => entry.enabled)
        .map((entry) => {
          const text = decode(entry.value);
          return { id: entry.id, label: entry.label, text, href: entry.href(text) };
        });
      state.value = "done";
    }, 1700)
  );
}

onBeforeUnmount(() => timers.forEach(clearTimeout));
</script>

<style scoped>
.cc-spinner {
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  border-radius: 9999px;
  border: 2px solid rgb(var(--c-accent) / 0.25);
  border-top-color: rgb(var(--c-accent));
  animation: cc-spin 0.7s linear infinite;
}

@keyframes cc-spin {
  to {
    transform: rotate(360deg);
  }
}

.cc-row {
  animation: cc-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes cc-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cc-spinner {
    animation-duration: 2s;
  }

  .cc-row {
    animation: none;
  }
}
</style>
