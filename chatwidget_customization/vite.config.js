import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Copies scripts.js to public/scripts.js automatically
 * Ensures http://localhost:5001/scripts.js is available in both dev & build preview modes
 */
function syncPublicScripts() {
  return {
    name: 'sync-public-scripts',
    buildStart() {
      const publicDir = path.resolve(__dirname, 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.copyFileSync(
        path.resolve(__dirname, 'scripts.js'),
        path.resolve(publicDir, 'scripts.js')
      );
    }
  };
}

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
    syncPublicScripts(),
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
