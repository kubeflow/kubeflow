import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getGridUtilityClass(slot) {
  return generateUtilityClass('MuiGrid', slot);
}
var SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var DIRECTIONS = ['column-reverse', 'column', 'row-reverse', 'row'];
var WRAPS = ['nowrap', 'wrap-reverse', 'wrap'];
var GRID_SIZES = ['auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var gridClasses = generateUtilityClasses('MuiGrid', ['root', 'container', 'item', 'zeroMinWidth'].concat(_toConsumableArray(SPACINGS.map(function (spacing) {
  return "spacing-xs-".concat(spacing);
})), _toConsumableArray(DIRECTIONS.map(function (direction) {
  return "direction-xs-".concat(direction);
})), _toConsumableArray(WRAPS.map(function (wrap) {
  return "wrap-xs-".concat(wrap);
})), _toConsumableArray(GRID_SIZES.map(function (size) {
  return "grid-xs-".concat(size);
})), _toConsumableArray(GRID_SIZES.map(function (size) {
  return "grid-sm-".concat(size);
})), _toConsumableArray(GRID_SIZES.map(function (size) {
  return "grid-md-".concat(size);
})), _toConsumableArray(GRID_SIZES.map(function (size) {
  return "grid-lg-".concat(size);
})), _toConsumableArray(GRID_SIZES.map(function (size) {
  return "grid-xl-".concat(size);
}))));
export default gridClasses;