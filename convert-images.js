import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_DIR = path.join(__dirname, 'public', 'images');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const WEBP_QUALITY = 80;

/**
 * Recursively find all image files in a directory
 */
function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively scan subdirectories
      findImages(filePath, fileList);
    } else {
      // Check if file has a supported image extension
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_FORMATS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Convert a single image to WebP format
 */
async function convertImage(inputPath) {
  return new Promise((resolve, reject) => {
    const parsedPath = path.parse(inputPath);
    const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

    sharp(inputPath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath, (err) => {
        if (err) {
          reject(err);
        } else {
          // Get file sizes for logging
          const inputSize = fs.statSync(inputPath).size;
          const outputSize = fs.statSync(outputPath).size;
          const savings = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);

          resolve({
            input: path.relative(process.cwd(), inputPath),
            output: path.relative(process.cwd(), outputPath),
            inputSize: formatBytes(inputSize),
            outputSize: formatBytes(outputSize),
            savings: `${savings}%`
          });
        }
      });
  });
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Main conversion function
 */
async function convertAllImages() {
  console.log('\n🖼️  Starting WebP Conversion Process...\n');
  console.log(`📁 Scanning directory: ${IMAGE_DIR}`);
  console.log(`⚙️  WebP Quality: ${WEBP_QUALITY}`);
  console.log('─'.repeat(80));

  try {
    // Check if directory exists
    if (!fs.existsSync(IMAGE_DIR)) {
      console.error(`❌ Error: Directory not found - ${IMAGE_DIR}`);
      process.exit(1);
    }

    // Find all images
    const images = findImages(IMAGE_DIR);

    if (images.length === 0) {
      console.log('⚠️  No images found to convert.');
      process.exit(0);
    }

    console.log(`\n📸 Found ${images.length} image(s) to convert:\n`);

    // Convert each image
    const results = [];
    for (const imagePath of images) {
      try {
        const result = await convertImage(imagePath);
        results.push(result);
        console.log(`✅ ${result.input}`);
        console.log(`   └─ Converted to: ${result.output}`);
        console.log(`   └─ Size: ${result.inputSize} → ${result.outputSize} (${result.savings} reduction)\n`);
      } catch (error) {
        console.error(`❌ Error converting ${imagePath}:`, error.message);
      }
    }

    // Summary
    console.log('─'.repeat(80));
    console.log(`\n✨ Conversion Complete!\n`);
    console.log(`📊 Summary:`);
    console.log(`   • Images converted: ${results.length}/${images.length}`);

    if (results.length > 0) {
      const totalInputSize = results.reduce((acc, r) => {
        const size = parseFloat(r.inputSize);
        return acc + size;
      }, 0);

      const totalOutputSize = results.reduce((acc, r) => {
        const size = parseFloat(r.outputSize);
        return acc + size;
      }, 0);

      const totalSavings = (((totalInputSize - totalOutputSize) / totalInputSize) * 100).toFixed(1);

      console.log(`   • Total size reduction: ${totalSavings}%`);
      console.log(`\n🎯 Next Steps:`);
      console.log(`   1. Run: npm run update-image-refs`);
      console.log(`   2. Verify images load correctly in browser`);
      console.log(`   3. Run: npm run build`);
      console.log(`   4. Test Lighthouse Performance Score\n`);
    }
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the conversion
convertAllImages();
