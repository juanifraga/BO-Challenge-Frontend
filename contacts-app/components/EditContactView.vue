<template>
    <div class="bg-secondary mx-auto flex flex-col items-center rounded-2xl p-10 w-full">
      <div class="flex items-center mb-6 w-full">
        <div class="relative mr-10">
          <img :src="contact.profile_picture_url" alt="Profile Picture" class="w-24 h-24 rounded-full profile-picture" />
          <div class="absolute inset-0 w-full h-full rounded-full border-2 border-gray-500"></div>
        </div>
        <h2 class="ml-4 text-white text-xl">{{ contact.name }}</h2>
      </div>
      <Form @submit="updateContact" class="grid grid-cols-2 gap-6 w-full">
        <div class="form-group flex flex-col mb-6">
          <label for="name" class="block text-white">Name</label>
          <Field name="name" as="input" type="text" id="name" v-model="contact.name" class="w-full text-xs p-2 rounded text-editInput" />
          <ErrorMessage name="name" class="text-red-500 text-xs mt-1" />
        </div>
        <div class="form-group flex flex-col mb-6">
          <label for="address" class="block text-white">Address</label>
          <Field name="address" as="input" type="text" id="address" v-model="contact.address" class="w-full text-xs p-2 rounded text-editInput" />
          <ErrorMessage name="address" class="text-red-500 text-xs mt-1" />
        </div>
        <div class="form-group flex flex-col mb-6">
          <label for="phoneNumber" class="block text-white">Phone Number</label>
          <Field name="phone_number" as="input" type="text" id="phoneNumber" v-model="contact.phone_number" class="w-full text-xs p-2 rounded text-editInput" />
          <ErrorMessage name="phone_number" class="text-red-500 text-xs mt-1" />
        </div>
        <div class="form-group flex flex-col mb-6">
          <label for="email" class="block text-white">Email</label>
          <Field name="email" as="input" type="email" id="email" v-model="contact.email" class="w-full text-xs p-2 rounded text-editInput" />
          <ErrorMessage name="email" class="text-red-500 text-xs mt-1" />
        </div>
        <div class="form-group flex flex-col mb-6">
          <label for="profilePicture" class="block text-white">Profile Picture</label>
          <input type="file" id="profilePicture" @change="handleFileUpload" class="hidden">
          <label for="profilePicture" class="cursor-pointer bg-white text-black py-2 px-4 rounded text-center text-xs text-editInput flex items-center justify-between">
            <span>Upload file</span>
            <img src="/static/upload.png" alt="Upload" class="w-4 h-4 ml-2">
          </label>
        </div>
        <div class="form-group col-span-2 flex justify-center">
          <button type="submit" class="bg-buttonPrimary text-black py-2 px-6 mt-10 rounded-2xl">Save</button>
        </div>
      </Form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
  import { required, email } from '@vee-validate/rules';
  import { useRuntimeConfig } from '#app';
  
  
  defineRule('required', required);
  defineRule('email', email);
  
  
  configure({
    generateMessage: (ctx) => {
      const messages = {
        required: `${ctx.field} is required`,
        email: `Please enter a valid email address`,
      };
      return messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid`;
    },
  });
  
  const props = defineProps({
    contact: {
      type: Object,
      required: true
    }
  });
  
  const contact = ref({ ...props.contact });
  const profilePicture = ref<File | null>(null);
  const router = useRouter();
  const config = useRuntimeConfig();
  const domain = config.public.domain;
  
  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      profilePicture.value = target.files[0];
    }
  };
  
  const updateContact = async (values: any) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('address', values.address);
      formData.append('phone_number', values.phone_number);
      formData.append('email', values.email);
      if (profilePicture.value) {
        formData.append('profile_picture', profilePicture.value);
      }
  
      const response = await fetch(`${domain}/contacts/${contact.value.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to update contact');
      }
  
      const updatedContact = await response.json();
      console.log('Contact updated successfully:', updatedContact);
      router.push(`/contact/${contact.value.id}`);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  .text-editInput {
    color: #000;
  }
  .profile-picture {
    border: 4px solid #242424; 
    box-shadow: 0 0 0 4px #54FA80;
  }
  </style>