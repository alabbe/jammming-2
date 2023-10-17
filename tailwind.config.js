/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0802A3',
        'pink': '#FF4B91',
        'orange': '#FF7676',
        'yellow': '#FFCD4B',
      },
      screens: {
        'xs': '320px'
      }
    },
  },
  plugins: [],
}

