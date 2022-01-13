module.exports = [
  require('./webpack-protocol'),
  require('./webpack-bootstrap'),
  require('./bower-component'),
  require('./npm-module'),
  /* insert here any additional special character CODECs */
  require('./output-relative'),
  require('./project-relative'),
  require('./source-relative'),
  require('./absolute')
];