import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { refType, deepmerge } from '@material-ui/utils';
import InputBase from '../InputBase';
import styled, { rootShouldForwardProp } from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import inputClasses, { getInputUtilityClass } from './inputClasses';
import { rootOverridesResolver as inputBaseRootOverridesResolver, inputOverridesResolver as inputBaseInputOverridesResolver, InputBaseRoot, InputBaseComponent as InputBaseInput } from '../InputBase/InputBase';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      disableUnderline = styleProps.disableUnderline;
  var slots = {
    root: ['root', !disableUnderline && 'underline'],
    input: ['input']
  };
  var composedClasses = composeClasses(slots, getInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};

var InputRoot = styled(InputBaseRoot, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return rootShouldForwardProp(prop) || prop === 'classes';
  },
  name: 'MuiInput',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [].concat(_toConsumableArray(inputBaseRootOverridesResolver(props, styles)), [!styleProps.disableUnderline && styles.underline]);
  }
})(function (_ref) {
  var _ref2;

  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  var light = theme.palette.mode === 'light';
  var bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
  return _extends({
    position: 'relative'
  }, styleProps.formControl && {
    'label + &': {
      marginTop: 16
    }
  }, !styleProps.disableUnderline && (_ref2 = {
    '&:after': {
      borderBottom: "2px solid ".concat(theme.palette[styleProps.color].main),
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '""',
      position: 'absolute',
      right: 0,
      transform: 'scaleX(0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      }),
      pointerEvents: 'none' // Transparent to the hover style.

    }
  }, _defineProperty(_ref2, "&.".concat(inputClasses.focused, ":after"), {
    transform: 'scaleX(1)'
  }), _defineProperty(_ref2, "&.".concat(inputClasses.error, ":after"), {
    borderBottomColor: theme.palette.error.main,
    transform: 'scaleX(1)' // error is always underlined in red

  }), _defineProperty(_ref2, '&:before', {
    borderBottom: "1px solid ".concat(bottomLineColor),
    left: 0,
    bottom: 0,
    // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
    content: '"\\00a0"',
    position: 'absolute',
    right: 0,
    transition: theme.transitions.create('border-bottom-color', {
      duration: theme.transitions.duration.shorter
    }),
    pointerEvents: 'none' // Transparent to the hover style.

  }), _defineProperty(_ref2, "&:hover:not(.".concat(inputClasses.disabled, "):before"), {
    borderBottom: "2px solid ".concat(theme.palette.text.primary),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      borderBottom: "1px solid ".concat(bottomLineColor)
    }
  }), _defineProperty(_ref2, "&.".concat(inputClasses.disabled, ":before"), {
    borderBottomStyle: 'dotted'
  }), _ref2));
});
var InputInput = styled(InputBaseInput, {
  name: 'MuiInput',
  slot: 'Input',
  overridesResolver: inputBaseInputOverridesResolver
})({});
var Input = /*#__PURE__*/React.forwardRef(function Input(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiInput'
  });

  var disableUnderline = props.disableUnderline,
      _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      componentsPropsProp = props.componentsProps,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      _props$inputComponent = props.inputComponent,
      inputComponent = _props$inputComponent === void 0 ? 'input' : _props$inputComponent,
      _props$multiline = props.multiline,
      multiline = _props$multiline === void 0 ? false : _props$multiline,
      _props$type = props.type,
      type = _props$type === void 0 ? 'text' : _props$type,
      other = _objectWithoutProperties(props, ["disableUnderline", "components", "componentsProps", "fullWidth", "inputComponent", "multiline", "type"]);

  var classes = useUtilityClasses(props);
  var styleProps = {
    disableUnderline: disableUnderline
  };
  var inputComponentsProps = {
    root: {
      styleProps: styleProps
    }
  };
  var componentsProps = componentsPropsProp ? deepmerge(componentsPropsProp, inputComponentsProps) : inputComponentsProps;
  return /*#__PURE__*/_jsx(InputBase, _extends({
    components: _extends({
      Root: InputRoot,
      Input: InputInput
    }, components),
    componentsProps: componentsProps,
    fullWidth: fullWidth,
    inputComponent: inputComponent,
    multiline: multiline,
    ref: ref,
    type: type
  }, other, {
    classes: classes
  }));
});
process.env.NODE_ENV !== "production" ? Input.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

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
   * The color of the component. It supports those theme colors that make sense for this component.
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),

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
   * If `true`, the `input` will not have an underline.
   */
  disableUnderline: PropTypes.bool,

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
  inputComponent: PropTypes.elementType,

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
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,

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
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

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
Input.muiName = 'Input';
export default Input;