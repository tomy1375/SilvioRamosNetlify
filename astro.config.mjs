import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      // Opcional: Configura la ubicación de tu archivo CSS
      config: { path: './tailwind.config.mjs' },
    }),
    react()
  ],
  output: 'server',
  adapter: vercel({
    // Opciones del adaptador (opcional)
    // analytics: true,
  }),
});