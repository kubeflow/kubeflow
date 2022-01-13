"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypographyUtilityClass = getTypographyUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTypographyUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTypography', slot);
}

const typographyClasses = (0, _unstyled.generateUtilityClasses)('MuiTypography', ['root', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit', 'button', 'caption', 'overline', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify', 'noWrap', 'gutterBottom', 'paragraph']);
var _default = typographyClasses;
exports.default = _default;