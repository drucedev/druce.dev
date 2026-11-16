/**
 * The initial payload must fit in the first TCP round trip (~14 KB). What
 * crosses the wire is the gzipped response, so that is what gets measured.
 * Images such as link-preview cards are fetched separately and not counted.
 */
import { readdirSync } from "fs";
import { join } from "path";

const BUDGET = 14 * 1024;
const NOT_INITIAL = /\.(png|jpe?g|webp|avif|gif|ico)$/i;
const dist = join(import.meta.dir, "..", "dist");

let raw = 0;
let gzipped = 0;
for (const entry of readdirSync(dist, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || NOT_INITIAL.test(entry.name)) continue;
  const bytes = await Bun.file(join(entry.parentPath, entry.name)).bytes();
  raw += bytes.length;
  gzipped += Bun.gzipSync(bytes).length;
}

const kb = (n: number) => (n / 1024).toFixed(1);
console.log(`Initial payload: ${gzipped} bytes gzipped (${kb(gzipped)} KB), ${raw} bytes raw`);

if (gzipped > BUDGET) {
  console.error("✗ Exceeds 14 KB single-round-trip budget!");
  process.exit(1);
}
console.log(`✓ Within budget (${kb(BUDGET - gzipped)} KB headroom).`);
