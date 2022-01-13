"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propToStyleFunction = void 0;

var _borders = _interopRequireDefault(require("./borders"));

var _display = _interopRequireDefault(require("./display"));

var _flexbox = _interopRequireDefault(require("./flexbox"));

var _grid = _interopRequireDefault(require("./grid"));

var _positions = _interopRequireDefault(require("./positions"));

var _palette = _interopRequireDefault(require("./palette"));

var _shadows = _interopRequireDefault(require("./shadows"));

var _sizing = _interopRequireDefault(require("./sizing"));

var _spacing = _interopRequireDefault(require("./spacing"));

var _typography = _interopRequireDefault(require("./typography"));

const filterPropsMapping = {
  borders: _borders.default.filterProps,
  display: _display.default.filterProps,
  flexbox: _flexbox.default.filterProps,
  grid: _grid.default.filterProps,
  positions: _positions.default.filterProps,
  palette: _palette.default.filterProps,
  shadows: _shadows.default.filterProps,
  sizing: _sizing.default.filterProps,
  spacing: _spacing.default.filterProps,
  typography: _typography.default.filterProps
};
const styleFunctionMapping = {
  borders: _borders.default,
  display: _display.default,
  flexbox: _flexbox.default,
  grid: _grid.default,
  positions: _positions.default,
  palette: _palette.default,
  shadows: _shadows.default,
  sizing: _sizing.default,
  spacing: _spacing.default,
  typography: _typography.default
};
const propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach(propName => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });
  return acc;
}, {});
exports.propToStyleFunction = propToStyleFunction;

function getThemeValue(prop, value, theme) {
  const inputProps = {
    [prop]: value,
    theme
  };
  const styleFunction = propToStyleFunction[prop];
  return styleFunction ? styleFunction(inputProps) : {
    [prop]: value
  };
}

var _default = getThemeValue;
exports.default = _default;