"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardContentUtilityClass = getCardContentUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getCardContentUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiCardContent', slot);
}

const cardContentClasses = (0, _unstyled.generateUtilityClasses)('MuiCardContent', ['root']);
var _default = cardContentClasses;
exports.default = _default;