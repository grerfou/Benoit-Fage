// src/router/routerSmall.js
/*
import { createRouter, createWebHistory } from 'vue-router';

import HomeSmall from '../components/Small/HomeSmall.vue';
import WorkSmall from '../components/Small/WorkSmall.vue';
import ContactSmall from '../components/Small/ContactSmall.vue';
import ProjectSmall from '../components/Small/ProjectSmall.vue';

const routes = [
  { path: '/', name: 'HomeSmall', component: HomeSmall },
  { path: '/work', name: 'WorkSmall', component: WorkSmall },
  { path: '/contact', name: 'ContactSmall', component: ContactSmall },
  { path: '/project/:id', name: 'ProjectSmall', component: ProjectSmall, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
*/

import { createRouter, createWebHistory } from 'vue-router';
import SmallMain from '../components/Small/SmallMain.vue';
import ProjectSmall from '../components/Small/ProjectSmall.vue';

const routes = [
  { path: '/', name: 'SmallMain', component: SmallMain },
  { path: '/project/:id', name: 'ProjectSmall', component: ProjectSmall, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

