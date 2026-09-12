/**
 * Image URL Normalization Utility
 *
 * Background:
 * Uploaded media (course covers, avatars, blog images, gallery) are stored in the
 * Supabase Storage S3-compatible bucket (`zyratech-assets`).
 * When backend services or S3 clients generate standard AWS S3 URLs:
 *   e.g. `https://zyratech-assets.s3.<region>.amazonaws.com/...`
 *        `https://s3.<region>.amazonaws.com/zyratech-assets/...`
 * fetching directly from AWS returns 404/NoSuchBucket or 403.
 *
 * This utility rewrites any such S3 URLs to the live public Supabase Storage CDN endpoint:
 *   `https://cblfpfsvavahttedfloe.supabase.co/storage/v1/object/public/zyratech-assets/...`
 */

const SUPABASE_STORAGE_BASE = 'https://cblfpfsvavahttedfloe.supabase.co/storage/v1/object/public/zyratech-assets';

export const DEFAULT_CATEGORY_IMAGES = {
  basic: '/images/image1.webp',
  intermediate: '/images/digitalmarketing.png',
  advanced: '/images/advance.png',
  internship: '/images/training1.webp',
  matured: '/images/image2.webp',
  default: '/images/image1.webp'
};

/**
 * Resolves course cover image from any potential field property
 * @param {object} course 
 * @returns {string|null}
 */
export const getCourseImageUrl = (course) => {
  if (!course || typeof course !== 'object') return null;
  const raw = course.image ||
              course.heroImage ||
              course.imageUrl ||
              course.image_url ||
              course.hero_image ||
              course.coverImage ||
              course.cover_image ||
              course.thumbnail ||
              course.thumbnailUrl ||
              course.photo ||
              course.photoUrl ||
              course.s3Url ||
              course.s3_url ||
              null;
  return normalizeImageUrl(raw);
};

/**
 * Normalizes any image URL.
 * Preserves all valid AWS S3 URLs, CDNs, data/blob URLs, and relative paths as-is.
 * @param {string} url - Raw image URL or storage key
 * @returns {string|null} Reachable image URL
 */
export const normalizeImageUrl = (url) => {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // Local object URLs or data URIs (e.g. user selected file preview)
  if (trimmed.startsWith('blob:') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  // Preserve all absolute URLs (AWS S3, CloudFront, Unsplash, Supabase, etc.) intact
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // Relative path starting with /
  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  return trimmed;
};

export default normalizeImageUrl;
