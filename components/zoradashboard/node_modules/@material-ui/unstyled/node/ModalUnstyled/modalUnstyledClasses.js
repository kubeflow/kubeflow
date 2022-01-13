"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModalUtilityClass = getModalUtilityClass;
exports.default = void 0;

var _generateUtilityClasses = _interopRequireDefault(require("../generateUtilityClasses"));

var _generateUtilityClass = _interopRequireDefault(require("../generateUtilityClass"));

function getModalUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiModal', slot);
}

const modalUnstyledClasses = (0, _generateUtilityClasses.default)('MuiModal', ['root', 'hidden']);
var _default = modalUnstyledClasses;
exports.default = _default;