"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabPanelUtilityClass = getTabPanelUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTabPanelUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTabPanel', slot);
}

const tabPanelClasses = (0, _unstyled.generateUtilityClasses)('MuiTabPanel', ['root']);
var _default = tabPanelClasses;
exports.default = _default;