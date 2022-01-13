"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _unstyled = require("@material-ui/unstyled");

var _NativeSelectInput = _interopRequireDefault(require("./NativeSelectInput"));

var _formControlState = _interopRequireDefault(require("../FormControl/formControlState"));

var _useFormControl = _interopRequireDefault(require("../FormControl/useFormControl"));

var _ArrowDropDown = _interopRequireDefault(require("../internal/svg-icons/ArrowDropDown"));

var _Input = _interopRequireDefault(require("../Input"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _nativeSelectClasses = require("./nativeSelectClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "children", "classes", "IconComponent", "input", "inputProps", "variant"],
      _excluded2 = ["root"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _nativeSelectClasses.getNativeSelectUtilityClasses, classes);
};

const defaultInput = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Input.default, {});
/**
 * An alternative to `<Select native />` with a much smaller bundle size footprint.
 */

const NativeSelect = /*#__PURE__*/React.forwardRef(function NativeSelect(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    name: 'MuiNativeSelect',
    props: inProps
  });
  const {
    className,
    children,
    classes: classesProp = {},
    IconComponent = _ArrowDropDown.default,
    input = defaultInput,
    inputProps
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const muiFormControl = (0, _useFormControl.default)();
  const fcs = (0, _formControlState.default)({
    props,
    muiFormControl,
    states: ['variant']
  });
  const styleProps = (0, _extends2.default)({}, props, {
    classes: classesProp
  });
  const classes = useUtilityClasses(styleProps);
  const otherClasses = (0, _objectWithoutPropertiesLoose2.default)(classesProp, _excluded2);
  return /*#__PURE__*/React.cloneElement(input, (0, _extends2.default)({
    // Most of the logic is implemented in `NativeSelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: _NativeSelectInput.default,
    inputProps: (0, _extends2.default)({
      children,
      classes: otherClasses,
      IconComponent,
      variant: fcs.variant,
      type: undefined
    }, inputProps, input ? input.props.inputProps : {}),
    ref
  }, other, {
    className: (0, _clsx.default)(classes.root, input.props.className, className)
  }));
});
process.env.NODE_ENV !== "production" ? NativeSelect.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: _propTypes.default.elementType,

  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   * @default <Input />
   */
  input: _propTypes.default.element,

  /**
   * <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">Attributes</a> applied to the `select` element.
   */
  inputProps: _propTypes.default.object,

  /**
   * Callback fired when a menu item is selected.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The `input` value. The DOM API casts this to a string.
   */
  value: _propTypes.default.any,

  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
NativeSelect.muiName = 'Select';
var _default = NativeSelect;
exports.default = _default;