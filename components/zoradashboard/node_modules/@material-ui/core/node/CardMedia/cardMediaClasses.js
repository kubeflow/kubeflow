"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardMediaUtilityClass = getCardMediaUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getCardMediaUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiCardMedia', slot);
}

const cardMediaClasses = (0, _unstyled.generateUtilityClasses)('MuiCardMedia', ['root', 'media', 'img']);
var _default = cardMediaClasses;
exports.default = _default;