/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ghoul-red': '#c41e3a',
        'ghoul-dark': '#0a0a0a',
        'ghoul-gray': '#1a1a1a',
        'ccg-blue': '#2c5f8d',
      },
      fontFamily: {
        'tokyo': ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
