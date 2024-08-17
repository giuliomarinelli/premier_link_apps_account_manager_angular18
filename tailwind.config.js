/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
    content: [
      "./src/**/*.{html,ts}"
    ],
  theme: {
    extend: {
      screens: {
        "3xs": "321px",
        "2xs": "376px",
        "xs": "426px"
      },
      colors: {
        "primary": {
          DEFAULT: "#5b21b6",
          hover: "rgb(91, 33, 182, .8)"
        },
        "secondary": {
          DEFAULT: "#94a3b8",
          hover: "rgb(203, 213, 225, .8)"
        },
        "accent": {
          dark: "#fcd34d",
          DEFAULT: "#fbbf24",
          hover: "rgb(252, 211, 77, .8)",
          hoverDark: "rgb(253, 230, 138, .8)"
        },
        "text": {
          DEFAULT: "#0a0a0a",
          dark: "#e2e8f0"
        }
      }
    },
  },
  plugins: [],
}

