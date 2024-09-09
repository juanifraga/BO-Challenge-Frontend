<template>
    <div class="landing-page">
      <header>
      </header>
      <main>
        <component :is="viewComponent" />
      </main>
      <footer>
      </footer>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import { useUserStore } from '~/stores/user';
  import LoginView from '~/components/LoginView.vue';
  import ContactsView from '~/components/ContactsView.vue';
  
  const userStore = useUserStore();
  
  const viewComponent = computed(() => {
    return userStore.isAuthenticated ? ContactsView : LoginView;
  });
  
  onMounted(() => {
    userStore.initialize();
  });
  </script>