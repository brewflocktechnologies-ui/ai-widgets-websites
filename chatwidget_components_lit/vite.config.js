import { defineConfig } from 'vite';
export default defineConfig({
    build: {
        lib: {
            entry: './index.ts',
            name: 'ChatWidgetLit',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {}
            }
        }
    }
});
//# sourceMappingURL=vite.config.js.map