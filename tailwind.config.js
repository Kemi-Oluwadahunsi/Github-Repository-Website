/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: { max: "480px" },

      sm: { min: "481px", max: "900px" },

      md: { min: "901px", max: "1300px" },

      lg: { min: "901px", max: "2000px" },
    },
    extend: {},
  },
  plugins: [],
};

