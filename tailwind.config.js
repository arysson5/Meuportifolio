/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'canvas': 'rgb(var(--canvas) / <alpha-value>)',
        'fg': 'rgb(var(--fg) / <alpha-value>)',
        'accent': 'rgb(var(--accent) / <alpha-value>)',
        'accent-2': 'rgb(var(--accent-2) / <alpha-value>)',
        'surface': 'rgb(var(--surface) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
