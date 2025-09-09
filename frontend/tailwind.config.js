/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        "typewriter-line1": {
          "0%": { width: "0", opacity: "1" },
          "100%": { width: "100%", opacity: "1" },
        },
        "typewriter-line2": {
          "0%": { width: "0", opacity: "0" },
          "2%": { width: "0", opacity: "1" },
          "100%": { width: "100%", opacity: "1" },
        },
        "typewriter-line3": {
          "0%": { width: "0", opacity: "0" },
          "2%": { width: "0", opacity: "1" },
          "100%": { width: "100%", opacity: "1" },
        },
      },
      animation: {
        scroll: "scroll 6s linear infinite",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-in-up-delay": "fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards",
        "fade-in-up-delay-2": "fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards",
        "fade-in-left": "fade-in-left 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards",
        "fade-in-right": "fade-in-right 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.7s forwards",
        typewriter: "typewriter 4s steps(40, end) forwards",
        "typewriter-delay": "typewriter 4s steps(40, end) 4.5s forwards",
        "typewriter-line1": "typewriter-line1 2.5s cubic-bezier(0.4, 0, 0.6, 1) forwards",
        "typewriter-line2": "typewriter-line2 2s cubic-bezier(0.4, 0, 0.6, 1) 2.8s forwards",
        "typewriter-line3": "typewriter-line3 2.5s cubic-bezier(0.4, 0, 0.6, 1) 5.1s forwards",
      },
    },
  },
  plugins: [],
}
