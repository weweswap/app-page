/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "turq": "var(--turq)",
        "yellow": "var(--yellow)",
      },
    },
  },
  plugins: [],
};
