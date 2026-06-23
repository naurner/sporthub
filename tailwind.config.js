/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: '#FF4F2B',
        'accent-light': '#FFF0EC',
        'text-primary': '#111111',
        'text-secondary': '#6B6B6B',
        surface: '#FFFFFF',
        border: '#EEEEEA',
        success: '#00C57A',
        warning: '#FFB020',
      },
      fontFamily: {
        sans: ['DM_Sans_400Regular'],
        medium: ['DM_Sans_500Medium'],
        semibold: ['DM_Sans_600SemiBold'],
        bold: ['DM_Sans_700Bold'],
      },
    },
  },
  plugins: [],
};
