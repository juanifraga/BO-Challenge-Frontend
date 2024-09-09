<template>
    <div class="contact-list flex flex-wrap">
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="w-1/2 p-2"
      >
        <ContactItem
          :id="contact.id"
          :name="contact.name"
          :address="contact.address"
          :profilePicture="contact.profile_picture"
        />
      </div>
    </div>
  </template>
  
  <script>
  import ContactItem from './ContactItem.vue';
  
  export default {
    name: 'ContactList',
    components: {
      ContactItem
    },
    props: {
      contacts: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  </style>