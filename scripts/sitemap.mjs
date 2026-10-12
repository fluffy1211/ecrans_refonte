import process from 'node:process';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const priorities = {
  '/': '1.0',
  '/spectacle-6-9-ans/': '0.8',
  '/spectacle-9-12-ans/': '0.8',
  '/projet-realisations/': '0.7',
  '/a-propos/': '0.6',
  '/contact/': '0.8',
  '/mentions-legales/': '0.5',
};

/** Publish static Astro pages, excluding error and dynamic routes. */
export function createSitemap(site, root = process.cwd()) {
  const pages = readdirSync(resolve(root, 'src/pages'), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.astro'))
    .map(entry => relative(root, resolve(entry.parentPath, entry.name)).split(sep).join('/'))
    .filter(file => !file.includes('[') && !/(^|\/)(404|500)\.astro$/.test(file))
    .filter(file => !/\bnoindex(?:\s*=\s*\{true\}|(?=\s|\/?>))/.test(readFileSync(resolve(root, file), 'utf8')))
    .sort();

  const urls = pages.map(file => {
    const route = file.replace(/^src\/pages\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
    const segments = route.split('/').filter(Boolean).map(encodeURIComponent);
    const pathname = segments.length ? `/${segments.join('/')}/` : '/';
    const loc = new URL(pathname, site).toString().replaceAll('&', '&amp;');
    let lastmod;
    try {
      // Shared markup, metadata and assets also change the published page.
      const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', file,
        'src/components', 'src/layouts', 'src/lib', 'public'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      if (iso) lastmod = new Date(iso).toISOString().split('T')[0];
    } catch {
      // Source archives without Git still publish a valid sitemap.
    }
    return `  <url>\n    <loc>${loc}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <priority>${priorities[pathname] ?? '0.5'}</priority>\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
}
