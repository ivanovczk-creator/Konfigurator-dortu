import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Robustly load API key: check .env, then system env, then use the provided hardcoded key as backup
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || "AIzaSyBBLCD7k1lgljXCR6nPrylGnsoOdT1qqqI"),
    },
  };
});