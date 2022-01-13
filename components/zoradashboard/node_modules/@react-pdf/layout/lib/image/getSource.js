"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Get image source
 *
 * @param {Object} image node
 * @returns {String | Object} image src
 */
var getSource = function getSource(node) {
  var _node$props, _node$props2, _node$props3;

  return ((_node$props = node.props) === null || _node$props === void 0 ? void 0 : _node$props.src) || ((_node$props2 = node.props) === null || _node$props2 === void 0 ? void 0 : _node$props2.source) || ((_node$props3 = node.props) === null || _node$props3 === void 0 ? void 0 : _node$props3.href);
};

var _default = getSource;
exports.default = _default;