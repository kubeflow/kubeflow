"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Get lines height (if any)
 *
 * @param {Object} node
 * @returns {Number} lines height
 */
var linesHeight = function linesHeight(node) {
  if (!node.lines) return -1;
  return node.lines.reduce(function (acc, line) {
    return acc + line.box.height;
  }, 0);
};

var _default = linesHeight;
exports.default = _default;