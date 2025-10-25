import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // THIS RESOLUTION BLOCK TO FORCE POSTCSS/TAILWIND LOADING
  css: {
    postcss: './postcss.config.cjs', // Point to your CommonJS PostCSS config
  },
  // --- ADD THIS SECTION ---
  // Explicitly define the environment variable for replacement during build
  define: {
    // This ensures Vercel's environment variable is correctly injected
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL)
  }
  // --- END ADD SECTION ---
});
