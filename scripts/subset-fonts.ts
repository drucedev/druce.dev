/**
 * Regenerates src/fonts/*.woff2: the two web fonts cut down to exactly the
 * glyphs the page draws, so they can be inlined into the 14 KB page instead
 * of loaded from Google Fonts. Re-run (`bun run fonts`) after changing the
 * name, subtitle or link labels, and update the TEXT below to match.
 *
 * Both fonts are SIL Open Font License 1.1.
 */
import subsetFont from "subset-font";
import { join } from "path";

const FONTS = [
  {
    // h1: "Andrei Kukharau"
    out: "playfair-display-italic.woff2",
    src: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTXtHA-Q.woff2",
    text: "AndreiKukharau",
  },
  {
    // Subtitle (as written), link labels (uppercase via text-transform),
    // and the email address, which keeps its case.
    out: "jetbrains-mono.woff2",
    src: "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff2",
    text: "SoftEng SecEng GITHUB LINKEDIN contact@druce.dev",
  },
];

for (const { out, src, text } of FONTS) {
  const source = Buffer.from(await (await fetch(src)).arrayBuffer());
  const subset = await subsetFont(source, text, { targetFormat: "woff2" });
  await Bun.write(join(import.meta.dir, "..", "src", "fonts", out), subset);
  console.log(`${out}: ${source.length} → ${subset.length} bytes`);
}
