"use strict";

exports.__esModule = true;
exports.default = void 0;

var parseViewbox = function parseViewbox(value) {
  if (!value) return null;
  var values = value.split(/[,\s]+/).map(parseFloat);
  if (values.length !== 4) return null;
  return {
    minX: values[0],
    minY: values[1],
    maxX: values[2],
    maxY: values[3]
  };
};

var _default = parseViewbox;
exports.default = _default;