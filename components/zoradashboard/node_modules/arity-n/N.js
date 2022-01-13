var arityFn = [
  require('./0'),
  require('./1'),
  require('./2'),
  require('./3'),
  require('./4'),
  require('./5')
];

module.exports = function(fn, n) {
  if (n && n <= 5) {
    return arityFn[n](fn);
  } else {
    return fn;
  }
};
