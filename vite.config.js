import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// У режимі розробки запити /api/* проксуються на мок-бекенд (npm run server, порт 3001),
// тому в коді достатньо звертатися до відносної адреси '/api'.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  preview: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
