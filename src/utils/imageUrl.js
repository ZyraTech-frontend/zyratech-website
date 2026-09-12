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
 * @param {object|string} course 
 * @returns {string|null}
 */
export const getCourseImageUrl = (course) => {
  if (!course) return null;
  if (typeof course === 'string') return normalizeImageUrl(course);
  if (typeof course !== 'object') return null;

  const candidate = course.image ||
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
                    course.url ||
                    null;

  if (!candidate) return null;

  if (typeof candidate === 'string') {
    return normalizeImageUrl(candidate);
  }

  if (typeof candidate === 'object') {
    const nested = candidate.url ||
                   candidate.location ||
                   candidate.path ||
                   candidate.fileUrl ||
                   candidate.imageUrl ||
                   candidate.key ||
                   null;
    return nested ? normalizeImageUrl(nested) : null;
  }

  return null;
};

/**
 * Normalizes any image URL to ensure it points to a reachable public asset URL.
 * Converts Supabase S3 bucket URLs (virtual-hosted style, path-style, Supabase S3 endpoint,
 * or raw storage keys) into the live public Supabase Storage CDN URL.
 * Preserves local previews (blob:, data:), local static paths (/images/...), and other CDNs intact.
 *
 * @param {string} url - Raw image URL or storage key
 * @returns {string|null} Reachable public image URL
 */
export const normalizeImageUrl = (url) => {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // Local object URLs or data URIs (e.g. user selected file preview)
  if (trimmed.startsWith('blob:') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  // Already a Supabase public storage URL
  if (trimmed.includes('supabase.co/storage/v1/object/public/zyratech-assets/')) {
    return trimmed;
  }

  // Supabase S3 API endpoint: rewrite to public storage CDN so browser can fetch without S3 auth
  const supabaseS3Match = trimmed.match(/^https?:\/\/[^/]+\.supabase\.co\/storage\/v1\/s3\/zyratech-assets\/(.+)$/i);
  if (supabaseS3Match) {
    const key = supabaseS3Match[1].replace(/^\/+/, '').split('?')[0];
    return `${SUPABASE_STORAGE_BASE}/${key}`;
  }

  // Handle virtual-hosted style AWS S3 URL: zyratech-assets.s3.<region>.amazonaws.com/<key>
  const vhostMatch = trimmed.match(/^https?:\/\/zyratech-assets\.s3[.-]?[^/]*\.amazonaws\.com\/(.+)$/i);
  if (vhostMatch) {
    const key = vhostMatch[1].replace(/^\/+/, '').split('?')[0];
    return `${SUPABASE_STORAGE_BASE}/${key}`;
  }

  // Handle path style AWS S3 URL: s3.<region>.amazonaws.com/zyratech-assets/<key>
  const pathMatch = trimmed.match(/^https?:\/\/s3[.-]?[^/]*\.amazonaws\.com\/zyratech-assets\/(.+)$/i);
  if (pathMatch) {
    const key = pathMatch[1].replace(/^\/+/, '').split('?')[0];
    return `${SUPABASE_STORAGE_BASE}/${key}`;
  }

  // Handle any other S3 URL containing zyratech-assets and amazonaws.com
  if (trimmed.includes('zyratech-assets') && trimmed.includes('amazonaws.com')) {
    const parts = trimmed.split(/zyratech-assets[./]/);
    if (parts.length > 1) {
      const key = parts[parts.length - 1].replace(/^[^/]*\//, '').replace(/^\/+/, '').split('?')[0];
      return `${SUPABASE_STORAGE_BASE}/${key}`;
    }
  }

  // Relative Supabase path without base host
  if (trimmed.startsWith('/storage/v1/object/public/')) {
    return `https://cblfpfsvavahttedfloe.supabase.co${trimmed}`;
  }

  // Relative storage key (e.g. "courses/123-image.jpg" or "avatars/photo.png")
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('/')) {
    if (trimmed.includes('/') || /\.(jpe?g|png|webp|gif|svg|avif)$/i.test(trimmed.split('?')[0])) {
      return `${SUPABASE_STORAGE_BASE}/${trimmed}`;
    }
  }

  // Local static paths (e.g. /images/...)
  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  // Preserve other absolute URLs (Unsplash, external CDNs, etc.) intact
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  return trimmed;
};

export default normalizeImageUrl;

