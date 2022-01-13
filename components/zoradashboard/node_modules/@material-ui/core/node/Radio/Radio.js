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

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _RadioButtonIcon = _interopRequireDefault(require("./RadioButtonIcon"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _createChainedFunction = _interopRequireDefault(require("../utils/createChainedFunction"));

var _useRadioGroup = _interopRequireDefault(require("../RadioGroup/useRadioGroup"));

var _radioClasses = _interopRequireWildcard(require("./radioClasses"));

var _styled = _interopRequireWildcard(require("../styles/styled"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["checked", "color", "name", "onChange", "size"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    color
  } = styleProps;
  const slots = {
    root: ['root', `color${(0, _capitalize.default)(color)}`]
  };
  return (0, _extends2.default)({}, classes, (0, _unstyled.unstable_composeClasses)(slots, _radioClasses.getRadioUtilityClass, classes));
};

const RadioRoot = (0, _styled.default)(_SwitchBase.default, {
  shouldForwardProp: prop => (0, _styled.rootShouldForwardProp)(prop) || prop === 'classes',
  name: 'MuiRadio',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[`color${(0, _capitalize.default)(styleProps.color)}`]];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: (0, _system.alpha)(styleProps.color === 'default' ? theme.palette.action.active : theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, styleProps.color !== 'default' && {
  [`&.${_radioClasses.default.checked}`]: {
    color: theme.palette[styleProps.color].main
  }
}, {
  [`&.${_radioClasses.default.disabled}`]: {
    color: theme.palette.action.disabled
  }
}));
const defaultCheckedIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadioButtonIcon.default, {
  checked: true
});
const defaultIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadioButtonIcon.default, {});
const Radio = /*#__PURE__*/React.forwardRef(function Radio(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiRadio'
  });
  const {
    checked: checkedProp,
    color = 'primary',
    name: nameProp,
    onChange: onChangeProp,
    size = 'medium'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    size
  });
  const classes = useUtilityClasses(styleProps);
  const radioGroup = (0, _useRadioGroup.default)();
  let checked = checkedProp;
  const onChange = (0, _createChainedFunction.default)(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = radioGroup.value === props.value;
    }

    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(RadioRoot, (0, _extends2.default)({
    type: "radio",
    icon: /*#__PURE__*/React.cloneElement(defaultIcon, {
      fontSize: size === 'small' ? 'small' : 'medium'
    }),
    checkedIcon: /*#__PURE__*/React.cloneElement(defaultCheckedIcon, {
      fontSize: size === 'small' ? 'small' : 'medium'
    }),
    styleProps: styleProps,
    classes: classes,
    name: name,
    checked: checked,
    onChange: onChange,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Radio.propTypes
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),

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
   * Name attribute of the `input` element.
   */
  name: _propTypes.default.string,

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
   * `small` is equivalent to the dense radio styling.
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
   */
  value: _propTypes.default.any
} : void 0;
var _default = Radio;
exports.default = _default;