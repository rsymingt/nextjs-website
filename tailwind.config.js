module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    // './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',

    // // Or if using `src` directory:
    // './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
      screens: {
        'hover-hover': {
          raw: '(hover: hover)',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        lato: ['Lato'],
        garamond: ['Garamond'],
      },
      container: {
        center: true,
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      colors: {
        'vibrant-red': '#f9004d',
        'light-black': '#101010',
      },
      fontSize: {
        '5xl': [
          '3rem',
          {
            lineHeight: '2.75',
          },
        ],
        // Or with a default line-height as well
        '6xl': [
          '3.75rem',
          {
            lineHeight: '3',
          },
        ],
      },
    },
  },
  plugins: [require('tailwind-gradient-mask-image')],
};
