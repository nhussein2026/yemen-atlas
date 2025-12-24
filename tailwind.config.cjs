/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        atlas: {
          sand: "#C8A882",
          terracotta: "#A84325",
          stone: "#5C5552",
          paper: "#F5F1E8",

          smoke: "#8B7E74",
          copper: "#B8956A",
          archive: "#2C2420",
          border: "#E8E3D8",
        },
      },
    },
  },
  plugins: [],
};
