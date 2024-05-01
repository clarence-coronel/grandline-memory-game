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
      fontFamily: {
        'Bangers': ["Bangers", "system-ui"]
      },
      boxShadow: {
        'primary': '0 0 30px 0 rgba(5, 73, 165, 0.5)',
        'secondary': '0 0 30px 0 rgba(169, 0, 0, 1)',
        'black': '0 0 30px 0 rgba(31, 30, 30, 1)'
      },
    },
  },
  plugins: [],
}
