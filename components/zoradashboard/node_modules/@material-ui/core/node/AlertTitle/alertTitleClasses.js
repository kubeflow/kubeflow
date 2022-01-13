"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlertTitleUtilityClass = getAlertTitleUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getAlertTitleUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiAlertTitle', slot);
}

const alertTitleClasses = (0, _unstyled.generateUtilityClasses)('MuiAlertTitle', ['root']);
var _default = alertTitleClasses;
exports.default = _default;