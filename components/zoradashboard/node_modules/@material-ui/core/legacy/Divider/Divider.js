import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '@material-ui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getDividerUtilityClass } from './dividerClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var absolute = styleProps.absolute,
      children = styleProps.children,
      classes = styleProps.classes,
      flexItem = styleProps.flexItem,
      light = styleProps.light,
      orientation = styleProps.orientation,
      textAlign = styleProps.textAlign,
      variant = styleProps.variant;
  var slots = {
    root: ['root', absolute && 'absolute', variant, light && 'light', orientation === 'vertical' && 'vertical', flexItem && 'flexItem', children && 'withChildren', children && orientation === 'vertical' && 'withChildrenVertical', textAlign === 'right' && orientation !== 'vertical' && 'textAlignRight', textAlign === 'left' && orientation !== 'vertical' && 'textAlignLeft'],
    wrapper: ['wrapper', orientation === 'vertical' && 'wrapperVertical']
  };
  return composeClasses(slots, getDividerUtilityClass, classes);
};

var DividerRoot = styled('div', {
  name: 'MuiDivider',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.absolute && styles.absolute, styles[styleProps.variant], styleProps.light && styles.light, styleProps.orientation === 'vertical' && styles.vertical, styleProps.flexItem && styles.flexItem, styleProps.children && styles.withChildren, styleProps.children && styleProps.orientation === 'vertical' && styles.withChildrenVertical, styleProps.textAlign === 'right' && styleProps.orientation !== 'vertical' && styles.textAlignRight, styleProps.textAlign === 'left' && styleProps.orientation !== 'vertical' && styles.textAlignLeft];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    margin: 0,
    // Reset browser default style.
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    borderBottomWidth: 'thin'
  }, styleProps.absolute && {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  }, styleProps.light && {
    borderColor: alpha(theme.palette.divider, 0.08)
  }, styleProps.variant === 'inset' && {
    marginLeft: 72
  }, styleProps.variant === 'middle' && styleProps.orientation === 'horizontal' && {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }, styleProps.variant === 'middle' && styleProps.orientation === 'vertical' && {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }, styleProps.orientation === 'vertical' && {
    height: '100%',
    borderBottomWidth: 0,
    borderRightWidth: 'thin'
  }, styleProps.flexItem && {
    alignSelf: 'stretch',
    height: 'auto'
  });
}, function (_ref2) {
  var theme = _ref2.theme,
      styleProps = _ref2.styleProps;
  return _extends({}, styleProps.children && {
    display: 'flex',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    border: 0,
    '&::before, &::after': {
      position: 'relative',
      width: '100%',
      borderTop: "thin solid ".concat(theme.palette.divider),
      top: '50%',
      content: '""',
      transform: 'translateY(50%)'
    }
  });
}, function (_ref3) {
  var theme = _ref3.theme,
      styleProps = _ref3.styleProps;
  return _extends({}, styleProps.children && styleProps.orientation === 'vertical' && {
    flexDirection: 'column',
    '&::before, &::after': {
      height: '100%',
      top: '0%',
      left: '50%',
      borderTop: 0,
      borderLeft: "thin solid ".concat(theme.palette.divider),
      transform: 'translateX(0%)'
    }
  });
}, function (_ref4) {
  var styleProps = _ref4.styleProps;
  return _extends({}, styleProps.textAlign === 'right' && styleProps.orientation !== 'vertical' && {
    '&::before': {
      width: '90%'
    },
    '&::after': {
      width: '10%'
    }
  }, styleProps.textAlign === 'left' && styleProps.orientation !== 'vertical' && {
    '&::before': {
      width: '10%'
    },
    '&::after': {
      width: '90%'
    }
  });
});
var DividerWrapper = styled('span', {
  name: 'MuiDivider',
  slot: 'Wrapper',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.wrapper, styleProps.orientation === 'vertical' && styles.wrapperVertical];
  }
})(function (_ref5) {
  var theme = _ref5.theme,
      styleProps = _ref5.styleProps;
  return _extends({
    display: 'inline-block',
    paddingLeft: theme.spacing(1.2),
    paddingRight: theme.spacing(1.2)
  }, styleProps.orientation === 'vertical' && {
    paddingTop: theme.spacing(1.2),
    paddingBottom: theme.spacing(1.2)
  });
});
var Divider = /*#__PURE__*/React.forwardRef(function Divider(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDivider'
  });

  var _props$absolute = props.absolute,
      absolute = _props$absolute === void 0 ? false : _props$absolute,
      children = props.children,
      className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? children ? 'div' : 'hr' : _props$component,
      _props$flexItem = props.flexItem,
      flexItem = _props$flexItem === void 0 ? false : _props$flexItem,
      _props$light = props.light,
      light = _props$light === void 0 ? false : _props$light,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      _props$role = props.role,
      role = _props$role === void 0 ? component !== 'hr' ? 'separator' : undefined : _props$role,
      _props$textAlign = props.textAlign,
      textAlign = _props$textAlign === void 0 ? 'center' : _props$textAlign,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'fullWidth' : _props$variant,
      other = _objectWithoutProperties(props, ["absolute", "children", "className", "component", "flexItem", "light", "orientation", "role", "textAlign", "variant"]);

  var styleProps = _extends({}, props, {
    absolute: absolute,
    component: component,
    flexItem: flexItem,
    light: light,
    orientation: orientation,
    role: role,
    textAlign: textAlign,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(DividerRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    role: role,
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: children ? /*#__PURE__*/_jsx(DividerWrapper, {
      className: classes.wrapper,
      styleProps: styleProps,
      children: children
    }) : null
  }));
});
process.env.NODE_ENV !== "production" ? Divider.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: PropTypes.bool,

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: PropTypes.bool,

  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   */
  light: PropTypes.bool,

  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * @ignore
   */
  role: PropTypes
  /* @typescript-to-proptypes-ignore */
  .string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),

  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['fullWidth', 'inset', 'middle']), PropTypes.string])
} : void 0;
export default Divider;