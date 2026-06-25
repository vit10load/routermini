import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import SavedRoutesPage from '../pages/SavedRoutesPage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/routes',
      name: 'routes',
      component: SavedRoutesPage,
    },
  ],
});