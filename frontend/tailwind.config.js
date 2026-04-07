/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#dde6ff',
          200: '#c3d1ff',
          300: '#9db2ff',
          400: '#7088ff',
          500: '#4f61f7',
          600: '#3a42ec',
          700: '#3033d1',
          800: '#2c2fa8',
          900: '#2b2e85',
        },
        slate: {
          850: '#1a2035',
          950: '#0d1117',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
