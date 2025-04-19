// tailwind.config.mjs
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backdropBlur: {
          ultra: '80px',
        },
      },
    },
    plugins: [],
  };
  