"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoadingButtonUtilityClass = getLoadingButtonUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getLoadingButtonUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiLoadingButton', slot);
}

const loadingButtonClasses = (0, _unstyled.generateUtilityClasses)('MuiLoadingButton', ['root', 'loading', 'loadingIndicator', 'loadingIndicatorCenter', 'loadingIndicatorStart', 'loadingIndicatorEnd', 'endIconLoadingEnd', 'startIconLoadingStart']);
var _default = loadingButtonClasses;
exports.default = _default;