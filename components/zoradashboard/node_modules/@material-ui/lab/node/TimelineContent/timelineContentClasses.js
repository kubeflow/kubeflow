"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelineContentUtilityClass = getTimelineContentUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTimelineContentUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTimelineContent', slot);
}

const timelineContentClasses = (0, _unstyled.generateUtilityClasses)('MuiTimelineContent', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
var _default = timelineContentClasses;
exports.default = _default;