import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ecff',
          500: '#3b82f6',
          700: '#1d4ed8',
          900: '#172554'
        },
        danger: '#ef4444',
        success: '#22c55e',
        warn: '#f59e0b'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
