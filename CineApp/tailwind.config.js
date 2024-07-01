/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        26: "#262626",
        18: "#181818",
        DE: "#FFEDED",
        E0: "#E0E0E0",
        B0: "#B00000",
      },
    },
  },
  plugins: [],
};
