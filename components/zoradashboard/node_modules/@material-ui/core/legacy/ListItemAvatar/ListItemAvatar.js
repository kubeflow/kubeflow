import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import ListContext from '../List/ListContext';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getListItemAvatarUtilityClass } from './listItemAvatarClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var alignItems = styleProps.alignItems,
      classes = styleProps.classes;
  var slots = {
    root: ['root', alignItems === 'flex-start' && 'alignItemsFlexStart']
  };
  return composeClasses(slots, getListItemAvatarUtilityClass, classes);
};

var ListItemAvatarRoot = styled('div', {
  name: 'MuiListItemAvatar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
    minWidth: 56,
    flexShrink: 0
  }, styleProps.alignItems === 'flex-start' && {
    marginTop: 8
  });
});
/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 */

var ListItemAvatar = /*#__PURE__*/React.forwardRef(function ListItemAvatar(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiListItemAvatar'
  });

  var className = props.className,
      other = _objectWithoutProperties(props, ["className"]);

  var context = React.useContext(ListContext);

  var styleProps = _extends({}, props, {
    alignItems: context.alignItems
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(ListItemAvatarRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ListItemAvatar.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally an `Avatar`.
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
export default ListItemAvatar;