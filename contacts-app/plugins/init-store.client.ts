import { defineNuxtPlugin, useNuxtApp } from '#app';
import { useUserStore } from '@/stores/user';

export default defineNuxtPlugin((nuxtApp) => {
  const { isClient } = useNuxtApp();

  if (isClient) {
    const userStore = useUserStore();
    userStore.initialize();
  }
});