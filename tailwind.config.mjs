/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["CustomFont", "sans-serif"],
        medium: ["ModernEraFont", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
       /* for blink cursor pointer in anywhere except input, textarea start */
      caretColor: {
        transparent: 'transparent',
        auto: 'auto',
      },
        /* for blink cursor pointer in anywhere except input, textarea end */
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

export default config;
