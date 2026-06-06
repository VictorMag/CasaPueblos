// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://casadelospueblosdelsur.org',
  // base controla el prefijo de todas las rutas. Producción usa '/' (raíz del dominio);
  // la preview en subcarpeta usa '/preview/' vía la env var PUBLIC_BASE.
  base: process.env.PUBLIC_BASE || '/',
  integrations: [
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
