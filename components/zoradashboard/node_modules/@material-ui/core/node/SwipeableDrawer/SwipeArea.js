"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _Drawer = require("../Drawer/Drawer");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["anchor", "classes", "className", "width", "style"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SwipeAreaRoot = (0, _styled.default)('div', {
  skipSx: true
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: theme.zIndex.drawer - 1
}, styleProps.anchor === 'left' && {
  right: 'auto'
}, styleProps.anchor === 'right' && {
  left: 'auto',
  right: 0
}, styleProps.anchor === 'top' && {
  bottom: 'auto',
  right: 0
}, styleProps.anchor === 'bottom' && {
  top: 'auto',
  bottom: 0,
  right: 0
}));
/**
 * @ignore - internal component.
 */

const SwipeArea = /*#__PURE__*/React.forwardRef(function SwipeArea(props, ref) {
  const {
    anchor,
    classes = {},
    className,
    width,
    style
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SwipeAreaRoot, (0, _extends2.default)({
    className: (0, _clsx.default)('PrivateSwipeArea-root', classes.root, classes[`anchor${(0, _capitalize.default)(anchor)}`], className),
    ref: ref,
    style: (0, _extends2.default)({
      [(0, _Drawer.isHorizontal)(anchor) ? 'width' : 'height']: width
    }, style),
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? SwipeArea.propTypes = {
  /**
   * Side on which to attach the discovery area.
   */
  anchor: _propTypes.default.oneOf(['left', 'top', 'right', 'bottom']).isRequired,

  /**
   * @ignore
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * The width of the left most (or right most) area in `px` where the
   * drawer can be swiped open from.
   */
  width: _propTypes.default.number.isRequired
} : void 0;
var _default = SwipeArea;
exports.default = _default;