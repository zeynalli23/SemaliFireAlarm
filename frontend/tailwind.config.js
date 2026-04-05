/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#ff4c4c',
          DEFAULT: '#e53935',
          dark: '#b71c1c',
        }
      }
    },
  },
  plugins: [],
}
