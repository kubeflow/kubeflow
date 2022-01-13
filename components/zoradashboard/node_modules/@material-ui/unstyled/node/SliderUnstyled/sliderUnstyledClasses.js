"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSliderUtilityClass = getSliderUtilityClass;
exports.default = void 0;

var _generateUtilityClasses = _interopRequireDefault(require("../generateUtilityClasses"));

var _generateUtilityClass = _interopRequireDefault(require("../generateUtilityClass"));

function getSliderUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiSlider', slot);
}

const sliderUnstyledClasses = (0, _generateUtilityClasses.default)('MuiSlider', ['root', 'active', 'focusVisible', 'disabled', 'dragging', 'marked', 'vertical', 'trackInverted', 'trackFalse', 'rail', 'track', 'mark', 'markActive', 'markLabel', 'markLabelActive', 'thumb', 'valueLabel', 'valueLabelOpen', 'valueLabelCircle', 'valueLabelLabel']);
var _default = sliderUnstyledClasses;
exports.default = _default;