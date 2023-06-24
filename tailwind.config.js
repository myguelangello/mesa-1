/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './app/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        interRegular: 'Inter_400Regular',
        interMedium: 'Inter_500Medium',
        interSemiBold: 'Inter_600SemiBold',
      },

      colors: {
        gray: {
          50: '#eaeaea',
          100: '#bebebf',
          200: '#9e9ea0',
          300: '#727275',
          400: '#56565a',
          500: '#2c2c31',
          600: '#28282d',
          700: '#1f1f23',
          800: '#18181b',
          900: '#121215',
        },
        brown: {
          50: '#f0eae6',
          100: '#d1bfb0',
          200: '#baa08a',
          300: '#9b7554',
          400: '#875a33',
          500: '#693100',
          600: '#602d00',
          700: '#4b2300',
          800: '#3a1b00',
          900: '#2c1500',
        },
      },
    },
  },
  plugins: [],
}
