/**
 * Build-time feature flags.
 *
 * Set via VITE_* environment variables.
 * Rollup dead-code elimination strips disabled features from the bundle automatically
 * because these resolve to literal booleans at build time.
 */
export const FLAGS = {
  /** Show corner navigation links */
  ENABLE_NAVIGATION: import.meta.env.VITE_ENABLE_NAVIGATION !== "false",
} as const;
