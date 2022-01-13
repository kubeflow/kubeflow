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

var _styled = _interopRequireWildcard(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _buttonClasses = _interopRequireWildcard(require("./buttonClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    color,
    disableElevation,
    fullWidth,
    size,
    variant,
    classes
  } = styleProps;
  const slots = {
    root: ['root', variant, `${variant}${(0, _capitalize.default)(color)}`, `size${(0, _capitalize.default)(size)}`, `${variant}Size${(0, _capitalize.default)(size)}`, color === 'inherit' && 'colorInherit', disableElevation && 'disableElevation', fullWidth && 'fullWidth'],
    label: ['label'],
    startIcon: ['startIcon', `iconSize${(0, _capitalize.default)(size)}`],
    endIcon: ['endIcon', `iconSize${(0, _capitalize.default)(size)}`]
  };
  const composedClasses = (0, _unstyled.unstable_composeClasses)(slots, _buttonClasses.getButtonUtilityClass, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
};

const commonIconStyles = styleProps => (0, _extends2.default)({}, styleProps.size === 'small' && {
  '& > *:nth-of-type(1)': {
    fontSize: 18
  }
}, styleProps.size === 'medium' && {
  '& > *:nth-of-type(1)': {
    fontSize: 20
  }
}, styleProps.size === 'large' && {
  '& > *:nth-of-type(1)': {
    fontSize: 22
  }
});

const ButtonRoot = (0, _styled.default)(_ButtonBase.default, {
  shouldForwardProp: prop => (0, _styled.rootShouldForwardProp)(prop) || prop === 'classes',
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[styleProps.variant], styles[`${styleProps.variant}${(0, _capitalize.default)(styleProps.color)}`], styles[`size${(0, _capitalize.default)(styleProps.size)}`], styles[`${styleProps.variant}Size${(0, _capitalize.default)(styleProps.size)}`], styleProps.color === 'inherit' && styles.colorInherit, styleProps.disableElevation && styles.disableElevation, styleProps.fullWidth && styles.fullWidth];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({}, theme.typography.button, {
  minWidth: 64,
  padding: '6px 16px',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
    duration: theme.transitions.duration.short
  }),
  '&:hover': (0, _extends2.default)({
    textDecoration: 'none',
    backgroundColor: (0, _system.alpha)(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }, styleProps.variant === 'text' && styleProps.color !== 'inherit' && {
    backgroundColor: (0, _system.alpha)(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }, styleProps.variant === 'outlined' && styleProps.color !== 'inherit' && {
    border: `1px solid ${theme.palette[styleProps.color].main}`,
    backgroundColor: (0, _system.alpha)(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }, styleProps.variant === 'contained' && {
    backgroundColor: theme.palette.grey.A100,
    boxShadow: theme.shadows[4],
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.grey[300]
    }
  }, styleProps.variant === 'contained' && styleProps.color !== 'inherit' && {
    backgroundColor: theme.palette[styleProps.color].dark,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.palette[styleProps.color].main
    }
  }),
  '&:active': (0, _extends2.default)({}, styleProps.variant === 'contained' && {
    boxShadow: theme.shadows[8]
  }),
  [`&.${_buttonClasses.default.focusVisible}`]: (0, _extends2.default)({}, styleProps.variant === 'contained' && {
    boxShadow: theme.shadows[6]
  }),
  [`&.${_buttonClasses.default.disabled}`]: (0, _extends2.default)({
    color: theme.palette.action.disabled
  }, styleProps.variant === 'outlined' && {
    border: `1px solid ${theme.palette.action.disabledBackground}`
  }, styleProps.variant === 'outlined' && styleProps.color === 'secondary' && {
    border: `1px solid ${theme.palette.action.disabled}`
  }, styleProps.variant === 'contained' && {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  })
}, styleProps.variant === 'text' && {
  padding: '6px 8px'
}, styleProps.variant === 'text' && styleProps.color !== 'inherit' && {
  color: theme.palette[styleProps.color].main
}, styleProps.variant === 'outlined' && {
  padding: '5px 15px',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`
}, styleProps.variant === 'outlined' && styleProps.color !== 'inherit' && {
  color: theme.palette[styleProps.color].main,
  border: `1px solid ${(0, _system.alpha)(theme.palette[styleProps.color].main, 0.5)}`
}, styleProps.variant === 'contained' && {
  color: theme.palette.getContrastText(theme.palette.grey[300]),
  backgroundColor: theme.palette.grey[300],
  boxShadow: theme.shadows[2]
}, styleProps.variant === 'contained' && styleProps.color !== 'inherit' && {
  color: theme.palette[styleProps.color].contrastText,
  backgroundColor: theme.palette[styleProps.color].main
}, styleProps.color === 'inherit' && {
  color: 'inherit',
  borderColor: 'currentColor'
}, styleProps.size === 'small' && styleProps.variant === 'text' && {
  padding: '4px 5px',
  fontSize: theme.typography.pxToRem(13)
}, styleProps.size === 'large' && styleProps.variant === 'text' && {
  padding: '8px 11px',
  fontSize: theme.typography.pxToRem(15)
}, styleProps.size === 'small' && styleProps.variant === 'outlined' && {
  padding: '3px 9px',
  fontSize: theme.typography.pxToRem(13)
}, styleProps.size === 'large' && styleProps.variant === 'outlined' && {
  padding: '7px 21px',
  fontSize: theme.typography.pxToRem(15)
}, styleProps.size === 'small' && styleProps.variant === 'contained' && {
  padding: '4px 10px',
  fontSize: theme.typography.pxToRem(13)
}, styleProps.size === 'large' && styleProps.variant === 'contained' && {
  padding: '8px 22px',
  fontSize: theme.typography.pxToRem(15)
}, styleProps.fullWidth && {
  width: '100%'
}), ({
  styleProps
}) => styleProps.disableElevation && {
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none'
  },
  [`&.${_buttonClasses.default.focusVisible}`]: {
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none'
  },
  [`&.${_buttonClasses.default.disabled}`]: {
    boxShadow: 'none'
  }
});
const ButtonStartIcon = (0, _styled.default)('span', {
  name: 'MuiButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.startIcon, styles[`iconSize${(0, _capitalize.default)(styleProps.size)}`]];
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4
}, styleProps.size === 'small' && {
  marginLeft: -2
}, commonIconStyles(styleProps)));
const ButtonEndIcon = (0, _styled.default)('span', {
  name: 'MuiButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.endIcon, styles[`iconSize${(0, _capitalize.default)(styleProps.size)}`]];
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8
}, styleProps.size === 'small' && {
  marginRight: -2
}, commonIconStyles(styleProps)));
const Button = /*#__PURE__*/React.forwardRef(function Button(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiButton'
  });
  const {
    children,
    color = 'primary',
    component = 'button',
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = 'medium',
    startIcon: startIconProp,
    type,
    variant = 'text'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  const startIcon = startIconProp && /*#__PURE__*/(0, _jsxRuntime.jsx)(ButtonStartIcon, {
    className: classes.startIcon,
    styleProps: styleProps,
    children: startIconProp
  });
  const endIcon = endIconProp && /*#__PURE__*/(0, _jsxRuntime.jsx)(ButtonEndIcon, {
    className: classes.endIcon,
    styleProps: styleProps,
    children: endIconProp
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(ButtonRoot, (0, _extends2.default)({
    styleProps: styleProps,
    component: component,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: (0, _clsx.default)(classes.focusVisible, focusVisibleClassName),
    ref: ref,
    type: type
  }, other, {
    classes: classes,
    children: [startIcon, children, endIcon]
  }));
});
process.env.NODE_ENV !== "production" ? Button.propTypes
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']), _propTypes.default.string]),

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
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: _propTypes.default.bool,

  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: _propTypes.default.bool,

  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: _propTypes.default.bool,

  /**
   * Element placed after the children.
   */
  endIcon: _propTypes.default.node,

  /**
   * @ignore
   */
  focusVisibleClassName: _propTypes.default.string,

  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: _propTypes.default.bool,

  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: _propTypes.default.string,

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['small', 'medium', 'large']), _propTypes.default.string]),

  /**
   * Element placed before the children.
   */
  startIcon: _propTypes.default.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * @ignore
   */
  type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['button', 'reset', 'submit']), _propTypes.default.string]),

  /**
   * The variant to use.
   * @default 'text'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['contained', 'outlined', 'text']), _propTypes.default.string])
} : void 0;
var _default = Button;
exports.default = _default;