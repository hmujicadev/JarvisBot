module.exports = {
  content: ['./src/**/*.html', './src/**/*.{js,ts,jsx,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s ease-in infinite',
        'spin-slow': 'spin 6s linear infinite'
      },
      colors: {
        jarvis: {
          bg: '#232a32',
          card: '#29313a',
          input: '#1f262f',
          primary: '#0ffffe',
          secondary: '#89ffdc',
          100: '#0ffffe',
          200: '#0de5e4',
          300: '#0ccccb',
          400: '#0ab2b1',
          500: '#099998',
          600: '#077f7f',
          700: '#066665',
          800: '#044c4c',
          900: '#033332',
          1000: '#011919',
          one: '#0FFFFE',
          two: '#001021',
          three: '#F0A202',
          four: '#048BA8',
          five: '#C2F970'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
