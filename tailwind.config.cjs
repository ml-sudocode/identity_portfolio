/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'medellin': "url('public/Medellin.jpg')",
        'coffee': "url('public/coffee.jpg')",
        'mountains': "url('public/mountains.jpg')",  
      }
    },
  },
  plugins: [],
}
