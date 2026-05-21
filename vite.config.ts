import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({mode}) => {
  return {
    plugins: [react(), tailwindcss()],
    base: mode === 'production' ? '/aimwebsite0.5/' : '/',
    cacheDir: path.resolve(__dirname, '.vite'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Allows disabling HMR during agent-driven edits when browser refresh flicker gets noisy.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
