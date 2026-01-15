<h1 align="center">Slidev Prerender</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/slidev-prerender"><img src="https://img.shields.io/npm/v/slidev-prerender.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/slidev-prerender"><img src="https://img.shields.io/npm/dm/slidev-prerender.svg" alt="npm downloads"></a>
  <a href="https://github.com/slidev-prerender/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/slidev-prerender.svg" alt="license"></a>
</p>

<p align="center">
  Pre-render your <a href="https://sli.dev">Slidev</a> presentations as Multi-Page Applications (MPA) with enhanced SEO and metadata support.
</p>

## ✨ Features

- 🎯 **MPA Generation** - Convert your Slidev presentation into multiple HTML files (one per slide)
- 🔍 **SEO Optimization** - Customize meta tags, Open Graph, and Twitter Card for each slide
- ⚡ **Static Deployment** - Deploy to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)
- 🎨 **Custom Metadata** - Set unique titles and SEO metadata for individual slides

## 📦 Installation

```bash
# npm
npm install -D slidev-prerender

# pnpm
pnpm add -D slidev-prerender

# yarn
yarn add -D slidev-prerender
```

## 🚀 Quick Start

### 1. Build your Slidev presentation

First, build your Slidev presentation:

```bash
npx slidev build
```

This will generate a `dist` folder with your Slidev build output.

### 2. Run slidev-prerender

```bash
npx slidev-prerender
```

By default, this will:

- Read from `./dist` (your Slidev build output)
- Generate pre-rendered pages in `./dist-prerender`
- Create one HTML file per slide (1.html, 2.html, 3.html, etc.)

## ⚙️ Configuration

Create a `slidev-prerender.config.ts` file in your project root:

```typescript
import { defineConfig } from "slidev-prerender";

export default defineConfig({
  // Directory where Slidev built files are located
  slidevDist: "./dist",

  // Output directory for pre-rendered pages
  outDir: "./dist-prerender",

  // Port to use for the local server during rendering (default: 3030)
  port: 3030,

  // Configuration for individual pages
  pages: [
    {
      id: "1",
      meta: {
        fileName: "Introduction - My Presentation",
        seoMeta: {
          ogTitle: "Welcome to My Presentation",
          ogDescription: "An introduction to the main topics",
          ogImage: "https://example.com/slide1.png",
          twitterCard: "summary_large_image",
        },
      },
    },
    {
      id: "2",
      meta: {
        fileName: "Key Concepts",
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

### Configuration Options

#### `UserConfig`

| Option       | Type            | Default              | Description                                  |
| ------------ | --------------- | -------------------- | -------------------------------------------- |
| `slidevDist` | `string`        | `"./dist"`           | Path to your Slidev build output directory   |
| `outDir`     | `string`        | `"./dist-prerender"` | Output directory for pre-rendered pages      |
| `port`       | `number`        | `3030`               | Port for the local server during rendering   |
| `pages`      | `PageConfig[]`  | `[]`                 | Configuration for individual slides          |

#### `PageConfig`

| Option | Type               | Description                                       |
| ------ | ------------------ | ------------------------------------------------- |
| `id`   | `string`           | Slide number or identifier (e.g., "1", "2", "3") |
| `meta` | `BuildHeadOptions` | Metadata configuration for the slide              |

#### `BuildHeadOptions`

| Option     | Type      | Description                          |
| ---------- | --------- | ------------------------------------ |
| `title`    | `string`  | Page title (appears in browser tab)  |
| `seoMeta`  | `SEOMeta` | SEO and social media metadata        |

#### `SEOMeta`

| Option                | Type     | Description                                       |
| --------------------- | -------- | ------------------------------------------------- |
| `ogTitle`             | `string` | Open Graph title                                  |
| `ogDescription`       | `string` | Open Graph description                            |
| `ogImage`             | `string` | Open Graph image URL                              |
| `ogUrl`               | `string` | Open Graph URL                                    |
| `twitterCard`         | `string` | Twitter Card type (e.g., "summary_large_image")  |
| `twitterTitle`        | `string` | Twitter title                                     |
| `twitterDescription`  | `string` | Twitter description                               |
| `twitterImage`        | `string` | Twitter image URL                                 |

## 🌐 Deployment

Deploy the generated `dist-prerender` folder like any static site:

1. Build and prerender:

   ```bash
   npx slidev build
   npx slidev-prerender
   ```

2. Upload `dist-prerender` to your host (Netlify/Vercel static export, GitHub Pages, S3+CloudFront, etc.).
3. Preview locally with any static server (e.g. `npx serve dist-prerender`).

For more details on hosting options, see the [Slidev Hosting Guide](https://sli.dev/guide/hosting#hosting).

## 🤔 Why Use This?

When you share a Slidev presentation link on social media (Twitter, Facebook, Slack, etc.), the preview often shows generic information instead of details about the specific slide. This happens because Slidev presentations are Single Page Applications (SPAs), which makes it difficult for social platforms to extract slide-specific metadata. `slidev-prerender` solves this by generating separate HTML files for each slide with custom Open Graph and Twitter Card metadata, ensuring that every slide shows rich, compelling previews when shared.

## 🛠️ How It Works

1. Reads your Slidev build output
2. Starts a local server with your presentation
3. Uses Playwright to navigate to each slide
4. Captures the rendered HTML and injects custom metadata
5. Saves each slide as a separate HTML file
6. Copies all assets (CSS, JS, images) to the output directory

## 📄 License

[MIT](LICENSE)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

If you have any questions or issues, please [open an issue](https://github.com/slidev-prerender/issues) on GitHub.

---

Made with ❤️ for the [Slidev](https://sli.dev) community
