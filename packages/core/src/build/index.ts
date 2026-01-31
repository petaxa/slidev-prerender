import fs from "node:fs/promises";
import path from "node:path";
import { chromium, type Browser } from "@playwright/test";
import { removeDist, serveDist, getPageHtml } from "./handle-dist";
import { copyDir } from "../utils/file";
import { type BuildHeadOptions, applyHead } from "./handle-head";
import { getConfig } from "./getConfig";
import consola from "consola";

const log = consola.withTag("slidev-prerender");
export async function build() {
  const startedAt = performance.now();

  log.start("Generating pages...");
  consola.log("");

  const { slidevDist, outDir, pages, port, plugins } = await getConfig();
  log.info(`Input (slidevDist): ${slidevDist}`);
  log.info(`Output (outDir): ${outDir}`);
  log.info(`Pages: ${pages.length}`);
  log.info(`Port: ${port}`);
  consola.log("");

  // Check if slidevDist exists
  const isExistSlidevDist = await checkExistSlidevDist(slidevDist);
  if (!isExistSlidevDist) {
    log.fatal(`Slidev dist directory not found: ${slidevDist}`);
    log.fatal(`Run: slidev build`);

    throw new Error(`Slidev dist directory not found: ${slidevDist}`);
  }

  log.start("Preparing output directory...");
  await removeDist(outDir);
  await copyDir(slidevDist, outDir);
  log.success("Prepared output directory");
  consola.log("");

  log.start("Starting local server...");
  const { origin, close: serverClose } = await serveDist(slidevDist, port);
  let browser: Browser | undefined;
  log.success(`Server started: ${origin}`);
  consola.log("");

  let generatedPageCount = 0;
  try {
    log.start("Launching browser...");
    browser = await chromium.launch();
    const page = await browser.newPage();
    log.success("Browser launched");
    consola.log("");

    log.start("Rendering pages...");
    for (const [i, pageConfig] of pages.entries()) {
      log.debug(`Render [${i + 1}/${pages.length}]: ${pageConfig.slug}`);
      const originalHtml = await getPageHtml(
        page,
        `${origin}/${pageConfig.slug}`,
      );

      const head: BuildHeadOptions = pageConfig.meta ?? {
        title: `ページ${pageConfig.slug}`,
      };
      const html = await applyHead(originalHtml, head);

      const processedHtml = await plugins.reduce(
        async (prevPromise, plugin) => {
          const pluginLog = log.withTag(`plugin-${i}`);
          const prev = await prevPromise;
          return plugin(prev, pageConfig, i, pluginLog);
        },
        Promise.resolve(html),
      );

      await fs.writeFile(
        path.join(outDir, `${pageConfig.slug}.html`),
        processedHtml,
      );
      generatedPageCount++;
    }
    log.success(`Rendered ${generatedPageCount} pages`);
    consola.log("");
  } catch (err) {
    log.error(
      `Build failed after generating ${generatedPageCount}/${pages.length} pages`,
    );
    log.error(err);
    consola.log("");
  } finally {
    log.start("Closing browser and stopping local server...");
    await browser?.close();
    await serverClose();
    log.success("Cleanup done");
    consola.log("");
  }

  const ms = performance.now() - startedAt;
  log.success(`Done in ${(ms / 1000).toFixed(2)}s`);
}

async function checkExistSlidevDist(slidevDist: string): Promise<boolean> {
  try {
    await fs.access(slidevDist);
  } catch {
    return false;
  }

  return true;
}
