import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync } from 'fs';
import { join, extname, basename } from 'path';

const IMAGES_DIR = 'public/images';
const OG_IMAGE = 'public/images/og-image.jpg';

async function convertToWebp(inputPath, outputPath, options = {}) {
  const { quality = 85, width } = options;
  let pipeline = sharp(inputPath).webp({ quality, effort: 4 });
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  await pipeline.toFile(outputPath);
  console.log(`✓ ${outputPath}`);
}

async function main() {
  const files = readdirSync(IMAGES_DIR).filter(f =>
    ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase())
  );

  console.log('Converting images to WebP...\n');

  for (const file of files) {
    const input = join(IMAGES_DIR, file);
    const output = join(IMAGES_DIR, `${basename(file, extname(file))}.webp`);
    await convertToWebp(input, output);
  }

  // Create OG image 1200x675
  console.log('\nCreating OG image...');
  const ogSource = join(IMAGES_DIR, 'hero-beatrice-enfants.jpg');
  if (existsSync(ogSource)) {
    await sharp(ogSource)
      .resize({ width: 1200, height: 675, fit: 'cover', position: 'center' })
      .jpeg({ quality: 90 })
      .toFile(OG_IMAGE);
    console.log(`✓ ${OG_IMAGE}`);
  } else {
    console.warn('OG source image not found');
  }

  console.log('\nDone.');
}

main().catch(console.error);
