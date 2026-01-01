import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src/pages',
  base: '/weliafood-prototype/', // Adapter au nom du repo
  publicDir: '../../public',
  resolve: {
    alias: {
      '/scripts': resolve(__dirname, 'src/scripts'),
      '/styles': resolve(__dirname, 'src/styles'),
    },
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        categorie: resolve(__dirname, 'src/pages/categorie.html'),
        produit: resolve(__dirname, 'src/pages/produit.html'),
        produit1: resolve(__dirname, 'src/pages/produit-1.html'),
        produit2: resolve(__dirname, 'src/pages/produit-2.html'),
        produit3: resolve(__dirname, 'src/pages/produit-3.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
        apropos: resolve(__dirname, 'src/pages/a-propos.html'),
        mentionsLegales: resolve(__dirname, 'src/pages/mentions-legales.html'),
        cgv: resolve(__dirname, 'src/pages/cgv.html'),
        confidentialite: resolve(__dirname, 'src/pages/confidentialite.html'),
        cookies: resolve(__dirname, 'src/pages/cookies.html'),
        notFound: resolve(__dirname, 'src/pages/404.html'),
      },
    },
  },
  server: {
    open: true,
  },
});
