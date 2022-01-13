import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["className"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getListItemIconUtilityClass } from './listItemIconClasses';
import ListContext from '../List/ListContext';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = styleProps => {
  const {
    alignItems,
    classes
  } = styleProps;
  const slots = {
    root: ['root', alignItems === 'flex-start' && 'alignItemsFlexStart']
  };
  return composeClasses(slots, getListItemIconUtilityClass, classes);
};

const ListItemIconRoot = styled('div', {
  name: 'MuiListItemIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart];
  }
})(({
  theme,
  styleProps
}) => _extends({
  minWidth: 56,
  color: theme.palette.action.active,
  flexShrink: 0,
  display: 'inline-flex'
}, styleProps.alignItems === 'flex-start' && {
  marginTop: 8
}));
/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */

const ListItemIcon = /*#__PURE__*/React.forwardRef(function ListItemIcon(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListItemIcon'
  });

  const {
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const context = React.useContext(ListContext);

  const styleProps = _extends({}, props, {
    alignItems: context.alignItems
  });

  const classes = useUtilityClasses(styleProps);
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