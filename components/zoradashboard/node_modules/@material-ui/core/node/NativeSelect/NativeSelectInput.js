"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.nativeSelectIconStyles = exports.nativeSelectSelectStyles = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _nativeSelectClasses = _interopRequireWildcard(require("./nativeSelectClasses"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "disabled", "IconComponent", "inputRef", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    variant,
    disabled,
    open
  } = styleProps;
  const slots = {
    select: ['select', variant, disabled && 'disabled'],
    icon: ['icon', `icon${(0, _capitalize.default)(variant)}`, open && 'iconOpen', disabled && 'disabled']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _nativeSelectClasses.getNativeSelectUtilityClasses, classes);
};

const nativeSelectSelectStyles = ({
  styleProps,
  theme
}) => (0, _extends2.default)({
  MozAppearance: 'none',
  // Reset
  WebkitAppearance: 'none',
  // Reset
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: 'none',
  borderRadius: 0,
  // Reset
  cursor: 'pointer',
  '&:focus': {
    // Show that it's not an text input
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
    borderRadius: 0 // Reset Chrome style

  },
  // Remove IE11 arrow
  '&::-ms-expand': {
    display: 'none'
  },
  [`&.${_nativeSelectClasses.default.disabled}`]: {
    cursor: 'default'
  },
  '&[multiple]': {
    height: 'auto'
  },
  '&:not([multiple]) option, &:not([multiple]) optgroup': {
    backgroundColor: theme.palette.background.paper
  },
  // Bump specificity to allow extending custom inputs
  '&&&': {
    paddingRight: 24,
    minWidth: 16 // So it doesn't collapse.

  }
}, styleProps.variant === 'filled' && {
  '&&&': {
    paddingRight: 32
  }
}, styleProps.variant === 'outlined' && {
  borderRadius: theme.shape.borderRadius,
  '&:focus': {
    borderRadius: theme.shape.borderRadius // Reset the reset for Chrome style

  },
  '&&&': {
    paddingRight: 32
  }
});

exports.nativeSelectSelectStyles = nativeSelectSelectStyles;
const NativeSelectSelect = (0, _styled.default)('select', {
  name: 'MuiNativeSelect',
  slot: 'Select',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.select, styles[styleProps.variant]];
  }
})(nativeSelectSelectStyles);

const nativeSelectIconStyles = ({
  styleProps,
  theme
}) => (0, _extends2.default)({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: 'absolute',
  right: 0,
  top: 'calc(50% - .5em)',
  // Center vertically, height is 1em
  pointerEvents: 'none',
  // Don't block pointer events on the select under the icon.
  color: theme.palette.action.active,
  [`&.${_nativeSelectClasses.default.disabled}`]: {
    color: theme.palette.action.disabled
  }
}, styleProps.open && {
  right: 7
}, styleProps.variant === 'filled' && {
  right: 7
}, styleProps.variant === 'outlined' && {
  right: 7
});

exports.nativeSelectIconStyles = nativeSelectIconStyles;
const NativeSelectIcon = (0, _styled.default)('svg', {
  name: 'MuiNativeSelect',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.icon, styleProps.variant && styles[`icon${(0, _capitalize.default)(styleProps.variant)}`], styleProps.open && styles.iconOpen];
  }
})(nativeSelectIconStyles);
/**
 * @ignore - internal component.
 */

const NativeSelectInput = /*#__PURE__*/React.forwardRef(function NativeSelectInput(props, ref) {
  const {
    className,
    disabled,
    IconComponent,
    inputRef,
    variant = 'standard'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    disabled,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(NativeSelectSelect, (0, _extends2.default)({
      styleProps: styleProps,
      className: (0, _clsx.default)(classes.select, className),
      disabled: disabled,
      ref: inputRef || ref
    }, other)), props.multiple ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(NativeSelectIcon, {
      as: IconComponent,
      styleProps: styleProps,
      className: classes.icon
    })]
  });
});
process.env.NODE_ENV !== "production" ? NativeSelectInput.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object,

  /**
   * The CSS class name of the select element.
   */
  className: _propTypes.default.string,

  /**
   * If `true`, the select is disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * The icon that displays the arrow.
   */
  IconComponent: _propTypes.default.elementType.isRequired,

  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: _utils.refType,

  /**
   * @ignore
   */
  multiple: _propTypes.default.bool,

  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: _propTypes.default.string,

  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,

  /**
   * The input value.
   */
  value: _propTypes.default.any,

  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['standard', 'outlined', 'filled'])
} : void 0;
var _default = NativeSelectInput;
exports.default = _default;