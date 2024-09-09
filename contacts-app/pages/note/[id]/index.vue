<template>
    <div>
      <DetailNoteView v-if="note" :note="note" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import DetailNoteView from '~/components/DetailNoteView.vue';
  import { useRuntimeConfig } from '#app';
  
  export default {
    name: 'NoteDetail',
    components: {
      DetailNoteView
    },
    setup() {
      const route = useRoute();
      const note = ref(null);
      const config = useRuntimeConfig();
      const domain = config.public.domain;
  
      const fetchNote = async () => {
        try {
          const token = localStorage.getItem('token'); 
          const response = await fetch(`${domain}/notes/${route.params.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          note.value = await response.json();
        } catch (error) {
          console.error('Error fetching note data:', error);
        }
      };

      const contact = ref(null);
  
      const fetchContact = async () => {
        try {
          const token = localStorage.getItem('token'); 
          const response = await fetch(`${domain}/contacts/${route.params.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          contact.value = await response.json();
        } catch (error) {
          console.error('Error fetching contact data:', error);
        }
      };
  
      onMounted(() => {
        fetchNote();
        fetchContact();
      });
  
      return {
        note,
        contact
      };
    }
  };
  </script>
  
  <style scoped>
  .detail-note-view {
    padding: 10px;
    margin-bottom: 5px;
  }
  </style>