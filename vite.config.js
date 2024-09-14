// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   assetsInclude: ['**/*.glb'],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   build: {
//     sourcemap: false // Assurez-vous que les cartes sources sont générées lors de la construction
//   }
// })


import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.glb'],
  build: {
    sourcemap: true // Assurez-vous que les cartes sources sont activées
  }
});
