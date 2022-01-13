import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getContainerUtilityClass } from './containerClasses';
import capitalize from '../utils/capitalize';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      fixed = styleProps.fixed,
      disableGutters = styleProps.disableGutters,
      maxWidth = styleProps.maxWidth;
  var slots = {
    root: ['root', maxWidth && "maxWidth".concat(capitalize(String(maxWidth))), fixed && 'fixed', disableGutters && 'disableGutters']
  };
  return composeClasses(slots, getContainerUtilityClass, classes);
};

var ContainerRoot = styled('div', {
  name: 'MuiContainer',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles["maxWidth".concat(capitalize(String(styleProps.maxWidth)))], styleProps.fixed && styles.fixed, styleProps.disableGutters && styles.disableGutters];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    width: '100%',
    marginLeft: 'auto',
    boxSizing: 'border-box',
    marginRight: 'auto',
    display: 'block'
  }, !styleProps.disableGutters && _defineProperty({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }, theme.breakpoints.up('sm'), {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }));
}, function (_ref3) {
  var theme = _ref3.theme,
      styleProps = _ref3.styleProps;
  return styleProps.fixed && Object.keys(theme.breakpoints.values).reduce(function (acc, breakpoint) {
    var value = theme.breakpoints.values[breakpoint];

    if (value !== 0) {
      acc[theme.breakpoints.up(breakpoint)] = {
        maxWidth: "".concat(value).concat(theme.breakpoints.unit)
      };
    }

    return acc;
  }, {});
}, function (_ref4) {
  var theme = _ref4.theme,
      styleProps = _ref4.styleProps;
  return _extends({}, styleProps.maxWidth === 'xs' && _defineProperty({}, theme.breakpoints.up('xs'), {
    maxWidth: Math.max(theme.breakpoints.values.xs, 444)
  }), styleProps.maxWidth && styleProps.maxWidth !== 'xs' && _defineProperty({}, theme.breakpoints.up(styleProps.maxWidth), {
    maxWidth: "".concat(theme.breakpoints.values[styleProps.maxWidth]).concat(theme.breakpoints.unit)
  }));
});
var Container = /*#__PURE__*/React.forwardRef(function Container(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiContainer'
  });

  var className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'div' : _props$component,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      _props$fixed = props.fixed,
      fixed = _props$fixed === void 0 ? false : _props$fixed,
      _props$maxWidth = props.maxWidth,
      maxWidth = _props$maxWidth === void 0 ? 'lg' : _props$maxWidth,
      other = _objectWithoutProperties(props, ["className", "component", "disableGutters", "fixed", "maxWidth"]);

  var styleProps = _extends({}, props, {
    component: component,
    disableGutters: disableGutters,
    fixed: fixed,
    maxWidth: maxWidth
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(ContainerRoot, _extends({
    as: component,
    styleProps: styleProps,
    className: clsx(classes.root, className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Container.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
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
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,

  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   * @default false
   */
  fixed: PropTypes.bool,

  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'lg'
   */
  maxWidth: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]), PropTypes.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Container;