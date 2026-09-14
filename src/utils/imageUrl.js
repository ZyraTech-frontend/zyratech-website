/**
 * Image URL Normalization Utility
 *
 * Background:
 * Uploaded media (course covers, avatars, blog images, gallery) are stored in
 * Supabase Storage S3-compatible bucket (`zyratech-assets`).
 * When backend services or S3 clients generate standard AWS S3 URLs:
 *   e.g. `https://zyratech-assets.s3.<region>.amazonaws.com/...`
 *        `https://s3.<region>.amazonaws.com/zyratech-assets/...`
 * fetching directly from AWS returns 404/NoSuchBucket or 403.
 *
 * This utility rewrites any such S3 URLs to the live public Supabase Storage CDN endpoint:
 *   `https://cblfpfsvavahttedfloe.supabase.co/storage/v1/object/public/zyratech-assets/...`
 */

export const SUPABASE_STORAGE_BASE = 'https://cblfpfsvavahttedfloe.supabase.co/storage/v1/object/public/zyratech-assets';

/**
 * Resolves course cover image from any potential field property, JSON representation, or nested structure
 * @param {object|string} course 
 * @returns {string|null}
 */
export const getCourseImageUrl = (course) => {
  if (!course) return null;
  if (typeof course === 'string') {
    const trimmed = course.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return getCourseImageUrl(parsed);
      } catch (_) {
        // Not valid JSON, treat as raw URL
      }
    }
    return normalizeImageUrl(trimmed);
  }
  if (Array.isArray(course)) {
    return course.length > 0 ? getCourseImageUrl(course[0]) : null;
  }
  if (typeof course !== 'object') return null;

  const candidate = course.image ??
                    course.heroImage ??
                    course.imageUrl ??
                    course.image_url ??
                    course.coverImageUrl ??
                    course.cover_image_url ??
                    course.coverImage ??
                    course.cover_image ??
                    course.hero_image ??
                    course.courseImage ??
                    course.course_image ??
                    course.courseImageUrl ??
                    course.course_image_url ??
                    course.featuredImage ??
                    course.featured_image ??
                    course.photo ??
                    course.photoUrl ??
                    course.photo_url ??
                    course.picture ??
                    course.pictureUrl ??
                    course.picture_url ??
                    course.thumbnail ??
                    course.thumbnailUrl ??
                    course.thumbnail_url ??
                    course.banner ??
                    course.bannerUrl ??
                    course.banner_url ??
                    course.poster ??
                    course.posterUrl ??
                    course.poster_url ??
                    course.file ??
                    course.fileUrl ??
                    course.file_url ??
                    course.s3Url ??
                    course.s3_url ??
                    course.url ??
                    course.src ??
                    course.path ??
                    (Array.isArray(course.images) && course.images[0] ? course.images[0] : null) ??
                    (Array.isArray(course.media) && course.media[0] ? course.media[0] : null) ??
                    (Array.isArray(course.photos) && course.photos[0] ? course.photos[0] : null) ??
                    (Array.isArray(course.attachments) && course.attachments[0] ? course.attachments[0] : null) ??
                    null;

  if (!candidate) return null;

  if (typeof candidate === 'string') {
    const trimmed = candidate.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return getCourseImageUrl(parsed);
      } catch (_) {
        // fallback to normalizing raw string
      }
    }
    return normalizeImageUrl(trimmed);
  }

  if (Array.isArray(candidate)) {
    return candidate.length > 0 ? getCourseImageUrl(candidate[0]) : null;
  }

  if (typeof candidate === 'object') {
    const nested = candidate.publicUrl ||
                   candidate.public_url ||
                   candidate.url ||
                   candidate.location ||
                   candidate.secure_url ||
                   candidate.fileUrl ||
                   candidate.file_url ||
                   candidate.imageUrl ||
                   candidate.image_url ||
                   candidate.coverImageUrl ||
                   candidate.cover_image_url ||
                   candidate.path ||
                   candidate.key ||
                   candidate.src ||
                   candidate.href ||
                   candidate.data?.publicUrl ||
                   candidate.data?.url ||
                   candidate.image ||
                   candidate.heroImage ||
                   null;
    return nested ? getCourseImageUrl(nested) : null;
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

  let trimmed = url.trim();
  if (!trimmed) return null;

  // DEBUG: Log all URL normalization attempts
  const debug = process.env.NODE_ENV === 'development';
  if (debug) {
    console.log(`[normalizeImageUrl] Input: "${trimmed}"`);
  }

  // Local object URLs or data URIs (e.g. user selected file preview)
  if (trimmed.startsWith('blob:') || trimmed.startsWith('data:')) {
    if (debug) console.log(`[normalizeImageUrl] ✓ Is blob/data URL, returning as-is`);
    return trimmed;
  }

  // Handle Supabase S3 API endpoints: convert /storage/v1/s3/ to /storage/v1/object/public/
  // e.g. https://cblfpfsvavahttedfloe.supabase.co/storage/v1/s3/zyratech-assets/courses/photo.png
  //  ->  https://cblfpfsvavahttedfloe.supabase.co/storage/v1/object/public/zyratech-assets/courses/photo.png
  if (trimmed.includes('.supabase.co/storage/v1/s3/')) {
    const result = trimmed.replace('/storage/v1/s3/', '/storage/v1/object/public/').split('?')[0];
    if (debug) console.log(`[normalizeImageUrl] ✓ Converted Supabase S3 endpoint: ${result}`);
    return result;
  }

  // Already a valid Supabase public storage CDN URL
  if (trimmed.includes('.supabase.co/storage/v1/object/public/')) {
    const result = trimmed.split('?')[0];
    if (debug) console.log(`[normalizeImageUrl] ✓ Already valid Supabase CDN URL: ${result}`);
    return result;
  }

  // Handle virtual-hosted style AWS S3 URL: zyratech-assets.s3.<region>.amazonaws.com/<key>
  const vhostMatch = trimmed.match(/^https?:\/\/zyratech-assets\.s3[.-]?[^/]*\.amazonaws\.com\/(.+)$/i);
  if (vhostMatch) {
    const key = vhostMatch[1].replace(/^\/+/, '').split('?')[0];
    const result = `${SUPABASE_STORAGE_BASE}/${key}`;
    if (debug) console.log(`[normalizeImageUrl] ✓ Converted AWS S3 vhost URL: ${result}`);
    return result;
  }

  // Handle path style AWS S3 URL: s3.<region>.amazonaws.com/zyratech-assets/<key>
  const pathMatch = trimmed.match(/^https?:\/\/s3[.-]?[^/]*\.amazonaws\.com\/zyratech-assets\/(.+)$/i);
  if (pathMatch) {
    const key = pathMatch[1].replace(/^\/+/, '').split('?')[0];
    const result = `${SUPABASE_STORAGE_BASE}/${key}`;
    if (debug) console.log(`[normalizeImageUrl] ✓ Converted AWS S3 path URL: ${result}`);
    return result;
  }

  // Handle any other S3 URL containing zyratech-assets and amazonaws.com
  if (trimmed.includes('zyratech-assets') && trimmed.includes('amazonaws.com')) {
    const parts = trimmed.split(/zyratech-assets[./]/);
    if (parts.length > 1) {
      const key = parts[parts.length - 1].replace(/^[^/]*\//, '').replace(/^\/+/, '').split('?')[0];
      const result = `${SUPABASE_STORAGE_BASE}/${key}`;
      if (debug) console.log(`[normalizeImageUrl] ✓ Converted AWS S3 generic URL: ${result}`);
      return result;
    }
  }

  // Relative Supabase path without base host: /storage/v1/object/public/... or /storage/v1/s3/...
  if (trimmed.startsWith('/storage/v1/')) {
    const publicPath = trimmed.replace('/storage/v1/s3/', '/storage/v1/object/public/');
    const result = `https://cblfpfsvavahttedfloe.supabase.co${publicPath}`;
    if (debug) console.log(`[normalizeImageUrl] ✓ Converted relative Supabase path: ${result}`);
    return result;
  }

  // Relative storage key (e.g. "courses/123-image.jpg" or "zyratech-assets/courses/photo.png")
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('/')) {
    // If it already includes the bucket name at the start, strip it to prevent duplication
    const cleanKey = trimmed.replace(/^zyratech-assets\//i, '').replace(/^\/+/, '');
    if (cleanKey.includes('/') || /\.(jpe?g|png|webp|gif|svg|avif|pdf|doc|docx)$/i.test(cleanKey.split('?')[0])) {
      const result = `${SUPABASE_STORAGE_BASE}/${cleanKey}`;
      if (debug) console.log(`[normalizeImageUrl] ✓ Converted relative storage key: ${result}`);
      return result;
    }
  }

  // Local static paths (e.g. /images/...)
  if (trimmed.startsWith('/')) {
    if (debug) console.log(`[normalizeImageUrl] ✓ Local static path, returning as-is: ${trimmed}`);
    return trimmed;
  }

  // Preserve other absolute URLs (Unsplash, Cloudinary, external CDNs, etc.) intact
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    if (debug) console.log(`[normalizeImageUrl] ✓ External URL, preserving as-is: ${trimmed}`);
    return trimmed;
  }

  if (debug) console.log(`[normalizeImageUrl] ⚠ No pattern matched, returning trimmed: ${trimmed}`);
  return trimmed;
};

export default normalizeImageUrl;


