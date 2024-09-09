<template>
    <div>
      <ContactsView />
    </div>
  </template>
  
  <script lang="ts" setup>
  import ContactsView from '~/components/ContactsView.vue';
  import authMiddleware from '~/middleware/auth.global';
  
  definePageMeta({
    middleware: [authMiddleware]
  });
  </script>