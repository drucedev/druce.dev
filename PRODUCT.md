# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

No specific target audience. druce.dev is a personal calling card on Andrei Kukharau's own domain: whoever follows a link to it (from a profile, an email signature, a conversation) should find a person there, not a pitch. Not built for recruiters, clients or any one group.

## Product Purpose

A single-screen personal presence for Andrei Kukharau, a software and security engineer ("SoftEng · SecEng"). Success is that a visitor leaves with an impression of the person, of taste and care. Getting in touch (Email, GitHub, LinkedIn) is available but secondary; the page does not push for action.

## Positioning

It is Andrei's own page, with his name, his two disciplines, and quiet personal details (hints of Berlin that never name the city). Nothing on it is a generic portfolio template, and the craft of the page itself (hand-generated SVG artwork, a 14 KB total payload) is part of the impression.

## Operating Context

- Visited briefly, on any device, usually after following a link from elsewhere.
- Deployed to GitHub Pages at the custom domain `druce.dev` via `.github/workflows/deploy.yml`.

## Capabilities and Constraints

- Content today: name, the "SoftEng · SecEng" subtitle, and three contact links: `mailto:contact@druce.dev`, `github.com/drucedev`, `linkedin.com/in/drucedev`.
- Whole initial payload (HTML + CSS + JS + fonts, gzipped as served) must stay at or under 14 KB, a single TCP round trip, with no third-party requests; `scripts/size-check.ts` fails the build otherwise.
- No scrolling on any platform (`overflow: hidden` on html/body); the layout adapts to mobile with fluid units.
- Bun for package management, builds and TypeScript; Astro for static output only; no React/Vue/Svelte; TypeScript over JavaScript; icons as inline SVG, no icon fonts or external icon requests.
- KISS: minimal code and dependencies.
- **Open decision:** the site may grow later (projects, writing, a CV). For now the card is the whole site. Any future pages would need a decision on how the 14 KB and no-scroll rules apply to them.

## Brand Commitments

- Name: Andrei Kukharau; domain and handle: druce.dev / `drucedev`.
- Roles stated as "SoftEng" and "SecEng".
- Berlin is hinted at, never named.
- Gruvbox palette is a standing project commitment (see AGENTS.md).
- Motion must respect `prefers-reduced-motion`.

## Evidence on Hand

- No projects, writing, testimonials, employers or credentials appear on the site, and none should be invented. Only the name, roles and contact links above are confirmed content.

## Product Principles

1. **A person, not a pitch.** The page should leave an impression of who Andrei is; it does not sell or convert.
2. **The craft is the message.** Care shows in the details and the tiny payload, not in claims.
3. **Quiet over loud.** Personal details are hinted, not announced.
4. **Small by rule.** The 14 KB, single-screen budget is a design constraint to work within, not around.

## Accessibility & Inclusion

- All motion stops under `prefers-reduced-motion`.
- Decorative artwork is hidden from assistive tech (`aria-hidden`); contact links carry accessible labels.
