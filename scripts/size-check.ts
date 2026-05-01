import { readdirSync, statSync } from "fs";
import { join } from "path";

const dist = join(import.meta.dir, "..", "dist");
let total = 0;

function walk(dir: string) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else total += statSync(path).size;
  }
}

walk(dist);
console.log(`Total payload: ${total} bytes (${(total / 1024).toFixed(1)} KB)`);

if (total > 14 * 1024) {
  console.error("✗ Exceeds 14 KB single-round-trip budget!");
  process.exit(1);
}
console.log("✓ Within budget.");
