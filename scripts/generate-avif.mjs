import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicImagesDir = path.join(__dirname, '../public/images');

async function generateAVIF() {
  try {
    const files = fs.readdirSync(publicImagesDir).filter(file =>
      /\.(png|jpg|jpeg|webp)$/i.test(file)
    );

    for (const file of files) {
      const inputPath = path.join(publicImagesDir, file);
      const outputPath = path.join(publicImagesDir, file.replace(/\.(png|jpg|jpeg|webp)$/i, '.avif'));

      // Skip if AVIF already exists
      if (fs.existsSync(outputPath)) {
        console.log(`⏭️  Skipping ${file} (AVIF already exists)`);
        continue;
      }

      try {
        const stats = await sharp(inputPath).avif({ quality: 80 }).toFile(outputPath);
        console.log(`✅ Generated ${path.basename(outputPath)} (${Math.round(stats.size / 1024)}KB)`);
      } catch (err) {
        console.error(`❌ Failed to convert ${file}: ${err.message}`);
      }
    }
  } catch (err) {
    console.error('Error reading images directory:', err);
    process.exit(1);
  }
}

generateAVIF();
