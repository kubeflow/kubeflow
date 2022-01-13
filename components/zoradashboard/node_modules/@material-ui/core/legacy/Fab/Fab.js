import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import fabClasses, { getFabUtilityClass } from './fabClasses';
import styled from '../styles/styled';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var color = styleProps.color,
      variant = styleProps.variant,
      classes = styleProps.classes,
      size = styleProps.size;
  var slots = {
    root: ['root', variant, "size".concat(capitalize(size)), color === 'inherit' && 'colorInherit', color === 'primary' && 'primary', color === 'secondary' && 'secondary']
  };
  return composeClasses(slots, getFabUtilityClass, classes);
};

var FabRoot = styled(ButtonBase, {
  name: 'MuiFab',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles[styleProps.variant], styles["size".concat(capitalize(styleProps.size))], styleProps.color === 'inherit' && styles.colorInherit, styleProps.color === 'primary' && styles.primary, styleProps.color === 'secondary' && styles.secondary];
  }
})(function (_ref) {
  var _extends2;

  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({}, theme.typography.button, (_extends2 = {
    minHeight: 36,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.short
    }),
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
    '&:active': {
      boxShadow: theme.shadows[12]
    },
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    '&:hover': {
      backgroundColor: theme.palette.grey.A100,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.grey[300]
      },
      textDecoration: 'none'
    }
  }, _defineProperty(_extends2, "&.".concat(fabClasses.focusVisible), {
    boxShadow: theme.shadows[6]
  }), _defineProperty(_extends2, "&.".concat(fabClasses.disabled), {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  }), _extends2), styleProps.size === 'small' && {
    width: 40,
    height: 40
  }, styleProps.size === 'medium' && {
    width: 48,
    height: 48
  }, styleProps.variant === 'extended' && {
    borderRadius: 48 / 2,
    padding: '0 16px',
    width: 'auto',
    minHeight: 'auto',
    minWidth: 48,
    height: 48
  }, styleProps.variant === 'extended' && styleProps.size === 'small' && {
    width: 'auto',
    padding: '0 8px',
    borderRadius: 34 / 2,
    minWidth: 34,
    height: 34
  }, styleProps.variant === 'extended' && styleProps.size === 'medium' && {
    width: 'auto',
    padding: '0 16px',
    borderRadius: 40 / 2,
    minWidth: 40,
    height: 40
  }, styleProps.color === 'inherit' && {
    color: 'inherit'
  });
}, function (_ref2) {
  var theme = _ref2.theme,
      styleProps = _ref2.styleProps;
  return _extends({}, styleProps.color === 'primary' && {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.primary.main
      }
    }
  }, styleProps.color === 'secondary' && {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.secondary.main
      }
    }
  });
});
var Fab = /*#__PURE__*/React.forwardRef(function Fab(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiFab'
  });

  var children = props.children,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'default' : _props$color,
      _props$component = props.component,
      component = _props$component === void 0 ? 'button' : _props$component,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      focusVisibleClassName = props.focusVisibleClassName,
      _props$size = props.size,
      size = _props$size === void 0 ? 'large' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'circular' : _props$variant,
      other = _objectWithoutProperties(props, ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"]);

  var styleProps = _extends({}, props, {
    color: color,
    component: component,
    disabled: disabled,
    disableFocusRipple: disableFocusRipple,
    size: size,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(FabRoot, _extends({
    className: clsx(classes.root, className),
    component: component,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? Fab.propTypes
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']), PropTypes.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: PropTypes.bool,

  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'large'
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   * @default 'circular'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['circular', 'extended']), PropTypes.string])
} : void 0;
export default Fab;