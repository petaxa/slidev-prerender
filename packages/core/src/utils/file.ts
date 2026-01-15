import path from "node:path";
import fs from "node:fs/promises";

export async function copyDir(src: string, dst: string): Promise<void> {
  await fs.mkdir(dst, { recursive: true });
  for (const e of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    e.isDirectory() ? await copyDir(s, d) : await fs.copyFile(s, d);
  }
}
