"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _system = require("@material-ui/system");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _MoreHoriz = _interopRequireDefault(require("../internal/svg-icons/MoreHoriz"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BreadcrumbCollapsedButton = (0, _styled.default)(_ButtonBase.default, {
  skipSx: true
})(({
  theme
}) => (0, _extends2.default)({
  display: 'flex',
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5)
}, theme.palette.mode === 'light' ? {
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[700]
} : {
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.grey[100]
}, {
  borderRadius: 2,
  '&:hover, &:focus': (0, _extends2.default)({}, theme.palette.mode === 'light' ? {
    backgroundColor: theme.palette.grey[200]
  } : {
    backgroundColor: theme.palette.grey[600]
  }),
  '&:active': (0, _extends2.default)({
    boxShadow: theme.shadows[0]
  }, theme.palette.mode === 'light' ? {
    backgroundColor: (0, _system.emphasize)(theme.palette.grey[200], 0.12)
  } : {
    backgroundColor: (0, _system.emphasize)(theme.palette.grey[600], 0.12)
  })
}));
const BreadcrumbCollapsedIcon = (0, _styled.default)(_MoreHoriz.default)({
  width: 24,
  height: 16
});
/**
 * @ignore - internal component.
 */

function BreadcrumbCollapsed(props) {
  const styleProps = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(BreadcrumbCollapsedButton, (0, _extends2.default)({
      focusRipple: true
    }, props, {
      styleProps: styleProps,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(BreadcrumbCollapsedIcon, {
        styleProps: styleProps
      })
    }))
  });
}

process.env.NODE_ENV !== "production" ? BreadcrumbCollapsed.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = BreadcrumbCollapsed;
exports.default = _default;