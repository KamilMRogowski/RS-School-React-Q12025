/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  plugins: [!process.env.VITEST && reactRouter()],
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
