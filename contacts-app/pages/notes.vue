<template>
  <div>
    <NotesView />
  </div>
</template>

<script lang="ts" setup>
import NotesView from '~/components/NotesView.vue';
import authMiddleware from '~/middleware/auth.global';
  
  definePageMeta({
    middleware: [authMiddleware]
  });
</script>