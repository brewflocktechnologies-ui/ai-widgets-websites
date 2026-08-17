import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: false,
    include: ['**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: ['components/**', 'store/**', 'tokens/**', 'utils/**', 'index.ts'],
      exclude: ['**/*.d.ts', '**/*.test.ts', '**/node_modules/**', 'dist/**', 'stories/**'],
      thresholds: {
        lines: 60,
        functions: 45,
        branches: 50,
        statements: 60,
      },
    },
  },
});
