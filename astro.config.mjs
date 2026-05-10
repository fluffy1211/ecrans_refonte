import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import critters from 'astro-critters';
import compress from '@playform/compress';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://www.lesecranspastoutletemps.fr',
  trailingSlash: 'always',

  integrations: [
    tailwind(),
    sitemap(),
    critters(),
    compress({
      CSS: true,
      HTML: true,
      JavaScript: true,
      Image: false,
      SVG: false,
    }),
  ],

  adapter: cloudflare()
});