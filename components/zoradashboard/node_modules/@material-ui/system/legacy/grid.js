import style from './style';
import compose from './compose';
import { createUnaryUnit, getValue } from './spacing';
import { handleBreakpoints } from './breakpoints';
import responsivePropType from './responsivePropType';
export var gap = function gap(props) {
  if (props.gap) {
    var transformer = createUnaryUnit(props.theme, 'spacing', 8, 'gap');

    var styleFromPropValue = function styleFromPropValue(propValue) {
      return {
        gap: getValue(transformer, propValue)
      };
    };

    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }

  return null;
};
gap.propTypes = process.env.NODE_ENV !== 'production' ? {
  gap: responsivePropType
} : {};
gap.filterProps = ['gap'];
export var columnGap = function columnGap(props) {
  if (props.columnGap) {
    var transformer = createUnaryUnit(props.theme, 'spacing', 8, 'columnGap');

    var styleFromPropValue = function styleFromPropValue(propValue) {
      return {
        columnGap: getValue(transformer, propValue)
      };
    };

    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }

  return null;
};
columnGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  columnGap: responsivePropType
} : {};
columnGap.filterProps = ['columnGap'];
export var rowGap = function rowGap(props) {
  if (props.rowGap) {
    var transformer = createUnaryUnit(props.theme, 'spacing', 8, 'rowGap');

    var styleFromPropValue = function styleFromPropValue(propValue) {
      return {
        rowGap: getValue(transformer, propValue)
      };
    };

    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }

  return null;
};
rowGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  rowGap: responsivePropType
} : {};
rowGap.filterProps = ['rowGap'];
export var gridColumn = style({
  prop: 'gridColumn'
});
export var gridRow = style({
  prop: 'gridRow'
});
export var gridAutoFlow = style({
  prop: 'gridAutoFlow'
});
export var gridAutoColumns = style({
  prop: 'gridAutoColumns'
});
export var gridAutoRows = style({
  prop: 'gridAutoRows'
});
export var gridTemplateColumns = style({
  prop: 'gridTemplateColumns'
});
export var gridTemplateRows = style({
  prop: 'gridTemplateRows'
});
export var gridTemplateAreas = style({
  prop: 'gridTemplateAreas'
});
export var gridArea = style({
  prop: 'gridArea'
});
var grid = compose(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
export default grid;