module.exports = function(fn) {
  return function() {
    return fn.apply(null, arguments);
  };
};
