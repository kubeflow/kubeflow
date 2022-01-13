"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelineDotUtilityClass = getTimelineDotUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTimelineDotUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTimelineDot', slot);
}

const timelineDotClasses = (0, _unstyled.generateUtilityClasses)('MuiTimelineDot', ['root', 'filled', 'outlined', 'filledGrey', 'outlinedGrey', 'filledPrimary', 'outlinedPrimary', 'filledSecondary', 'outlinedSecondary']);
var _default = timelineDotClasses;
exports.default = _default;