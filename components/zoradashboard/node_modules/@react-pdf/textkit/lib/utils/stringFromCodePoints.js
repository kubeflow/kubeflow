"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Get string from array of code points
 *
 * @param {Array} code points
 * @return {String} string
 */
var stringFromCodePoints = function stringFromCodePoints(codePoints) {
  return String.fromCodePoint.apply(String, codePoints);
};

var _default = stringFromCodePoints;
exports.default = _default;