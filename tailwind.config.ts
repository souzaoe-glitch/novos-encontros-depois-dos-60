import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFF9F2',
        cream: '#F7EFE4',
        sand: '#EADFCF',
        sage: '#EEF0E7',
        moss: '#DCE3D3',
        forest: {
          DEFAULT: '#23483D',
          deep: '#17352C',
          soft: '#3C6457',
        },
        ink: '#252A28',
        muted: '#4D5551',
        terracotta: {
          DEFAULT: '#9C4B33',
          light: '#C9785B',
          pale: '#F4E2D8',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'serif'],
        sans: ['var(--font-sans)', 'Arial', 'Helvetica', 'sans-serif'],
      },
      maxWidth: {
        site: '1180px',
      },
      boxShadow: {
        soft: '0 20px 60px -25px rgba(23, 53, 44, 0.35)',
        card: '0 10px 30px -15px rgba(23, 53, 44, 0.25)',
        book: '28px 30px 60px -20px rgba(23, 53, 44, 0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
