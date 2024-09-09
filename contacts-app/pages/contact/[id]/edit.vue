<template>
  <div  class="w-auto" v-if="contact">
    <EditContactView :contact="contact" />
  </div>
  <div v-else>
    <p>Contact not found</p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import EditContactView from '../../components/EditContactView.vue';

interface Contact {
  id: number;
  name: string;
  address: string;
  profilePicture: string;
  phoneNumber: string;
  email: string;
}

export default defineComponent({
  name: 'EditContact',
  components: {
    EditContactView
  },
  setup() {
    const route = useRoute();
    const contact = ref<Contact | null>(null);
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
});
</script>