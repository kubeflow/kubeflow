"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpeedDialUtilityClass = getSpeedDialUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getSpeedDialUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiSpeedDial', slot);
}

const speedDialClasses = (0, _unstyled.generateUtilityClasses)('MuiSpeedDial', ['root', 'fab', 'directionUp', 'directionDown', 'directionLeft', 'directionRight', 'actions', 'actionsClosed']);
var _default = speedDialClasses;
exports.default = _default;