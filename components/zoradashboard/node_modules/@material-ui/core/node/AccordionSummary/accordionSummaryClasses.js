"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccordionSummaryUtilityClass = getAccordionSummaryUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getAccordionSummaryUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiAccordionSummary', slot);
}

const accordionSummaryClasses = (0, _unstyled.generateUtilityClasses)('MuiAccordionSummary', ['root', 'expanded', 'focusVisible', 'disabled', 'gutters', 'contentGutters', 'content', 'expandIconWrapper']);
var _default = accordionSummaryClasses;
exports.default = _default;