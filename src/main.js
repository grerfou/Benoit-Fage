// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')


import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assurez-vous que ce chemin est correct

const app = createApp(App);

app.use(router); // Utiliser le routeur dans l'application Vue

app.mount('#app');
