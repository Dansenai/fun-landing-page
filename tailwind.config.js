/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic tokens backed by CSS variables (see :root/.dark in index.css) so the
        // whole palette flips for dark mode without per-component dark: classes.
        paper: 'rgb(var(--c-paper) / <alpha-value>)', // page background
        surface: 'rgb(var(--c-surface) / <alpha-value>)', // cards / raised panels (white in light mode)
        white: '#FFFFFF', // literal — for text/UI on the always-dark bands
        night: '#17171B', // literal near-black — for scrims/surfaces that stay dark in BOTH modes
        sand: 'rgb(var(--c-sand) / <alpha-value>)', // warm secondary tone for alternating sections
        clay: 'rgb(var(--c-clay) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)', // primary text (near-black ↔ near-white)
        charcoal: 'rgb(var(--c-charcoal) / <alpha-value>)', // rare dark section — stays dark in dark mode
        stone: 'rgb(var(--c-stone) / <alpha-value>)', // muted warm text
        line: 'rgb(var(--c-line) / <alpha-value>)',
        red: {
          DEFAULT: 'rgb(var(--c-red) / <alpha-value>)',
          deep: 'rgb(var(--c-red-deep) / <alpha-value>)',
          soft: 'rgb(var(--c-red-soft) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['AspektaVF', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['AspektaVF', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        brand: ['Caudex', 'Georgia', 'serif'], // Radnik's own wordmark/heading font
      },
      maxWidth: { edge: '1440px' },
      transitionTimingFunction: {
        out: 'cubic-bezier(.16,1,.3,1)',
        inout: 'cubic-bezier(.76,0,.24,1)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'marquee-rev': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        'pulse-dot': { '0%': { transform: 'scale(1)', opacity: '0.8' }, '100%': { transform: 'scale(2.6)', opacity: '0' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-rev': 'marquee-rev 38s linear infinite',
        'pulse-dot': 'pulse-dot 2.2s cubic-bezier(0,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
}
