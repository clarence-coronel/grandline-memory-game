/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#0549a5',
        'secondary': '#a90000',
        'black': '#1f1e1e'
      },
      fontFamily:{
        'Bangers': ["Bangers", "system-ui"]
      },
    },
  },
  plugins: [],
}

