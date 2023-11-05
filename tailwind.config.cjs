/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}", './node_modules/tw-elements/dist/js/**/*.js',
  "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'blackThrem': '#0B2447',
      'orangeThrem' : "#f86424",
      'geenThem' : "#A5D7E8",
      'blueeThrem': '#19376D',
      'blueeeeeee' :"#576CBC"
    },
  },
  plugins: [ [require("tw-elements/dist/plugin",'flowbite/plugin')]],
}
