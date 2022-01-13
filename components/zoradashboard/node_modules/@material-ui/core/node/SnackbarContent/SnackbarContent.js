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

var _unstyled = require("@material-ui/unstyled");

var _system = require("@material-ui/system");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _snackbarContentClasses = require("./snackbarContentClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["action", "className", "message", "role"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root'],
    action: ['action'],
    message: ['message']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _snackbarContentClasses.getSnackbarContentUtilityClass, classes);
};

const SnackbarContentRoot = (0, _styled.default)(_Paper.default, {
  name: 'MuiSnackbarContent',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => {
  const emphasis = theme.palette.mode === 'light' ? 0.8 : 0.98;
  const backgroundColor = (0, _system.emphasize)(theme.palette.background.default, emphasis);
  return (0, _extends2.default)({}, theme.typography.body2, {
    color: theme.palette.getContrastText(backgroundColor),
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius,
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexGrow: 'initial',
      minWidth: 288
    }
  });
});
const SnackbarContentMessage = (0, _styled.default)('div', {
  name: 'MuiSnackbarContent',
  slot: 'Message',
  overridesResolver: (props, styles) => styles.message
})({
  padding: '8px 0'
});
const SnackbarContentAction = (0, _styled.default)('div', {
  name: 'MuiSnackbarContent',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action
})({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: 16,
  marginRight: -8
});
const SnackbarContent = /*#__PURE__*/React.forwardRef(function SnackbarContent(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiSnackbarContent'
  });
  const {
    action,
    className,
    message,
    role = 'alert'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = props;
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SnackbarContentRoot, (0, _extends2.default)({
    role: role,
    square: true,
    elevation: 6,
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(SnackbarContentMessage, {
      className: classes.message,
      styleProps: styleProps,
      children: message
    }), action ? /*#__PURE__*/(0, _jsxRuntime.jsx)(SnackbarContentAction, {
      className: classes.action,
      styleProps: styleProps,
      children: action
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? SnackbarContent.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The message to display.
   */
  message: _propTypes.default.node,

  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = SnackbarContent;
exports.default = _default;