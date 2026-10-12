import type { APIRoute } from 'astro';
import { createSitemap } from '../../scripts/sitemap.mjs';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('The sitemap requires Astro.site');
  return new Response(createSitemap(site), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
