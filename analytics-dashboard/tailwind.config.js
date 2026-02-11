/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',
          sidebar: '#111111',
          card: '#151515',
          hover: '#1a1a1a',
          border: '#222222',
        }
      }
    },
  },
  plugins: [],
}
