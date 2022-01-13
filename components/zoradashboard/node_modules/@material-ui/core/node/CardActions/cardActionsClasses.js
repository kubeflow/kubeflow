"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardActionsUtilityClass = getCardActionsUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getCardActionsUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiCardActions', slot);
}

const cardActionsClasses = (0, _unstyled.generateUtilityClasses)('MuiCardActions', ['root', 'spacing']);
var _default = cardActionsClasses;
exports.default = _default;