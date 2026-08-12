import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    copyPublicDir: true,
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