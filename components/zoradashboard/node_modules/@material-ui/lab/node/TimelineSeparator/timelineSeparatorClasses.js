"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelineSeparatorUtilityClass = getTimelineSeparatorUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTimelineSeparatorUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTimelineSeparator', slot);
}

const timelineSeparatorClasses = (0, _unstyled.generateUtilityClasses)('MuiTimelineSeparator', ['root']);
var _default = timelineSeparatorClasses;
exports.default = _default;