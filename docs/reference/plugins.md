# Plugins Reference

## Plugin Function Signature

A plugin is a function with the following signature:

```typescript
type PluginFunction = (
  html: string,
  pageConfig: PageConfig,
  pageIndex: number,
  logger: ConsolaInstance
) => string | Promise<string>;
```

## Parameters

### `html`

- **Type**: `string`
- **Description**: The current HTML content of the slide after configuration has been applied

This is the complete HTML string including the `<!doctype html>` declaration and all content. You can modify this string and return the modified version.

### `pageConfig`

- **Type**: `PageConfig`
- **Description**: The configuration object for the current page being processed. See [Configuration Reference](../reference/configuration.md) for details.

Example:

```typescript
{
  slug: "introduction",
  meta: {
    title: "Introduction",
    description: "Welcome to the presentation"
  }
}
```

### `pageIndex`

- **Type**: `number`
- **Description**: The zero-based index of the current page in the `pages` array

Useful for:

- Conditional processing based on slide position
- Generating slide numbers
- One-time operations (e.g., only on the first slide)

Example:

```typescript
if (pageIndex === 0) {
  // Special handling for first slide
}
```

### `logger`

- **Type**: `ConsolaInstance`
- **Description**: A logger instance for outputting messages

Available methods:

- `logger.info()`: Informational messages
- `logger.success()`: Success messages
- `logger.warn()`: Warning messages
- `logger.error()`: Error messages
- `logger.debug()`: Debug messages

Each plugin gets a tagged logger (e.g., `plugin-0`, `plugin-1`) for easy identification.

Example:

```typescript
logger.info("Processing slide with custom plugin");
logger.success("Custom meta tag added");
```

## Return Value

### Synchronous Plugins

Return the modified HTML string:

```typescript
function myPlugin(html: string): string {
  return html.replace('</head>', '<meta name="custom" content="value"></head>');
}
```

### Asynchronous Plugins

You can also return a Promise for async operations:

```typescript
async function myAsyncPlugin(html: string): Promise<string> {
  const data = await fetchSomeData();
  return html.replace('</head>', `<script>window.data = ${JSON.stringify(data)}</script></head>`);
}
```

## Complete Example

```typescript
import { defineConfig } from "slidev-prerender";

export default defineConfig({
  plugins: [
    // Simple synchronous plugin
    (html, pageConfig, pageIndex, logger) => {
      logger.info(`Processing slide ${pageIndex + 1}: ${pageConfig.slug}`);

      // Add custom meta tag
      const customMeta = '<meta name="slide-id" content="' + pageConfig.slug + '">';
      return html.replace('</head>', `${customMeta}</head>`);
    },

    // Plugin with conditional logic
    (html, pageConfig, pageIndex, logger) => {
      if (pageIndex === 0) {
        logger.info("Adding special content for first slide");
        const banner = '<div class="first-slide-banner">Welcome!</div>';
        return html.replace('<body>', `<body>${banner}`);
      }
      return html;
    },

    // Async plugin
    async (html, pageConfig, pageIndex, logger) => {
      try {
        logger.info("Fetching external data...");
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();

        logger.success("Data fetched successfully");
        const script = `<script>window.slideData = ${JSON.stringify(data)};</script>`;
        return html.replace('</body>', `${script}</body>`);
      } catch (error) {
        logger.error("Failed to fetch data:", error);
        return html; // Return unchanged on error
      }
    },
  ],
});
```

## Best Practices

### 1. Handle Errors Gracefully

Always return valid HTML, even if something goes wrong:

```typescript
(html, config, index, logger) => {
  try {
    // Your transformation
    return modifiedHtml;
  } catch (error) {
    logger.error("Plugin error:", error);
    return html; // Return original HTML on error
  }
}
```

### 2. Use the Logger

Help with debugging by logging important operations:

```typescript
logger.info("Starting custom processing");
logger.success("Meta tags injected");
logger.warn("Missing configuration, using defaults");
```

### 3. Be Careful with Replacements

When modifying HTML, ensure your replacements are safe:

```typescript
// Good: Specific, unlikely to match unintended content
html.replace('</head>', customContent + '</head>')

// Bad: Could match in script content or text
html.replace('MyApp', 'NewName')
```

### 4. Consider Order

Remember plugins execute sequentially. Place plugins that need to run first earlier in the array:

```typescript
plugins: [
  cleanupPlugin,      // Runs first
  injectMetaPlugin,   // Runs second
  analyticsPlugin,    // Runs last
]
```

## See Also

- [Plugins Overview](/guide/plugins) - High-level introduction to plugins
- [Configuration](/reference/configuration) - Full configuration reference
