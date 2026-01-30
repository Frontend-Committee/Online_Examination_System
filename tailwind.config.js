const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#4461F2",
        Gray: "#393E46",
        Blue: "#050C9C",
        "light-blue": "#3ABEF9",
        "dark-navy": "#061E29",
        "ocean-blue": "#1D546D",
        "teal-gray": "#5F9598",

        "soft-white": "#F3F4F4",
      },
    },
  },
  plugins: [],
});
