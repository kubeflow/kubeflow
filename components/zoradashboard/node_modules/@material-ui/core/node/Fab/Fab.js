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

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _fabClasses = _interopRequireWildcard(require("./fabClasses"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    color,
    variant,
    classes,
    size
  } = styleProps;
  const slots = {
    root: ['root', variant, `size${(0, _capitalize.default)(size)}`, color === 'inherit' && 'colorInherit', color === 'primary' && 'primary', color === 'secondary' && 'secondary']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _fabClasses.getFabUtilityClass, classes);
};

const FabRoot = (0, _styled.default)(_ButtonBase.default, {
  name: 'MuiFab',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[styleProps.variant], styles[`size${(0, _capitalize.default)(styleProps.size)}`], styleProps.color === 'inherit' && styles.colorInherit, styleProps.color === 'primary' && styles.primary, styleProps.color === 'secondary' && styles.secondary];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({}, theme.typography.button, {
  minHeight: 36,
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
    duration: theme.transitions.duration.short
  }),
  borderRadius: '50%',
  padding: 0,
  minWidth: 0,
  width: 56,
  height: 56,
  boxShadow: theme.shadows[6],
  '&:active': {
    boxShadow: theme.shadows[12]
  },
  color: theme.palette.getContrastText(theme.palette.grey[300]),
  backgroundColor: theme.palette.grey[300],
  '&:hover': {
    backgroundColor: theme.palette.grey.A100,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.palette.grey[300]
    },
    textDecoration: 'none'
  },
  [`&.${_fabClasses.default.focusVisible}`]: {
    boxShadow: theme.shadows[6]
  },
  [`&.${_fabClasses.default.disabled}`]: {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  }
}, styleProps.size === 'small' && {
  width: 40,
  height: 40
}, styleProps.size === 'medium' && {
  width: 48,
  height: 48
}, styleProps.variant === 'extended' && {
  borderRadius: 48 / 2,
  padding: '0 16px',
  width: 'auto',
  minHeight: 'auto',
  minWidth: 48,
  height: 48
}, styleProps.variant === 'extended' && styleProps.size === 'small' && {
  width: 'auto',
  padding: '0 8px',
  borderRadius: 34 / 2,
  minWidth: 34,
  height: 34
}, styleProps.variant === 'extended' && styleProps.size === 'medium' && {
  width: 'auto',
  padding: '0 16px',
  borderRadius: 40 / 2,
  minWidth: 40,
  height: 40
}, styleProps.color === 'inherit' && {
  color: 'inherit'
}), ({
  theme,
  styleProps
}) => (0, _extends2.default)({}, styleProps.color === 'primary' && {
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.palette.primary.main
    }
  }
}, styleProps.color === 'secondary' && {
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.palette.secondary.main
    }
  }
}));
const Fab = /*#__PURE__*/React.forwardRef(function Fab(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiFab'
  });
  const {
    children,
    className,
    color = 'default',
    component = 'button',
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = 'large',
    variant = 'circular'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(FabRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    component: component,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: (0, _clsx.default)(classes.focusVisible, focusVisibleClassName),
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? Fab.propTypes
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
   * @default 'default'
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['default', 'inherit', 'primary', 'secondary']), _propTypes.default.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: _propTypes.default.bool,

  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: _propTypes.default.bool,

  /**
   * @ignore
   */
  focusVisibleClassName: _propTypes.default.string,

  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: _propTypes.default.string,

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'large'
   */
  size: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['small', 'medium', 'large']), _propTypes.default.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   * @default 'circular'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['circular', 'extended']), _propTypes.default.string])
} : void 0;
var _default = Fab;
exports.default = _default;