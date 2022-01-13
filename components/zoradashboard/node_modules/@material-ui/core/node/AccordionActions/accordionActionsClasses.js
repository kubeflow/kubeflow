"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccordionActionsUtilityClass = getAccordionActionsUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getAccordionActionsUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiAccordionActions', slot);
}

const accordionActionsClasses = (0, _unstyled.generateUtilityClasses)('MuiAccordionActions', ['root', 'spacing']);
var _default = accordionActionsClasses;
exports.default = _default;