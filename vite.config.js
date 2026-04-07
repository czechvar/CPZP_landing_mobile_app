import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        subpage: resolve(__dirname, 'subpage.html')
      },
      output: {
        // add manualChunks here if Swiper is imported in future
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    open: true,
    host: true
  },
  assetsInlineLimit: 4096,
  css: {
    devSourcemap: true
  }
});
