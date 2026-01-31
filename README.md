<h1 align="center">Slidev Prerender</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/slidev-prerender"><img src="https://img.shields.io/npm/v/slidev-prerender.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/slidev-prerender"><img src="https://img.shields.io/npm/dm/slidev-prerender.svg" alt="npm downloads"></a>
  <a href="https://github.com/petaxa/slidev-prerender/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license"></a>
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

## ⚙️ Configuration

Create a `slidev-prerender.config.ts` file in your project root:

```typescript
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
      slug: "1",
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
      slug: "2",
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

### Configuration Options

#### `UserConfig`

| Option       | Type            | Default              | Description                                  |
| ------------ | --------------- | -------------------- | -------------------------------------------- |
| `slidevDist` | `string`        | `"./dist"`           | Path to your Slidev build output directory   |
| `outDir`     | `string`        | `"./dist-prerender"` | Output directory for pre-rendered pages      |
| `port`       | `number`        | `4173`               | Port for the local server during rendering   |
| `pages`      | `PageConfig[]`  | `[]`                 | Configuration for individual slides          |
| `plugins`    | `PluginFunction[]` | `[]`              | Array of plugins to transform HTML output    |

#### `PageConfig`

| Option     | Type               | Description                                                  |
| ---------- | ------------------ | ------------------------------------------------------------ |
| `slug`     | `string` (required) | Slide file name without extension (e.g., "1", "2", "3")      |
| `meta`     | `BuildHeadOptions` | Metadata configuration for the slide (optional)              |

#### `BuildHeadOptions`

| Option        | Type               | Description                                      |
| ------------- | ------------------ | ------------------------------------------------ |
| `lang`        | `string`           | Language attribute for the HTML element          |
| `title`       | `string`           | Page title (appears in browser tab)              |
| `description` | `string`           | Meta description for the page                    |
| `canonicalUrl`| `string`           | Canonical URL for the page                       |
| `ogImage`     | `string`           | Default Open Graph image URL                     |
| `twitterCard` | `string`           | Twitter Card type (e.g., "summary_large_image")  |
| `favicon`     | `string`           | Favicon URL                                      |
| `webFonts`    | `ResolvableLink[]` | Web font links                                   |
| `seoMeta`     | `SEOMeta`          | SEO and social media metadata (optional)         |

#### `SEOMeta`

| Option                | Type     | Description                                       |
| --------------------- | -------- | ------------------------------------------------- |
| `ogTitle`             | `string` | Open Graph title                                  |
| `ogDescription`       | `string` | Open Graph description                            |
| `ogImage`             | `string` | Open Graph image URL                              |
| `ogUrl`               | `string` | Open Graph URL                                    |
| `twitterCard`         | `string` | Twitter Card type (e.g., "summary_large_image")   |
| `twitterTitle`        | `string` | Twitter title                                     |
| `twitterDescription`  | `string` | Twitter description                               |
| `twitterImage`        | `string` | Twitter image URL                                 |
| `twitterUrl`          | `string` | Twitter URL                                       |

### Plugins

Plugins allow you to transform the generated HTML for each slide. You can use plugins to inject custom scripts, modify content, or add analytics tracking.

```typescript
import { defineConfig } from "slidev-prerender";

export default defineConfig({
  plugins: [
    // Example: Add Google Analytics
    async (html, pageConfig, pageIndex, logger) => {
      logger.info(`Processing slide ${pageIndex + 1}: ${pageConfig.slug}`);

      const analyticsScript = `
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        </script>
      `;

      return html.replace('</head>', `${analyticsScript}</head>`);
    },

    // Example: Add custom meta tag
    (html) => {
      return html.replace(
        '</head>',
        '<meta name="custom-tag" content="custom-value" /></head>'
      );
    },
  ],
});
```

#### Plugin Function Signature

```typescript
type PluginFunction = (
  html: string,           // Current HTML content
  pageConfig: PageConfig, // Configuration for the current page
  pageIndex: number,      // Zero-based index of the page
  logger: ConsolaInstance // Logger instance for output
) => string | Promise<string>;
```

For more details on plugins, see the [Plugins Guide](./docs/guide/plugins.md) and [Plugins Reference](./docs/reference/plugins.md).

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
