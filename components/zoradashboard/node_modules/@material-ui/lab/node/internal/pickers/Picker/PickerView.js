"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _dimensions = require("../constants/dimensions");

const PickerView = (0, _styles.styled)('div')({
  overflowX: 'hidden',
  width: _dimensions.DIALOG_WIDTH,
  maxHeight: _dimensions.VIEW_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto'
});
var _default = PickerView;
exports.default = _default;