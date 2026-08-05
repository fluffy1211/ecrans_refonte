import type { APIRoute } from 'astro';
import { execSync } from 'child_process';

function getGitLastmod(filePath: string): string | undefined {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${filePath}"`, { encoding: 'utf-8' }).trim();
    if (!iso) return undefined;
    return new Date(iso).toISOString().split('T')[0];
  } catch {
    return undefined;
  }
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, '');

  const urls = [
    { loc: '/', file: 'src/pages/index.astro', priority: '1.0' },
    { loc: '/spectacle-6-9-ans/', file: 'src/pages/spectacle-6-9-ans.astro', priority: '0.8' },
    { loc: '/spectacle-9-12-ans/', file: 'src/pages/spectacle-9-12-ans.astro', priority: '0.8' },
    { loc: '/projet-realisations/', file: 'src/pages/projet-realisations.astro', priority: '0.7' },
    { loc: '/a-propos/', file: 'src/pages/a-propos.astro', priority: '0.6' },
    { loc: '/contact/', file: 'src/pages/contact.astro', priority: '0.8' },
    { loc: '/mentions-legales/', file: 'src/pages/mentions-legales.astro', priority: '0.5' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => {
  const lastmod = getGitLastmod(url.file);
  return `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <priority>${url.priority}</priority>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
