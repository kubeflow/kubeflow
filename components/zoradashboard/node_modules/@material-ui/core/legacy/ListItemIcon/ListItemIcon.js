import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getListItemIconUtilityClass } from './listItemIconClasses';
import ListContext from '../List/ListContext';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var alignItems = styleProps.alignItems,
      classes = styleProps.classes;
  var slots = {
    root: ['root', alignItems === 'flex-start' && 'alignItemsFlexStart']
  };
  return composeClasses(slots, getListItemIconUtilityClass, classes);
};

var ListItemIconRoot = styled('div', {
  name: 'MuiListItemIcon',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    minWidth: 56,
    color: theme.palette.action.active,
    flexShrink: 0,
    display: 'inline-flex'
  }, styleProps.alignItems === 'flex-start' && {
    marginTop: 8
  });
});
/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */

var ListItemIcon = /*#__PURE__*/React.forwardRef(function ListItemIcon(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiListItemIcon'
  });

  var className = props.className,
      other = _objectWithoutProperties(props, ["className"]);

  var context = React.useContext(ListContext);

  var styleProps = _extends({}, props, {
    alignItems: context.alignItems
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(ListItemIconRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ListItemIcon.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@material-ui/icons` SVG icon element.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default ListItemIcon;