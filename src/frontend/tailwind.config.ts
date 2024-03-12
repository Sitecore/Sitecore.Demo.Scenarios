import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      transparent: 'rgba(255,255,255,0)',
      current: 'currentColor',
      white: {
        DEFAULT: '#ffffff',
        dark: '#F9F9F9',
        darkest: '#F1F1F1',
      },
      black: {
        light: '#090909',
        DEFAULT: '#000000',
      },
      violet: {
        DEFAULT: '#5548D9',
        dark: '#333378',
      },
      red: {
        DEFAULT: '#EB1F1F',
        dark: '#AA0000',
      },
      teal: {
        DEFAULT: '#02999A',
        dark: '#085E6E',
      },
      charcoal: {
        DEFAULT: '#545859',
        dark: '#212621',
      },
      gray: {
        light: '#C8C8C8',
        DEFAULT: '#969696',
      },
    },
    fontFamily: {
      sans: 'var(--font-avenir-next)',
      mono: 'var(--font-sf-mono)',
    },
    extend: {
      fontSize: {
        '3xl': '2rem',
      },
      backgroundImage: {
        'logo-composition-40': "url('/logo-composition-40@2x.png')",
        'logo-composition-80': "url('/logo-composition-80@2x.png')",
      },
      maxWidth: {
        'grid-container': '88rem',
      },
      boxShadow: {
        card: '1px 3px 10px rgb(0 0 0 / 0.05)',
        'card-hover': '1px 3px 15px rgb(0 0 0 / 0.15)',
        element: '1px 3px 10px rgb(0 0 0 / 0.1)',
        'card-large': '0px 12px 40px rgb(0 0 0 / 0.12)',
      },
    },
  },
  plugins: [],
};
export default config;
