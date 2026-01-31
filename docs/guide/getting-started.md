# Getting Started

## Installation

```bash
# npm
npm install -D slidev-prerender

# pnpm
pnpm add -D slidev-prerender

# yarn
yarn add -D slidev-prerender
```

## Prepare config file

Slidev-prerender will resolve a config file named `slidev-prerender.config.[ts | js]`.
The config file allows you to configure the input/output directories and customize meta tags for each slide, such as titles, descriptions, and social media preview settings.
Add configuration for each slide to the `pages` array in order.

```ts
import { defineConfig } from "slidev-prerender";

export default defineConfig({
  // Directory where Slidev built files are located
  slidevDist: "./dist",

  // Output directory for pre-rendered pages
  outDir: "./dist-prerender",

  // Port to use for the local server during rendering (default: 4173)
  port: 4173,

  // Configuration for individual pages
  pages: [
    {
      slug: "title",
      meta: {
        title: "Welcome to My Presentation",
        description: "An introduction to the main topics",
        seoMeta: {
          ogTitle: "Welcome to My Presentation",
          ogDescription: "An introduction to the main topics",
          ogImage: "https://example.com/slide1.png",
          twitterCard: "summary_large_image",
        },
      },
    },
    {
      slug: "key-concepts",
      meta: {
        title: "Understanding the Key Concepts",
        description: "Deep dive into the core ideas",
        seoMeta: {
          ogTitle: "Understanding the Key Concepts",
          ogDescription: "Deep dive into the core ideas",
        },
      },
    },
    // Add more pages as needed
  ],
});
```

## Prerender your slide

First, build your Slidev presentation using the standard build command.

```bash
pnpm build
# "build": "slidev build"
```

Then run the `slidev-prerender` command to generate pre-rendered HTML files.
We recommend adding this command to your `package.json` scripts for convenience.

```json: package.json
{
  "name": "your-slide",
  ...
  "scripts": {
    "build": "slidev build",
    "dev": "slidev --open",
    "export": "slidev export",
    "preview": "serve dist",
    "preview:prerender": "serve dist-prerender",
    "prerender": "slidev-prerender"
  },
  ...
}
```

Once the `slidev-prerender` command completes, the build output will be stored in the specified directory (default: `./dist-prerender`).

## Deploy

You can deploy the pre-rendered site using the same deployment process as Slidev, simply pointing to the Slidev Prerender output folder instead.

For detailed deployment instructions, refer to [Slidev - Building and Hosting](https://sli.dev/guide/hosting).
