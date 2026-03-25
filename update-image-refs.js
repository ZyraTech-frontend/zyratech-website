import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Recursively find all files matching patterns
 */
function findFiles(dir, patterns = [], fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // Skip node_modules and common non-essential directories
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build', '.venv', '__pycache__'].includes(file)) {
        findFiles(filePath, patterns, fileList);
      }
    } else {
      // Check if file matches pattern
      const matched = patterns.some((pattern) => {
        const regex = new RegExp(pattern + '$', 'i');
        return regex.test(file);
      });

      if (matched) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Update image references in a file from old formats to WebP
 */
function updateImageReferences(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Replace image paths in various formats
    // Pattern 1: src="/images/filename.jpg|jpeg|png"
    content = content.replace(/src=["']([^"']*\.(jpg|jpeg|png))["']/gi, (match, imagePath) => {
      const newPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return `src="${newPath}"`;
    });

    // Pattern 2: src={'images/filename.jpg|jpeg|png'}
    content = content.replace(/src=\{['"]([^"']*\.(jpg|jpeg|png))["']\}/gi, (match, imagePath) => {
      const newPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return `src={"${newPath}"}`;
    });

    // Pattern 3: imageUrl="/images/filename.jpg|jpeg|png"
    content = content.replace(/imageUrl=["']([^"']*\.(jpg|jpeg|png))["']/gi, (match, imagePath) => {
      const newPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return `imageUrl="${newPath}"`;
    });

    // Pattern 4: backgroundImage="/images/filename.jpg|jpeg|png"
    content = content.replace(/backgroundImage:\s*["']([^"']*\.(jpg|jpeg|png))["']/gi, (match, imagePath) => {
      const newPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return `backgroundImage: "${newPath}"`;
    });

    // Pattern 5: backgroundImage="/images/filename.jpg|jpeg|png" (in JSX strings)
    content = content.replace(/backgroundImage:\s*`([^`]*\.(jpg|jpeg|png))[^`]*`/gi, (match, imagePath) => {
      const newPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return `backgroundImage: \`${newPath}\``;
    });

    // Pattern 6: url('...') in CSS
    content = content.replace(/url\(['"]([^"']*\.(jpg|jpeg|png))["']\)/gi, (match, imagePath) => {
      const newPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return `url('${newPath}')`;
    });

    // Pattern 7: alt text with image names (shouldn't change alt, but might have path info)
    // Pattern 8: Direct strings like "/images/hero2.jpeg"
    content = content.replace(/["']([^"']*\/images\/[^"']*\.(jpg|jpeg|png))["']/gi, (match, imagePath) => {
      const newPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return `"${newPath}"`;
    });

    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Main function to update all image references
 */
function updateAllImageReferences() {
  console.log('\n🔄 Updating Image References in Project Files...\n');
  console.log('📁 Scanning for: .jsx, .js, .html files');
  console.log('─'.repeat(80));

  const filePatterns = ['jsx?$', 'html$'];
  const filesToUpdate = findFiles(path.join(__dirname, 'src'), filePatterns);
  
  // Also check HTML files in root
  if (fs.existsSync(path.join(__dirname, 'index.html'))) {
    filesToUpdate.push(path.join(__dirname, 'index.html'));
  }

  if (filesToUpdate.length === 0) {
    console.log('⚠️  No files found to update.');
    process.exit(0);
  }

  console.log(`\n🔍 Found ${filesToUpdate.length} source file(s) to scan\n`);

  let updatedCount = 0;
  const updatedFiles = [];

  filesToUpdate.forEach((filePath) => {
    if (updateImageReferences(filePath)) {
      updatedCount++;
      updatedFiles.push(path.relative(process.cwd(), filePath));
      console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`);
    }
  });

  console.log('\n' + '─'.repeat(80));
  console.log(`\n📊 Summary:\n`);
  console.log(`   • Files scanned: ${filesToUpdate.length}`);
  console.log(`   • Files updated: ${updatedCount}`);

  if (updatedFiles.length > 0) {
    console.log(`\n📝 Updated Files:`);
    updatedFiles.forEach((file) => {
      console.log(`   • ${file}`);
    });
  }

  console.log(`\n✨ Image reference update complete!\n`);
  console.log(`🎯 Next Steps:`);
  console.log(`   1. Review the updated files to ensure changes are correct`);
  console.log(`   2. Run: npm run dev`);
  console.log(`   3. Test all pages to verify images load correctly`);
  console.log(`   4. Run: npm run build`);
  console.log(`   5. Check Lighthouse Performance Score\n`);
}

// Run the update
updateAllImageReferences();
