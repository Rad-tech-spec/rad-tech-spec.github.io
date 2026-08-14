<template>
  <!-- Heading and intro copy live on the page that mounts this, so the two
       don't say the same thing twice. -->
  <section
    class="flex flex-col rounded-2xl border border-edge/80 bg-surface/90 supports-[backdrop-filter]:bg-surface/45 backdrop-blur-2xl backdrop-saturate-[1.6] p-6 ring-1 ring-[rgb(var(--c-shadow)/0.14)] shadow-xl shadow-[rgb(var(--c-shadow)/0.12)] sm:p-8"
  >
    <!--
      One fixed-height body for both states. Sizing the empty state the same as
      the transcript stops the card from jumping when the first reply lands.
    -->
    <div class="flex min-h-[50vh] flex-1 flex-col">
      <!-- Transcript. aria-live so screen readers hear replies as they land. -->
      <div
        v-if="turns.length"
        ref="logEl"
        class="max-h-[60vh] flex-1 space-y-5 overflow-y-auto pr-1"
        role="log"
        aria-live="polite"
      >
        <div v-for="(turn, i) in turns" :key="i" class="flex flex-col">
          <span
            class="font-mono text-[0.65rem] uppercase tracking-[0.14em]"
            :class="turn.role === 'user' ? 'text-ink-muted' : 'text-accent'"
          >
            {{ turn.role === 'user' ? 'you' : 'agent' }}
          </span>
          <!-- Card is wide for presence; the text column stays narrow so long
               replies don't run to unreadable line lengths. -->
          <p
            class="mt-1.5 max-w-3xl whitespace-pre-wrap leading-relaxed"
            :class="turn.error ? 'text-accent' : 'text-ink-soft'"
          >
            {{ turn.content }}
          </p>
        </div>

        <div v-if="pending" class="flex items-center gap-2 text-sm text-ink-muted">
          <span class="ac-dot" aria-hidden="true"></span>
          <span>thinking…</span>
        </div>
      </div>

      <!-- Empty state: suggested openers, vertically centred in the same space. -->
      <div v-else class="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <p class="font-mono text-sm text-ink-muted">try one of these</p>
        <ul class="flex flex-wrap justify-center gap-2">
          <li v-for="q in suggestions" :key="q">
            <button
              type="button"
              class="rounded-full border border-line/70 bg-surface/50 px-4 py-2 text-sm text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
              @click="send(q)"
            >
              {{ q }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <form
      class="mt-6 flex items-center gap-2 border-t border-line/70 pt-6"
      @submit.prevent="send()"
    >
      <label for="agent-input" class="sr-only">Ask the agent a question</label>
      <input
        id="agent-input"
        v-model="draft"
        type="text"
        autocomplete="off"
        :maxlength="MAX_CHARS"
        :disabled="pending"
        placeholder="Ask something…"
        class="min-w-0 flex-1 rounded-full border border-line/70 bg-surface/50 px-5 py-3 text-sm text-ink placeholder:text-ink-muted/70 focus:border-accent/50 focus:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        :disabled="pending || !draft.trim()"
        class="shrink-0 rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent-contrast transition-colors hover:bg-accent-deep disabled:opacity-40"
      >
        Send
      </button>
    </form>
  </section>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { AGENT_API } from "@/data/agent.js";

const MAX_CHARS = 1000;
const MAX_TURNS = 12;

const suggestions = [
  "What's his experience with AWS?",
  "Tell me about Ario",
  "Is he open to work?",
  "What did he do at ESDC?",
];

const turns = ref([]);
const draft = ref("");
const pending = ref(false);
const logEl = ref(null);

async function scrollToEnd() {
  await nextTick();
  if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight;
}

async function send(preset) {
  const text = (preset ?? draft.value).trim();
  if (!text || pending.value) return;

  if (turns.value.filter((t) => t.role === "user").length * 2 >= MAX_TURNS) {
    turns.value.push({
      role: "assistant",
      content: "That's a long conversation — refresh the page to start a new one.",
      error: true,
    });
    return;
  }

  turns.value.push({ role: "user", content: text });
  draft.value = "";
  scrollToEnd();

  // Say what's actually wrong rather than letting the fetch fail against the
  // static host, which would surface as a generic connection error.
  if (!AGENT_API) {
    turns.value.push({
      role: "assistant",
      content: "The agent isn't connected yet — its endpoint hasn't been deployed.",
      error: true,
    });
    scrollToEnd();
    return;
  }

  pending.value = true;

  try {
    const res = await fetch(AGENT_API, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        // Send only real turns — error notices are UI-side and would confuse
        // the model if replayed as assistant messages.
        messages: turns.value
          .filter((t) => !t.error)
          .map((t) => ({ role: t.role, content: t.content })),
      }),
    });

    const data = await res.json().catch(() => ({}));
    turns.value.push(
      res.ok && data.reply
        ? { role: "assistant", content: data.reply }
        : {
            role: "assistant",
            content: data.error || "Something went wrong. Try again.",
            error: true,
          }
    );
  } catch {
    turns.value.push({
      role: "assistant",
      content: "Couldn't reach the agent — check your connection and try again.",
      error: true,
    });
  } finally {
    pending.value = false;
    scrollToEnd();
  }
}
</script>

<style scoped>
.ac-dot {
  height: 7px;
  width: 7px;
  border-radius: 9999px;
  background: rgb(var(--c-accent));
  animation: ac-pulse 1.2s ease-in-out infinite;
}

@keyframes ac-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ac-dot {
    animation: none;
  }
}
</style>
