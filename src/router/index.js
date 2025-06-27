// import { createRouter, createWebHistory } from 'vue-router';

// import HomeLarge from '../components/Large/HomeLarge.vue';
// import WorkLarge from '../components/Large/WorkLarge.vue';
// import ContactLarge from '../components/Large/ContactLarge.vue';
// import ProjectLarge from '../components/Large/ProjectLarge.vue';

// import HomeSmall from '../components/Small/HomeSmall.vue';
// import WorkSmall from '../components/Small/WorkSmall.vue';
// import ContactSmall from '../components/Small/ContactSmall.vue';
// import ProjectSmall from '../components/Small/ProjectSmall.vue';

// // Routes pour grands écrans
// const largeRoutes = [
//   { path: '/', name: 'HomeLarge', component: HomeLarge },
//   { path: '/work', name: 'WorkLarge', component: WorkLarge },
//   { path: '/contact', name: 'ContactLarge', component: ContactLarge },
//   { path: '/project/:id', name: 'ProjectLarge', component: ProjectLarge, props: true }
// ];

// // Routes pour petits écrans
// const smallRoutes = [
//   { path: '/', name: 'HomeSmall', component: HomeSmall },
//   { path: '/work', name: 'WorkSmall', component: WorkSmall },
//   { path: '/contact', name: 'ContactSmall', component: ContactSmall },
//   { path: '/project/:id', name: 'ProjectSmall', component: ProjectSmall, props: true }
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [] // Initialiser avec un tableau vide
// });

// export const setupRouter = (isLargeScreen) => {
//   // Supprimer toutes les routes existantes avant d'ajouter les nouvelles
//   router.getRoutes().forEach(route => router.removeRoute(route.name));

//   // Ajouter les routes appropriées en fonction de la taille de l'écran
//   if (isLargeScreen) {
//     largeRoutes.forEach(route => router.addRoute(route));
//   } else {
//     smallRoutes.forEach(route => router.addRoute(route));
//   }

//   // Forcer une redirection vers '/' après l'ajout des routes
//   router.replace('/');
// };

// export default router;


import { createRouter, createWebHistory } from 'vue-router';

import HomeLarge from '../components/Large/HomeLarge.vue';
import WorkLarge from '../components/Large/WorkLarge.vue';
import ContactLarge from '../components/Large/ContactLarge.vue';
import ProjectLarge from '../components/Large/ProjectLarge.vue';

import HomeSmall from '../components/Small/HomeSmall.vue';
import WorkSmall from '../components/Small/WorkSmall.vue';
import ContactSmall from '../components/Small/ContactSmall.vue';
import ProjectSmall from '../components/Small/ProjectSmall.vue';

// Routes pour grands écrans
const largeRoutes = [
  { path: '/', name: 'HomeLarge', component: HomeLarge },
  { path: '/work', name: 'WorkLarge', component: WorkLarge },
  { path: '/contact', name: 'ContactLarge', component: ContactLarge },
  { path: '/project/:id', name: 'ProjectLarge', component: ProjectLarge, props: true }
];

// Routes pour petits écrans
const smallRoutes = [
  { path: '/', name: 'HomeSmall', component: HomeSmall },
  { path: '/work', name: 'WorkSmall', component: WorkSmall },
  { path: '/contact', name: 'ContactSmall', component: ContactSmall },
  { path: '/project/:id', name: 'ProjectSmall', component: ProjectSmall, props: true }
];

// Route par défaut pour gérer les routes non définies
const defaultRoute = {
  path: '/:pathMatch(.*)*', // Catch-all route
  redirect: '/' // Redirection vers la page d'accueil par défaut
};

const router = createRouter({
  history: createWebHistory(),
  routes: [defaultRoute] // Initialiser avec une route par défaut
});

export const setupRouter = (isLargeScreen) => {
  // Supprimer toutes les routes existantes avant d'ajouter les nouvelles
  router.getRoutes().forEach(route => {
    if (route.name) {
      router.removeRoute(route.name);
    }
  });

  // Ajouter les routes appropriées en fonction de la taille de l'écran
  if (isLargeScreen) {
    largeRoutes.forEach(route => router.addRoute(route));
  } else {
    smallRoutes.forEach(route => router.addRoute(route));
  }

  // Attendre que le routeur soit prêt avant de rediriger
  router.isReady().then(() => {
    router.replace('/'); // Rediriger vers la page d'accueil
  });
};

// Appeler setupRouter immédiatement après la création du routeur
setupRouter(window.innerWidth > 768); // Exemple de breakpoint pour grand/petit écran

export default router;
