module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'mytheme': { // custom theme
          'primary' : '#ea5234',
          'primary-focus' : '#d43616',
          'primary-content' : '#ffffff',
          // other colors
        },
        'myothertheme': { // custom theme
          'primary' : '#007ebd',
          'primary-focus' : '#005c8a',
          'primary-content' : '#ffffff',
          // other colors
        },
      },
      'dark', // and some pre-defined theme
      'forest',
      'synthwave'
    ],
  },
}
