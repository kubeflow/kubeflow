"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@material-ui/utils");

var _withWidth = _interopRequireWildcard(require("./withWidth"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @ignore - internal component.
 */
function HiddenJs(props) {
  const {
    children,
    only,
    width
  } = props;
  const theme = (0, _useTheme.default)();
  let visible = true; // `only` check is faster to get out sooner if used.

  if (only) {
    if (Array.isArray(only)) {
      for (let i = 0; i < only.length; i += 1) {
        const breakpoint = only[i];

        if (width === breakpoint) {
          visible = false;
          break;
        }
      }
    } else if (only && width === only) {
      visible = false;
    }
  } // Allow `only` to be combined with other props. If already hidden, no need to check others.


  if (visible) {
    // determine visibility based on the smallest size up
    for (let i = 0; i < theme.breakpoints.keys.length; i += 1) {
      const breakpoint = theme.breakpoints.keys[i];
      const breakpointUp = props[`${breakpoint}Up`];
      const breakpointDown = props[`${breakpoint}Down`];

      if (breakpointUp && (0, _withWidth.isWidthUp)(breakpoint, width) || breakpointDown && (0, _withWidth.isWidthDown)(breakpoint, width)) {
        visible = false;
        break;
      }
    }
  }

  if (!visible) {
    return null;
  }

  return children;
}

HiddenJs.propTypes = {
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   */
  implementation: _propTypes.default.oneOf(['js', 'css']),

  /**
   * You can use this prop when choosing the `js` implementation with server-side rendering.
   *
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
   * If `true`, screens this size and down are hidden.
   */
  lgDown: _propTypes.default.bool,

  /**
   * If `true`, screens this size and up are hidden.
   */
  lgUp: _propTypes.default.bool,

  /**
   * If `true`, screens this size and down are hidden.
   */
  mdDown: _propTypes.default.bool,

  /**
   * If `true`, screens this size and up are hidden.
   */
  mdUp: _propTypes.default.bool,

  /**
   * Hide the given breakpoint(s).
   */
  only: _propTypes.default.oneOfType([_propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']))]),

  /**
   * If `true`, screens this size and down are hidden.
   */
  smDown: _propTypes.default.bool,

  /**
   * If `true`, screens this size and up are hidden.
   */
  smUp: _propTypes.default.bool,

  /**
   * @ignore
   * width prop provided by withWidth decorator.
   */
  width: _propTypes.default.string.isRequired,

  /**
   * If `true`, screens this size and down are hidden.
   */
  xlDown: _propTypes.default.bool,

  /**
   * If `true`, screens this size and up are hidden.
   */
  xlUp: _propTypes.default.bool,

  /**
   * If `true`, screens this size and down are hidden.
   */
  xsDown: _propTypes.default.bool,

  /**
   * If `true`, screens this size and up are hidden.
   */
  xsUp: _propTypes.default.bool
};

if (process.env.NODE_ENV !== 'production') {
  HiddenJs.propTypes = (0, _utils.exactProp)(HiddenJs.propTypes);
}

var _default = (0, _withWidth.default)()(HiddenJs);

exports.default = _default;