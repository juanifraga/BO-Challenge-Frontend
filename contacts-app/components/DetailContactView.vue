<template>
    <div class="detail-contact-view p-10 bg-secondary rounded-2xl relative w-2/5 min-w-50  mx-auto flex flex-col items-center">
      <div class="absolute top-4 right-4 flex space-x-4">
        <NuxtLink :to="`/contact/${contact.id}/edit`" class="text-white text-xl">
          <img src="/static/pencil.png" alt="Edit" class="w-6 h-6">
        </NuxtLink>
        <a href="#">
          <img src="/static/share.png" alt="Share" class="w-6 h-6">
        </a>
      </div>
      <div class="flex-row content-center items-center mb-4 pt-10 pb-5">
        <img :src="contact.profile_picture" alt="Profile Picture" class="w-32 h-32 rounded-full profile-picture" @error="handleImageError">
        <h2 class="text-2xl text-white text-center mt-4">{{ contact.name }}</h2>
      </div>
      <div class="text-white text-center">
        <p class="mt-6 text-center"><strong>Address</strong></p>
        <p class="mb-6 text-gray text-center">{{ contact.address }}</p>
        <p class="mt-6 text-center"><strong>Phone</strong></p>
        <p class="mb-6 text-gray text-center">{{ contact.phone_number }}</p>
        <p class="mt-6 text-center"><strong>Email</strong></p>
        <p class="mb-6 text-gray text-center">{{ contact.email }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DetailContactView',
    props: {
      contact: {
        type: Object,
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
  .detail-contact-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    padding: 20px; 
  }
  .profile-picture {
    border: 4px solid #242424; 
    box-shadow: 0 0 0 4px #54FA80;
  }
  </style>