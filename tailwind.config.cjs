/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'medellin': "url('src/assets/Medellin.jpg')",
        'coffee': "url('src/assets/coffee.jpg')",
        'mountains': "url('src/assets/mountains.jpg')",  
      }
    },
  },
  plugins: [],
}
