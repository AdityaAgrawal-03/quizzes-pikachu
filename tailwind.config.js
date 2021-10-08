module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        trueGray: {
          900: "#171717",
          800: "#262626",
          700: "#404040"
        }
      }
    },
  },
  variants: {
    extend: {
      borderRadius: ["hover", "focus"]
    },
  },
  plugins: [],
};
