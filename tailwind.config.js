/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        'h1': '2.4rem',
      },
      screens: {
        'lg': '1000px',
        'md': '750px'
      }
    },
  },
  plugins: [],
}

