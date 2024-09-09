<template>
    <div class="detail-note-view p-10 bg-secondary rounded-2xl relative w-2/5 min-w-50  mx-auto flex flex-col items-center">
    
      <div class="flex-row content-center items-center mb-4 pt-10 pb-5">
        <img :src="contact.profile_picture" alt="Profile Picture" class="w-32 h-32 rounded-full profile-picture">
        <h2 class="text-2xl text-white text-center mt-4">{{ contact.name }}</h2>
      </div>
      <div class="text-white text-center">
        <p class="mt-6 text-center"><strong>Text</strong></p>
        <p class="mb-6 text-gray text-center">{{ note.content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DetailNoteView',
    props: {
      contact: {
        type: Object,
        required: true
      },
        note: {
            type: Object,
            required: true
        }
    }
  }
  </script>
  
  <style scoped>
  .detail-note-view {
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