import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Slidev Prerender",
  description: "Pre-render your Slidev presentations",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "guide/getting-started" },
      { text: "Core Feature", link: "core-feature/why-slidev-prerender" },
      { text: "Reference", link: "reference/configuraiton" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Plugins", link: "/guide/plugins" },
        ],
      },
      {
        text: "Core Feature",
        items: [
          { text: "Why Slidev Prerender", link: "/core-feature/why-slidev-prerender" },
          { text: "Build Process", link: "/core-feature/build-process" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "Configuration", link: "/reference/configuration" },
          { text: "Plugins", link: "/reference/plugins" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
