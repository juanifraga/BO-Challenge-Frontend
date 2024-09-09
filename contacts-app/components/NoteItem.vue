<template>
    <div class="note-item flex items-center justify-between space-x-4 rounded-2xl bg-secondary">
      <div class="flex items-center space-x-4">
        <img :src="`http://localhost${profilePicture}`" alt="Profile Picture" class="h-12 w-12 rounded-full object-cover">
        <div class="text-white">
          <p class="font-bold">{{ name }}</p>
          <p class="text-gray-300">{{ text }}</p>
        </div>
      </div>
      <NuxtLink :to="`/note/${id}`" class="text-white text-xl">
      &gt;
    </NuxtLink>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NoteItem',
    props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      profilePicture: {
        type: String,
        required: true
      }
    },
  }
  </script>
  
  <style scoped>
  .note-item {
    padding: 10px;
    margin-bottom: 5px;
  }
  </style>