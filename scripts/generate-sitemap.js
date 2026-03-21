#!/usr/bin/env node
/**
 * Dynamic Sitemap Generator
 * Generates a complete sitemap.xml including static routes and dynamic content
 * Run: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import data files
import { articlesData } from '../src/data/articlesData.js';
import { galleryAlbums } from '../src/data/galleryAlbums.js';
import { jobsData } from '../src/data/jobsData.js';
import { trainingCourses } from '../src/data/trainingCourses.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOMAIN = 'https://zyratechhub.com';
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

// Static routes with their priorities and change frequencies
const staticRoutes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/projects', priority: 0.8, changefreq: 'weekly' },
  { path: '/projects/request', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/faq', priority: 0.8, changefreq: 'monthly' },
  { path: '/impact', priority: 0.8, changefreq: 'weekly' },
  { path: '/partner', priority: 0.8, changefreq: 'monthly' },
  { path: '/partner/apply', priority: 0.8, changefreq: 'monthly' },
  { path: '/gallery', priority: 0.8, changefreq: 'weekly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/jobs', priority: 0.8, changefreq: 'weekly' },
  { path: '/our-services', priority: 0.8, changefreq: 'monthly' },
  { path: '/collaboration-models', priority: 0.8, changefreq: 'monthly' },
  { path: '/work-with-us', priority: 0.8, changefreq: 'monthly' },
  { path: '/quality-assurance', priority: 0.8, changefreq: 'monthly' },
  { path: '/training', priority: 0.9, changefreq: 'weekly' },
  { path: '/training/programs', priority: 0.9, changefreq: 'monthly' },
  { path: '/training/programs/basic', priority: 0.8, changefreq: 'monthly' },
  { path: '/training/programs/intermediate', priority: 0.8, changefreq: 'monthly' },
  { path: '/training/programs/advanced', priority: 0.8, changefreq: 'monthly' },
  { path: '/training/programs/matured', priority: 0.8, changefreq: 'monthly' },
  { path: '/training/programs/internship', priority: 0.8, changefreq: 'monthly' },
  { path: '/training/contact', priority: 0.7, changefreq: 'monthly' }
];

/**
 * Generate individual training course routes
 */
const generateTrainingCourseRoutes = () => {
  return trainingCourses.map(course => ({
    path: `/training/course/${course.id}`,
    priority: 0.9,
    changefreq: 'monthly'
  }));
};

/**
 * Generate individual blog post routes
 */
const generateBlogRoutes = () => {
  return articlesData.map(article => ({
    path: `/blog/${article.slug}`,
    priority: 0.7,
    changefreq: 'monthly'
  }));
};

/**
 * Generate gallery album routes
 */
const generateGalleryRoutes = () => {
  return galleryAlbums.map(album => ({
    path: `/gallery/album/${album.id}`,
    priority: 0.6,
    changefreq: 'monthly'
  }));
};

/**
 * Generate job listing routes
 */
const generateJobRoutes = () => {
  const routes = [];
  jobsData.forEach(job => {
    routes.push({
      path: `/jobs/${job.id}`,
      priority: 0.7,
      changefreq: 'weekly'
    });
    routes.push({
      path: `/jobs/${job.id}/apply`,
      priority: 0.7,
      changefreq: 'weekly'
    });
  });
  return routes;
};

/**
 * Generate XML URL entry
 */
const generateUrlEntry = (route) => {
  return `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <priority>${route.priority}</priority>
    <changefreq>${route.changefreq}</changefreq>
  </url>`;
};

/**
 * Generate complete sitemap
 */
const generateSitemap = () => {
  // Combine all routes
  const allRoutes = [
    ...staticRoutes,
    ...generateTrainingCourseRoutes(),
    ...generateBlogRoutes(),
    ...generateGalleryRoutes(),
    ...generateJobRoutes()
  ];

  // Generate XML entries
  const urlEntries = allRoutes.map(generateUrlEntry).join('\n');

  // Build complete sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return sitemap;
};

/**
 * Main function - write sitemap to file
 */
const main = () => {
  const sitemap = generateSitemap();
  const outputPath = path.join(__dirname, '../public/sitemap.xml');

  try {
    fs.writeFileSync(outputPath, sitemap, 'utf-8');
    console.log(`✓ Sitemap generated successfully!`);
    console.log(`  Location: ${outputPath}`);
    console.log(`  Total URLs: ${sitemap.match(/<url>/g).length}`);
  } catch (error) {
    console.error('✗ Error generating sitemap:', error.message);
    process.exit(1);
  }
};

main();
