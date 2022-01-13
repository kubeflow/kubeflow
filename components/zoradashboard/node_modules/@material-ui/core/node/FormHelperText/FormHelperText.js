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

var _formControlState = _interopRequireDefault(require("../FormControl/formControlState"));

var _useFormControl = _interopRequireDefault(require("../FormControl/useFormControl"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _formHelperTextClasses = _interopRequireWildcard(require("./formHelperTextClasses"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    contained,
    size,
    disabled,
    error,
    filled,
    focused,
    required
  } = styleProps;
  const slots = {
    root: ['root', disabled && 'disabled', error && 'error', size && `size${(0, _capitalize.default)(size)}`, contained && 'contained', focused && 'focused', filled && 'filled', required && 'required']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _formHelperTextClasses.getFormHelperTextUtilityClasses, classes);
};

const FormHelperTextRoot = (0, _styled.default)('p', {
  name: 'MuiFormHelperText',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styleProps.size && styles[`size${(0, _capitalize.default)(styleProps.size)}`], styleProps.contained && styles.contained, styleProps.filled && styles.filled];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  color: theme.palette.text.secondary
}, theme.typography.caption, {
  textAlign: 'left',
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${_formHelperTextClasses.default.disabled}`]: {
    color: theme.palette.text.disabled
  },
  [`&.${_formHelperTextClasses.default.error}`]: {
    color: theme.palette.error.main
  }
}, styleProps.size === 'small' && {
  marginTop: 4
}, styleProps.contained && {
  marginLeft: 14,
  marginRight: 14
}));
const FormHelperText = /*#__PURE__*/React.forwardRef(function FormHelperText(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiFormHelperText'
  });
  const {
    children,
    className,
    component = 'p'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const muiFormControl = (0, _useFormControl.default)();
  const fcs = (0, _formControlState.default)({
    props,
    muiFormControl,
    states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required']
  });
  const styleProps = (0, _extends2.default)({}, props, {
    component,
    contained: fcs.variant === 'filled' || fcs.variant === 'outlined',
    variant: fcs.variant,
    size: fcs.size,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(FormHelperTextRoot, (0, _extends2.default)({
    as: component,
    styleProps: styleProps,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other, {
    children: children === ' ' ?
    /*#__PURE__*/
    // notranslate needed while Google Translate will not fix zero-width space issue
    // eslint-disable-next-line react/no-danger
    (0, _jsxRuntime.jsx)("span", {
      className: "notranslate",
      dangerouslySetInnerHTML: {
        __html: '&#8203;'
      }
    }) : children
  }));
});
process.env.NODE_ENV !== "production" ? FormHelperText.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
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
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: _propTypes.default.bool,

  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: _propTypes.default.bool,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: _propTypes.default.oneOf(['dense']),

  /**
   * If `true`, the helper text should use required classes key.
   */
  required: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
var _default = FormHelperText;
exports.default = _default;