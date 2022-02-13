module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px'
      },
      screens: {
        'hover-hover': {
          'raw': '(hover: hover)'
        }
      },
      fontFamily: {
          'montserrat': ['Montserrat'],
          'lato': ['Lato'],
          'garamond': ['Garamond']
      },
      container: {
        center: true,
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height'
      },
      colors: {
        'vibrant-red': '#f9004d',
        'light-black': '#101010',
      },
      fontSize: {
        '5xl': ['3rem', {
          lineHeight: '2.75',
        }],
        // Or with a default line-height as well
        '6xl': ['3.75rem', {
          lineHeight: '3',
        }],
      }
    },
  },
  plugins: [
    require("tailwind-gradient-mask-image")
  ],
}
