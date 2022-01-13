"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListUtilityClass = getListUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getListUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiList', slot);
}

const listClasses = (0, _unstyled.generateUtilityClasses)('MuiList', ['root', 'padding', 'dense', 'subheader']);
var _default = listClasses;
exports.default = _default;