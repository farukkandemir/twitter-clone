import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mainGray: "#273340",
        mainBlue: "#1D9BF0",
        textGray: "#75828E",
        bgGray: "rgb(30, 39, 50)",
        bgGrayOpac: "rgba(91, 112, 131, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
