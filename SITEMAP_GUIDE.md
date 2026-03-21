# Dynamic Sitemap Generation

## Overview
Your sitemap is now **automatically generated** from your data files, including:
- ✅ All static routes (homepage, about, services, etc.)
- ✅ All training courses (15 courses)
- ✅ All blog posts (8 articles with slugs)
- ✅ All gallery albums (3 albums)
- ✅ All jobs and job applications (5 jobs with apply pages)

**Total URLs: 64** (automatically updated whenever your data changes)

## How It Works

### Script Location
```
scripts/generate-sitemap.js
```

### Data Sources
The script pulls dynamic routes from:
- `src/data/articlesData.js` → `/blog/{slug}`
- `src/data/galleryAlbums.js` → `/gallery/album/{id}`
- `src/data/jobsData.js` → `/jobs/{id}` + `/jobs/{id}/apply`
- `src/data/trainingCourses.js` → `/training/course/{id}`

## Usage

### Run Manually
```bash
npm run generate-sitemap
```

### Automatic (Recommended)
The sitemap **automatically regenerates** when you run:
```bash
npm run build
```

This ensures your production build always has the latest sitemap.

## SEO Benefits
- ✅ **Blog SEO**: Individual post URLs are indexed by search engines
- ✅ **Job Board**: All job listings appear in search results
- ✅ **Gallery**: Portfolio pieces are discoverable
- ✅ **Training Catalog**: Each course has its own SEO footprint
- ✅ **Freshness**: `lastmod` date updates automatically to today's date

## What Changed

### Files Created
- `scripts/generate-sitemap.js` - Dynamic sitemap generator

### Files Updated
- `package.json` - Added `generate-sitemap` script and integrated into build process
- `public/sitemap.xml` - Now auto-generated with all dynamic routes

## Maintenance

### Adding New Data
When you add new blog posts, jobs, gallery albums, or courses:
1. Add entries to the corresponding data file
2. Run `npm run build` (or `npm run generate-sitemap`)
3. The sitemap will automatically include new URLs

No manual editing needed!

### Verifying the Sitemap
Check `public/sitemap.xml` after generating to confirm:
- Total URL count matches expected content
- Date shows today's date (`lastmod`)
- All dynamic routes are present

## Priority and Change Frequency

The script assigns SEO-optimized values:

| Route Type | Priority | Change Freq | Reason |
|-----------|----------|-------------|--------|
| Homepage | 1.0 | weekly | Most important |
| Blog posts | 0.7 | monthly | Content updates |
| Gallery albums | 0.6 | monthly | Photo updates |
| Jobs | 0.7 | **weekly** | Frequently change |
| Job apply pages | 0.7 | **weekly** | User engagement |
| Training courses | 0.9 | monthly | Important content |
| Static pages | 0.8 | varies | Supportive content |

## Testing

After generation, validate with:
```bash
# Check file exists and is readable
cat public/sitemap.xml

# Count total URLs
grep -c "<url>" public/sitemap.xml
```

Expected count: 64 URLs (or more if you add content)

---

**Last updated**: March 21, 2026
