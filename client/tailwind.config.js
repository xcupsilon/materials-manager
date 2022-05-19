module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#24242a',
        'dark-background': '#17171b',
        'darker-background': '#101013',
        'border': '#4c4c59',
        'form': '#36363f',
        'active': '#00003f',
        'darkened-button': '#373741',
        'darkened-button-text': '#747474',
        'selected' : '#00003f',
        'text': '#e0e0e1',
      },
    },
  },
  plugins: [],
}
