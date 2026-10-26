# AGENTS.md

## Project

Personal landing page for **druce.dev** — single-page contact card deployed via GitHub Pages.

## Architecture

- `src/pages/index.astro` — the page; generates the sun and Fernsehturm SVG artwork at build time
- `src/style.css` — readable CSS source (inlined and minified by Astro at build time)
- `src/leaves.ts` — Canvas 2D falling linden leaves
- `astro.config.mjs` — Astro build configuration (stylesheets always inlined)
- `scripts/size-check.ts` — post-build total payload size check
- `.github/workflows/deploy.yml` — GitHub Actions: bun build → GitHub Pages deploy
- Custom domain (`druce.dev`) configured via GitHub Pages settings

## Constraints

1. **No scroll on any platform** — `overflow: hidden` on html/body
2. **Mobile-adapted** — use `clamp()`, `flex-wrap`, viewport-relative units
3. **Whole payload ≤ 14 KB** — total of all initial assets (HTML + CSS + JS) must fit in a single TCP round trip. Build script enforces this with size check
4. **Bun for everything** — package manager, build runner, TypeScript execution
5. **No big frameworks** — no React/Vue/Svelte. Astro for static HTML+CSS only
6. **Gruvbox palette** — `#1d2021` background, `#ebdbb2` text, `#8ec07c` accents; other gruvbox colours for artwork
7. **KISS** — minimal code, minimal dependencies, no over-engineering
8. **TypeScript over JavaScript** — if logic is needed, use `.ts`
9. **Icons as inline SVG** — all icons inlined directly in HTML; no icon fonts or external requests
10. **Deploy target: GitHub Pages** with custom domain `druce.dev`

## Build

```sh
bun run dev        # Astro dev server with HMR
bun run build      # → dist/ (minified, size-checked)
bun run preview    # build + local server
```

## Design

- Editorial bottom-left layout on dark gruvbox background
- Playfair Display italic for name, JetBrains Mono for metadata
- Engraved sun in the top-right corner with a pulsing halo and soft light beams
- Quiet Berlin hints without naming the city: falling linden leaves, a Fernsehturm in the bottom-right corner, and Ampelmännchen (walking "go", standing "stop") in the subtitle
- Social icons (Email, GitHub, LinkedIn) with hover color transitions
- Animations stop under `prefers-reduced-motion`
