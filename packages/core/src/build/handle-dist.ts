import fs from "node:fs/promises";
import http from "node:http";
import sirv from "sirv";
import type { Page } from "@playwright/test";

export async function removeDist(outDir: string): Promise<void> {
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });
}

// const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
export async function serveDist(
  distPath: string,
  port: number,
): Promise<{
  origin: string;
  close: () => Promise<void>;
}> {
  const serve = sirv(distPath, {
    etag: true,
    single: true, // 実ファイル検証したいのでSPA fallbackは切る
  });

  const server = http.createServer((req, res) => serve(req, res));

  await new Promise<void>((resolve, reject) => {
    const onError = (err: Error) => reject(err);
    server.once("error", onError);
    server.listen(port, () => {
      server.off("error", onError);
      resolve();
    });
  });

  let disposed = false;

  return {
    origin: `http://localhost:${port}`,
    close: async () => {
      if (disposed) return;
      disposed = true;
      new Promise<void>((resolve, reject) => {
        try {
          server.close((err) => (err ? reject(err) : resolve()));
        } catch (e) {
          reject(e);
        }
      });
    },
  };
}

export async function getPageHtml(
  page: Page,
  pageUrl: string,
): Promise<string> {
  await page.goto(pageUrl, { waitUntil: "networkidle" });

  const html = "<!doctype html>\n" + (await page.content());
  return html;
}
