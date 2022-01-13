"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardHeaderUtilityClass = getCardHeaderUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getCardHeaderUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiCardHeader', slot);
}

const cardHeaderClasses = (0, _unstyled.generateUtilityClasses)('MuiCardHeader', ['root', 'avatar', 'action', 'content', 'title', 'subheader']);
var _default = cardHeaderClasses;
exports.default = _default;