import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { elementTypeAcceptingRef } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha, getPath } from '@material-ui/system';
import capitalize from '../utils/capitalize';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useIsFocusVisible from '../utils/useIsFocusVisible';
import useForkRef from '../utils/useForkRef';
import Typography from '../Typography';
import linkClasses, { getLinkUtilityClass } from './linkClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var colorTransformations = {
  primary: 'primary.main',
  textPrimary: 'text.primary',
  secondary: 'secondary.main',
  textSecondary: 'text.secondary',
  error: 'error.main'
};

var transformDeprecatedColors = function transformDeprecatedColors(color) {
  return colorTransformations[color] || color;
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      component = styleProps.component,
      focusVisible = styleProps.focusVisible,
      underline = styleProps.underline;
  var slots = {
    root: ['root', "underline".concat(capitalize(underline)), component === 'button' && 'button', focusVisible && 'focusVisible']
  };
  return composeClasses(slots, getLinkUtilityClass, classes);
};

var LinkRoot = styled(Typography, {
  name: 'MuiLink',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles["underline".concat(capitalize(styleProps.underline))], styleProps.component === 'button' && styles.button];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  var color = getPath(theme, "palette.".concat(transformDeprecatedColors(styleProps.color))) || styleProps.color;
  return _extends({}, styleProps.underline === 'none' && {
    textDecoration: 'none'
  }, styleProps.underline === 'hover' && {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }, styleProps.underline === 'always' && {
    textDecoration: 'underline',
    textDecorationColor: color !== 'inherit' ? alpha(color, 0.4) : undefined,
    '&:hover': {
      textDecorationColor: 'inherit'
    }
  }, styleProps.component === 'button' && _defineProperty({
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0,
    // Remove the margin in Safari
    borderRadius: 0,
    padding: 0,
    // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    // Reset
    WebkitAppearance: 'none',
    // Reset
    '&::-moz-focus-inner': {
      borderStyle: 'none' // Remove Firefox dotted outline.

    }
  }, "&.".concat(linkClasses.focusVisible), {
    outline: 'auto'
  }));
});
var Link = /*#__PURE__*/React.forwardRef(function Link(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiLink'
  });

  var className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      _props$component = props.component,
      component = _props$component === void 0 ? 'a' : _props$component,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      TypographyClasses = props.TypographyClasses,
      _props$underline = props.underline,
      underline = _props$underline === void 0 ? 'always' : _props$underline,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'inherit' : _props$variant,
      other = _objectWithoutProperties(props, ["className", "color", "component", "onBlur", "onFocus", "TypographyClasses", "underline", "variant"]);

  var _useIsFocusVisible = useIsFocusVisible(),
      isFocusVisibleRef = _useIsFocusVisible.isFocusVisibleRef,
      handleBlurVisible = _useIsFocusVisible.onBlur,
      handleFocusVisible = _useIsFocusVisible.onFocus,
      focusVisibleRef = _useIsFocusVisible.ref;

  var _React$useState = React.useState(false),
      focusVisible = _React$useState[0],
      setFocusVisible = _React$useState[1];

  var handlerRef = useForkRef(ref, focusVisibleRef);

  var handleBlur = function handleBlur(event) {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  var handleFocus = function handleFocus(event) {
    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  var styleProps = _extends({}, props, {
    color: color,
    component: component,
    focusVisible: focusVisible,
    underline: underline,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(LinkRoot, _extends({
    className: clsx(classes.root, className),
    classes: TypographyClasses,
    color: color,
    component: component,
    onBlur: handleBlur,
    onFocus: handleFocus,
    ref: handlerRef,
    styleProps: styleProps,
    variant: variant
  }, other));
});
process.env.NODE_ENV !== "production" ? Link.propTypes
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
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the link.
   * @default 'primary'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .any,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,

  /**
   * @ignore
   */
  onBlur: PropTypes.func,

  /**
   * @ignore
   */
  onFocus: PropTypes.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * `classes` prop applied to the [`Typography`](/api/typography/) element.
   */
  TypographyClasses: PropTypes.object,

  /**
   * Controls when the link should have an underline.
   * @default 'always'
   */
  underline: PropTypes.oneOf(['always', 'hover', 'none']),

  /**
   * Applies the theme typography styles.
   * @default 'inherit'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), PropTypes.string])
} : void 0;
export default Link;