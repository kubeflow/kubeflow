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

var _styles = require("../styles");

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _toggleButtonClasses = _interopRequireWildcard(require("./toggleButtonClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "onChange", "onClick", "selected", "size", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    fullWidth,
    selected,
    disabled,
    size,
    color
  } = styleProps;
  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled', fullWidth && 'fullWidth', `size${(0, _capitalize.default)(size)}`, color]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _toggleButtonClasses.getToggleButtonUtilityClass, classes);
};

const ToggleButtonRoot = (0, _styled.default)(_ButtonBase.default, {
  name: 'MuiToggleButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[`size${(0, _capitalize.default)(styleProps.size)}`]];
  }
})(({
  theme,
  styleProps
}) => {
  const selectedColor = styleProps.color === 'standard' ? theme.palette.text.primary : theme.palette[styleProps.color].main;
  return (0, _extends2.default)({}, theme.typography.button, {
    borderRadius: theme.shape.borderRadius,
    padding: 11,
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.action.active
  }, styleProps.fullWidth && {
    width: '100%'
  }, {
    [`&.${_toggleButtonClasses.default.disabled}`]: {
      color: theme.palette.action.disabled,
      border: `1px solid ${theme.palette.action.disabledBackground}`
    },
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: (0, _styles.alpha)(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    [`&.${_toggleButtonClasses.default.selected}`]: {
      color: selectedColor,
      backgroundColor: (0, _styles.alpha)(selectedColor, theme.palette.action.selectedOpacity),
      '&:hover': {
        backgroundColor: (0, _styles.alpha)(selectedColor, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: (0, _styles.alpha)(selectedColor, theme.palette.action.selectedOpacity)
        }
      }
    }
  }, styleProps.size === 'small' && {
    padding: 7,
    fontSize: theme.typography.pxToRem(13)
  }, styleProps.size === 'large' && {
    padding: 15,
    fontSize: theme.typography.pxToRem(15)
  });
});
const ToggleButton = /*#__PURE__*/React.forwardRef(function ToggleButton(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiToggleButton'
  });
  const {
    children,
    className,
    color = 'standard',
    disabled = false,
    disableFocusRipple = false,
    fullWidth = false,
    onChange,
    onClick,
    selected,
    size = 'medium',
    value
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    disabled,
    disableFocusRipple,
    fullWidth,
    size
  });
  const classes = useUtilityClasses(styleProps);

  const handleChange = event => {
    if (onClick) {
      onClick(event, value);

      if (event.defaultPrevented) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ToggleButtonRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    color: color,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    ref: ref,
    onClick: handleChange,
    onChange: onChange,
    value: value,
    styleProps: styleProps,
    "aria-pressed": selected
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? ToggleButton.propTypes
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
   * The color of the button when it is in an active state.
   * @default 'standard'
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),

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
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: _propTypes.default.bool,

  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: _propTypes.default.bool,

  /**
   * @ignore
   */
  onChange: _propTypes.default.func,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * If `true`, the button is rendered in an active state.
   */
  selected: _propTypes.default.bool,

  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['small', 'medium', 'large']), _propTypes.default.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: _propTypes.default.any.isRequired
} : void 0;
var _default = ToggleButton;
exports.default = _default;