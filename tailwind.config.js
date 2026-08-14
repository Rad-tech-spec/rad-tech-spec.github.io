module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./composables/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Inter for reading, Space Grotesk for headings — loaded in nuxt.config.
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Space Grotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      /*
       * All colours resolve through CSS variables defined in assets/css/main.css,
       * so one set of classes covers light and dark. Components should never
       * need a `dark:` variant for colour.
       */
      colors: {
        canvas: "rgb(var(--c-canvas) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-2": "rgb(var(--c-surface-2) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        "line-soft": "rgb(var(--c-line-soft) / <alpha-value>)",
        edge: "rgb(var(--c-edge) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          soft: "rgb(var(--c-ink-soft) / <alpha-value>)",
          muted: "rgb(var(--c-ink-muted) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--c-accent) / <alpha-value>)",
          mid: "rgb(var(--c-accent-mid) / <alpha-value>)",
          bright: "rgb(var(--c-accent-bright) / <alpha-value>)",
          deep: "rgb(var(--c-accent-deep) / <alpha-value>)",
          soft: "rgb(var(--c-accent-soft) / <alpha-value>)",
          contrast: "rgb(var(--c-accent-contrast) / <alpha-value>)",
        },
        // Kept so existing `bg-cream` / `bg-cream-nav` usages keep working.
        cream: {
          DEFAULT: "rgb(var(--c-canvas) / <alpha-value>)",
          nav: "rgb(var(--c-nav) / <alpha-value>)",
        },
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
