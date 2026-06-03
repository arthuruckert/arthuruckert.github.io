const BASE = import.meta.env.BASE_URL // '/portfolio/' in prod, '/' in dev

/**
 * Converts a public asset path to the correct URL for the current deployment base.
 * e.g. '/assets/img/foo.png' → '/portfolio/assets/img/foo.png' in production
 */
export const assetUrl = (path) => `${BASE}${path.replace(/^\//, '')}`
