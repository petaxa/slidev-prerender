import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    run: "src/run.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  shims: false,
});
