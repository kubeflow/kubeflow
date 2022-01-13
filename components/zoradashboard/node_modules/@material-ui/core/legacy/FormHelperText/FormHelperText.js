import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import styled from '../styles/styled';
import capitalize from '../utils/capitalize';
import formHelperTextClasses, { getFormHelperTextUtilityClasses } from './formHelperTextClasses';
import useThemeProps from '../styles/useThemeProps';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      contained = styleProps.contained,
      size = styleProps.size,
      disabled = styleProps.disabled,
      error = styleProps.error,
      filled = styleProps.filled,
      focused = styleProps.focused,
      required = styleProps.required;
  var slots = {
    root: ['root', disabled && 'disabled', error && 'error', size && "size".concat(capitalize(size)), contained && 'contained', focused && 'focused', filled && 'filled', required && 'required']
  };
  return composeClasses(slots, getFormHelperTextUtilityClasses, classes);
};

var FormHelperTextRoot = styled('p', {
  name: 'MuiFormHelperText',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.size && styles["size".concat(capitalize(styleProps.size))], styleProps.contained && styles.contained, styleProps.filled && styles.filled];
  }
})(function (_ref) {
  var _extends2;

  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    color: theme.palette.text.secondary
  }, theme.typography.caption, (_extends2 = {
    textAlign: 'left',
    marginTop: 3,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0
  }, _defineProperty(_extends2, "&.".concat(formHelperTextClasses.disabled), {
    color: theme.palette.text.disabled
  }), _defineProperty(_extends2, "&.".concat(formHelperTextClasses.error), {
    color: theme.palette.error.main
  }), _extends2), styleProps.size === 'small' && {
    marginTop: 4
  }, styleProps.contained && {
    marginLeft: 14,
    marginRight: 14
  });
});
var FormHelperText = /*#__PURE__*/React.forwardRef(function FormHelperText(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiFormHelperText'
  });

  var children = props.children,
      className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'p' : _props$component,
      disabled = props.disabled,
      error = props.error,
      filled = props.filled,
      focused = props.focused,
      margin = props.margin,
      required = props.required,
      variant = props.variant,
      other = _objectWithoutProperties(props, ["children", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"]);

  var muiFormControl = useFormControl();
  var fcs = formControlState({
    props: props,
    muiFormControl: muiFormControl,
    states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required']
  });

  var styleProps = _extends({}, props, {
    component: component,
    contained: fcs.variant === 'filled' || fcs.variant === 'outlined',
    variant: fcs.variant,
    size: fcs.size,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(FormHelperTextRoot, _extends({
    as: component,
    styleProps: styleProps,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: children === ' ' ?
    /*#__PURE__*/
    // notranslate needed while Google Translate will not fix zero-width space issue
    // eslint-disable-next-line react/no-danger
    _jsx("span", {
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
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: PropTypes.bool,

  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: PropTypes.bool,

  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: PropTypes.bool,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),

  /**
   * If `true`, the helper text should use required classes key.
   */
  required: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
export default FormHelperText;