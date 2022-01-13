"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Get line index at given height
 *
 * @param {Object} node
 * @param {Number} height
 */
var lineIndexAtHeight = function lineIndexAtHeight(node, height) {
  var y = 0;
  if (!node.lines) return 0;

  for (var i = 0; i < node.lines.length; i += 1) {
    var line = node.lines[i];
    if (y + line.box.height > height) return i;
    y += line.box.height;
  }

  return node.lines.length;
};

var _default = lineIndexAtHeight;
exports.default = _default;