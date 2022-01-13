"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuUtilityClass = getMenuUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getMenuUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiMenu', slot);
}

const menuClasses = (0, _unstyled.generateUtilityClasses)('MuiMenu', ['root', 'paper', 'list']);
var _default = menuClasses;
exports.default = _default;