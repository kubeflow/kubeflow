import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["className"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ListContext from '../List/ListContext';
import { getListItemSecondaryActionClassesUtilityClass } from './listItemSecondaryActionClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = styleProps => {
  const {
    disableGutters,
    classes
  } = styleProps;
  const slots = {
    root: ['root', disableGutters && 'disableGutters']
  };
  return composeClasses(slots, getListItemSecondaryActionClassesUtilityClass, classes);
};

const ListItemSecondaryActionRoot = styled('div', {
  name: 'MuiListItemSecondaryAction',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styleProps.disableGutters && styles.disableGutters];
  }
})(({
  styleProps
}) => _extends({
  position: 'absolute',
  right: 16,
  top: '50%',
  transform: 'translateY(-50%)'
}, styleProps.disableGutters && {
  right: 0
}));
/**
 * Must be used as the last child of ListItem to function properly.
 */

const ListItemSecondaryAction = /*#__PURE__*/React.forwardRef(function ListItemSecondaryAction(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListItemSecondaryAction'
  });

  const {
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const context = React.useContext(ListContext);

  const styleProps = _extends({}, props, {
    disableGutters: context.disableGutters
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(ListItemSecondaryActionRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ListItemSecondaryAction.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally an `IconButton` or selection control.
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
ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';
export default ListItemSecondaryAction;