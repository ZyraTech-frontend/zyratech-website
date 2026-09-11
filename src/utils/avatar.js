import { normalizeImageUrl } from './imageUrl';

/**
 * Normalizes avatar URLs to ensure they point to reachable public asset URLs.
 * Re-exports the universal normalizeImageUrl for avatar usages.
 */
export const normalizeAvatarUrl = (url) => normalizeImageUrl(url);

export default normalizeAvatarUrl;

