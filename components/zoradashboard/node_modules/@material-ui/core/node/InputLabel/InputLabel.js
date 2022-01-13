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

var _unstyled = require("@material-ui/unstyled");

var _formControlState = _interopRequireDefault(require("../FormControl/formControlState"));

var _useFormControl = _interopRequireDefault(require("../FormControl/useFormControl"));

var _FormLabel = _interopRequireWildcard(require("../FormLabel"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireWildcard(require("../styles/styled"));

var _inputLabelClasses = require("./inputLabelClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["disableAnimation", "margin", "shrink", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    formControl,
    size,
    shrink,
    disableAnimation,
    variant
  } = styleProps;
  const slots = {
    root: ['root', formControl && 'formControl', !disableAnimation && 'animated', shrink && 'shrink', size === 'small' && 'sizeSmall', variant]
  };
  const composedClasses = (0, _unstyled.unstable_composeClasses)(slots, _inputLabelClasses.getInputLabelUtilityClasses, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
};

const InputLabelRoot = (0, _styled.default)(_FormLabel.default, {
  shouldForwardProp: prop => (0, _styled.rootShouldForwardProp)(prop) || prop === 'classes',
  name: 'MuiInputLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [{
      [`& .${_FormLabel.formLabelClasses.asterisk}`]: styles.asterisk
    }, styles.root, !styleProps.formControl && styles.formControl, styleProps.size === 'small' && styles.sizeSmall, styleProps.shrink && styles.shrink, !styleProps.disableAnimation && styles.animated, styles[styleProps.variant]];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  display: 'block',
  transformOrigin: 'top left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%'
}, styleProps.formControl && {
  position: 'absolute',
  left: 0,
  top: 0,
  // slight alteration to spec spacing to match visual spec result
  transform: 'translate(0, 20px) scale(1)'
}, styleProps.size === 'small' && {
  // Compensation for the `Input.inputSizeSmall` style.
  transform: 'translate(0, 17px) scale(1)'
}, styleProps.shrink && {
  transform: 'translate(0, -1.5px) scale(0.75)',
  transformOrigin: 'top left',
  maxWidth: '133%'
}, !styleProps.disableAnimation && {
  transition: theme.transitions.create(['color', 'transform', 'max-width'], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeOut
  })
}, styleProps.variant === 'filled' && (0, _extends2.default)({
  // Chrome's autofill feature gives the input field a yellow background.
  // Since the input field is behind the label in the HTML tree,
  // the input field is drawn last and hides the label with an opaque background color.
  // zIndex: 1 will raise the label above opaque background-colors of input.
  zIndex: 1,
  pointerEvents: 'none',
  transform: 'translate(12px, 16px) scale(1)',
  maxWidth: 'calc(100% - 24px)'
}, styleProps.size === 'small' && {
  transform: 'translate(12px, 13px) scale(1)'
}, styleProps.shrink && (0, _extends2.default)({
  transform: 'translate(12px, 7px) scale(0.75)',
  maxWidth: 'calc(133% - 24px)'
}, styleProps.size === 'small' && {
  transform: 'translate(12px, 4px) scale(0.75)'
})), styleProps.variant === 'outlined' && (0, _extends2.default)({
  // see comment above on filled.zIndex
  zIndex: 1,
  pointerEvents: 'none',
  transform: 'translate(14px, 16px) scale(1)',
  maxWidth: 'calc(100% - 24px)'
}, styleProps.size === 'small' && {
  transform: 'translate(14px, 9px) scale(1)'
}, styleProps.shrink && {
  maxWidth: 'calc(133% - 24px)',
  transform: 'translate(14px, -9px) scale(0.75)'
})));
const InputLabel = /*#__PURE__*/React.forwardRef(function InputLabel(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    name: 'MuiInputLabel',
    props: inProps
  });
  const {
    disableAnimation = false,
    shrink: shrinkProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const muiFormControl = (0, _useFormControl.default)();
  let shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }

  const fcs = (0, _formControlState.default)({
    props,
    muiFormControl,
    states: ['size', 'variant']
  });
  const styleProps = (0, _extends2.default)({}, props, {
    disableAnimation,
    formControl: muiFormControl,
    shrink,
    size: fcs.size,
    variant: fcs.variant
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(InputLabelRoot, (0, _extends2.default)({
    "data-shrink": shrink,
    styleProps: styleProps,
    ref: ref
  }, other, {
    classes: classes
  }));
});
process.env.NODE_ENV !== "production" ? InputLabel.propTypes
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
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']), _propTypes.default.string]),

  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: _propTypes.default.bool,

  /**
   * If `true`, the component is disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the label is displayed in an error state.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: _propTypes.default.bool,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: _propTypes.default.oneOf(['dense']),

  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: _propTypes.default.bool,

  /**
   * If `true`, the label is shrunk.
   */
  shrink: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
var _default = InputLabel;
exports.default = _default;