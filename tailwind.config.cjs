/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        fontFamily: {
          body: ["Space Grotesk", "sans-serif"],
          heading: ["Space Grotesk", "sans-serif"]

        // sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
        // sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
        }

      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
