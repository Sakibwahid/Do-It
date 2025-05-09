// tailwind.config.js
module.exports = {
    content: [
      "./index.html",  // Adjust path based on your file structure
      "./src/**/*.{html,js}",
    ],
    theme: {
      extend: {
        fontfamily: {
          'inter': ['Inter', 'sans-serif'],
          'serif': ['Merriweather', 'serif'],
          'mono': ['Menlo', 'monospace'],
        },

      },
    },
    plugins: [],
  };
  