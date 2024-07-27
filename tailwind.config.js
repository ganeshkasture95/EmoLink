/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#1063FD',
        muted: '#3A5A92',
        background: '#EFEEF6',
        gray: '#6E6E73',
        lightGray: '#DCDCE2',
        green: '#4FEE57',
        lightGreen: '#DBFFCB',
        red: '#EF0827',
        yellow: '#FCC70B',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
