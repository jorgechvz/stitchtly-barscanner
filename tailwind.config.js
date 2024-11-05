/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins_400Regular', 'Poppins_700Bold'],
      },
      colors: {
        background: "#ffffff", // Blanco
        foreground: "#383838", // Gris oscuro
        card: "#ffffff", // Blanco
        "card-foreground": "#383838", // Gris oscuro
        popover: "#ffffff", // Blanco
        "popover-foreground": "#383838", // Gris oscuro
        primary: "#12b886", // Verde
        "primary-foreground": "#ffefff", // Rosa muy claro
        secondary: "#f3f4f6", // Gris muy claro
        "secondary-foreground": "#1a1a1a", // Negro intenso
        muted: "#f3f4f6", // Gris muy claro
        "muted-foreground": "#757575", // Gris
        accent: "#f3f4f6", // Gris muy claro
        "accent-foreground": "#1a1a1a", // Negro intenso
        destructive: "#e63946", // Rojo intenso
        "destructive-foreground": "#fafafa", // Blanco casi puro
        border: "#e6e6e6", // Gris claro
        input: "#e6e6e6", // Gris claro
        ring: "#12b886", // Verde
        "chart-1": "#ff5f49", // Rojo anaranjado
        "chart-2": "#29ab87", // Verde esmeralda
        "chart-3": "#394a68", // Azul grisáceo
        "chart-4": "#fac05e", // Amarillo dorado
        "chart-5": "#ff9944", // Naranja
        "sidebar-background": "#fafafa", // Gris muy claro
        "sidebar-foreground": "#424242", // Gris
        "sidebar-primary": "#1a1a1a", // Negro intenso
        "sidebar-primary-foreground": "#ffffff", // Blanco
        "sidebar-accent": "#f3f4f6", // Gris muy claro
        "sidebar-accent-foreground": "#1a1a1a", // Negro intenso
        "sidebar-border": "#d9d9d9", // Gris claro
        "sidebar-ring": "#36c3d9", // Azul brillante
      },
      borderRadius: {
        lg: "0.5rem", // 8px
        md: "0.375rem", // 6px
        sm: "0.25rem", // 4px
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
