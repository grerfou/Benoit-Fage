// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

/*
import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assurez-vous que ce chemin est correct

const app = createApp(App);

app.use(router); // Utiliser le routeur dans l'application Vue

app.mount('#app');

*/

// src/main.js
import { createApp } from 'vue';
import App from './App.vue';

const isLargeScreen = window.innerWidth > 768;

// Chargement dynamique du bon routeur
const loadApp = async () => {
  const router = isLargeScreen
    ? (await import('./router/routerLarge.js')).default
    : (await import('./router/routerSmall.js')).default;

  const app = createApp(App);
  app.use(router);
  app.mount('#app');
};

loadApp();


