import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";
import { removeDist, serveDist, getPageHtml } from "./handle-dist";
import { copyDir } from "../utils/file";
import { type BuildHeadOptions, applyHead } from "./handle-head";
import { getConfig } from "./getConfig";

export async function run() {
  const { slidevDist, outDir, pages, port } = await getConfig();

  // Check if slidevDist exists
  try {
    await fs.access(slidevDist);
  } catch {
    throw new Error(
      `Slidev dist directory not found: ${slidevDist}\nPlease run 'slidev build' first.`
    );
  }

  await removeDist(outDir);

  try {
    await copyDir(slidevDist, outDir);
  } catch {
    console.warn(`Assets directory not found: ${slidevDist}, skipping...`);
  }

  const { origin, close: serverClose } = await serveDist(slidevDist, port);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    for (const n of pages) {
      console.log(`[SSG] page ${n.fileName}`);
      const originalHtml = await getPageHtml(page, `${origin}/${n.fileName}`);

      const head: BuildHeadOptions = n.meta ?? {
        title: `ページ${n.fileName}`,
      };
      const html = await applyHead(originalHtml, head);

      await fs.writeFile(path.join(outDir, `${n.fileName}.html`), html);
    }
  } finally {
    await browser.close();
    serverClose();
  }

  console.log("done");
}
