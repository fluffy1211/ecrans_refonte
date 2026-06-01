import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import critters from 'astro-critters';
import compress from '@playform/compress';
import { execSync } from 'child_process';

import cloudflare from "@astrojs/cloudflare";

function getGitLastmod(url) {
  const path = url.replace('https://www.lesecranspastoutletemps.fr', '').replace(/\/$/, '');
  const file = path === '' ? 'src/pages/index.astro' : `src/pages${path}.astro`;
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${file}"`, { encoding: 'utf-8' }).trim();
    if (!iso) return undefined;
    return new Date(iso);
  } catch {
    return undefined;
  }
}

export default defineConfig({
  site: 'https://www.lesecranspastoutletemps.fr',
  trailingSlash: 'always',

  integrations: [
    tailwind(),
    sitemap({
      serialize(item) {
        const lastmod = getGitLastmod(item.url);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
    critters(),
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          collapseWhitespace: true,
          removeComments: true,
          caseSensitive: true,
          minifyCSS: false,
          minifyJS: false,
          processScripts: [],
        },
      },
      JavaScript: true,
      Image: false,
      SVG: false,
    }),
  ],

  adapter: cloudflare()
});