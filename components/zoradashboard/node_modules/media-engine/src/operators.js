function And(left, right) {
  this.left = left;
  this.right = right;

  this.match = function(options) {
    return left.match(options) && right.match(options);
  };
}

function Or(left, right) {
  this.left = left;
  this.right = right;

  this.match = function(options) {
    return left.match(options) || right.match(options);
  };
}

module.exports = function Operator(type, left, right) {
  switch (type) {
    case 'and':
      return new And(left, right);
    case ',':
      return new Or(left, right);
    default:
      throw new Error(value);
  }
};
