// // src/router/index.js
// import { createRouter, createWebHistory } from 'vue-router';
// import HomePage from '../components/HomePage.vue';
// import AboutPage from '../components/AboutPage.vue';
// import ContactPage from '../components/ContactPage.vue';

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: HomePage
//   },
//   {
//     path: '/about',
//     name: 'About',
//     component: AboutPage
//   },
//   {
//     path: '/contact',
//     name: 'Contact',
//     component: ContactPage
//   }
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });

// export default router;


import { createRouter, createWebHistory } from 'vue-router';
import HomeLarge from '../components/Large/HomeLarge.vue';
import AboutLarge from '../components/Large/AboutLarge.vue';
import ContactLarge from '../components/Large/ContactLarge.vue';

import HomeSmall from '../components/Small/HomeSmall.vue';
import AboutSmall from '../components/Small/WorkSmall.vue';
import ContactSmall from '../components/Small/ContactSmall.vue';

// Routes pour grands écrans
const largeRoutes = [
  { path: '/', name: 'HomeLarge', component: HomeLarge },
  { path: '/about', name: 'AboutLarge', component: AboutLarge },
  { path: '/contact', name: 'ContactLarge', component: ContactLarge }
];

// Routes pour petits écrans
const smallRoutes = [
  { path: '/', name: 'HomeSmall', component: HomeSmall },
  { path: '/about', name: 'AboutSmall', component: AboutSmall },
  { path: '/contact', name: 'ContactSmall', component: ContactSmall }
];

const router = createRouter({
  history: createWebHistory(),
  routes: [] // Initialiser avec un tableau vide
});

export const setupRouter = (isLargeScreen) => {
  // Supprimer toutes les routes existantes avant d'ajouter les nouvelles
  router.getRoutes().forEach(route => router.removeRoute(route.name));

  // Ajouter les routes appropriées en fonction de la taille de l'écran
  if (isLargeScreen) {
    largeRoutes.forEach(route => {
      router.addRoute(route);
      console.log(`Added route for large screen: ${route.path}`);
    });
  } else {
    smallRoutes.forEach(route => {
      router.addRoute(route);
      console.log(`Added route for small screen: ${route.path}`);
    });
  }

  // Forcer une redirection vers '/' après l'ajout des routes
  router.replace('/');
};

export default router;
