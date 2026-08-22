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
        './mount': {
          import: './src/mount.js',
          // CSS is inlined into the iframe by mount.js, so the federation
          // runtime must NOT inject the shared stylesheet into the host
          // document <head> (that would leak global rules like
          // `html, body { overflow: hidden }` into the Next.js/host page).
          dontAppendStylesToHead: true,
        },
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
