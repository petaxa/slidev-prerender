import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import type { BuildHeadOptions } from "../build/handle-head";
import type { ConsolaInstance } from "consola";

type Page = {
  slug: string;
  meta?: BuildHeadOptions;
};
export type UserConfig = {
  slidevDist?: string;
  outDir?: string;
  pages?: Page[];
  port?: number;
  plugins?: ((
    html: string,
    currentPageConfig: Page,
    pageIndex: number,
    log: ConsolaInstance,
  ) => string | Promise<string>)[];
};

const CONFIG_FILE_NAMES = [
  "slidev-prerender.config.ts",
  "slidev-prerender.config.mts",
  "slidev-prerender.config.js",
  "slidev-prerender.config.mjs",
];

export async function loadConfig(
  cwd: string = process.cwd(),
): Promise<UserConfig> {
  for (const fileName of CONFIG_FILE_NAMES) {
    const configPath = resolve(cwd, fileName);
    if (existsSync(configPath)) {
      try {
        const configUrl = pathToFileURL(configPath).href;
        const configModule = await import(configUrl);
        const config = configModule.default || configModule;
        return config;
      } catch (error) {
        throw new Error(`Failed to load config from ${configPath}: ${error}`);
      }
    }
  }

  // 設定ファイルが見つからない場合はデフォルト設定を返す
  return {};
}
