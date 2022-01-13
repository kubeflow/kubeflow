"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccordionDetailsUtilityClass = getAccordionDetailsUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getAccordionDetailsUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiAccordionDetails', slot);
}

const accordionDetailsClasses = (0, _unstyled.generateUtilityClasses)('MuiAccordionDetails', ['root']);
var _default = accordionDetailsClasses;
exports.default = _default;