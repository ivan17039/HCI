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
        primary: "rgb(96 165 250)", // Tirkizna boja
        accent: "#FFB84D",  // Zlatna boja
        logoblue: "#282A9B", // Tamno plava boja loga
      },
      screens: {
        customLg: '1150px', // Dodavanje prilagođenog breakpointa
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-red-border": {
          WebkitTextStroke: "2px #D2042D", // Crveni obrub debljine 2px
          color: "white", // Boja slova
          textShadow: "1px 2px 10px #D2042D, 1.5px 1.5px 1px #D2042D", // Crvena sjena s obje strane
        },
        ".text-shadow-turquoise": {
          textShadow: "2px 2px 4px #20B2AA", // Tirkizna sjena
        },
        ".text-stroke-black": {
          WebkitTextStroke: "0.5px black", // Obrub u crnoj boji
          color: "white", // Osnovna boja slova
        },
      });
    }),
  ],
};
export default config;