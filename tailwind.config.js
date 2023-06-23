/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './app/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        inter: 'Inter_600SemiBold',
      },

      colors: {
        gray: {
          50: '#f8f8f8',
          75: '#e4e4e4',
          100: '#d9d9d9',
          200: '#c8c8c8',
          300: '#bdbdbd',
          400: '#848484',
          500: '#737373',
        },
        brown: {
          50: '#f0eae6',
          75: '#c2ab96',
          100: '#a8886b',
          200: '#83542b',
          300: '#693100',
          400: '#4a2200',
          500: '#401e00',
        },
      },
    },
  },
  plugins: [],
}
