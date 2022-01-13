"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _merge = _interopRequireDefault(require("../merge"));

var _getThemeValue = _interopRequireWildcard(require("../getThemeValue"));

var _breakpoints = require("../breakpoints");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every(object => union.size === Object.keys(object).length);
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
}

function styleFunctionSx(props) {
  const {
    sx: styles,
    theme = {}
  } = props || {};
  if (!styles) return null;

  if (typeof styles === 'function') {
    return styles(theme);
  }

  if (typeof styles !== 'object') {
    // value
    return styles;
  }

  const emptyBreakpoints = (0, _breakpoints.createEmptyBreakpointObject)(theme.breakpoints);
  const breakpointsKeys = Object.keys(emptyBreakpoints);
  let css = emptyBreakpoints;
  Object.keys(styles).forEach(styleKey => {
    const value = callIfFn(styles[styleKey], theme);

    if (typeof value === 'object') {
      if (_getThemeValue.propToStyleFunction[styleKey]) {
        css = (0, _merge.default)(css, (0, _getThemeValue.default)(styleKey, value, theme));
      } else {
        const breakpointsValues = (0, _breakpoints.handleBreakpoints)({
          theme
        }, value, x => ({
          [styleKey]: x
        }));

        if (objectsHaveSameKeys(breakpointsValues, value)) {
          css[styleKey] = styleFunctionSx({
            sx: value,
            theme
          });
        } else {
          css = (0, _merge.default)(css, breakpointsValues);
        }
      }
    } else {
      css = (0, _merge.default)(css, (0, _getThemeValue.default)(styleKey, value, theme));
    }
  });
  return (0, _breakpoints.removeUnusedBreakpoints)(breakpointsKeys, css);
}

styleFunctionSx.filterProps = ['sx'];
var _default = styleFunctionSx;
exports.default = _default;