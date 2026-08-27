/**
 * Build-time feature flags.
 *
 * Set via VITE_* environment variables. Evaluated in .astro frontmatter, so a
 * disabled flag's markup is omitted from the static HTML entirely (dead code
 * never ships to the client).
 */
export const FLAGS = {
  /** Show corner navigation links */
  ENABLE_NAVIGATION: import.meta.env.VITE_ENABLE_NAVIGATION !== "false",
} as const;
