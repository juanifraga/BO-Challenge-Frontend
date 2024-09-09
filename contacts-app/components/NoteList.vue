<template>
    <div class="note-list flex flex-wrap">
      <div
        v-for="note in notes"
        :key="note.id"
        class="w-1/2 p-2"
      >
        <NoteItem
          :id="note.id"
          :name="note.contact.name"
          :text="note.content"
          :profilePicture="note.contact.profile_picture"
        />
      </div>
    </div>
  </template>
  
  <script>
  import NoteItem from './NoteItem.vue';
  
  export default {
    name: 'NoteList',
    components: {
      NoteItem
    },
    props: {
      notes: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  </style>