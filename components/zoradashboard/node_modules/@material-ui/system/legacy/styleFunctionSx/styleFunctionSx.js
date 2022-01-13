import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import merge from '../merge';
import getThemeValue, { propToStyleFunction } from '../getThemeValue';
import { handleBreakpoints, createEmptyBreakpointObject, removeUnusedBreakpoints } from '../breakpoints';

function objectsHaveSameKeys() {
  for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }

  var allKeys = objects.reduce(function (keys, object) {
    return keys.concat(Object.keys(object));
  }, []);
  var union = new Set(allKeys);
  return objects.every(function (object) {
    return union.size === Object.keys(object).length;
  });
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
}

function styleFunctionSx(props) {
  var _ref = props || {},
      styles = _ref.sx,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? {} : _ref$theme;

  if (!styles) return null;

  if (typeof styles === 'function') {
    return styles(theme);
  }

  if (_typeof(styles) !== 'object') {
    // value
    return styles;
  }

  var emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
  var breakpointsKeys = Object.keys(emptyBreakpoints);
  var css = emptyBreakpoints;
  Object.keys(styles).forEach(function (styleKey) {
    var value = callIfFn(styles[styleKey], theme);

    if (_typeof(value) === 'object') {
      if (propToStyleFunction[styleKey]) {
        css = merge(css, getThemeValue(styleKey, value, theme));
      } else {
        var breakpointsValues = handleBreakpoints({
          theme: theme
        }, value, function (x) {
          return _defineProperty({}, styleKey, x);
        });

        if (objectsHaveSameKeys(breakpointsValues, value)) {
          css[styleKey] = styleFunctionSx({
            sx: value,
            theme: theme
          });
        } else {
          css = merge(css, breakpointsValues);
        }
      }
    } else {
      css = merge(css, getThemeValue(styleKey, value, theme));
    }
  });
  return removeUnusedBreakpoints(breakpointsKeys, css);
}

styleFunctionSx.filterProps = ['sx'];
export default styleFunctionSx;