# Plugins Overview

## What are Plugins?

Plugins are JavaScript functions that allow you to customize the HTML output after it has been captured and processed. They provide a powerful way to inject custom content, modify HTML structure, or add additional functionality to your pre-rendered slides.

::: tip
This page provides a high-level overview of the plugin system. For detailed API documentation and examples, see [Plugins Reference](/reference/plugins).
:::

## How Plugins Work

After Slidev Prerender captures the HTML for a slide and applies the configured metadata, it executes all registered plugins in sequence.

### Basic Flow

1. HTML is captured from the rendered slide
2. Configuration is applied
3. Each plugin processes the HTML
4. Final HTML is saved

### Plugin Function Signature

Each plugin is a function that:

- **Receives** the current HTML as a string, along with configuration and context
- **Processes** the HTML in any way you need
- **Returns** the modified HTML string

```typescript
function myPlugin(
  html: string,
  pageConfig: PageConfig,
  pageIndex: number,
  logger: ConsolaInstance
): string {
  // Modify html
  return html;
}
```

## Sequential Processing

When multiple plugins are registered, they are executed in the order they appear in your configuration:

```typescript
export default defineConfig({
  plugins: [
    plugin1, // Executes first
    plugin2, // Receives output from plugin1
    plugin3, // Receives output from plugin2
  ],
});
```

This sequential processing (similar to `reduce`) allows you to build complex transformations by chaining simple plugins together.

## Common Use Cases

Plugins are useful for:

- **Metadata**: Insert additional meta tags
- **Analytics**: Inject tracking scripts like Google Analytics
- And more...

## Example

Here's a simple example of adding Google Analytics:

```typescript
import { defineConfig } from "slidev-prerender";

export default defineConfig({
  plugins: [
    (html) => {
      const analytics = `
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_ID');
        </script>
      `;
      return html.replace('</head>', `${analytics}</head>`);
    },
  ],
});
```

## Next Steps

- Learn more about the plugin API in [Plugins Reference](/reference/plugins)
- Understand the full [Build Process](/core-feature/build-process)
