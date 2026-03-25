import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEBP_QUALITY = 80;

/**
 * Fix failed image conversions
 */
async function fixFailedImages() {
  console.log('\n🔧 Fixing Failed Image Conversions...\n');

  // Failed images to retry
  const failedImages = [
    'public/images/FINAL/0B2A1698.jpg',
    'public/images/FINAL/0B2A1715.jpg',
    'public/images/FINAL/0B2A1716.jpg',
    'public/images/FINAL/0B2A1717.jpg',
    'public/images/FINAL/0B2A1718.jpg',
    'public/images/takeout-3-001-2/IMG_5435.JPG'
  ];

  let fixedCount = 0;
  let skippedCount = 0;

  for (const imagePath of failedImages) {
    const fullPath = path.join(__dirname, imagePath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Skipped (not found): ${imagePath}`);
      skippedCount++;
      continue;
    }

    try {
      const parsedPath = path.parse(fullPath);
      const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

      // Remove .tmp file if it exists
      const tmpPath = fullPath + '.tmp';
      if (fs.existsSync(tmpPath)) {
        fs.unlinkSync(tmpPath);
        console.log(`🗑️  Removed incomplete .tmp file: ${imagePath}.tmp`);
      }

      await new Promise((resolve, reject) => {
        sharp(fullPath)
          .webp({ quality: WEBP_QUALITY })
          .toFile(outputPath, (err) => {
            if (err) {
              reject(err);
            } else {
              const inputSize = fs.statSync(fullPath).size;
              const outputSize = fs.statSync(outputPath).size;
              const savings = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);

              console.log(`✅ Fixed: ${imagePath}`);
              console.log(`   → ${path.basename(outputPath)}`);
              console.log(`   → Size: ${(inputSize / 1024).toFixed(1)} KB → ${(outputSize / 1024).toFixed(1)} KB (${savings}% reduction)\n`);
              fixedCount++;
              resolve();
            }
          });
      });
    } catch (error) {
      console.error(`❌ Error fixing ${imagePath}:`, error.message);
      skippedCount++;
    }
  }

  console.log('\n' + '─'.repeat(80));
  console.log(`\n📊 Summary:\n`);
  console.log(`   • Images fixed: ${fixedCount}`);
  console.log(`   • Images skipped/failed: ${skippedCount}`);
  console.log(`\n⚠️  Note about .HEIC files:`);
  console.log(`   • Sharp doesn't support Apple's HEIC format natively`);
  console.log(`   • Found 13 .HEIC files in takeout-3-001-1/`);
  console.log(`   • Options:`);
  console.log(`     1. Convert .HEIC to JPG manually (use online converter)`);
  console.log(`     2. Skip these files if not used in the website`);
  console.log(`     3. Install ImageMagick for HEIC support\n`);
  console.log(`🎯 Next Steps:`);
  console.log(`   1. If you have .HEIC files to use, convert them to JPG first`);
  console.log(`   2. Re-run: npm run optimize-images`);
  console.log(`   3. Re-run: npm run update-image-refs`);
  console.log(`   4. Run: npm run dev to test\n`);
}

fixFailedImages().catch(console.error);
