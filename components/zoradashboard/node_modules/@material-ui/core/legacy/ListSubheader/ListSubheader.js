import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import { getListSubheaderUtilityClass } from './listSubheaderClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      color = styleProps.color,
      disableGutters = styleProps.disableGutters,
      inset = styleProps.inset,
      disableSticky = styleProps.disableSticky;
  var slots = {
    root: ['root', color !== 'default' && "color".concat(capitalize(color)), !disableGutters && 'gutters', inset && 'inset', !disableSticky && 'sticky']
  };
  return composeClasses(slots, getListSubheaderUtilityClass, classes);
};

var ListSubheaderRoot = styled('li', {
  name: 'MuiListSubheader',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.color !== 'default' && styles["color".concat(capitalize(styleProps.color))], !styleProps.disableGutters && styles.gutters, styleProps.inset && styles.inset, !styleProps.disableSticky && styles.sticky];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    boxSizing: 'border-box',
    lineHeight: '48px',
    listStyle: 'none',
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(14)
  }, styleProps.color === 'primary' && {
    color: theme.palette.primary.main
  }, styleProps.color === 'inherit' && {
    color: 'inherit'
  }, !styleProps.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16
  }, styleProps.inset && {
    paddingLeft: 72
  }, !styleProps.disableSticky && {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: theme.palette.background.paper
  });
});
var ListSubheader = /*#__PURE__*/React.forwardRef(function ListSubheader(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiListSubheader'
  });

  var className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'default' : _props$color,
      _props$component = props.component,
      component = _props$component === void 0 ? 'li' : _props$component,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      _props$disableSticky = props.disableSticky,
      disableSticky = _props$disableSticky === void 0 ? false : _props$disableSticky,
      _props$inset = props.inset,
      inset = _props$inset === void 0 ? false : _props$inset,
      other = _objectWithoutProperties(props, ["className", "color", "component", "disableGutters", "disableSticky", "inset"]);

  var styleProps = _extends({}, props, {
    color: color,
    component: component,
    disableGutters: disableGutters,
    disableSticky: disableSticky,
    inset: inset
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(ListSubheaderRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? ListSubheader.propTypes
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
  color: PropTypes.oneOf(['default', 'inherit', 'primary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the List Subheader will not have gutters.
   * @default false
   */
  disableGutters: PropTypes.bool,

  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   * @default false
   */
  disableSticky: PropTypes.bool,

  /**
   * If `true`, the List Subheader is indented.
   * @default false
   */
  inset: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default ListSubheader;