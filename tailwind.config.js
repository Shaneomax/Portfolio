/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#ff2d55',
          secondary: '#ff375f',
          cyan: '#00f0ff',
          neonGreen: '#00ff66',
          amber: '#ffb800',
        },
        surface: {
          950: '#030306',
          900: '#08090d',
          850: '#0d0f15',
          800: '#13151f',
          750: '#181b28',
          700: '#222638',
          600: '#32374e',
        }
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
        sync: ['"Syncopate"', 'sans-serif'],
      },
      boxShadow: {
        'neon-red': '0 0 20px rgba(255, 45, 85, 0.45)',
        'neon-red-lg': '0 0 35px rgba(255, 45, 85, 0.65)',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.45)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.7)',
        'inner-glow': 'inset 0 0 15px rgba(255, 45, 85, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
