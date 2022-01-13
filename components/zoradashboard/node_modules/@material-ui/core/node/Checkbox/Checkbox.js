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

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _system = require("@material-ui/system");

var _SwitchBase = _interopRequireDefault(require("../internal/SwitchBase"));

var _CheckBoxOutlineBlank = _interopRequireDefault(require("../internal/svg-icons/CheckBoxOutlineBlank"));

var _CheckBox = _interopRequireDefault(require("../internal/svg-icons/CheckBox"));

var _IndeterminateCheckBox = _interopRequireDefault(require("../internal/svg-icons/IndeterminateCheckBox"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireWildcard(require("../styles/styled"));

var _checkboxClasses = _interopRequireWildcard(require("./checkboxClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["checkedIcon", "color", "icon", "indeterminate", "indeterminateIcon", "inputProps", "size"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    indeterminate,
    color
  } = styleProps;
  const slots = {
    root: ['root', indeterminate && 'indeterminate', `color${(0, _capitalize.default)(color)}`]
  };
  const composedClasses = (0, _unstyled.unstable_composeClasses)(slots, _checkboxClasses.getCheckboxUtilityClass, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
};

const CheckboxRoot = (0, _styled.default)(_SwitchBase.default, {
  shouldForwardProp: prop => (0, _styled.rootShouldForwardProp)(prop) || prop === 'classes',
  name: 'MuiCheckbox',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styleProps.indeterminate && styles.indeterminate, styleProps.color !== 'default' && styles[`color${(0, _capitalize.default)(styleProps.color)}`]];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  color: theme.palette.text.secondary,
  '&:hover': (0, _extends2.default)({}, !styleProps.disableRipple && {
    backgroundColor: (0, _system.alpha)(styleProps.color === 'default' ? theme.palette.action.active : theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity)
  }, {
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  })
}, styleProps.color !== 'default' && {
  [`&.${_checkboxClasses.default.checked}, &.${_checkboxClasses.default.indeterminate}`]: {
    color: theme.palette[styleProps.color].main
  },
  [`&.${_checkboxClasses.default.disabled}`]: {
    color: theme.palette.action.disabled
  }
}));
const defaultCheckedIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_CheckBox.default, {});
const defaultIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_CheckBoxOutlineBlank.default, {});
const defaultIndeterminateIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_IndeterminateCheckBox.default, {});
const Checkbox = /*#__PURE__*/React.forwardRef(function Checkbox(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiCheckbox'
  });
  const {
    checkedIcon = defaultCheckedIcon,
    color = 'primary',
    icon: iconProp = defaultIcon,
    indeterminate = false,
    indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon,
    inputProps,
    size = 'medium'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    indeterminate,
    size
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(CheckboxRoot, (0, _extends2.default)({
    type: "checkbox",
    inputProps: (0, _extends2.default)({
      'data-indeterminate': indeterminate
    }, inputProps),
    icon: /*#__PURE__*/React.cloneElement(icon, {
      fontSize: icon.props.fontSize === undefined && size !== 'medium' ? size : icon.props.fontSize
    }),
    checkedIcon: /*#__PURE__*/React.cloneElement(indeterminateIcon, {
      fontSize: indeterminateIcon.props.fontSize === undefined && size !== 'medium' ? size : indeterminateIcon.props.fontSize
    }),
    styleProps: styleProps,
    ref: ref
  }, other, {
    classes: classes
  }));
});
process.env.NODE_ENV !== "production" ? Checkbox.propTypes
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
   * @default <CheckBoxIcon />
   */
  checkedIcon: _propTypes.default.node,

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
  .oneOfType([_propTypes.default.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'succes', 'warning']), _propTypes.default.string]),

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
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon: _propTypes.default.node,

  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,

  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: _propTypes.default.bool,

  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon: _propTypes.default.node,

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
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: _propTypes.default.func,

  /**
   * If `true`, the `input` element is required.
   */
  required: _propTypes.default.bool,

  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
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
var _default = Checkbox;
exports.default = _default;