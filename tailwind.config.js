/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        26: "#262626",
        18: "#181818",
        D0: "#FFD0D0",
        FF: "#FFFFFF",
        B0: "#B00000",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
    },
  },
  plugins: [],
};
