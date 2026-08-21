import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'chatwidget_customization',
      filename: 'remoteEntry.js',
      exposes: {
        './index.html': './src/indexHtml.js',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
