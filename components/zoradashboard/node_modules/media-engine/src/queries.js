function MaxHeight(value) {
  this.value = value;

  this.match = function(options) {
    return this.value >= options.height;
  };
}

function MinHeight(value) {
  this.value = value;

  this.match = function(options) {
    return this.value < options.height;
  };
}

function MaxWidth(value) {
  this.value = value;

  this.match = function(options) {
    return this.value >= options.width;
  };
}

function MinWidth(value) {
  this.value = value;

  this.match = function(options) {
    return this.value < options.width;
  };
}

function Orientation(value) {
  this.value = value;

  this.match = function(options) {
    return this.value === options.orientation;
  };
}

module.exports = function Query(type, value) {
  switch (type) {
    case 'max-height':
      return new MaxHeight(value);
    case 'min-height':
      return new MinHeight(value);
    case 'max-width':
      return new MaxWidth(value);
    case 'min-width':
      return new MinWidth(value);
    case 'orientation':
      return new Orientation(value);
    default:
      throw new Error(value);
  }
};
