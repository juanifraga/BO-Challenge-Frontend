<template>
    <div class="login-view m-0 w-full h-screen flex mt-20 justify-center">
      <Form @submit="handleLogin" :validation-schema="schema" class="w-3/5 flex flex-col gap-y-4 p-6 rounded shadow-md">
        <h2 class="text-4xl text-white text-center mb-4">Welcome</h2>
        <div>
          <label class="input" for="email">Email</label>
          <Field
            class="caret-slate-50 bg-gray-100 p-4 pl-8 rounded w-full text-white inputClass"
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
          />
          <ErrorMessage name="email" class="error" />
        </div>
        <div>
          <label class="input" for="password">Password</label>
          <Field
            class="caret-slate-50 bg-gray-100 p-4 pl-8 rounded w-full text-white inputClass"
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
          />
          <ErrorMessage name="password" class="error" />
        </div>
        <div class="flex justify-center mt-4">
          <button type="submit" class="bg-blue-500 text-black bg-buttonPrimary p-2 w-40 rounded">Login</button>
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </Form>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { useUserStore } from '~/stores/user';
  
  export default defineComponent({
    name: 'LoginView',
    components: {
      Form,
      Field,
      ErrorMessage
    },
    setup() {
      const userStore = useUserStore();
      const router = useRouter();
      const config = useRuntimeConfig();
      const domain = config.public.domain;
      const errorMessage = ref('');
  
      const schema = yup.object({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
      });
  
      const handleLogin = async (values) => {
        try {
          const response = await $fetch(`${domain}/login`, {
            method: 'POST',
            body: {
              email: values.email,
              password: values.password
            }
          });
          if (response.success) {
            console.log('Login successful:', response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            const user = {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email
            };
            userStore.login(user);
            router.push('/contacts');
          } else {
            errorMessage.value = response.message;
          }
        } catch (error) {
          console.error('Login failed:', error);
          errorMessage.value = 'Login failed. Please try again.';
        }
      };
  
      return {
        schema,
        handleLogin,
        errorMessage
      };
    }
  });
  </script>
  
  <style scoped>
  input.inputClass{
    background: #242424;
  }
  .error {
    color: red;
  }
  </style>