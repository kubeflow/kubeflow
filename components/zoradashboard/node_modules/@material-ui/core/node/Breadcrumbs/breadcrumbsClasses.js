"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreadcrumbsUtilityClass = getBreadcrumbsUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getBreadcrumbsUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiBreadcrumbs', slot);
}

const breadcrumbsClasses = (0, _unstyled.generateUtilityClasses)('MuiBreadcrumbs', ['root', 'ol', 'li', 'separator']);
var _default = breadcrumbsClasses;
exports.default = _default;