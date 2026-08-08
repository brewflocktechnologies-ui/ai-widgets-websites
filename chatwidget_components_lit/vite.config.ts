import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: './index.ts',
        'widget-injector': './scripts/widget-injector.ts'
      },
      name: 'ChatWidgetLit',
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : format + '.js'}`,
      formats: ['es']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
