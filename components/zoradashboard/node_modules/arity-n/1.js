module.exports = function(fn) {
  return function(a) {
    return fn.apply(null, arguments);
  };
};
