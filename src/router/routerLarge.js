// src/router/routerLarge.js
import { createRouter, createWebHistory } from 'vue-router';

import HomeLarge from '../components/Large/HomeLarge.vue';
import WorkLarge from '../components/Large/WorkLarge.vue';
import ContactLarge from '../components/Large/ContactLarge.vue';
import ProjectLarge from '../components/Large/ProjectLarge.vue';

const routes = [
  { path: '/', name: 'HomeLarge', component: HomeLarge },
  { path: '/work', name: 'WorkLarge', component: WorkLarge },
  { path: '/contact', name: 'ContactLarge', component: ContactLarge },
  { path: '/project/:id', name: 'ProjectLarge', component: ProjectLarge, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/' } // Redirection en cas de route inconnue
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

