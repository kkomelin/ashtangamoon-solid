/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--am-color-primary)',
        secondary: 'var(--am-color-secondary)',
        tertiary: 'var(--am-color-tertiary)',
        quarteraly: 'var(--am-color-quarteraly)',
      },
    },
  },
  plugins: [],
}
