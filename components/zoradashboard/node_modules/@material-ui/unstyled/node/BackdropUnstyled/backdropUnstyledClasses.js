"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBackdropUtilityClass = getBackdropUtilityClass;
exports.default = void 0;

var _generateUtilityClasses = _interopRequireDefault(require("../generateUtilityClasses"));

var _generateUtilityClass = _interopRequireDefault(require("../generateUtilityClass"));

function getBackdropUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiBackdrop', slot);
}

const backdropUnstyledClasses = (0, _generateUtilityClasses.default)('MuiBackdrop', ['root', 'invisible']);
var _default = backdropUnstyledClasses;
exports.default = _default;