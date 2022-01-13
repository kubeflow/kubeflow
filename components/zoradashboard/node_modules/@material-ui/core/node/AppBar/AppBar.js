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

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _appBarClasses = require("./appBarClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "color", "enableColorOnDark", "position"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    color,
    position,
    classes
  } = styleProps;
  const slots = {
    root: ['root', `color${(0, _capitalize.default)(color)}`, `position${(0, _capitalize.default)(position)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _appBarClasses.getAppBarUtilityClass, classes);
};

const AppBarRoot = (0, _styled.default)(_Paper.default, {
  name: 'MuiAppBar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[`position${(0, _capitalize.default)(styleProps.position)}`], styles[`color${(0, _capitalize.default)(styleProps.color)}`]];
  }
})(({
  theme,
  styleProps
}) => {
  const backgroundColorDefault = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];
  return (0, _extends2.default)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    // Prevent padding issue with the Modal and fixed positioned AppBar.
    flexShrink: 0
  }, styleProps.position === 'fixed' && {
    position: 'fixed',
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: 'auto',
    right: 0,
    '@media print': {
      // Prevent the app bar to be visible on each printed page.
      position: 'absolute'
    }
  }, styleProps.position === 'absolute' && {
    position: 'absolute',
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: 'auto',
    right: 0
  }, styleProps.position === 'sticky' && {
    // ⚠️ sticky is not supported by IE11.
    position: 'sticky',
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: 'auto',
    right: 0
  }, styleProps.position === 'static' && {
    position: 'static'
  }, styleProps.position === 'relative' && {
    position: 'relative'
  }, styleProps.color === 'default' && {
    backgroundColor: backgroundColorDefault,
    color: theme.palette.getContrastText(backgroundColorDefault)
  }, styleProps.color && styleProps.color !== 'default' && styleProps.color !== 'inherit' && styleProps.color !== 'transparent' && {
    backgroundColor: theme.palette[styleProps.color].main,
    color: theme.palette[styleProps.color].contrastText
  }, styleProps.color === 'inherit' && {
    color: 'inherit'
  }, styleProps.color === 'transparent' && {
    backgroundColor: 'transparent',
    color: 'inherit'
  }, theme.palette.mode === 'dark' && !styleProps.enableColorOnDark && {
    backgroundColor: null,
    color: null
  });
});
const AppBar = /*#__PURE__*/React.forwardRef(function AppBar(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiAppBar'
  });
  const {
    className,
    color = 'primary',
    enableColorOnDark = false,
    position = 'fixed'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    position,
    enableColorOnDark
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(AppBarRoot, (0, _extends2.default)({
    square: true,
    component: "header",
    styleProps: styleProps,
    elevation: 4,
    className: (0, _clsx.default)(classes.root, className, position === 'fixed' && 'mui-fixed'),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? AppBar.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['default', 'inherit', 'primary', 'secondary', 'transparent']), _propTypes.default.string]),

  /**
   * If true, the `color` prop is applied in dark mode.
   * @default false
   */
  enableColorOnDark: _propTypes.default.bool,

  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   * @default 'fixed'
   */
  position: _propTypes.default.oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = AppBar;
exports.default = _default;