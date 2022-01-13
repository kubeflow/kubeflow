"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Get height for given text line index
 *
 * @param {Object} node
 * @param {Number} index
 */
var heightAtLineIndex = function heightAtLineIndex(node, index) {
  var counter = 0;
  if (!node.lines) return counter;

  for (var i = 0; i < index; i += 1) {
    var line = node.lines[i];
    if (!line) break;
    counter += line.box.height;
  }

  return counter;
};

var _default = heightAtLineIndex;
exports.default = _default;