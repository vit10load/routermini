import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../auth/auth.service';
import MainLayout from '../layouts/MainLayout.vue';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SavedRoutesPage from '../pages/SavedRoutesPage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage,
        },
        {
          path: 'routes',
          name: 'routes',
          component: SavedRoutesPage,
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return '/login';
  }

  if (to.path === '/login' && isAuthenticated()) {
    return '/';
  }
  
});