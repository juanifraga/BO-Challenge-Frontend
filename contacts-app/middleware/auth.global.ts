import { defineNuxtRouteMiddleware, navigateTo, useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (import.meta.client) {
    userStore.initialize();
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (to.path !== '/login' && to.path !== '/signin' && isAuthenticated !== 'true') {
      return navigateTo('/login');
    }
  }
});