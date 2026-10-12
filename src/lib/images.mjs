import process from 'node:process';
import { existsSync, readdirSync, readFileSync, mkdirSync, renameSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { createHash } from 'node:crypto';

const defaultDirectory = join(process.cwd(), 'public/images');
const generatedDirectory = join(process.cwd(), '.astro/image-variants');
const originals = /\.(jpg|jpeg|png)$/i;
const fingerprint = file => createHash('sha256').update(readFileSync(file)).digest('hex');

/** Resolve available variants without changing the fallback. */
export function imageSources(src, directory = defaultDirectory, generated = generatedDirectory) {
  if (!src.startsWith('/images/') || src.includes('?') || src.includes('#')) return [];
  const file = basename(src);
  const extension = extname(file).toLowerCase();
  if (!originals.test(file) && extension !== '.webp') return [];
  const formats = extension === '.webp' ? [] : ['webp'];
  return formats.flatMap(format => {
    const variant = file.slice(0, -extension.length) + `.${format}`;
    return existsSync(join(generated, variant)) || existsSync(join(directory, variant))
      ? [{ src: src.slice(0, -extname(src).length) + `.${format}`, type: `image/${format}` }]
      : [];
  });
}

/** Generate WebP from originals and cache conversions by content, never timestamps. */
export async function prepareImages(directory = defaultDirectory, outputDirectory = generatedDirectory) {
  const { default: sharp } = await import('sharp');
  const files = readdirSync(directory).sort();
  const originalFiles = files.filter(file => originals.test(file));
  const stems = originalFiles.map(file => file.slice(0, -extname(file).length));
  if (new Set(stems).size !== stems.length) throw new Error('Several original images share the same filename stem');
  const sources = originalFiles;
  mkdirSync(outputDirectory, { recursive: true });
  const cachePath = join(outputDirectory, 'manifest.json');
  let cache = {};
  try { cache = JSON.parse(readFileSync(cachePath, 'utf8')); } catch { /* No usable cache: regenerate. */ }
  const manifest = {};

  for (const file of sources) {
    const source = join(directory, file);
    const sourceHash = fingerprint(source);
    const extension = extname(file);
    const formats = ['webp'];
    for (const format of formats) {
      const name = file.slice(0, -extension.length) + `.${format}`;
      const output = join(outputDirectory, name);
      const previous = cache[name];
      if (previous?.sourceHash === sourceHash && existsSync(output) && previous.outputHash === fingerprint(output)) {
        manifest[name] = previous;
        continue;
      }
      const temporary = `${output}.tmp`;
      try {
        await sharp(source).toFormat(format, { quality: 85, effort: 4 }).toFile(temporary);
        renameSync(temporary, output);
        manifest[name] = { sourceHash, outputHash: fingerprint(output) };
      } catch (error) {
        rmSync(temporary, { force: true });
        throw new Error(`Image conversion failed: ${file} → ${format}`, { cause: error });
      }
    }
  }
  // Removed sources must not leave generated variants available to callers.
  for (const file of readdirSync(outputDirectory)) {
    if (/\.(avif|webp)$/.test(file) && !manifest[file]) rmSync(join(outputDirectory, file));
  }
  writeFileSync(`${cachePath}.tmp`, JSON.stringify(manifest));
  renameSync(`${cachePath}.tmp`, cachePath);
}

/** Publish the exact derivatives verified during preparation, leaving sources untouched. */
export function publishImages(outputDirectory = join(process.cwd(), 'dist/images'), generated = generatedDirectory) {
  const manifest = JSON.parse(readFileSync(join(generated, 'manifest.json'), 'utf8'));
  mkdirSync(outputDirectory, { recursive: true });
  for (const [file, entry] of Object.entries(manifest)) {
    const source = join(generated, file);
    if (fingerprint(source) !== entry.outputHash) throw new Error(`Generated image changed before publication: ${file}`);
    copyFileSync(source, join(outputDirectory, file));
  }
}
