module.exports = function(fn) {
  return function(a, b) {
    return fn.apply(null, arguments);
  };
};
