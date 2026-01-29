import fs from "node:fs/promises";
import path from "node:path";
import { chromium, type Browser } from "@playwright/test";
import { removeDist, serveDist, getPageHtml } from "./handle-dist";
import { copyDir } from "../utils/file";
import { type BuildHeadOptions, applyHead } from "./handle-head";
import { getConfig } from "./getConfig";

export async function build() {
  const { slidevDist, outDir, pages, port, plugins } = await getConfig();

  // Check if slidevDist exists
  const isExistSlidevDist = await checkExistSlidevDist(slidevDist);
  if (!isExistSlidevDist) {
    throw new Error(
      `Slidev dist directory not found: ${slidevDist}\nPlease run 'slidev build' first.`,
    );
  }

  await removeDist(outDir);
  await copyDir(slidevDist, outDir);

  const { origin, close: serverClose } = await serveDist(slidevDist, port);
  let browser: Browser | undefined;

  try {
    browser = await chromium.launch();
    const page = await browser.newPage();

    for (const [i, pageConfig] of pages.entries()) {
      console.log(`[SSG] page ${pageConfig.fileName}`);
      const originalHtml = await getPageHtml(
        page,
        `${origin}/${pageConfig.fileName}`,
      );

      const head: BuildHeadOptions = pageConfig.meta ?? {
        title: `ページ${pageConfig.fileName}`,
      };
      const html = await applyHead(originalHtml, head);

      plugins.forEach((plugin) => plugin(html, pageConfig, i));

      await fs.writeFile(
        path.join(outDir, `${pageConfig.fileName}.html`),
        html,
      );
    }
  } finally {
    await browser?.close();
    await serverClose();
  }

  console.log("done");
}

async function checkExistSlidevDist(slidevDist: string): Promise<boolean> {
  try {
    await fs.access(slidevDist);
  } catch {
    return false;
  }

  return true;
}
