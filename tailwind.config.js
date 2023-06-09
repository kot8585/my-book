/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-color": "var(--brand-color)",
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "bg-light-color": "var(--bg-light-color)",
        "bg-dark-color": "var(--bg-dark-color)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
