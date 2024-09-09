<template>
    <div class="contact-item flex items-center justify-between space-x-4 rounded-2xl bg-secondary">
      <div class="flex items-center space-x-4">
        <img
            :src="`http://localhost${profilePicture}`" 
            alt="Profile Picture" 
            class="h-12 w-12 rounded-full object-cover"
            @error="handleImageError"
      >
        <div class="text-white">
          <p class="font-bold">{{ name }}</p>
          <p class="text-gray-300">{{ address }}</p>
        </div>
      </div>
      <NuxtLink :to="`/contact/${id}`" class="text-white text-xl">
      &gt;
    </NuxtLink>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactItem',
    props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      profilePicture: {
        type: String,
        required: true
      }
    },
    methods: {
        handleImageError(event) {
            event.target.src = 'https://umat.edu.gh/staffinfo/staffpix/default-medium(11).png';
        }
    }
  }
  </script>
  
  <style scoped>
  .contact-item {
    padding: 10px;
    margin-bottom: 5px;
  }
  </style>