"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardActionAreaUtilityClass = getCardActionAreaUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getCardActionAreaUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiCardActionArea', slot);
}

const cardActionAreaClasses = (0, _unstyled.generateUtilityClasses)('MuiCardActionArea', ['root', 'focusVisible', 'focusHighlight']);
var _default = cardActionAreaClasses;
exports.default = _default;