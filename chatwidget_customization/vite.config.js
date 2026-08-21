import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  server: {
    port: 5001,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  preview: {
    port: 5001,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  plugins: [
    federation({
      name: 'chatwidget_customization',
      filename: 'remoteEntry.js',
      exposes: {
        './mount': './src/mount.js',
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
