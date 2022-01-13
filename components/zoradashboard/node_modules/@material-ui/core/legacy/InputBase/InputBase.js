import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import { formatMuiErrorMessage as _formatMuiErrorMessage } from "@material-ui/utils";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType, elementTypeAcceptingRef } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses, isHostComponent } from '@material-ui/unstyled';
import formControlState from '../FormControl/formControlState';
import FormControlContext from '../FormControl/FormControlContext';
import useFormControl from '../FormControl/useFormControl';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import capitalize from '../utils/capitalize';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import TextareaAutosize from '../TextareaAutosize';
import GlobalStyles from '../GlobalStyles';
import { isFilled } from './utils';
import inputBaseClasses, { getInputBaseUtilityClass } from './inputBaseClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var rootOverridesResolver = function rootOverridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return [styles.root, styleProps.formControl && styles.formControl, styleProps.startAdornment && styles.adornedStart, styleProps.endAdornment && styles.adornedEnd, styleProps.error && styles.error, styleProps.size === 'small' && styles.sizeSmall, styleProps.multiline && styles.multiline, styleProps.color && styles["color".concat(capitalize(styleProps.color))], styleProps.fullWidth && styles.fullWidth, styleProps.hiddenLabel && styles.hiddenLabel];
};
export var inputOverridesResolver = function inputOverridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return [styles.input, styleProps.size === 'small' && styles.inputSizeSmall, styleProps.multiline && styles.inputMultiline, styleProps.type === 'search' && styles.inputTypeSearch, styleProps.startAdornment && styles.inputAdornedStart, styleProps.endAdornment && styles.inputAdornedEnd, styleProps.hiddenLabel && styles.inputHiddenLabel];
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      color = styleProps.color,
      disabled = styleProps.disabled,
      error = styleProps.error,
      endAdornment = styleProps.endAdornment,
      focused = styleProps.focused,
      formControl = styleProps.formControl,
      fullWidth = styleProps.fullWidth,
      hiddenLabel = styleProps.hiddenLabel,
      multiline = styleProps.multiline,
      size = styleProps.size,
      startAdornment = styleProps.startAdornment,
      type = styleProps.type;
  var slots = {
    root: ['root', "color".concat(capitalize(color)), disabled && 'disabled', error && 'error', fullWidth && 'fullWidth', focused && 'focused', formControl && 'formControl', size === 'small' && 'sizeSmall', multiline && 'multiline', startAdornment && 'adornedStart', endAdornment && 'adornedEnd', hiddenLabel && 'hiddenLabel'],
    input: ['input', disabled && 'disabled', type === 'search' && 'inputTypeSearch', multiline && 'inputMultiline', size === 'small' && 'inputSizeSmall', hiddenLabel && 'inputHiddenLabel', startAdornment && 'inputAdornedStart', endAdornment && 'inputAdornedEnd']
  };
  return composeClasses(slots, getInputBaseUtilityClass, classes);
};

export var InputBaseRoot = styled('div', {
  name: 'MuiInputBase',
  slot: 'Root',
  overridesResolver: rootOverridesResolver
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({}, theme.typography.body1, _defineProperty({
    color: theme.palette.text.primary,
    lineHeight: '1.4375em',
    // 23px
    boxSizing: 'border-box',
    // Prevent padding issue with fullWidth.
    position: 'relative',
    cursor: 'text',
    display: 'inline-flex',
    alignItems: 'center'
  }, "&.".concat(inputBaseClasses.disabled), {
    color: theme.palette.text.disabled,
    cursor: 'default'
  }), styleProps.multiline && _extends({
    padding: '4px 0 5px'
  }, styleProps.size === 'small' && {
    paddingTop: 1
  }), styleProps.fullWidth && {
    width: '100%'
  });
});
export var InputBaseComponent = styled('input', {
  name: 'MuiInputBase',
  slot: 'Input',
  overridesResolver: inputOverridesResolver
})(function (_ref2) {
  var _extends3;

  var theme = _ref2.theme,
      styleProps = _ref2.styleProps;
  var light = theme.palette.mode === 'light';
  var placeholder = {
    color: 'currentColor',
    opacity: light ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter
    })
  };
  var placeholderHidden = {
    opacity: '0 !important'
  };
  var placeholderVisible = {
    opacity: light ? 0.42 : 0.5
  };
  return _extends((_extends3 = {
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
    }
  }, _defineProperty(_extends3, "label[data-shrink=false] + .".concat(inputBaseClasses.formControl, " &"), {
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

  }), _defineProperty(_extends3, "&.".concat(inputBaseClasses.disabled), {
    opacity: 1,
    // Reset iOS opacity
    WebkitTextFillColor: theme.palette.text.disabled // Fix opacity Safari bug

  }), _defineProperty(_extends3, '&:-webkit-autofill', {
    animationDuration: '5000s',
    animationName: 'mui-auto-fill'
  }), _extends3), styleProps.size === 'small' && {
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

var InputBase = /*#__PURE__*/React.forwardRef(function InputBase(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiInputBase'
  });

  var ariaDescribedby = props['aria-describedby'],
      autoComplete = props.autoComplete,
      autoFocus = props.autoFocus,
      className = props.className,
      color = props.color,
      _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      defaultValue = props.defaultValue,
      disabled = props.disabled,
      endAdornment = props.endAdornment,
      error = props.error,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      id = props.id,
      _props$inputComponent = props.inputComponent,
      inputComponent = _props$inputComponent === void 0 ? 'input' : _props$inputComponent,
      _props$inputProps = props.inputProps,
      inputPropsProp = _props$inputProps === void 0 ? {} : _props$inputProps,
      inputRefProp = props.inputRef,
      margin = props.margin,
      maxRows = props.maxRows,
      minRows = props.minRows,
      _props$multiline = props.multiline,
      multiline = _props$multiline === void 0 ? false : _props$multiline,
      name = props.name,
      onBlur = props.onBlur,
      onChange = props.onChange,
      onClick = props.onClick,
      onFocus = props.onFocus,
      onKeyDown = props.onKeyDown,
      onKeyUp = props.onKeyUp,
      placeholder = props.placeholder,
      readOnly = props.readOnly,
      renderSuffix = props.renderSuffix,
      rows = props.rows,
      size = props.size,
      startAdornment = props.startAdornment,
      _props$type = props.type,
      type = _props$type === void 0 ? 'text' : _props$type,
      valueProp = props.value,
      other = _objectWithoutProperties(props, ["aria-describedby", "autoComplete", "autoFocus", "className", "color", "components", "componentsProps", "defaultValue", "disabled", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "size", "startAdornment", "type", "value"]);

  var theme = useTheme();
  var value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;

  var _React$useRef = React.useRef(value != null),
      isControlled = _React$useRef.current;

  var inputRef = React.useRef();
  var handleInputRefWarning = React.useCallback(function (instance) {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(['Material-UI: You have provided a `inputComponent` to the input component', 'that does not correctly handle the `ref` prop.', 'Make sure the `ref` prop is called with a HTMLInputElement.'].join('\n'));
      }
    }
  }, []);
  var handleInputPropsRefProp = useForkRef(inputPropsProp.ref, handleInputRefWarning);
  var handleInputRefProp = useForkRef(inputRefProp, handleInputPropsRefProp);
  var handleInputRef = useForkRef(inputRef, handleInputRefProp);

  var _React$useState = React.useState(false),
      focused = _React$useState[0],
      setFocused = _React$useState[1];

  var muiFormControl = useFormControl();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(function () {
      if (muiFormControl) {
        return muiFormControl.registerEffect();
      }

      return undefined;
    }, [muiFormControl]);
  }

  var fcs = formControlState({
    props: props,
    muiFormControl: muiFormControl,
    states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled']
  });
  fcs.focused = muiFormControl ? muiFormControl.focused : focused; // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.

  React.useEffect(function () {
    if (!muiFormControl && disabled && focused) {
      setFocused(false);

      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);
  var onFilled = muiFormControl && muiFormControl.onFilled;
  var onEmpty = muiFormControl && muiFormControl.onEmpty;
  var checkDirty = React.useCallback(function (obj) {
    if (isFilled(obj)) {
      if (onFilled) {
        onFilled();
      }
    } else if (onEmpty) {
      onEmpty();
    }
  }, [onFilled, onEmpty]);
  useEnhancedEffect(function () {
    if (isControlled) {
      checkDirty({
        value: value
      });
    }
  }, [value, checkDirty, isControlled]);

  var handleFocus = function handleFocus(event) {
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

  var handleBlur = function handleBlur(event) {
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

  var handleChange = function handleChange(event) {
    if (!isControlled) {
      var element = event.target || inputRef.current;

      if (element == null) {
        throw new Error(process.env.NODE_ENV !== "production" ? "Material-UI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://material-ui.com/r/input-component-ref-interface for more info." : _formatMuiErrorMessage(1));
      }

      checkDirty({
        value: element.value
      });
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (inputPropsProp.onChange) {
      inputPropsProp.onChange.apply(inputPropsProp, [event].concat(args));
    } // Perform in the willUpdate


    if (onChange) {
      onChange.apply(void 0, [event].concat(args));
    }
  }; // Check the input state on mount, in case it was filled by the user
  // or auto filled by the browser before the hydration (for SSR).


  React.useEffect(function () {
    checkDirty(inputRef.current); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var handleClick = function handleClick(event) {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }

    if (onClick) {
      onClick(event);
    }
  };

  var InputComponent = inputComponent;
  var inputProps = inputPropsProp;

  if (multiline && InputComponent === 'input') {
    if (rows) {
      if (process.env.NODE_ENV !== 'production') {
        if (minRows || maxRows) {
          console.warn('Material-UI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.');
        }
      }

      inputProps = _extends({
        type: undefined
      }, inputProps);
      InputComponent = 'textarea';
    } else {
      inputProps = _extends({
        type: undefined,
        maxRows: maxRows,
        minRows: minRows
      }, inputProps);
      InputComponent = TextareaAutosize;
    }
  }

  var handleAutoFill = function handleAutoFill(event) {
    // Provide a fake value as Chrome might not let you access it for security reasons.
    checkDirty(event.animationName === 'mui-auto-fill-cancel' ? inputRef.current : {
      value: 'x'
    });
  };

  React.useEffect(function () {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);

  var styleProps = _extends({}, props, {
    color: fcs.color || 'primary',
    disabled: fcs.disabled,
    endAdornment: endAdornment,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth: fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline: multiline,
    size: fcs.size,
    startAdornment: startAdornment,
    type: type
  });

  var classes = useUtilityClasses(styleProps);
  var Root = components.Root || InputBaseRoot;
  var rootProps = componentsProps.root || {};
  var Input = components.Input || InputBaseComponent;
  inputProps = _extends({}, inputProps, componentsProps.input);
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(GlobalStyles, {
      styles: {
        '@keyframes mui-auto-fill': {},
        '@keyframes mui-auto-fill-cancel': {}
      }
    }), /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, !isHostComponent(Root) && {
      styleProps: _extends({}, styleProps, rootProps.styleProps),
      theme: theme
    }, {
      ref: ref,
      onClick: handleClick
    }, other, {
      className: clsx(classes.root, rootProps.className, className),
      children: [startAdornment, /*#__PURE__*/_jsx(FormControlContext.Provider, {
        value: null,
        children: /*#__PURE__*/_jsx(Input, _extends({
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
        }, inputProps, !isHostComponent(Input) && {
          as: InputComponent,
          styleProps: _extends({}, styleProps, inputProps.styleProps),
          theme: theme
        }, {
          ref: handleInputRef,
          className: clsx(classes.input, inputProps.className, inputPropsProp.className),
          onBlur: handleBlur,
          onChange: handleChange,
          onFocus: handleFocus
        }))
      }), endAdornment, renderSuffix ? renderSuffix(_extends({}, fcs, {
        startAdornment: startAdornment
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
  'aria-describedby': PropTypes.string,

  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,

  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),

  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,

  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,

  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,

  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,

  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,

  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,

  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: elementTypeAcceptingRef,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: PropTypes.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(['dense', 'none']),

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,

  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,

  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur: PropTypes.func,

  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * @ignore
   */
  onFocus: PropTypes.func,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,

  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,

  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,

  /**
   * @ignore
   */
  renderSuffix: PropTypes.func,

  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The size of the component.
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.string]),

  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: PropTypes.string,

  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any
} : void 0;
export default InputBase;