import { computed, onMounted, onUnmounted } from "vue";

const STORAGE_KEY = "theme";

/**
 * Dark mode state.
 *
 * The `dark` class is first applied by the inline head script in nuxt.config,
 * before paint — this composable only keeps it in sync afterwards. Doing it
 * here alone would flash the light theme on every load for dark-mode users.
 */
export function useTheme() {
  // useState gives one shared value across every component that calls this.
  const preference = useState("theme-preference", () => "system");
  const systemPrefersDark = useState("theme-system-dark", () => false);

  const isDark = computed(() =>
    preference.value === "system" ? systemPrefersDark.value : preference.value === "dark"
  );

  function apply() {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", isDark.value);
  }

  function setPreference(next) {
    preference.value = next;
    if (typeof localStorage !== "undefined") {
      if (next === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    }
    apply();
  }

  function toggle() {
    setPreference(isDark.value ? "light" : "dark");
  }

  onMounted(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    systemPrefersDark.value = media.matches;

    const stored = localStorage.getItem(STORAGE_KEY);
    preference.value = stored === "light" || stored === "dark" ? stored : "system";

    // Follow the OS if the visitor hasn't chosen explicitly.
    const onChange = (event) => {
      systemPrefersDark.value = event.matches;
      if (preference.value === "system") apply();
    };
    media.addEventListener("change", onChange);
    onUnmounted(() => media.removeEventListener("change", onChange));

    apply();
  });

  return { preference, isDark, toggle, setPreference };
}
