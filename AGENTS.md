# AGENTS.md

## Project

Personal landing page for **druce.dev** — single-page contact card deployed via GitHub Pages.

## Architecture

- `src/index.html` — HTML entry point (vanilla, no placeholders)
- `src/style.css` — readable CSS source (minified by Vite at build time)
- `src/main.ts` — entry script: mounts leaf animation, applies feature flags
- `src/leaves.ts` — Canvas 2D drifting leaf silhouettes
- `src/flags.ts` — build-time feature flags via `import.meta.env`
- Custom domain (`druce.dev`) configured via GitHub Pages settings
- `vite.config.ts` — Vite build configuration
- `scripts/size-check.ts` — post-build total payload size check
- `.github/workflows/deploy.yml` — GitHub Actions: bun build → GitHub Pages deploy

## Constraints

1. **No scroll on any platform** — `overflow: hidden` on html/body
2. **Mobile-adapted** — use `clamp()`, `flex-wrap`, viewport-relative units
3. **Whole payload ≤ 14 KB** — total of all initial assets (HTML + CSS + JS) must fit in a single TCP round trip. Build script enforces this with size check
4. **Bun for everything** — package manager, build runner, TypeScript execution
5. **No big frameworks** — no React/Vue/Svelte. Vanilla HTML+CSS only. TypeScript only for build tooling
6. **Gruvbox palette** — `#1d2021` background, `#ebdbb2` text, `#8ec07c` accents
7. **KISS** — minimal code, minimal dependencies, no over-engineering
8. **TypeScript over JavaScript** — if logic is needed, use `.ts`
9. **Icons as inline SVG** — all icons inlined directly in HTML; no icon fonts or external requests
10. **Deploy target: GitHub Pages** with custom domain `druce.dev`

## Build

```sh
bun run dev        # Vite dev server with HMR
bun run build      # → dist/ (minified, size-checked)
bun run preview    # build + local server
```

## Design

- Cardless layout on dark gruvbox background
- Playfair Display italic for name, JetBrains Mono for metadata
- Corner navigation (hidden in production until pages exist)
- Subtle noise overlay + drifting leaf canvas animation
- Social icons (Email, GitHub, LinkedIn) with hover color transitions
