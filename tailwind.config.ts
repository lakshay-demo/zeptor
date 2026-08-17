import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 30px rgba(168, 85, 247, 0.25)',
        'glow-lg': '0 0 60px rgba(168, 85, 247, 0.35)',
        'glow-xl': '0 0 80px rgba(168, 85, 247, 0.4)',
        card: '0 20px 60px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 0 40px rgba(168, 85, 247, 0.2), 0 20px 60px rgba(0, 0, 0, 0.4)',
      },
      colors: {
        surface: '#050507',
        charcoal: '#0b0b10',
        'dark-surface': '#111118',
        purple: '#7c3aed',
        'purple-strong': '#8b5cf6',
        violet: '#a855f7',
        'violet-bright': '#c084fc',
        silver: '#d4d4d8',
        'silver-muted': '#a1a1aa',
        muted: '#71717a',
        accent: '#ff5fb7',
        indian: '#ff9933',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(168, 85, 247, 0.2), transparent 40%), radial-gradient(circle at 20% 30%, rgba(192, 132, 252, 0.12), transparent 32%)',
        'gradient-purple': 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        'gradient-purple-strong': 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
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
