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

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _system = require("@material-ui/system");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _SwitchBase = _interopRequireDefault(require("../internal/SwitchBase"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _switchClasses = _interopRequireWildcard(require("./switchClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "color", "edge", "size", "sx"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    edge,
    size,
    color,
    checked,
    disabled
  } = styleProps;
  const slots = {
    root: ['root', edge && `edge${(0, _capitalize.default)(edge)}`, `size${(0, _capitalize.default)(size)}`],
    switchBase: ['switchBase', `color${(0, _capitalize.default)(color)}`, checked && 'checked', disabled && 'disabled'],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input']
  };
  const composedClasses = (0, _unstyled.unstable_composeClasses)(slots, _switchClasses.getSwitchUtilityClass, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
};

const SwitchRoot = (0, _styled.default)('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styleProps.edge && styles[`edge${(0, _capitalize.default)(styleProps.edge)}`], styles[`size${(0, _capitalize.default)(styleProps.size)}`]];
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  display: 'inline-flex',
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: 'hidden',
  padding: 12,
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0,
  // Reset the stacking context.
  verticalAlign: 'middle',
  // For correct alignment with the text.
  '@media print': {
    colorAdjust: 'exact'
  }
}, styleProps.edge === 'start' && {
  marginLeft: -8
}, styleProps.edge === 'end' && {
  marginRight: -8
}, styleProps.size === 'small' && {
  width: 40,
  height: 24,
  padding: 7,
  [`& .${_switchClasses.default.thumb}`]: {
    width: 16,
    height: 16
  },
  [`& .${_switchClasses.default.switchBase}`]: {
    padding: 4,
    [`&.${_switchClasses.default.checked}`]: {
      transform: 'translateX(16px)'
    }
  }
}));
const SwitchSwitchBase = (0, _styled.default)(_SwitchBase.default, {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.switchBase, styles.input, styleProps.color !== 'default' && styles[`color${(0, _capitalize.default)(styleProps.color)}`]];
  }
})(({
  theme
}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  // Render above the focus ripple.
  color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300],
  transition: theme.transitions.create(['left', 'transform'], {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${_switchClasses.default.checked}`]: {
    transform: 'translateX(20px)'
  },
  [`&.${_switchClasses.default.disabled}`]: {
    color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
  },
  [`&.${_switchClasses.default.checked} + .${_switchClasses.default.track}`]: {
    opacity: 0.5
  },
  [`&.${_switchClasses.default.disabled} + .${_switchClasses.default.track}`]: {
    opacity: theme.palette.mode === 'light' ? 0.12 : 0.2
  },
  [`& .${_switchClasses.default.input}`]: {
    left: '-100%',
    width: '300%'
  }
}), ({
  theme,
  styleProps
}) => (0, _extends2.default)({
  '&:hover': {
    backgroundColor: (0, _system.alpha)(theme.palette.action.active, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, styleProps.color !== 'default' && {
  [`&.${_switchClasses.default.checked}`]: {
    color: theme.palette[styleProps.color].main,
    '&:hover': {
      backgroundColor: (0, _system.alpha)(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    [`&.${_switchClasses.default.disabled}`]: {
      color: theme.palette.mode === 'light' ? (0, _system.lighten)(theme.palette[styleProps.color].main, 0.62) : (0, _system.darken)(theme.palette[styleProps.color].main, 0.55)
    }
  },
  [`&.${_switchClasses.default.checked} + .${_switchClasses.default.track}`]: {
    backgroundColor: theme.palette[styleProps.color].main
  }
}));
const SwitchTrack = (0, _styled.default)('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track
})(({
  theme
}) => ({
  height: '100%',
  width: '100%',
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme.transitions.create(['opacity', 'background-color'], {
    duration: theme.transitions.duration.shortest
  }),
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
  opacity: theme.palette.mode === 'light' ? 0.38 : 0.3
}));
const SwitchThumb = (0, _styled.default)('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb
})(({
  theme
}) => ({
  boxShadow: theme.shadows[1],
  backgroundColor: 'currentColor',
  width: 20,
  height: 20,
  borderRadius: '50%'
}));
const Switch = /*#__PURE__*/React.forwardRef(function Switch(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiSwitch'
  });
  const {
    className,
    color = 'primary',
    edge = false,
    size = 'medium',
    sx
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    edge,
    size
  });
  const classes = useUtilityClasses(styleProps);
  const icon = /*#__PURE__*/(0, _jsxRuntime.jsx)(SwitchThumb, {
    className: classes.thumb,
    styleProps: styleProps
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SwitchRoot, {
    className: (0, _clsx.default)(classes.root, className),
    sx: sx,
    styleProps: styleProps,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(SwitchSwitchBase, (0, _extends2.default)({
      type: "checkbox",
      icon: icon,
      checkedIcon: icon,
      ref: ref,
      styleProps: styleProps
    }, other, {
      classes: (0, _extends2.default)({}, classes, {
        root: classes.switchBase
      })
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(SwitchTrack, {
      className: classes.track,
      styleProps: styleProps
    })]
  });
});
process.env.NODE_ENV !== "production" ? Switch.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component is checked.
   */
  checked: _propTypes.default.bool,

  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: _propTypes.default.node,

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
  .oneOfType([_propTypes.default.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),

  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: _propTypes.default.bool,

  /**
   * If `true`, the component is disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: _propTypes.default.bool,

  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: _propTypes.default.oneOf(['end', 'start', false]),

  /**
   * The icon to display when the component is unchecked.
   */
  icon: _propTypes.default.node,

  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: _propTypes.default.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _utils.refType,

  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: _propTypes.default.func,

  /**
   * If `true`, the `input` element is required.
   */
  required: _propTypes.default.bool,

  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['medium', 'small']), _propTypes.default.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: _propTypes.default.any
} : void 0;
var _default = Switch;
exports.default = _default;