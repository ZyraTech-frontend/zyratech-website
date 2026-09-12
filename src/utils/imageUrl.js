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
 * Normalizes any image URL to ensure it points to a reachable, public CDN endpoint.
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

  // Already a Supabase storage URL
  if (trimmed.includes('supabase.co/storage/v1/object/public/')) {
    return trimmed;
  }

  // Handle virtual-hosted style AWS S3 URL: zyratech-assets.s3.<region>.amazonaws.com/<key>
  const vhostMatch = trimmed.match(/^https?:\/\/zyratech-assets\.s3[.-]?[^/]*\.amazonaws\.com\/(.+)$/i);
  if (vhostMatch) {
    const key = vhostMatch[1].replace(/^\/+/, '');
    return `${SUPABASE_STORAGE_BASE}/${key}`;
  }

  // Handle path style AWS S3 URL: s3.<region>.amazonaws.com/zyratech-assets/<key>
  const pathMatch = trimmed.match(/^https?:\/\/s3[.-]?[^/]*\.amazonaws\.com\/zyratech-assets\/(.+)$/i);
  if (pathMatch) {
    const key = pathMatch[1].replace(/^\/+/, '');
    return `${SUPABASE_STORAGE_BASE}/${key}`;
  }

  // Handle any other AWS URL containing zyratech-assets
  if (trimmed.includes('zyratech-assets') && trimmed.includes('amazonaws.com')) {
    const parts = trimmed.split(/zyratech-assets[./]/);
    if (parts.length > 1) {
      const key = parts[parts.length - 1].replace(/^[^/]*\//, '').replace(/^\/+/, '');
      return `${SUPABASE_STORAGE_BASE}/${key}`;
    }
  }

  // Relative storage key (e.g. "courses/123-image.jpg" or "blog/photo.png")
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('/')) {
    if (trimmed.includes('/') && /\.(jpe?g|png|webp|gif|svg)$/i.test(trimmed)) {
      return `${SUPABASE_STORAGE_BASE}/${trimmed}`;
    }
  }

  // Relative Supabase path without base host
  if (trimmed.startsWith('/storage/v1/object/public/')) {
    return `https://cblfpfsvavahttedfloe.supabase.co${trimmed}`;
  }

  return trimmed;
};

export default normalizeImageUrl;
