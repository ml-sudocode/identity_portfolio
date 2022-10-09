/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'medellin': "url('/Medellin.jpg')",
        'coffee': "url('/coffee.jpg')",
        'mountains': "url('/mountains.jpg')",  
      }
    },
  },
  plugins: [],
}
