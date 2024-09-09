<template>
    <div class="new-note-view p-10 bg-secondary rounded-2xl">
      <h1 class="text-2xl text-white mb-6">Add Note</h1>
      <form @submit.prevent="createNote" class="grid grid-cols-2 gap-4 w-full">
        <div class="form-group flex flex-col mb-6">
          <label for="contact" class="block text-white">Contact</label>
          <select id="contact" v-model="note.contactId" class="w-full text-xs p-2 rounded">
            <option v-for="contact in contacts" :key="contact.id" :value="contact.id">
              {{ contact.name }} - {{ contact.email }}
            </option>
          </select>
        </div>
        <div class="form-group flex flex-col mb-6 col-span-2">
            <label for="content" class="block text-white">Text</label>
            <textarea id="content" v-model="note.content" class="w-full text-xs p-2 rounded h-32"></textarea>
        </div>
        <div class="form-group col-span-2 flex justify-center">
          <button type="submit" class="bg-buttonPrimary text-black py-2 px-6 mt-10 rounded-2xl">Add note</button>
        </div>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useRuntimeConfig } from '#app';
  
  const note = ref({
    content: '',
    contactId: null,
  });
  
  const contacts = ref([]);
  const router = useRouter();
  const config = useRuntimeConfig();
  const domain = config.public.domain;
  
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${domain}/contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        contacts.value = data.contacts;
      } else {
        console.error('Failed to fetch contacts:', data.message);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  
  onMounted(() => {
    fetchContacts();
  });
  
    const createNote = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost/api/contacts/${note.value.contactId}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            content: note.value.content
        })
        });
        const data = await response.json();
        if (data.success) {
            console.log('Note created successfully:', data.note);
            router.push('/notes');
        } else {
            console.error('Failed to create note:', data.message);
        }
    } catch (error) {
        console.error('Error creating note:', error);
  }
  };
  </script>