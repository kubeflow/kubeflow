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

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _containerClasses = require("./containerClasses");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "component", "disableGutters", "fixed", "maxWidth"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    fixed,
    disableGutters,
    maxWidth
  } = styleProps;
  const slots = {
    root: ['root', maxWidth && `maxWidth${(0, _capitalize.default)(String(maxWidth))}`, fixed && 'fixed', disableGutters && 'disableGutters']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _containerClasses.getContainerUtilityClass, classes);
};

const ContainerRoot = (0, _styled.default)('div', {
  name: 'MuiContainer',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[`maxWidth${(0, _capitalize.default)(String(styleProps.maxWidth))}`], styleProps.fixed && styles.fixed, styleProps.disableGutters && styles.disableGutters];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  width: '100%',
  marginLeft: 'auto',
  boxSizing: 'border-box',
  marginRight: 'auto',
  display: 'block'
}, !styleProps.disableGutters && {
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}), ({
  theme,
  styleProps
}) => styleProps.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
  const value = theme.breakpoints.values[breakpoint];

  if (value !== 0) {
    acc[theme.breakpoints.up(breakpoint)] = {
      maxWidth: `${value}${theme.breakpoints.unit}`
    };
  }

  return acc;
}, {}), ({
  theme,
  styleProps
}) => (0, _extends2.default)({}, styleProps.maxWidth === 'xs' && {
  [theme.breakpoints.up('xs')]: {
    maxWidth: Math.max(theme.breakpoints.values.xs, 444)
  }
}, styleProps.maxWidth && styleProps.maxWidth !== 'xs' && {
  [theme.breakpoints.up(styleProps.maxWidth)]: {
    maxWidth: `${theme.breakpoints.values[styleProps.maxWidth]}${theme.breakpoints.unit}`
  }
}));
const Container = /*#__PURE__*/React.forwardRef(function Container(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiContainer'
  });
  const {
    className,
    component = 'div',
    disableGutters = false,
    fixed = false,
    maxWidth = 'lg'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    component,
    disableGutters,
    fixed,
    maxWidth
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ContainerRoot, (0, _extends2.default)({
    as: component,
    styleProps: styleProps,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Container.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: _propTypes.default.bool,

  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   * @default false
   */
  fixed: _propTypes.default.bool,

  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'lg'
   */
  maxWidth: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]), _propTypes.default.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = Container;
exports.default = _default;