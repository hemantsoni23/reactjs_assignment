/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f9fafb',
          dark: '#1f2937',
        },
        text: {
          light: '#1f2937',
          dark: '#f9fafb',
        },
        border: {
          light: '#e5e7eb',
          dark: '#374151',
        },
        muted: {
          light: '#9ca3af',
          dark: '#d1d5db',
        },
      },
    },
  },
  plugins: [],
};
