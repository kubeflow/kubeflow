"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUtilityClasses;

var _generateUtilityClass = _interopRequireDefault(require("../generateUtilityClass"));

function generateUtilityClasses(componentName, slots) {
  const result = {};
  slots.forEach(slot => {
    result[slot] = (0, _generateUtilityClass.default)(componentName, slot);
  });
  return result;
}