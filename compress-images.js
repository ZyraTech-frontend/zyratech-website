/**
 * Image Compression Script - PROFESSIONAL QUALITY EDITION
 * Reduces image sizes while maintaining excellent visual quality for full-size viewing
 * 
 * Settings:
 * - Resolution: Up to 4096x3072 (maintains detail for full-screen viewing)
 * - Quality: 82% (professional gallery standard)
 * - Format: Progressive JPEG (faster perceived load)
 * - Algorithm: mozjpeg (better compression efficiency)
 * 
 * Run with: node compress-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INPUT_DIR = path.join(__dirname, 'public/images/FINAL');
const BACKUP_DIR = path.join(__dirname, 'public/images/FINAL-backup');
const OUTPUT_DIR = path.join(__dirname, 'public/images/FINAL');

async function compressImages() {
  try {
    // Check if sharp is installed
    console.log('📦 Checking for sharp package...');
    let sharp;
    try {
      sharp = (await import('sharp')).default;
      console.log('✅ sharp found!\n');
    } catch {
      console.log('❌ sharp not found. Installing...');
      execSync('npm install sharp --save-dev', { stdio: 'inherit' });
      console.log('\n✅ sharp installed!\n');
      sharp = (await import('sharp')).default;
    }

    // Create backup directory
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
      console.log(`📁 Created backup directory: ${BACKUP_DIR}\n`);
    }

    // Get all images
    const files = fs.readdirSync(INPUT_DIR)
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

    console.log(`🖼️  Found ${files.length} images to compress\n`);
    console.log('🚀 Starting compression...\n');

    let totalOriginalSize = 0;
    let totalCompressedSize = 0;
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const inputPath = path.join(INPUT_DIR, file);
      const backupPath = path.join(BACKUP_DIR, file);
      const outputPath = path.join(OUTPUT_DIR, file);

      try {
        // Get original file size
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;
        totalOriginalSize += originalSize;

        // Backup original (only if not already backed up)
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(inputPath, backupPath);
        }

        // Compress with optimized settings - BALANCED QUALITY
        await sharp(inputPath)
          .resize(4096, 3072, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({
            quality: 82,           // Higher quality (82%) for professional viewing
            progressive: true,     // Progressive JPEG for better perception
            mozjpeg: true          // Better compression algorithm
          })
          .toFile(outputPath + '.tmp');

        // Get compressed file size
        const compressedStats = fs.statSync(outputPath + '.tmp');
        const compressedSize = compressedStats.size;
        const savedPercent = ((1 - compressedSize / originalSize) * 100).toFixed(1);

        totalCompressedSize += compressedSize;

        // Replace original with compressed
        fs.renameSync(outputPath + '.tmp', outputPath);

        successCount++;
        const progress = ((i + 1) / files.length * 100).toFixed(0);
        console.log(
          `[${progress}%] ${file.padEnd(20)} | ${(originalSize / 1024 / 1024).toFixed(1)} MB → ${(compressedSize / 1024).toFixed(0)} KB (saved: ${savedPercent}%)`
        );

      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('📊 COMPRESSION SUMMARY');
    console.log('='.repeat(80));
    console.log(`✅ Successfully compressed: ${successCount}/${files.length} images`);
    console.log(`📦 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(0)} MB`);
    console.log(`📦 Total compressed size: ${(totalCompressedSize / 1024 / 1024).toFixed(1)} MB`);
    console.log(`💾 Total saved: ${(totalOriginalSize / 1024 / 1024 - totalCompressedSize / 1024 / 1024).toFixed(1)} MB (${((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1)}%)`);
    console.log(`📁 Backups saved to: ${BACKUP_DIR}`);
    console.log('='.repeat(80));
    console.log('\n✨ Image compression complete! Your gallery will now load MUCH faster.\n');

  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

compressImages();
