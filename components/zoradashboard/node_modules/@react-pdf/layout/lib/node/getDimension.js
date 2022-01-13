"use strict";

exports.__esModule = true;
exports.default = void 0;
var DEFAULT_DIMENSION = {
  width: 0,
  height: 0
};
/**
 * Get Yoga computed dimensions. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} dimensions
 */

var getDimension = function getDimension(node) {
  var yogaNode = node._yogaNode;
  if (!yogaNode) return DEFAULT_DIMENSION;
  return {
    width: yogaNode.getComputedWidth(),
    height: yogaNode.getComputedHeight()
  };
};

var _default = getDimension;
exports.default = _default;