import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nandits.github.io/imobiliario',
  base: '/imobiliario',
  integrations: [tailwind(), sitemap()],
});
