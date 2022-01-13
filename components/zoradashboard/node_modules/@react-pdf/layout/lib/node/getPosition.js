"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Get Yoga computed position. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} position
 */
var getPosition = function getPosition(node) {
  var yogaNode = node._yogaNode;
  return {
    top: (yogaNode === null || yogaNode === void 0 ? void 0 : yogaNode.getComputedTop()) || 0,
    right: (yogaNode === null || yogaNode === void 0 ? void 0 : yogaNode.getComputedRight()) || 0,
    bottom: (yogaNode === null || yogaNode === void 0 ? void 0 : yogaNode.getComputedBottom()) || 0,
    left: (yogaNode === null || yogaNode === void 0 ? void 0 : yogaNode.getComputedLeft()) || 0
  };
};

var _default = getPosition;
exports.default = _default;