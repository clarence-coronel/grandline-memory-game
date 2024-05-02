/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#BF0A19',
        'secondary': '#0549a5',
        'secondary-v2': '#60858d',
        'black': '#1f1e1e'
      },
      fontFamily: {
        'Bangers': ["Bangers", "system-ui"]
      },
      boxShadow: {
        'primary': '0 0 50px 0 rgba(5, 73, 165, 0.5)',
        'secondary': '0 0 50px 0 rgba(169, 0, 0, 1)',
        'black': '0 0 50px 0 rgba(31, 30, 30, 1)',
        'black-v2': '0 5px 20px 0 rgba(31, 30, 30, 0.2)'
      },
    },
  },
  plugins: [],
}
