module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "glitch-orange": "rgba(239, 68, 68, 1)",
        //"glitch-box": "#5D4A5D",
        //"glitch-bar": "#3B2939",
      },
    },
    // fontFamily: {
    //   sans: ["Lato", "sans-serif"],
    //   serif: ["ui-serif", "Georgia"],
    //   mono: ["ui-monospace", "SFMono-Regular"],
    //   display: ["Oswald"],
    //   body: ["Open Sans"],
    // },
    backgroundImage: (theme) => ({
      "dot-pattern": "url('assets/images/pattern.svg')",
    }),
  },
  plugins: [],
};
