// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://druce.dev",
  // CSS is part of the 14 KB single-round-trip budget; always inline it
  // so the page is self-contained.
  build: {
    inlineStylesheets: "always",
  },
});
