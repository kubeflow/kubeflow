module.exports = function(fn) {
  return function(a, b, c) {
    return fn.apply(null, arguments);
  };
};
