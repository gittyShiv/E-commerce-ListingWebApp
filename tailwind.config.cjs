module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        muted: "var(--color-muted)",
        brand1: "var(--brand1)",
        brand2: "var(--brand2)",
        brand3: "var(--brand3)"
      },
      boxShadow: {
        'card-md': "0 10px 30px rgba(2,6,23,0.2)",
        'glow': "0 8px 40px rgba(99,102,241,0.16)"
      },
      borderRadius: {
        'lg-custom': '16px'
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        hue: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spinSlow 18s linear infinite',
        'hue-rot': 'hue 10s linear infinite'
      }
    }
  },
  plugins: []
};