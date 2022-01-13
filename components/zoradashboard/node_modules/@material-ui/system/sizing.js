"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.boxSizing = exports.sizeHeight = exports.sizeWidth = exports.minHeight = exports.maxHeight = exports.height = exports.minWidth = exports.maxWidth = exports.width = void 0;

var _style = _interopRequireDefault(require("./style"));

var _compose = _interopRequireDefault(require("./compose"));

var _breakpoints = require("./breakpoints");

function transform(value) {
  return value <= 1 ? `${value * 100}%` : value;
}

const width = (0, _style.default)({
  prop: 'width',
  transform
});
exports.width = width;

const maxWidth = props => {
  if (props.maxWidth) {
    const styleFromPropValue = propValue => {
      const breakpoint = props.theme.breakpoints.values[propValue];
      return {
        maxWidth: breakpoint || transform(propValue)
      };
    };

    return (0, _breakpoints.handleBreakpoints)(props, props.maxWidth, styleFromPropValue);
  }

  return null;
};

exports.maxWidth = maxWidth;
maxWidth.filterProps = ['maxWidth'];
const minWidth = (0, _style.default)({
  prop: 'minWidth',
  transform
});
exports.minWidth = minWidth;
const height = (0, _style.default)({
  prop: 'height',
  transform
});
exports.height = height;
const maxHeight = (0, _style.default)({
  prop: 'maxHeight',
  transform
});
exports.maxHeight = maxHeight;
const minHeight = (0, _style.default)({
  prop: 'minHeight',
  transform
});
exports.minHeight = minHeight;
const sizeWidth = (0, _style.default)({
  prop: 'size',
  cssProperty: 'width',
  transform
});
exports.sizeWidth = sizeWidth;
const sizeHeight = (0, _style.default)({
  prop: 'size',
  cssProperty: 'height',
  transform
});
exports.sizeHeight = sizeHeight;
const boxSizing = (0, _style.default)({
  prop: 'boxSizing'
});
exports.boxSizing = boxSizing;
const sizing = (0, _compose.default)(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
var _default = sizing;
exports.default = _default;