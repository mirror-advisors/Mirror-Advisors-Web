import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — mirrors legacy styles.css custom properties
        brand: {
          teal: '#ECA934',
          amber: '#ECA934',
          blue: '#6B9FD4',
          purple: '#8B9FD4',
          bluegray: '#5A7B8F',
        },
        bg: {
          DEFAULT: '#080B1A',
          surface: '#0F1232',
          surface2: '#141735',
        },
        text: {
          DEFAULT: '#ffffff',
          mid: 'rgba(255,255,255,0.55)',
          dim: 'rgba(255,255,255,0.35)',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease forwards',
        fadeIn: 'fadeIn 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
