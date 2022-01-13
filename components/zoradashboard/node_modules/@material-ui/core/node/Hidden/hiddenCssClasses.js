"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHiddenCssUtilityClass = getHiddenCssUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getHiddenCssUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('PrivateHiddenCss', slot);
}

const hiddenCssClasses = (0, _unstyled.generateUtilityClasses)('PrivateHiddenCss', ['root', 'xlDown', 'xlUp', 'onlyXl', 'lgDown', 'lgUp', 'onlyLg', 'mdDown', 'mdUp', 'onlyMd', 'smDown', 'smUp', 'onlySm', 'xsDown', 'xsUp', 'onlyXs']);
var _default = hiddenCssClasses;
exports.default = _default;