<template>
    <div>
      <div class="flex justify-between items-center my-5">
        <h2 class="text-white font-bold text-2xl">Notes</h2>
        <NuxtLink to="/note/new" class="px-4 py-2 text-black rounded-2xl bg-buttonPrimary">Add New</NuxtLink>
      </div>
      <div class="relative my-5">
        <input
          type="text"
          placeholder="Search..."
          v-model="searchQuery"
          class="px-4 py-2 pr-10 rounded-2xl border border-gray-300 focus:outline-none w-full"
        />
        <img
          src="/static/mag.png"
          alt="Magnifier"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
        />
      </div>
      <NoteList :notes="filteredNotes" />
    </div>
  </template>
  
  <script>
  import NoteList from './NoteList.vue';
  import { useRuntimeConfig } from '#app';
  
  export default {
    name: 'NotesView',
    components: {
      NoteList,
      
    },
    data() {
      return {
        notes: [],
        searchQuery: ''
      };
    },
    computed: {
      filteredNotes() {
        return this.notes.filter(note =>
          note.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          note.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    async mounted() {
      try {
        const config = useRuntimeConfig();
        const domain = config.public.domain;
        const token = localStorage.getItem('token');
        const response = await $fetch(`${domain}/notes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.success) {
          this.notes = response.notes;
        } else {
          console.error('Failed to fetch notes:', response.message);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }
  };
  </script>
  