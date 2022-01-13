"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelineOppositeContentUtilityClass = getTimelineOppositeContentUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTimelineOppositeContentUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTimelineOppositeContent', slot);
}

const timelineOppositeContentClasses = (0, _unstyled.generateUtilityClasses)('MuiTimelineOppositeContent', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
var _default = timelineOppositeContentClasses;
exports.default = _default;