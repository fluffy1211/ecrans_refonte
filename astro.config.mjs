import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import critters from 'astro-critters';
import compress from '@playform/compress';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://www.lesecranspastoutletemps.fr',
  trailingSlash: 'always',

  integrations: [
    tailwind(),
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