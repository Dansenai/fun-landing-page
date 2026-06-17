/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBFAF6', // warm near-white — default background
        white: '#FFFFFF',
        sand: '#EFEAE0', // warm secondary tone for alternating sections
        clay: '#E5DDCD',
        ink: '#17171B', // near-black text (not pure black)
        charcoal: '#1C1B20', // rare dark section
        stone: '#6E6A62', // muted warm text
        line: '#E6E1D6',
        red: {
          DEFAULT: '#E11226',
          deep: '#C20E1F',
          soft: '#FBE9EA',
        },
      },
      fontFamily: {
        sans: ['AspektaVF', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['AspektaVF', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: { edge: '1440px' },
      transitionTimingFunction: {
        out: 'cubic-bezier(.16,1,.3,1)',
        inout: 'cubic-bezier(.76,0,.24,1)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'marquee-rev': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-rev': 'marquee-rev 38s linear infinite',
      },
    },
  },
  plugins: [],
}
