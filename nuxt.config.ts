// Runs before first paint so a dark-mode visitor never sees a flash of the
// cream theme. Must stay inline and synchronous — deferring it reintroduces
// the flash.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "nuxt-svgo", "@nuxt/image", "@nuxtjs/tailwindcss"],
  css: ["@/assets/css/main.css"],
  components: true,

  app: {
    head: {
      // Declared here, once, rather than per page. Without it the browser
      // guesses the encoding from its locale — on Windows that means
      // Windows-1252, which renders em dashes and ellipses as mojibake
      // ("—" becomes "â€”") even though the files are perfectly good UTF-8.
      //
      // Written as a meta entry rather than the `charset` shorthand: the
      // shorthand silently emits nothing on this Nuxt version. The spec wants
      // this within the first 1024 bytes of the document, so it must stay
      // ahead of the font <link>s below.
      meta: [{ charset: "utf-8" }],
      script: [{ innerHTML: themeInitScript, tagPosition: "head" }],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // preconnect first so the font request isn't queued behind DNS+TLS
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
        },
      ],
    },
  },

  content: {
    markdown: {
      anchorLinks: false,
    },
    highlight: {
      theme: "github-dark",
      langs: [
        'json',
        'js',
        'ts',
        'html',
        'css',
        'vue',
        'shell',
        'mdc',
        'md',
        'yaml',
        'c',
        'cpp',
        'java',
        'javascript'
      ]
    }
  },

  compatibilityDate: '2025-09-19',
})
