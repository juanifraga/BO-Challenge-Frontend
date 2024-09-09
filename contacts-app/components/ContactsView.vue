<template>
    <div>
      <div class="flex justify-between my-5">
        <h2 class="text-white font-bold text-2xl">Contacts</h2>
        <NuxtLink to="/contact/new" class="px-4 py-2 text-black rounded-2xl bg-buttonPrimary">Add New</NuxtLink>
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
      <ContactList :contacts="filteredContacts" />
    </div>
  </template>
  
  <script>
  import ContactList from './ContactList.vue';
  import { useRuntimeConfig } from '#app';
  
  export default {
    name: 'ContactsView',
    components: {
      ContactList
    },
    data() {
      return {
        contacts: [],
        searchQuery: ''
      };
    },
    computed: {
      filteredContacts() {
        return this.contacts.filter(contact =>
          contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          contact.address.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    async mounted() {
      try {
        const config = useRuntimeConfig();
        const domain = config.public.domain;
        const token = localStorage.getItem('token');
        const response = await $fetch(`${domain}/contacts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.success) {
          this.contacts = response.contacts;
        } else {
          console.error('Failed to fetch contacts:', response.message);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }
  };
  </script>