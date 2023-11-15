import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@/assets', replacement: '/src/assets' },
      { find: '@/components', replacement: '/src/components' },
      { find: '@/constants', replacement: '/src/constants' },
      { find: '@/hooks', replacement: '/src/hooks' },
      { find: '@/pages', replacement: '/src/pages' },
      { find: '@/services', replacement: '/src/services' },
      { find: '@/store', replacement: '/src/store' },
      { find: '@/styles', replacement: '/src/styles' },
      { find: '@/types', replacement: '/src/types' },
      { find: '@/utils', replacement: '/src/utils' },
      { find: '@', replacement: '/src' },
    ],
  },
});
