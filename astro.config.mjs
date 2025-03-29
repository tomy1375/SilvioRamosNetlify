import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      // Opcional: Configura la ubicación de tu archivo CSS
      config: { path: './tailwind.config.mjs' },
    }),
    react()
  ],
  output: 'server'
});