import { defineConfig } from "slidev-prerender";

export default defineConfig({
  slidevDist: "./dist",
  outDir: "./dist-prerender",
  pages: [
    {
      slug: "1",
      meta: {
        title: "いちぺーじめ",
        seoMeta: {
          ogTitle: "PAGE ONE!",
        },
      },
    },
    {
      slug: "2",
      meta: {
        title: "にぺーじめ",
        seoMeta: {
          ogTitle: "PAGE TWO!",
        },
      },
    },
    {
      slug: "3",
      meta: {
        title: "さんぺーじめ",
        seoMeta: {
          ogTitle: "PAGE THREE!",
        },
      },
    },
  ],
  port: 3030,
});
