import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 24px 80px rgba(138, 77, 255, 0.16)',
        card: '0 18px 50px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        surface: '#07070d',
        charcoal: '#0d0d16',
        purple: '#8c33ff',
        violet: '#ad61ff',
        silver: '#e5e5ef',
        muted: '#b8b8d5',
        accent: '#ff5fb7',
        indian: '#ff9933',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(140, 51, 255, 0.18), transparent 38%), radial-gradient(circle at 20% 30%, rgba(255, 80, 140, 0.14), transparent 28%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
        headline: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
