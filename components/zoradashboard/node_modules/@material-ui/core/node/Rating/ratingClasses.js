"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRatingUtilityClass = getRatingUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getRatingUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiRating', slot);
}

const ratingClasses = (0, _unstyled.generateUtilityClasses)('MuiRating', ['root', 'sizeSmall', 'sizeMedium', 'sizeLarge', 'readOnly', 'disabled', 'focusVisible', 'visuallyHidden', 'pristine', 'label', 'labelEmptyValueActive', 'icon', 'iconEmpty', 'iconFilled', 'iconHover', 'iconFocus', 'iconActive', 'decimal']);
var _default = ratingClasses;
exports.default = _default;