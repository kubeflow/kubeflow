"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.gridArea = exports.gridTemplateAreas = exports.gridTemplateRows = exports.gridTemplateColumns = exports.gridAutoRows = exports.gridAutoColumns = exports.gridAutoFlow = exports.gridRow = exports.gridColumn = exports.rowGap = exports.columnGap = exports.gap = void 0;

var _style = _interopRequireDefault(require("./style"));

var _compose = _interopRequireDefault(require("./compose"));

var _spacing = require("./spacing");

var _breakpoints = require("./breakpoints");

var _responsivePropType = _interopRequireDefault(require("./responsivePropType"));

const gap = props => {
  if (props.gap) {
    const transformer = (0, _spacing.createUnaryUnit)(props.theme, 'spacing', 8, 'gap');

    const styleFromPropValue = propValue => ({
      gap: (0, _spacing.getValue)(transformer, propValue)
    });

    return (0, _breakpoints.handleBreakpoints)(props, props.gap, styleFromPropValue);
  }

  return null;
};

exports.gap = gap;
gap.propTypes = process.env.NODE_ENV !== 'production' ? {
  gap: _responsivePropType.default
} : {};
gap.filterProps = ['gap'];

const columnGap = props => {
  if (props.columnGap) {
    const transformer = (0, _spacing.createUnaryUnit)(props.theme, 'spacing', 8, 'columnGap');

    const styleFromPropValue = propValue => ({
      columnGap: (0, _spacing.getValue)(transformer, propValue)
    });

    return (0, _breakpoints.handleBreakpoints)(props, props.columnGap, styleFromPropValue);
  }

  return null;
};

exports.columnGap = columnGap;
columnGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  columnGap: _responsivePropType.default
} : {};
columnGap.filterProps = ['columnGap'];

const rowGap = props => {
  if (props.rowGap) {
    const transformer = (0, _spacing.createUnaryUnit)(props.theme, 'spacing', 8, 'rowGap');

    const styleFromPropValue = propValue => ({
      rowGap: (0, _spacing.getValue)(transformer, propValue)
    });

    return (0, _breakpoints.handleBreakpoints)(props, props.rowGap, styleFromPropValue);
  }

  return null;
};

exports.rowGap = rowGap;
rowGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  rowGap: _responsivePropType.default
} : {};
rowGap.filterProps = ['rowGap'];
const gridColumn = (0, _style.default)({
  prop: 'gridColumn'
});
exports.gridColumn = gridColumn;
const gridRow = (0, _style.default)({
  prop: 'gridRow'
});
exports.gridRow = gridRow;
const gridAutoFlow = (0, _style.default)({
  prop: 'gridAutoFlow'
});
exports.gridAutoFlow = gridAutoFlow;
const gridAutoColumns = (0, _style.default)({
  prop: 'gridAutoColumns'
});
exports.gridAutoColumns = gridAutoColumns;
const gridAutoRows = (0, _style.default)({
  prop: 'gridAutoRows'
});
exports.gridAutoRows = gridAutoRows;
const gridTemplateColumns = (0, _style.default)({
  prop: 'gridTemplateColumns'
});
exports.gridTemplateColumns = gridTemplateColumns;
const gridTemplateRows = (0, _style.default)({
  prop: 'gridTemplateRows'
});
exports.gridTemplateRows = gridTemplateRows;
const gridTemplateAreas = (0, _style.default)({
  prop: 'gridTemplateAreas'
});
exports.gridTemplateAreas = gridTemplateAreas;
const gridArea = (0, _style.default)({
  prop: 'gridArea'
});
exports.gridArea = gridArea;
const grid = (0, _compose.default)(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
var _default = grid;
exports.default = _default;