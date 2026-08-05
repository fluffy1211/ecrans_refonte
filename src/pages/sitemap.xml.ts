import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, '');

  const urls = [
    { loc: '/', priority: '1.0' },
    { loc: '/spectacle-6-9-ans/', priority: '0.8' },
    { loc: '/spectacle-9-12-ans/', priority: '0.8' },
    { loc: '/projet-realisations/', priority: '0.7' },
    { loc: '/zone-intervention/', priority: '0.7' },
    { loc: '/a-propos/', priority: '0.6' },
    { loc: '/contact/', priority: '0.8' },
    { loc: '/mentions-legales/', priority: '0.5' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
