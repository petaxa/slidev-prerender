import { loadConfig, type UserConfig } from "../config/loadConfig";

const DEFAULT_CONFIG: Required<UserConfig> = {
  slidevDist: "./dist",
  outDir: "./dist-prerender",
  pages: [],
  port: 4173,
  plugins: [],
};
export async function getConfig(): Promise<Required<UserConfig>> {
  const config = await loadConfig();
  return {
    slidevDist: config.slidevDist ?? DEFAULT_CONFIG.slidevDist,
    outDir: config.outDir ?? DEFAULT_CONFIG.outDir,
    pages: config.pages ?? DEFAULT_CONFIG.pages,
    port: config.port ?? DEFAULT_CONFIG.port,
    plugins: config.plugins ?? DEFAULT_CONFIG.plugins,
  };
}
