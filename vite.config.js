import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Fermenti',
      formats: ['es', 'umd'],
      fileName: (format) => `fermenti.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
    cssFileName: 'fermenti',
    cssCodeSplit: false,
    outDir: 'dist',
  },
  root: '.',
  server: {
    open: '/demo/index.html',
  },
});
