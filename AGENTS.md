# AGENTS.md

## Project

Personal landing page for **druce.dev** — single-page contact card deployed via GitHub Pages.

## Architecture

- `src/index.html` — HTML template with `{{CSS}}`, `{{ICON_*}}` placeholders
- `src/style.css` — readable CSS source (minified at build time)
- `src/CNAME` — custom domain file (`druce.dev`)
- `build.ts` — build script: inlines minified CSS + SVG icons → single `dist/index.html`
- `.github/workflows/deploy.yml` — GitHub Actions: bun build → GitHub Pages deploy

## Constraints

1. **No scroll on any platform** — `overflow: hidden` on html/body
2. **Mobile-adapted** — use `clamp()`, `flex-wrap`, viewport-relative units
3. **Whole bundle ≤ 14 KB** — single `index.html` must fit one TCP round trip. Build script enforces this with size check
4. **Bun for everything** — package manager, build runner, TypeScript execution
5. **No big frameworks** — no React/Vue/Svelte. Vanilla HTML+CSS only. TypeScript only for build tooling
6. **3 colors only** — `#000` background, `#fff` text, `#0f0` accents
7. **KISS** — minimal code, minimal dependencies, no over-engineering
8. **TypeScript over JavaScript** — if logic is needed, use `.ts`
9. **Icons from `simple-icons`** — brand icons pulled at build time. Non-brand icons (mail) as minimal inline SVG
10. **Deploy target: GitHub Pages** with custom domain `druce.dev`

## Build

```sh
bun run build      # → dist/index.html (inlined, minified, size-checked)
bun run preview    # build + local server
```

## Design

- Green card centered on black background
- Name → subtitle → icon links (vertical stack)
- Icons in circular bordered buttons, hover inverts (black bg, green icon)
