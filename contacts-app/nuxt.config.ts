import { config } from 'dotenv';
config();
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@pinia/nuxt'],
  plugins: [
    '~/plugins/init-store.client.ts',
  ],
  runtimeConfig: {
    public: {
      domain: process.env.DOMAIN || 'http://localhost/api',
      googleApiKey: process.env.GOOGLE_API_KEY,
    },
  },
})