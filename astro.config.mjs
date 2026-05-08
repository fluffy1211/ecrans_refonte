import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.lesecranspastoutletemps.fr',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/mentions-legales'),
    }),
  ],
});
