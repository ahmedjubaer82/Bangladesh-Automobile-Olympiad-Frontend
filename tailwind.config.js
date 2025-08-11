/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Orbitron', 'sans-serif'],
      },
      colors: {
        'primary-light': '#FFFFFF',
        'secondary-light': '#F3F4F6',
      },
    },
  },
  plugins: [],
}