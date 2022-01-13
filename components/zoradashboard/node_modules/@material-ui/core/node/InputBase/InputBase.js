"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InputBaseComponent = exports.InputBaseRoot = exports.inputOverridesResolver = exports.rootOverridesResolver = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("@material-ui/utils");

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _formControlState = _interopRequireDefault(require("../FormControl/formControlState"));

var _FormControlContext = _interopRequireDefault(require("../FormControl/FormControlContext"));

var _useFormControl = _interopRequireDefault(require("../FormControl/useFormControl"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _useEnhancedEffect = _interopRequireDefault(require("../utils/useEnhancedEffect"));

var _TextareaAutosize = _interopRequireDefault(require("../TextareaAutosize"));

var _GlobalStyles = _interopRequireDefault(require("../GlobalStyles"));

var _utils2 = require("./utils");

var _inputBaseClasses = _interopRequireWildcard(require("./inputBaseClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["aria-describedby", "autoComplete", "autoFocus", "className", "color", "components", "componentsProps", "defaultValue", "disabled", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "size", "startAdornment", "type", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const rootOverridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return [styles.root, styleProps.formControl && styles.formControl, styleProps.startAdornment && styles.adornedStart, styleProps.endAdornment && styles.adornedEnd, styleProps.error && styles.error, styleProps.size === 'small' && styles.sizeSmall, styleProps.multiline && styles.multiline, styleProps.color && styles[`color${(0, _capitalize.default)(styleProps.color)}`], styleProps.fullWidth && styles.fullWidth, styleProps.hiddenLabel && styles.hiddenLabel];
};

exports.rootOverridesResolver = rootOverridesResolver;

const inputOverridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return [styles.input, styleProps.size === 'small' && styles.inputSizeSmall, styleProps.multiline && styles.inputMultiline, styleProps.type === 'search' && styles.inputTypeSearch, styleProps.startAdornment && styles.inputAdornedStart, styleProps.endAdornment && styles.inputAdornedEnd, styleProps.hiddenLabel && styles.inputHiddenLabel];
};

exports.inputOverridesResolver = inputOverridesResolver;

const useUtilityClasses = styleProps => {
  const {
    classes,
    color,
    disabled,
    error,
    endAdornment,
    focused,
    formControl,
    fullWidth,
    hiddenLabel,
    multiline,
    size,
    startAdornment,
    type
  } = styleProps;
  const slots = {
    root: ['root', `color${(0, _capitalize.default)(color)}`, disabled && 'disabled', error && 'error', fullWidth && 'fullWidth', focused && 'focused', formControl && 'formControl', size === 'small' && 'sizeSmall', multiline && 'multiline', startAdornment && 'adornedStart', endAdornment && 'adornedEnd', hiddenLabel && 'hiddenLabel'],
    input: ['input', disabled && 'disabled', type === 'search' && 'inputTypeSearch', multiline && 'inputMultiline', size === 'small' && 'inputSizeSmall', hiddenLabel && 'inputHiddenLabel', startAdornment && 'inputAdornedStart', endAdornment && 'inputAdornedEnd']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _inputBaseClasses.getInputBaseUtilityClass, classes);
};

const InputBaseRoot = (0, _styled.default)('div', {
  name: 'MuiInputBase',
  slot: 'Root',
  overridesResolver: rootOverridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({}, theme.typography.body1, {
  color: theme.palette.text.primary,
  lineHeight: '1.4375em',
  // 23px
  boxSizing: 'border-box',
  // Prevent padding issue with fullWidth.
  position: 'relative',
  cursor: 'text',
  display: 'inline-flex',
  alignItems: 'center',
  [`&.${_inputBaseClasses.default.disabled}`]: {
    color: theme.palette.text.disabled,
    cursor: 'default'
  }
}, styleProps.multiline && (0, _extends2.default)({
  padding: '4px 0 5px'
}, styleProps.size === 'small' && {
  paddingTop: 1
}), styleProps.fullWidth && {
  width: '100%'
}));
exports.InputBaseRoot = InputBaseRoot;
const InputBaseComponent = (0, _styled.default)('input', {
  name: 'MuiInputBase',
  slot: 'Input',
  overridesResolver: inputOverridesResolver
})(({
  theme,
  styleProps
}) => {
  const light = theme.palette.mode === 'light';
  const placeholder = {
    color: 'currentColor',
    opacity: light ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter
    })
  };
  const placeholderHidden = {
    opacity: '0 !important'
  };
  const placeholderVisible = {
    opacity: light ? 0.42 : 0.5
  };
  return (0, _extends2.default)({
    font: 'inherit',
    letterSpacing: 'inherit',
    color: 'currentColor',
    padding: '4px 0 5px',
    border: 0,
    boxSizing: 'content-box',
    background: 'none',
    height: '1.4375em',
    // Reset 23pxthe native input line-height
    margin: 0,
    // Reset for Safari
    WebkitTapHighlightColor: 'transparent',
    display: 'block',
    // Make the flex item shrink with Firefox
    minWidth: 0,
    width: '100%',
    // Fix IE11 width issue
    animationName: 'mui-auto-fill-cancel',
    animationDuration: '10ms',
    '&::-webkit-input-placeholder': placeholder,
    '&::-moz-placeholder': placeholder,
    // Firefox 19+
    '&:-ms-input-placeholder': placeholder,
    // IE11
    '&::-ms-input-placeholder': placeholder,
    // Edge
    '&:focus': {
      outline: 0
    },
    // Reset Firefox invalid required input style
    '&:invalid': {
      boxShadow: 'none'
    },
    '&::-webkit-search-decoration': {
      // Remove the padding when type=search.
      WebkitAppearance: 'none'
    },
    // Show and hide the placeholder logic
    [`label[data-shrink=false] + .${_inputBaseClasses.default.formControl} &`]: {
      '&::-webkit-input-placeholder': placeholderHidden,
      '&::-moz-placeholder': placeholderHidden,
      // Firefox 19+
      '&:-ms-input-placeholder': placeholderHidden,
      // IE11
      '&::-ms-input-placeholder': placeholderHidden,
      // Edge
      '&:focus::-webkit-input-placeholder': placeholderVisible,
      '&:focus::-moz-placeholder': placeholderVisible,
      // Firefox 19+
      '&:focus:-ms-input-placeholder': placeholderVisible,
      // IE11
      '&:focus::-ms-input-placeholder': placeholderVisible // Edge

    },
    [`&.${_inputBaseClasses.default.disabled}`]: {
      opacity: 1,
      // Reset iOS opacity
      WebkitTextFillColor: theme.palette.text.disabled // Fix opacity Safari bug

    },
    '&:-webkit-autofill': {
      animationDuration: '5000s',
      animationName: 'mui-auto-fill'
    }
  }, styleProps.size === 'small' && {
    paddingTop: 1
  }, styleProps.multiline && {
    height: 'auto',
    resize: 'none',
    padding: 0,
    paddingTop: 0
  }, styleProps.type === 'search' && {
    // Improve type search style.
    MozAppearance: 'textfield',
    WebkitAppearance: 'textfield'
  });
});
/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 */

exports.InputBaseComponent = InputBaseComponent;
const InputBase = /*#__PURE__*/React.forwardRef(function InputBase(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiInputBase'
  });
  const {
    'aria-describedby': ariaDescribedby,
    autoComplete,
    autoFocus,
    className,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    endAdornment,
    fullWidth = false,
    id,
    inputComponent = 'input',
    inputProps: inputPropsProp = {},
    inputRef: inputRefProp,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    renderSuffix,
    rows,
    startAdornment,
    type = 'text',
    value: valueProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const theme = (0, _useTheme.default)();
  const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  const {
    current: isControlled
  } = React.useRef(value != null);
  const inputRef = React.useRef();
  const handleInputRefWarning = React.useCallback(instance => {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(['Material-UI: You have provided a `inputComponent` to the input component', 'that does not correctly handle the `ref` prop.', 'Make sure the `ref` prop is called with a HTMLInputElement.'].join('\n'));
      }
    }
  }, []);
  const handleInputPropsRefProp = (0, _useForkRef.default)(inputPropsProp.ref, handleInputRefWarning);
  const handleInputRefProp = (0, _useForkRef.default)(inputRefProp, handleInputPropsRefProp);
  const handleInputRef = (0, _useForkRef.default)(inputRef, handleInputRefProp);
  const [focused, setFocused] = React.useState(false);
  const muiFormControl = (0, _useFormControl.default)();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (muiFormControl) {
        return muiFormControl.registerEffect();
      }

      return undefined;
    }, [muiFormControl]);
  }

  const fcs = (0, _formControlState.default)({
    props,
    muiFormControl,
    states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled']
  });
  fcs.focused = muiFormControl ? muiFormControl.focused : focused; // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.

  React.useEffect(() => {
    if (!muiFormControl && disabled && focused) {
      setFocused(false);

      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);
  const onFilled = muiFormControl && muiFormControl.onFilled;
  const onEmpty = muiFormControl && muiFormControl.onEmpty;
  const checkDirty = React.useCallback(obj => {
    if ((0, _utils2.isFilled)(obj)) {
      if (onFilled) {
        onFilled();
      }
    } else if (onEmpty) {
      onEmpty();
    }
  }, [onFilled, onEmpty]);
  (0, _useEnhancedEffect.default)(() => {
    if (isControlled) {
      checkDirty({
        value
      });
    }
  }, [value, checkDirty, isControlled]);

  const handleFocus = event => {
    // Fix a bug with IE11 where the focus/blur events are triggered
    // while the component is disabled.
    if (fcs.disabled) {
      event.stopPropagation();
      return;
    }

    if (onFocus) {
      onFocus(event);
    }

    if (inputPropsProp.onFocus) {
      inputPropsProp.onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };

  const handleBlur = event => {
    if (onBlur) {
      onBlur(event);
    }

    if (inputPropsProp.onBlur) {
      inputPropsProp.onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };

  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;

      if (element == null) {
        throw new Error(process.env.NODE_ENV !== "production" ? `Material-UI: Expected valid input target. Did you use a custom \`inputComponent\` and forget to forward refs? See https://material-ui.com/r/input-component-ref-interface for more info.` : (0, _utils.formatMuiErrorMessage)(1));
      }

      checkDirty({
        value: element.value
      });
    }

    if (inputPropsProp.onChange) {
      inputPropsProp.onChange(event, ...args);
    } // Perform in the willUpdate


    if (onChange) {
      onChange(event, ...args);
    }
  }; // Check the input state on mount, in case it was filled by the user
  // or auto filled by the browser before the hydration (for SSR).


  React.useEffect(() => {
    checkDirty(inputRef.current); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = event => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }

    if (onClick) {
      onClick(event);
    }
  };

  let InputComponent = inputComponent;
  let inputProps = inputPropsProp;

  if (multiline && InputComponent === 'input') {
    if (rows) {
      if (process.env.NODE_ENV !== 'production') {
        if (minRows || maxRows) {
          console.warn('Material-UI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.');
        }
      }

      inputProps = (0, _extends2.default)({
        type: undefined
      }, inputProps);
      InputComponent = 'textarea';
    } else {
      inputProps = (0, _extends2.default)({
        type: undefined,
        maxRows,
        minRows
      }, inputProps);
      InputComponent = _TextareaAutosize.default;
    }
  }

  const handleAutoFill = event => {
    // Provide a fake value as Chrome might not let you access it for security reasons.
    checkDirty(event.animationName === 'mui-auto-fill-cancel' ? inputRef.current : {
      value: 'x'
    });
  };

  React.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);
  const styleProps = (0, _extends2.default)({}, props, {
    color: fcs.color || 'primary',
    disabled: fcs.disabled,
    endAdornment,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    startAdornment,
    type
  });
  const classes = useUtilityClasses(styleProps);
  const Root = components.Root || InputBaseRoot;
  const rootProps = componentsProps.root || {};
  const Input = components.Input || InputBaseComponent;
  inputProps = (0, _extends2.default)({}, inputProps, componentsProps.input);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GlobalStyles.default, {
      styles: {
        '@keyframes mui-auto-fill': {},
        '@keyframes mui-auto-fill-cancel': {}
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(Root, (0, _extends2.default)({}, rootProps, !(0, _unstyled.isHostComponent)(Root) && {
      styleProps: (0, _extends2.default)({}, styleProps, rootProps.styleProps),
      theme
    }, {
      ref: ref,
      onClick: handleClick
    }, other, {
      className: (0, _clsx.default)(classes.root, rootProps.className, className),
      children: [startAdornment, /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormControlContext.default.Provider, {
        value: null,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Input, (0, _extends2.default)({
          styleProps: styleProps,
          "aria-invalid": fcs.error,
          "aria-describedby": ariaDescribedby,
          autoComplete: autoComplete,
          autoFocus: autoFocus,
          defaultValue: defaultValue,
          disabled: fcs.disabled,
          id: id,
          onAnimationStart: handleAutoFill,
          name: name,
          placeholder: placeholder,
          readOnly: readOnly,
          required: fcs.required,
          rows: rows,
          value: value,
          onKeyDown: onKeyDown,
          onKeyUp: onKeyUp,
          type: type
        }, inputProps, !(0, _unstyled.isHostComponent)(Input) && {
          as: InputComponent,
          styleProps: (0, _extends2.default)({}, styleProps, inputProps.styleProps),
          theme
        }, {
          ref: handleInputRef,
          className: (0, _clsx.default)(classes.input, inputProps.className, inputPropsProp.className),
          onBlur: handleBlur,
          onChange: handleChange,
          onFocus: handleFocus
        }))
      }), endAdornment, renderSuffix ? renderSuffix((0, _extends2.default)({}, fcs, {
        startAdornment
      })) : null]
    }))]
  });
});
process.env.NODE_ENV !== "production" ? InputBase.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  'aria-describedby': _propTypes.default.string,

  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: _propTypes.default.string,

  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: _propTypes.default.bool,

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
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),

  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: _propTypes.default.shape({
    Input: _propTypes.default.elementType,
    Root: _propTypes.default.elementType
  }),

  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: _propTypes.default.object,

  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.any,

  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: _propTypes.default.bool,

  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: _propTypes.default.node,

  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: _propTypes.default.bool,

  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,

  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: _utils.elementTypeAcceptingRef,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: _propTypes.default.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _utils.refType,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: _propTypes.default.oneOf(['dense', 'none']),

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: _propTypes.default.bool,

  /**
   * Name attribute of the `input` element.
   */
  name: _propTypes.default.string,

  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur: _propTypes.default.func,

  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * @ignore
   */
  onFocus: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyDown: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyUp: _propTypes.default.func,

  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: _propTypes.default.string,

  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: _propTypes.default.bool,

  /**
   * @ignore
   */
  renderSuffix: _propTypes.default.func,

  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: _propTypes.default.bool,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The size of the component.
   */
  size: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['medium', 'small']), _propTypes.default.string]),

  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: _propTypes.default.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: _propTypes.default.string,

  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: _propTypes.default.any
} : void 0;
var _default = InputBase;
exports.default = _default;