"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinkUtilityClass = getLinkUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getLinkUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiLink', slot);
}

const linkClasses = (0, _unstyled.generateUtilityClasses)('MuiLink', ['root', 'underlineNone', 'underlineHover', 'underlineAlways', 'button', 'focusVisible']);
var _default = linkClasses;
exports.default = _default;