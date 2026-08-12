import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './index.ts',
      name: 'ChatWidgetLit',
      fileName: () => 'chat-widget.js',
      formats: ['iife'],
    },

    rollupOptions: {
      external: [],
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});