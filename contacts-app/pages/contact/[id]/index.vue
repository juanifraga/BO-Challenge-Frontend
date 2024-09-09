<template>
    <div>
      <DetailContactView v-if="contact" :contact="contact" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import DetailContactView from '~/components/DetailContactView.vue';
  import { useRuntimeConfig } from '#app';
  
  export default {
    name: 'ContactDetail',
    components: {
      DetailContactView
    },
    setup() {
      const route = useRoute();
      const contact = ref(null);
      const config = useRuntimeConfig();
      const domain = config.public.domain;
  
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
        fetchContact();
      });
  
      return {
        contact
      };
    }
  };
  </script>
  
  
  <style scoped>
  .detail-contact-view {
    padding: 10px;
    margin-bottom: 5px;
  }
  </style>