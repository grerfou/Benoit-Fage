import { createRouter, createWebHistory } from 'vue-router';
import LargeMain from '../components/Large/LargeMain.vue';
import ProjectLarge from '../components/Large/ProjectLarge.vue';

const routes = [
  { path: '/', name: 'LargeMain', component: LargeMain },
  { path: '/project/:id', name: 'ProjectLarge', component: ProjectLarge, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

