/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
      colors: {
        pri: "#0D0031",
          green: "#05AF2B",
          yellow: "#F4A100",
          blue: "#1127e3",
          blue2: "#0A66C2",
          black: "#0A66C2",
          white: "#FFFFFF",
          white2: "#FAFAFA",
          red: "#CF4F4F",
          errorRed: "#ffdada",
          errorRedBorder: "#eea8a8",
          grey: "#333333",
          lightgrey: "#555555",
          cream: "#CCCCCC",
          cream2: "#EBEBEB",
      },
  },
  plugins: [],
}
