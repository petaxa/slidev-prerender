# Configuration reference

## `UserConfig`

| Option       | Type               | Default              | Description                                  |
| ------------ | ---------------    | -------------------- | -------------------------------------------- |
| `slidevDist` | `string`           | `"./dist"`           | Path to your Slidev build output directory   |
| `outDir`     | `string`           | `"./dist-prerender"` | Output directory for pre-rendered pages      |
| `port`       | `number`           | `4173`               | Port for the local server during rendering   |
| `pages`      | `PageConfig[]`     | `[]`                 | Configuration for individual slides          |
| `plugins`    | `PluginFunction[]` | `[]`                 | Array of plugins to transform HTML output    |

## `PageConfig`

| Option     | Type                | Description                                                  |
| ---------- | ------------------  | ------------------------------------------------------------ |
| `slug`     | `string` (required) | Slide file name without extension (e.g., "1", "2", "3")      |
| `meta`     | `BuildHeadOptions`  | Metadata configuration for the slide (optional)              |

## `BuildHeadOptions`

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

## `SEOMeta`

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

## `PluginFunction`

A function that transforms the HTML content of each slide during the pre-rendering process.
For detailed information about plugin functions, parameters, and examples, see the [Plugins Reference](./plugins.md).
