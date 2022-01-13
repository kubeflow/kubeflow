"use strict";

exports.__esModule = true;
exports.default = void 0;

var isPercent = function isPercent(value) {
  return /((-)?\d+\.?\d*)%/g.exec(value);
};
/**
 * Get percentage value of input
 *
 * @param {String} value
 * @returns {Object} percent value (if matches)
 */


var matchPercent = function matchPercent(value) {
  var match = isPercent(value);

  if (match) {
    var f = parseFloat(match[1], 10);
    var percent = f / 100;
    return {
      percent: percent,
      value: f
    };
  }

  return null;
};

var _default = matchPercent;
exports.default = _default;