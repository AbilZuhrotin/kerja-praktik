/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      // Ini cadangan kalau DaisyUI beneran ngadat, kita bikin utility manual
      const newUtilities = {
        '.btn-custom': {
          padding: '0.75rem 2rem',
          borderRadius: '9999px',
          fontWeight: '800',
          cursor: 'pointer',
          transition: 'all 0.2s',
        },
      }
      addUtilities(newUtilities)
    },
    // Panggil DaisyUI di sini
    require("daisyui")
  ],
};