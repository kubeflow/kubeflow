import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["className", "icon", "open", "openIcon"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import AddIcon from '../internal/svg-icons/Add';
import speedDialIconClasses, { getSpeedDialIconUtilityClass } from './speedDialIconClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const useUtilityClasses = styleProps => {
  const {
    classes,
    open,
    openIcon
  } = styleProps;
  const slots = {
    root: ['root'],
    icon: ['icon', open && 'iconOpen', openIcon && open && 'iconWithOpenIconOpen'],
    openIcon: ['openIcon', open && 'openIconOpen']
  };
  return composeClasses(slots, getSpeedDialIconUtilityClass, classes);
};

const SpeedDialIconRoot = styled('span', {
  name: 'MuiSpeedDialIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [{
      [`& .${speedDialIconClasses.icon}`]: styles.icon
    }, {
      [`& .${speedDialIconClasses.icon}`]: styleProps.open && styles.iconOpen
    }, {
      [`& .${speedDialIconClasses.icon}`]: styleProps.open && styleProps.openIcon && styles.iconWithOpenIconOpen
    }, {
      [`& .${speedDialIconClasses.openIcon}`]: styles.openIcon
    }, {
      [`& .${speedDialIconClasses.openIcon}`]: styleProps.open && styles.openIconOpen
    }, styles.root];
  }
})(({
  theme,
  styleProps
}) => ({
  height: 24,
  [`& .${speedDialIconClasses.icon}`]: _extends({
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    })
  }, styleProps.open && _extends({
    transform: 'rotate(45deg)'
  }, styleProps.openIcon && {
    opacity: 0
  })),
  [`& .${speedDialIconClasses.openIcon}`]: _extends({
    position: 'absolute',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0,
    transform: 'rotate(-45deg)'
  }, styleProps.open && {
    transform: 'rotate(0deg)',
    opacity: 1
  })
}));
const SpeedDialIcon = /*#__PURE__*/React.forwardRef(function SpeedDialIcon(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiSpeedDialIcon'
  });

  const {
    className,
    icon: iconProp,
    openIcon: openIconProp
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const styleProps = props;
  const classes = useUtilityClasses(styleProps);

  function formatIcon(icon, newClassName) {
    if ( /*#__PURE__*/React.isValidElement(icon)) {
      return /*#__PURE__*/React.cloneElement(icon, {
        className: newClassName
      });
    }

    return icon;
  }

  return /*#__PURE__*/_jsxs(SpeedDialIconRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [openIconProp ? formatIcon(openIconProp, classes.openIcon) : null, iconProp ? formatIcon(iconProp, classes.icon) : /*#__PURE__*/_jsx(AddIcon, {
      className: classes.icon
    })]
  }));
});
process.env.NODE_ENV !== "production" ? SpeedDialIcon.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The icon to display.
   */
  icon: PropTypes.node,

  /**
   * @ignore
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,

  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
SpeedDialIcon.muiName = 'SpeedDialIcon';
export default SpeedDialIcon;