const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--am-color-primary)',
        secondary: 'var(--am-color-secondary)',
        tertiary: 'var(--am-color-tertiary)',
        quarteraly: 'var(--am-color-quarteraly)',
      },
      fontFamily: {
        sans: ['"Roboto"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
