"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Get image ratio
 *
 * @param {Object} image node
 * @returns {Number} image ratio
 */
var getRatio = function getRatio(node) {
  var _node$image;

  return (_node$image = node.image) !== null && _node$image !== void 0 && _node$image.data ? node.image.width / node.image.height : 1;
};

var _default = getRatio;
exports.default = _default;