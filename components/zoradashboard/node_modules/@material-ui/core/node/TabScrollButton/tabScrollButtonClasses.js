"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabScrollButtonUtilityClass = getTabScrollButtonUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTabScrollButtonUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTabScrollButton', slot);
}

const tabScrollButtonClasses = (0, _unstyled.generateUtilityClasses)('MuiTabScrollButton', ['root', 'vertical', 'horizontal', 'disabled']);
var _default = tabScrollButtonClasses;
exports.default = _default;