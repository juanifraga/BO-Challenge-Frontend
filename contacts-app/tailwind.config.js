/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      primary: "#f3c614",
      secondary: "#242424",
      white: "#ffffff",
      black: "#000000",
      buttonPrimary: "#54FA80",
      input: "#242424",
      gray: "#C3C3C3",
      editInput: "#99879D",


    },
    extend: {},
    fontFamily: {
      sans: ['Red Hat Display', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
}