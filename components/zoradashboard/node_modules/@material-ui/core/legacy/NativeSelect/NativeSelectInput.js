import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import capitalize from '../utils/capitalize';
import nativeSelectClasses, { getNativeSelectUtilityClasses } from './nativeSelectClasses';
import styled from '../styles/styled';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      variant = styleProps.variant,
      disabled = styleProps.disabled,
      open = styleProps.open;
  var slots = {
    select: ['select', variant, disabled && 'disabled'],
    icon: ['icon', "icon".concat(capitalize(variant)), open && 'iconOpen', disabled && 'disabled']
  };
  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};

export var nativeSelectSelectStyles = function nativeSelectSelectStyles(_ref) {
  var _extends2;

  var styleProps = _ref.styleProps,
      theme = _ref.theme;
  return _extends((_extends2 = {
    MozAppearance: 'none',
    // Reset
    WebkitAppearance: 'none',
    // Reset
    // When interacting quickly, the text can end up selected.
    // Native select can't be selected either.
    userSelect: 'none',
    borderRadius: 0,
    // Reset
    cursor: 'pointer',
    '&:focus': {
      // Show that it's not an text input
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
      borderRadius: 0 // Reset Chrome style

    },
    // Remove IE11 arrow
    '&::-ms-expand': {
      display: 'none'
    }
  }, _defineProperty(_extends2, "&.".concat(nativeSelectClasses.disabled), {
    cursor: 'default'
  }), _defineProperty(_extends2, '&[multiple]', {
    height: 'auto'
  }), _defineProperty(_extends2, '&:not([multiple]) option, &:not([multiple]) optgroup', {
    backgroundColor: theme.palette.background.paper
  }), _defineProperty(_extends2, '&&&', {
    paddingRight: 24,
    minWidth: 16 // So it doesn't collapse.

  }), _extends2), styleProps.variant === 'filled' && {
    '&&&': {
      paddingRight: 32
    }
  }, styleProps.variant === 'outlined' && {
    borderRadius: theme.shape.borderRadius,
    '&:focus': {
      borderRadius: theme.shape.borderRadius // Reset the reset for Chrome style

    },
    '&&&': {
      paddingRight: 32
    }
  });
};
var NativeSelectSelect = styled('select', {
  name: 'MuiNativeSelect',
  slot: 'Select',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.select, styles[styleProps.variant]];
  }
})(nativeSelectSelectStyles);
export var nativeSelectIconStyles = function nativeSelectIconStyles(_ref2) {
  var styleProps = _ref2.styleProps,
      theme = _ref2.theme;
  return _extends(_defineProperty({
    // We use a position absolute over a flexbox in order to forward the pointer events
    // to the input and to support wrapping tags..
    position: 'absolute',
    right: 0,
    top: 'calc(50% - .5em)',
    // Center vertically, height is 1em
    pointerEvents: 'none',
    // Don't block pointer events on the select under the icon.
    color: theme.palette.action.active
  }, "&.".concat(nativeSelectClasses.disabled), {
    color: theme.palette.action.disabled
  }), styleProps.open && {
    right: 7
  }, styleProps.variant === 'filled' && {
    right: 7
  }, styleProps.variant === 'outlined' && {
    right: 7
  });
};
var NativeSelectIcon = styled('svg', {
  name: 'MuiNativeSelect',
  slot: 'Icon',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.icon, styleProps.variant && styles["icon".concat(capitalize(styleProps.variant))], styleProps.open && styles.iconOpen];
  }
})(nativeSelectIconStyles);
/**
 * @ignore - internal component.
 */

var NativeSelectInput = /*#__PURE__*/React.forwardRef(function NativeSelectInput(props, ref) {
  var className = props.className,
      disabled = props.disabled,
      IconComponent = props.IconComponent,
      inputRef = props.inputRef,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      other = _objectWithoutProperties(props, ["className", "disabled", "IconComponent", "inputRef", "variant"]);

  var styleProps = _extends({}, props, {
    disabled: disabled,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(NativeSelectSelect, _extends({
      styleProps: styleProps,
      className: clsx(classes.select, className),
      disabled: disabled,
      ref: inputRef || ref
    }, other)), props.multiple ? null : /*#__PURE__*/_jsx(NativeSelectIcon, {
      as: IconComponent,
      styleProps: styleProps,
      className: classes.icon
    })]
  });
});
process.env.NODE_ENV !== "production" ? NativeSelectInput.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,

  /**
   * If `true`, the select is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType.isRequired,

  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: refType,

  /**
   * @ignore
   */
  multiple: PropTypes.bool,

  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,

  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,

  /**
   * The input value.
   */
  value: PropTypes.any,

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled'])
} : void 0;
export default NativeSelectInput;