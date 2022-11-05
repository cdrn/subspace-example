/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "subspacePurple": "rgb(86,43,142)",
      "subspacePurpleLighter": "rgba(86,43,142,.6)"
    }
  },
  plugins: [],
}
