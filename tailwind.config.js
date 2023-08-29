/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      rem: "10px",
    },

    zIndex: {
      0: "0",
      auto: "auto",
    },
    extend: {
      fontSize: generateExtentions(10, 32, "px"),
      colors: {
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        red: "#ff0000",
        light: "#E8DAA8",
        lightred: "#F6A7A3",
        lightyellow: "#E8DAA8",
        darkyellow: "#E2B605",
        darkred: "#C83532",
        lightgreen: "#B7E4AF",
        darkgreen: "#0C8D28",
        gray: { light: "#D9D9D9", opaque: "#7F7777" },
        corporate: {
          blue: "#17387e",
          yellow: "#ffde59",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        montserrat: ["var(--font-montserrat)"],
      },
      spacing: Object.assign(
        generateExtentions(0, 50, "px"),
        generateExtentions(0, 10, "%")
      ),
      zIndex: generateExtentions(0, 9),
    },
  },
  safelist: [
    {
      pattern:
        /(bg)-(lightred|lightyellow|lightgreen|darkred|darkgreen|darkyellow)/,
    },
  ],
  plugins: [],
};

function generateExtentions(min, max, suf = "") {
  const extend = {};

  for (let i = min; i <= max; i++) {
    extend[`${i}${suf}`] = `${i}${suf}`;
  }
  return extend;
}
