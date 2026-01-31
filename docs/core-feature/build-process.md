# Build Process

## Overview

Slidev Prerender follows a systematic process to convert your Slidev presentation into pre-rendered multiple HTML files. Understanding this process helps you optimize your configuration and debug issues.

## Step-by-Step Process

### 1. Copy Build Artifacts

The process begins by copying all files from your Slidev build output directory (`slidevDist`) to the output directory (`outDir`).

```txt
dist/ → dist-prerender/
```

This includes:

- JavaScript bundles
- CSS stylesheets
- Images and other assets
- Font files

This ensures all assets are available in the final output directory.

### 2. Start Local Server

A local HTTP server is started to serve the Slidev build artifacts. By default, this runs on port `4173`.

```txt
http://localhost:4173
```

This server is necessary because Slidev presentations require JavaScript execution to render properly.

### 3. Navigate and Capture HTML

For each page configuration in your `pages` array:

1. **Navigate**: The browser navigates to the slide URL (e.g., `http://localhost:4173/1`)
1. **Capture**: Extract the complete HTML content from the rendered page

### 4. Apply Configuration

The captured HTML is then processed:

- Apply metadata from the page configuration (`meta` property)
  - Inject title, description, and other meta tags
- Add Open Graph and Twitter Card tags
- Set canonical URLs and other SEO elements

### 5. Execute Plugins

All configured plugins are executed in order:

```typescript
plugins.forEach((plugin) => {
  html = plugin(html, pageConfig, pageIndex, logger);
});
```

Each plugin receives:

- The current HTML string
- The page configuration
- The page index
- A logger instance

Plugins can modify the HTML and return the updated version.

### 6. Save HTML File

The processed HTML is saved to the output directory:

```text
dist-prerender/1.html
dist-prerender/2.html
...
```

The filename is determined by the `slug` property in your page configuration.

### 7. Repeat for All Pages

Steps 3-6 are repeated for each page defined in your `pages` configuration array.
