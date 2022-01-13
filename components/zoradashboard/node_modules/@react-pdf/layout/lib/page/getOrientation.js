"use strict";

exports.__esModule = true;
exports.default = void 0;
var VALID_ORIENTATIONS = ['portrait', 'landscape'];
/**
 * Get page orientation. Defaults to portrait
 *
 * @param { Object } page object
 * @returns { String } page orientation
 */

var getOrientation = function getOrientation(page) {
  var _page$props;

  var value = ((_page$props = page.props) === null || _page$props === void 0 ? void 0 : _page$props.orientation) || 'portrait';
  return VALID_ORIENTATIONS.includes(value) ? value : 'portrait';
};

var _default = getOrientation;
exports.default = _default;