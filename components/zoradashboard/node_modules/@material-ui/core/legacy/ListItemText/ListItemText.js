import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Typography from '../Typography';
import ListContext from '../List/ListContext';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import listItemTextClasses, { getListItemTextUtilityClass } from './listItemTextClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      inset = styleProps.inset,
      primary = styleProps.primary,
      secondary = styleProps.secondary,
      dense = styleProps.dense;
  var slots = {
    root: ['root', inset && 'inset', dense && 'dense', primary && secondary && 'multiline'],
    primary: ['primary'],
    secondary: ['secondary']
  };
  return composeClasses(slots, getListItemTextUtilityClass, classes);
};

var ListItemTextRoot = styled('div', {
  name: 'MuiListItemText',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [_defineProperty({}, "& .".concat(listItemTextClasses.primary), styles.primary), _defineProperty({}, "& .".concat(listItemTextClasses.secondary), styles.secondary), styles.root, styleProps.inset && styles.inset, styleProps.primary && styleProps.secondary && styles.multiline, styleProps.dense && styles.dense];
  }
})(function (_ref3) {
  var styleProps = _ref3.styleProps;
  return _extends({
    flex: '1 1 auto',
    minWidth: 0,
    marginTop: 4,
    marginBottom: 4
  }, styleProps.primary && styleProps.secondary && {
    marginTop: 6,
    marginBottom: 6
  }, styleProps.inset && {
    paddingLeft: 56
  });
});
var ListItemText = /*#__PURE__*/React.forwardRef(function ListItemText(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiListItemText'
  });

  var children = props.children,
      className = props.className,
      _props$disableTypogra = props.disableTypography,
      disableTypography = _props$disableTypogra === void 0 ? false : _props$disableTypogra,
      _props$inset = props.inset,
      inset = _props$inset === void 0 ? false : _props$inset,
      primaryProp = props.primary,
      primaryTypographyProps = props.primaryTypographyProps,
      secondaryProp = props.secondary,
      secondaryTypographyProps = props.secondaryTypographyProps,
      other = _objectWithoutProperties(props, ["children", "className", "disableTypography", "inset", "primary", "primaryTypographyProps", "secondary", "secondaryTypographyProps"]);

  var _React$useContext = React.useContext(ListContext),
      dense = _React$useContext.dense;

  var primary = primaryProp != null ? primaryProp : children;
  var secondary = secondaryProp;

  var styleProps = _extends({}, props, {
    disableTypography: disableTypography,
    inset: inset,
    primary: !!primary,
    secondary: !!secondary,
    dense: dense
  });

  var classes = useUtilityClasses(styleProps);

  if (primary != null && primary.type !== Typography && !disableTypography) {
    primary = /*#__PURE__*/_jsx(Typography, _extends({
      variant: dense ? 'body2' : 'body1',
      className: classes.primary,
      component: "span",
      display: "block"
    }, primaryTypographyProps, {
      children: primary
    }));
  }

  if (secondary != null && secondary.type !== Typography && !disableTypography) {
    secondary = /*#__PURE__*/_jsx(Typography, _extends({
      variant: "body2",
      className: classes.secondary,
      color: "text.secondary",
      display: "block"
    }, secondaryTypographyProps, {
      children: secondary
    }));
  }

  return /*#__PURE__*/_jsxs(ListItemTextRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: [primary, secondary]
  }));
});
process.env.NODE_ENV !== "production" ? ListItemText.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Alias for the `primary` prop.
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
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,

  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: PropTypes.bool,

  /**
   * The main content element.
   */
  primary: PropTypes.node,

  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps: PropTypes.object,

  /**
   * The secondary content element.
   */
  secondary: PropTypes.node,

  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default ListItemText;