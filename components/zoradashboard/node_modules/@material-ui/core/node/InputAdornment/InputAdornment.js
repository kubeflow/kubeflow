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

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _FormControlContext = _interopRequireDefault(require("../FormControl/FormControlContext"));

var _useFormControl = _interopRequireDefault(require("../FormControl/useFormControl"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _inputAdornmentClasses = _interopRequireWildcard(require("./inputAdornmentClasses"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "component", "disablePointerEvents", "disableTypography", "position", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return [styles.root, styles[`position${(0, _capitalize.default)(styleProps.position)}`], styleProps.disablePointerEvents === true && styles.disablePointerEvents, styles[styleProps.variant]];
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    disablePointerEvents,
    hiddenLabel,
    position,
    size,
    variant
  } = styleProps;
  const slots = {
    root: ['root', disablePointerEvents && 'disablePointerEvents', position && `position${(0, _capitalize.default)(position)}`, variant, hiddenLabel && 'hiddenLabel', size && `size${(0, _capitalize.default)(size)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _inputAdornmentClasses.getInputAdornmentUtilityClass, classes);
};

const InputAdornmentRoot = (0, _styled.default)('div', {
  name: 'MuiInputAdornment',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  display: 'flex',
  height: '0.01em',
  // Fix IE11 flexbox alignment. To remove at some point.
  maxHeight: '2em',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  color: theme.palette.action.active
}, styleProps.variant === 'filled' && {
  // Styles applied to the root element if `variant="filled"`.
  [`&.${_inputAdornmentClasses.default.positionStart}&:not(.${_inputAdornmentClasses.default.hiddenLabel})`]: {
    marginTop: 16
  }
}, styleProps.position === 'start' && {
  // Styles applied to the root element if `position="start"`.
  marginRight: 8
}, styleProps.position === 'end' && {
  // Styles applied to the root element if `position="end"`.
  marginLeft: 8
}, styleProps.disablePointerEvents === true && {
  // Styles applied to the root element if `disablePointerEvents={true}`.
  pointerEvents: 'none'
}));
const InputAdornment = /*#__PURE__*/React.forwardRef(function InputAdornment(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiInputAdornment'
  });
  const {
    children,
    className,
    component = 'div',
    disablePointerEvents = false,
    disableTypography = false,
    position,
    variant: variantProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const muiFormControl = (0, _useFormControl.default)() || {};
  let variant = variantProp;

  if (variantProp && muiFormControl.variant) {
    if (process.env.NODE_ENV !== 'production') {
      if (variantProp === muiFormControl.variant) {
        console.error('Material-UI: The `InputAdornment` variant infers the variant prop ' + 'you do not have to provide one.');
      }
    }
  }

  if (muiFormControl && !variant) {
    variant = muiFormControl.variant;
  }

  const styleProps = (0, _extends2.default)({}, props, {
    hiddenLabel: muiFormControl.hiddenLabel,
    size: muiFormControl.size,
    disablePointerEvents,
    position,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormControlContext.default.Provider, {
    value: null,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(InputAdornmentRoot, (0, _extends2.default)({
      as: component,
      styleProps: styleProps,
      className: (0, _clsx.default)(classes.root, className),
      ref: ref
    }, other, {
      children: typeof children === 'string' && !disableTypography ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
        color: "text.secondary",
        children: children
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
        children: [position === 'start' ?
        /*#__PURE__*/

        /* notranslate needed while Google Translate will not fix zero-width space issue */

        /* eslint-disable-next-line react/no-danger */
        (0, _jsxRuntime.jsx)("span", {
          className: "notranslate",
          dangerouslySetInnerHTML: {
            __html: '&#8203;'
          }
        }) : null, children]
      })
    }))
  });
});
process.env.NODE_ENV !== "production" ? InputAdornment.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally an `IconButton` or string.
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
   * Disable pointer events on the root.
   * This allows for the content of the adornment to focus the `input` on click.
   * @default false
   */
  disablePointerEvents: _propTypes.default.bool,

  /**
   * If children is a string then disable wrapping in a Typography component.
   * @default false
   */
  disableTypography: _propTypes.default.bool,

  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: _propTypes.default.oneOf(['end', 'start']).isRequired,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   * Note: If you are using the `TextField` component or the `FormControl` component
   * you do not have to set this manually.
   */
  variant: _propTypes.default.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
var _default = InputAdornment;
exports.default = _default;