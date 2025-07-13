/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", 'sans-serif'],
        museo: ["var(--font-museo)", 'serif'],
      },
      colors: {
        'manasa-red': '#BF1602',
        'manasa-green': '#045419',
        'main-red': '#941608',
      },
      fontSize: {
        sm: ['13.3px', '16px'],
        base: ['16px', '16px'],
        lg: ['19.2px', '20px'],
        xl: ['23.04px', '24px'],
        '2xl': ['27px', '32px'],
        '3xl': ['33px', '40px'],
        '4xl': ['40px', '40px'],
        '5xl': ['48px', '48px'],
      },
    },
  },
  plugins: [],
};
