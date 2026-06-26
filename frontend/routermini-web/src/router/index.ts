import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../auth/auth.service';
import AuthLayout from '../layouts/AuthLayout.vue';
import MainLayout from '../layouts/MainLayout.vue';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import SavedRoutesPage from '../pages/SavedRoutesPage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginPage,
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterPage,
        },
      ],
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
    return '/auth/login';
  }

  if ((to.path === '/auth/login' || to.path === '/auth/register') &&
    isAuthenticated()
  ) {
    return '/';
  }

});