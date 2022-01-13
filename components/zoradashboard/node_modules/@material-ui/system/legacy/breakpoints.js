import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import PropTypes from 'prop-types';
import { deepmerge } from '@material-ui/utils';
import merge from './merge'; // The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.

var values = {
  xs: 0,
  // phone
  sm: 600,
  // tablets
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536 // large screens

};
var defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: function up(key) {
    return "@media (min-width:".concat(values[key], "px)");
  }
};
export function handleBreakpoints(props, propValue, styleFromPropValue) {
  var theme = props.theme || {};

  if (Array.isArray(propValue)) {
    var themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce(function (acc, item, index) {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }

  if (_typeof(propValue) === 'object') {
    var _themeBreakpoints = theme.breakpoints || defaultBreakpoints;

    return Object.keys(propValue).reduce(function (acc, breakpoint) {
      // key is breakpoint
      if (Object.keys(_themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        var mediaKey = _themeBreakpoints.up(breakpoint);

        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        var cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }

      return acc;
    }, {});
  }

  var output = styleFromPropValue(propValue);
  return output;
}

function breakpoints(styleFunction) {
  var newStyleFunction = function newStyleFunction(props) {
    var theme = props.theme || {};
    var base = styleFunction(props);
    var themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    var extended = themeBreakpoints.keys.reduce(function (acc, key) {
      if (props[key]) {
        acc = acc || {};
        acc[themeBreakpoints.up(key)] = styleFunction(_extends({
          theme: theme
        }, props[key]));
      }

      return acc;
    }, null);
    return merge(base, extended);
  };

  newStyleFunction.propTypes = process.env.NODE_ENV !== 'production' ? _extends({}, styleFunction.propTypes, {
    xs: PropTypes.object,
    sm: PropTypes.object,
    md: PropTypes.object,
    lg: PropTypes.object,
    xl: PropTypes.object
  }) : {};
  newStyleFunction.filterProps = ['xs', 'sm', 'md', 'lg', 'xl'].concat(_toConsumableArray(styleFunction.filterProps));
  return newStyleFunction;
}

export function createEmptyBreakpointObject() {
  var _breakpointsInput$key;

  var breakpointsInput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var breakpointsInOrder = breakpointsInput == null ? void 0 : (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce(function (acc, key) {
    var breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
export function removeUnusedBreakpoints(breakpointKeys, style) {
  return breakpointKeys.reduce(function (acc, key) {
    var breakpointOutput = acc[key];
    var isBreakpointUnused = Object.keys(breakpointOutput).length === 0;

    if (isBreakpointUnused) {
      delete acc[key];
    }

    return acc;
  }, style);
}
export function mergeBreakpointsInOrder(breakpointsInput) {
  var emptyBreakpoints = createEmptyBreakpointObject(breakpointsInput);

  for (var _len = arguments.length, styles = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    styles[_key - 1] = arguments[_key];
  }

  var mergedOutput = [emptyBreakpoints].concat(styles).reduce(function (prev, next) {
    return deepmerge(prev, next);
  }, {});
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
}
export default breakpoints;