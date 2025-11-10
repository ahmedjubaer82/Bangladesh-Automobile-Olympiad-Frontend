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
        'primary-light': '#FFA500',
        'secondary-light': '#CC8400',
        'text-primary': '#141614',
        'tertiary-light': '#E0FFFF',
      },
      textShadow: {
        'sm': '0 1px 2px var(--tw-shadow-color)',
        'md': '0 2px 4px var(--tw-shadow-color)',
        'lg': '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
}