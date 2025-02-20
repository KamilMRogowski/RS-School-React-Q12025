/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/RS-School-React-Q12025/',
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
      ],
    },
    setupFiles: './src/utils/mocks/testsSetup.ts',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/styles/variables" as *;`,
      },
    },
  },
});
