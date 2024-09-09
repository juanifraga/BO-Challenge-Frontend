<template>
    <div class="new-contact-view p-10 bg-secondary rounded-2xl">
      <h1 class="text-2xl text-white mb-6">Add Contact</h1>
      <Form @submit="createContact" :validation-schema="schema" class="grid grid-cols-2 gap-4 w-full">
        <div class="form-group flex flex-col mb-6">
          <label for="name" class="block text-white">Name</label>
          <Field
            type="text"
            id="name"
            name="name"
            class="w-full text-xs p-2 rounded"
            v-model="contact.name"
          />
          <ErrorMessage name="name" class="error" />
        </div>
        <div class="form-group flex flex-col mb-6">
          <label for="address" class="block text-white">Address</label>
          <Field
            type="text"
            id="address"
            name="address"
            class="w-full text-xs p-2 rounded"
            v-model="contact.address"
          />
          <ErrorMessage name="address" class="error" />
        </div>
        <div class="form-group flex flex-col mb-6">
          <label for="profilePicture" class="block text-white">Profile Picture</label>
          <input type="file" id="profilePicture" @change="onFileChange" class="hidden">
          <label for="profilePicture" class="cursor-pointer bg-white text-black py-2 px-4 rounded text-center text-xs flex items-center justify-between">
            <span>Upload file</span>
            <img src="/static/upload.png" alt="Upload" class="w-4 h-4 ml-2">
          </label>
          <h3 v-if="profError" class="text-red profError">Profile picture is required</h3>
        </div>
        <div class="form-group flex flex-col mb-6">
          <label for="phoneNumber" class="block text-white">Phone Number</label>
          <Field
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            class="w-full text-xs p-2 rounded"
            v-model="contact.phoneNumber"
          />
          <ErrorMessage name="phoneNumber" class="error" />
        </div>
        <div class="form-group flex flex-col mb-6">
          <label for="email" class="block text-white">Email</label>
          <Field
            type="email"
            id="email"
            name="email"
            class="w-full text-xs p-2 rounded"
            v-model="contact.email"
          />
          <ErrorMessage name="email" class="error" />
        </div>
        <div class="form-group col-span-2 flex justify-center">
          <button type="submit" class="bg-buttonPrimary text-black py-2 px-6 mt-10 rounded-2xl">Add contact</button>
        </div>
      </Form>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { useRuntimeConfig } from '#app';
  
 
  
  export default defineComponent({
    name: 'NewContactView',
    components: {
      Form,
      Field,
      ErrorMessage
    },
    setup() {
      const router = useRouter();
      const config = useRuntimeConfig();
      const domain = config.public.domain;
      const errorMessage = ref('');
      const profError = ref(false);
      const contact = ref({
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        profilePicture: null
      });
  
      const schema = yup.object({
        name: yup.string().required('Name is required'),
        address: yup.string().required('Address is required'),
        phoneNumber: yup.string().required('Phone number is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
      });
  
      const createContact = async (values) => {
        try {
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('address', values.address);
          formData.append('phone_number', values.phoneNumber);
          formData.append('email', values.email);
          if (contact.value.profilePicture) {
            console.log("entre");
            formData.append('img', contact.value.profilePicture);
        }else{
            console.log("entre2");
            profError.value = true;
          return;
        }
          
  
          const response = await fetch(`${domain}/contacts`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const responseData = await response.json();
  
          if (responseData.success) {
            console.log('Contact created successfully:', responseData);
            router.push(`/contact/${responseData.contact.id}`);
          } else {
            errorMessage.value = responseData.message;
          }
        } catch (error) {
          console.error('Failed to create contact:', error);
          errorMessage.value = 'Failed to create contact. Please try again.';
        }
      };
  
      const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        contact.value.profilePicture = file;
        profError.value = false;
      }
    };
  
      return {
        schema,
        createContact,
        contact,
        errorMessage,
        onFileChange,
        profError
      };
    }
  });
  </script>
  
  <style scoped>
  .new-contact-view {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  .error {
    color: red;
    font-size: 16px;
  }
  .profError{
    color: red;
    font-size: 16px;
  }
  </style>