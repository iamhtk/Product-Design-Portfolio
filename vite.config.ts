
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';
  import { writeFileSync } from 'fs';
  import { sitemapXml } from './src/seo/sitemap';

  export default defineConfig({
    plugins: [
      react(),
      {
        name: 'emit-sitemap',
        closeBundle() {
          writeFileSync(path.resolve(__dirname, 'build/sitemap.xml'), sitemapXml());
        },
      },
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });