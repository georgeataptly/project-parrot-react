/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#000000",
                  
          "secondary": "#0A004A",
                  
          "accent": "#FFDE00",
                  
          "neutral": "#E2E2E2",
                  
          "base-100": "#F1F1F1",
                  
          "info": "#E08534",
                  
          "success": "#88B644",
                  
          "warning": "#5C54D2",
                  
          "error": "#D15549",
        },
      },
    ],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
