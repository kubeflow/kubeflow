import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import FormLabel, { formLabelClasses } from '../FormLabel';
import useThemeProps from '../styles/useThemeProps';
import styled, { rootShouldForwardProp } from '../styles/styled';
import { getInputLabelUtilityClasses } from './inputLabelClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      formControl = styleProps.formControl,
      size = styleProps.size,
      shrink = styleProps.shrink,
      disableAnimation = styleProps.disableAnimation,
      variant = styleProps.variant;
  var slots = {
    root: ['root', formControl && 'formControl', !disableAnimation && 'animated', shrink && 'shrink', size === 'small' && 'sizeSmall', variant]
  };
  var composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);
  return _extends({}, classes, composedClasses);
};

var InputLabelRoot = styled(FormLabel, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return rootShouldForwardProp(prop) || prop === 'classes';
  },
  name: 'MuiInputLabel',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [_defineProperty({}, "& .".concat(formLabelClasses.asterisk), styles.asterisk), styles.root, !styleProps.formControl && styles.formControl, styleProps.size === 'small' && styles.sizeSmall, styleProps.shrink && styles.shrink, !styleProps.disableAnimation && styles.animated, styles[styleProps.variant]];
  }
})(function (_ref2) {
  var theme = _ref2.theme,
      styleProps = _ref2.styleProps;
  return _extends({
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
  }, styleProps.variant === 'filled' && _extends({
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
  }, styleProps.shrink && _extends({
    transform: 'translate(12px, 7px) scale(0.75)',
    maxWidth: 'calc(133% - 24px)'
  }, styleProps.size === 'small' && {
    transform: 'translate(12px, 4px) scale(0.75)'
  })), styleProps.variant === 'outlined' && _extends({
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
  }));
});
var InputLabel = /*#__PURE__*/React.forwardRef(function InputLabel(inProps, ref) {
  var props = useThemeProps({
    name: 'MuiInputLabel',
    props: inProps
  });

  var _props$disableAnimati = props.disableAnimation,
      disableAnimation = _props$disableAnimati === void 0 ? false : _props$disableAnimati,
      margin = props.margin,
      shrinkProp = props.shrink,
      variant = props.variant,
      other = _objectWithoutProperties(props, ["disableAnimation", "margin", "shrink", "variant"]);

  var muiFormControl = useFormControl();
  var shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }

  var fcs = formControlState({
    props: props,
    muiFormControl: muiFormControl,
    states: ['size', 'variant']
  });

  var styleProps = _extends({}, props, {
    disableAnimation: disableAnimation,
    formControl: muiFormControl,
    shrink: shrink,
    size: fcs.size,
    variant: fcs.variant
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(InputLabelRoot, _extends({
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
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']), PropTypes.string]),

  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: PropTypes.bool,

  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,

  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: PropTypes.bool,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),

  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,

  /**
   * If `true`, the label is shrunk.
   */
  shrink: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
export default InputLabel;