/**
 * Normalizes avatar URLs to ensure they point to reachable public asset URLs.
 *
 * Background:
 * Uploaded files are stored in Supabase Storage S3 bucket (`zyratech-assets`).
 * When backend responses construct an AWS S3 URL (`zyratech-assets.s3.<region>.amazonaws.com`),
 * fetching from AWS returns 404 (NoSuchBucket).
 * This utility rewrites such URLs to the live Supabase Storage public URL:
 * `https://cblfpfsvavahttedfloe.supabase.co/storage/v1/object/public/zyratech-assets/...`
 */
export const normalizeAvatarUrl = (url) => {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // Preserve local object URLs or data URIs used for immediate preview
  if (trimmed.startsWith('blob:') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  // Handle zyratech-assets on AWS S3 virtual-hosted style
  const s3Pattern = /^https?:\/\/zyratech-assets\.s3[.-][^/]+\.amazonaws\.com\/(.+)$/i;
  const s3Match = trimmed.match(s3Pattern);
  if (s3Match) {
    const key = s3Match[1].replace(/^\/+/, '');
    return `https://cblfpfsvavahttedfloe.supabase.co/storage/v1/object/public/zyratech-assets/${key}`;
  }

  // Handle zyratech-assets on AWS S3 path style
  const s3PathPattern = /^https?:\/\/s3[.-][^/]+\.amazonaws\.com\/zyratech-assets\/(.+)$/i;
  const s3PathMatch = trimmed.match(s3PathPattern);
  if (s3PathMatch) {
    const key = s3PathMatch[1].replace(/^\/+/, '');
    return `https://cblfpfsvavahttedfloe.supabase.co/storage/v1/object/public/zyratech-assets/${key}`;
  }

  return trimmed;
};

export default normalizeAvatarUrl;
