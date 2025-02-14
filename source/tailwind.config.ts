import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#6C6EBA", // Complementary boja
        primaryHover:"#9899ce",
        accent: "#BAB86C",  //  Olive boja
        logoblue: "#565894", // Tamno plava boja loga
        secondary: "#f1f2f9", // Svjetlija complementary Boja pozadine
      },
      screens: {
        customLg: '1235px', // Dodavanje prilagođenog breakpointa
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-red-border": {
          WebkitTextStroke: "2px #ba6c6e", // Crveni obrub debljine 2px
          color: "white", // Boja slova
          textShadow: "1px 2px 10px #ba6c6e, 1.5px 1.5px 1px #ba6c6e", // Crvena sjena s obje strane
        },
        ".text-shadow-turquoise": {
          textShadow: "2px 2px 4px #9899ce", // Tirkizna sjena
        },
        ".text-stroke-black": {
          WebkitTextStroke: "0.5px gray", // Obrub u crnoj boji
          color: "white", // Osnovna boja slova
        },
      });
    }),
  ],
};
export default config;