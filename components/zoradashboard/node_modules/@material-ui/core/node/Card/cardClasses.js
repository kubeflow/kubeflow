"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardUtilityClass = getCardUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getCardUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiCard', slot);
}

const cardClasses = (0, _unstyled.generateUtilityClasses)('MuiCard', ['root']);
var _default = cardClasses;
exports.default = _default;