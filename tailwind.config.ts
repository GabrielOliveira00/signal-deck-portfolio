import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0f1221",
        frame: "#171c31",
        fog: "#edf2ff",
        slate: "#9aa6cf",
        cyan: "#51d9ff",
        lime: "#9cff8f",
        coral: "#ff8f72",
        gold: "#ffd76f",
        violet: "#8b89ff"
      },
      boxShadow: {
        panel: "0 24px 70px rgba(4, 7, 18, 0.34)",
        glow: "0 0 0 1px rgba(81, 217, 255, 0.12), 0 18px 52px rgba(81, 217, 255, 0.12)"
      },
      letterSpacing: {
        display: "-0.045em"
      },
      animation: {
        drift: "drift 16s ease-in-out infinite",
        flicker: "flicker 3.4s ease-in-out infinite",
        shimmer: "shimmer 2.8s linear infinite",
        rise: "rise 0.45s ease-out"
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-12px,0)" }
        },
        flicker: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" }
        }
      }
    }
  },
  plugins: [],
};

export default config;
