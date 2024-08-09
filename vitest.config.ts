import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  envPrefix: 'CTP_',
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
      '@core': resolve(__dirname, './app/src/core/'),
      '@pages': resolve(__dirname, './app/src/pages/'),
      '@components': resolve(__dirname, './app/src/components/'),
      '@models': resolve(__dirname, './app/src/models/'),
      '@enums': resolve(__dirname, './app/src/enums/'),
      '@constants': resolve(__dirname, './app/src/constants/'),
      '@utils': resolve(__dirname, './app/src/utils/'),
      '@store': resolve(__dirname, './app/src/store/'),
      '@mocks': resolve(__dirname, './app/src/mocks/'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
