import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Robustly load API key: check .env file first (env.API_KEY), then system env vars (process.env.API_KEY) for Netlify
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY),
    },
  };
});