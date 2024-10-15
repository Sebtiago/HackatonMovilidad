/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados basados en la paleta indicada
        primary: {
          DEFAULT: '#0c44ac', // Azul para elementos de marca
          dark: '#083080', // Variante más oscura para hover
        },
        secondary: {
          DEFAULT: '#048c34', // Verde para acciones positivas
          dark: '#036a28', // Variante más oscura para hover
        },
        error: {
          DEFAULT: '#dc141c', // Rojo para acciones negativas
          dark: '#b00f16', // Variante más oscura para hover
        },
        background: '#ffffff', // Color de fondo predominante
      },
    },
  },
  plugins: [],
};