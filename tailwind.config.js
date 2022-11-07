/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'ease-out-bg': {
          '0%': {"background-color": 'rgba(86,43,142,.6)'},
          '100%': {"background-color": 'rgba(86,43,142,0)'}
        }
      },
      animation: {
        'ease-out-bg': 'ease-out-bg 1.5s'
      },
    },
    colors: {
      "subspacePurple": "rgb(86,43,142)",
      "subspacePurpleLighter": "rgba(86,43,142,.6)",
    }
  },
  plugins: [],
}
