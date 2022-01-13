module.exports = function(fn) {
  return function(a, b, c, d, e) {
    return fn.apply(null, arguments);
  };
};
