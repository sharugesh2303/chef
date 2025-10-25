import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 👈 ADD THIS RESOLUTION BLOCK TO FORCE POSTCSS/TAILWIND LOADING
  css: {
    postcss: './postcss.config.cjs', // Point to your CommonJS PostCSS config
  },
});