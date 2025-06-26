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

// Routes pour grands écrans (sans la route '/')
const largeRoutes = [
  { path: '/work', name: 'WorkLarge', component: WorkLarge },
  { path: '/contact', name: 'ContactLarge', component: ContactLarge },
  { path: '/project/:id', name: 'ProjectLarge', component: ProjectLarge, props: true }
];

// Routes pour petits écrans (sans la route '/')
const smallRoutes = [
  { path: '/work', name: 'WorkSmall', component: WorkSmall },
  { path: '/contact', name: 'ContactSmall', component: ContactSmall },
  { path: '/project/:id', name: 'ProjectSmall', component: ProjectSmall, props: true }
];

// Route '/' initiale (petite version par défaut)
const initialRootRoute = {
  path: '/',
  name: 'HomeSmall',
  component: HomeSmall
};

// Route par défaut catch-all avec redirection vers '/'
const defaultRoute = {
  path: '/:pathMatch(.*)*',
  name: 'DefaultRoute',
  redirect: '/'
};

// Création du routeur avec '/' et la route par défaut
const router = createRouter({
  history: createWebHistory(),
  routes: [
    initialRootRoute,
    defaultRoute
  ]
});

let currentIsLargeScreen = window.innerWidth > 768;

export const setupRouter = (isLargeScreen) => {
  if (isLargeScreen === currentIsLargeScreen) {
    return; // pas besoin de changement
  }

  // Supprimer toutes les routes sauf '/' et la route par défaut
  router.getRoutes().forEach(route => {
    if (route.name && route.name !== 'DefaultRoute' && route.name !== 'HomeSmall' && route.name !== 'HomeLarge') {
      router.removeRoute(route.name);
    }
  });

  // Gérer la route '/' selon la taille (HomeSmall ou HomeLarge)
  if (isLargeScreen && router.hasRoute('HomeSmall')) {
    router.removeRoute('HomeSmall');
    router.addRoute({ path: '/', name: 'HomeLarge', component: HomeLarge });
  }
  else if (!isLargeScreen && router.hasRoute('HomeLarge')) {
    router.removeRoute('HomeLarge');
    router.addRoute({ path: '/', name: 'HomeSmall', component: HomeSmall });
  }

  // Ajouter les autres routes spécifiques
  const routesToAdd = isLargeScreen ? largeRoutes : smallRoutes;
  routesToAdd.forEach(route => {
    if (!router.hasRoute(route.name)) {
      router.addRoute(route);
    }
  });

  currentIsLargeScreen = isLargeScreen;
};

// Setup initial
setupRouter(currentIsLargeScreen);

// Écoute des changements de taille
window.addEventListener('resize', () => {
  const isLarge = window.innerWidth > 768;
  setupRouter(isLarge);
});

export default router;

