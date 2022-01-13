module.exports = function(fn) {
  return function(a, b, c, d) {
    return fn.apply(null, arguments);
  };
};
