"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSwitchBaseUtilityClass = getSwitchBaseUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getSwitchBaseUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('PrivateSwitchBase', slot);
}

const switchBaseClasses = (0, _unstyled.generateUtilityClasses)('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
var _default = switchBaseClasses;
exports.default = _default;