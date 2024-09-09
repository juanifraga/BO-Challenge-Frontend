<template>
    <div class="bg-black min-h-screen flex flex-col items-center">
      <header class="bg-white p-4 fixed w-4/5 mt-2 rounded-2xl flex justify-between items-center">
        <div class="flex items-center">
          <NuxtLink to="/">
            <img src="/static/logo.png" alt="Logo" class="h-8">
          </NuxtLink>
        </div>
        <nav class="flex space-x-4 items-center">
          <div class="flex space-x-4 items-center">
            <NuxtLink to="/contacts" class="text-blue-500 hover:underline">Contacts</NuxtLink>
            <NuxtLink to="/notes" class="text-blue-500 hover:underline">Notes</NuxtLink>
          </div>
        </nav>
        <div class="flex space-x-4 items-center">
          <template v-if="isAuthenticated">
            <span class="text-white">{{ user?.name }}</span>
            <button @click="logout" class="text-blue-500 hover:underline">Log out</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="text-blue-500 hover:underline">Log in</NuxtLink>
            <NuxtLink to="/signin" class="hover:underline bg-buttonPrimary text-black px-3 py-1 rounded-2xl border border-white hover:bg-white hover:border-buttonPrimary">Sign In</NuxtLink>
          </template>
        </div>
      </header>
      <div class="h-20"></div>
      <main class="p-5 w-full flex-grow flex justify-center mt-20">
        <div class="w-4/5">
          <NuxtPage />
        </div>
      </main>
      <footer class="bg-gray-100 p-4 text-center w-full">
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  import { useRuntimeConfig } from '#app';
  
  const userStore = useUserStore();
  const router = useRouter();
  const config = useRuntimeConfig();
  const domain = config.public.domain;
  
  const isAuthenticated = computed(() => userStore.isAuthenticated);
  const user = computed(() => userStore.user);
  
  onMounted(() => {
    userStore.initialize();
  });
  
  const logout = async () => {
  try {
    const response = await $fetch(`${domain}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.success) {
      console.log('Logged out from server:', response);
      userStore.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    } else {
      console.error('Failed to log out from server:', response.message);
    }
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
  
  </script>