"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isWidthDown = exports.isWidthUp = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@material-ui/utils");

var _system = require("@material-ui/system");

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _useEnhancedEffect = _interopRequireDefault(require("../utils/useEnhancedEffect"));

var _useMediaQuery = _interopRequireDefault(require("../useMediaQuery"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["initialWidth", "width"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl']; // By default, returns true if screen width is the same or greater than the given breakpoint.

const isWidthUp = (breakpoint, width, inclusive = true) => {
  if (inclusive) {
    return breakpointKeys.indexOf(breakpoint) <= breakpointKeys.indexOf(width);
  }

  return breakpointKeys.indexOf(breakpoint) < breakpointKeys.indexOf(width);
}; // By default, returns true if screen width is the same or less than the given breakpoint.


exports.isWidthUp = isWidthUp;

const isWidthDown = (breakpoint, width, inclusive = false) => {
  if (inclusive) {
    return breakpointKeys.indexOf(width) <= breakpointKeys.indexOf(breakpoint);
  }

  return breakpointKeys.indexOf(width) < breakpointKeys.indexOf(breakpoint);
};

exports.isWidthDown = isWidthDown;

const withWidth = (options = {}) => Component => {
  const {
    withTheme: withThemeOption = false,
    noSSR = false,
    initialWidth: initialWidthOption
  } = options;

  function WithWidth(props) {
    const contextTheme = (0, _useTheme.default)();
    const theme = props.theme || contextTheme;

    const _getThemeProps = (0, _system.getThemeProps)({
      theme,
      name: 'MuiWithWidth',
      props
    }),
          {
      initialWidth,
      width
    } = _getThemeProps,
          other = (0, _objectWithoutPropertiesLoose2.default)(_getThemeProps, _excluded);

    const [mountedState, setMountedState] = React.useState(false);
    (0, _useEnhancedEffect.default)(() => {
      setMountedState(true);
    }, []);
    /**
     * innerWidth |xs      sm      md      lg      xl
     *            |-------|-------|-------|-------|------>
     * width      |  xs   |  sm   |  md   |  lg   |  xl
     */

    const keys = theme.breakpoints.keys.slice().reverse();
    const widthComputed = keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = (0, _useMediaQuery.default)(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null);
    const more = (0, _extends2.default)({
      width: width || (mountedState || noSSR ? widthComputed : undefined) || initialWidth || initialWidthOption
    }, withThemeOption ? {
      theme
    } : {}, other); // When rendering the component on the server,
    // we have no idea about the client browser screen width.
    // In order to prevent blinks and help the reconciliation of the React tree
    // we are not rendering the child component.
    //
    // An alternative is to use the `initialWidth` property.

    if (more.width === undefined) {
      return null;
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, (0, _extends2.default)({}, more));
  }

  process.env.NODE_ENV !== "production" ? WithWidth.propTypes = {
    /**
     * As `window.innerWidth` is unavailable on the server,
     * we default to rendering an empty component during the first mount.
     * You might want to use a heuristic to approximate
     * the screen width of the client browser screen width.
     *
     * For instance, you could be using the user-agent or the client-hints.
     * https://caniuse.com/#search=client%20hint
     */
    initialWidth: _propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),

    /**
     * @ignore
     */
    theme: _propTypes.default.object,

    /**
     * Bypass the width calculation logic.
     */
    width: _propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
  } : void 0;

  if (process.env.NODE_ENV !== 'production') {
    WithWidth.displayName = `WithWidth(${(0, _utils.getDisplayName)(Component)})`;
  }

  (0, _hoistNonReactStatics.default)(WithWidth, Component);
  return WithWidth;
};

var _default = withWidth;
exports.default = _default;