import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";

var _KeyboardArrowLeft, _KeyboardArrowRight;

const _excluded = ["className", "direction", "orientation", "disabled"];

/* eslint-disable jsx-a11y/aria-role */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import ButtonBase from '../ButtonBase';
import useTheme from '../styles/useTheme';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import tabScrollButtonClasses, { getTabScrollButtonUtilityClass } from './tabScrollButtonClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = styleProps => {
  const {
    classes,
    orientation,
    disabled
  } = styleProps;
  const slots = {
    root: ['root', orientation, disabled && 'disabled']
  };
  return composeClasses(slots, getTabScrollButtonUtilityClass, classes);
};

const TabScrollButtonRoot = styled(ButtonBase, {
  name: 'MuiTabScrollButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styleProps.orientation && styles[styleProps.orientation]];
  }
})(({
  styleProps
}) => _extends({
  width: 40,
  flexShrink: 0,
  opacity: 0.8,
  [`&.${tabScrollButtonClasses.disabled}`]: {
    opacity: 0
  }
}, styleProps.orientation === 'vertical' && {
  width: '100%',
  height: 40,
  '& svg': {
    transform: `rotate(${styleProps.isRtl ? -90 : 90}deg)`
  }
}));
const TabScrollButton = /*#__PURE__*/React.forwardRef(function TabScrollButton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTabScrollButton'
  });

  const {
    className,
    direction
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const styleProps = _extends({
    isRtl
  }, props);

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(TabScrollButtonRoot, _extends({
    component: "div",
    className: clsx(classes.root, className),
    ref: ref,
    role: null,
    styleProps: styleProps,
    tabIndex: null
  }, other, {
    children: direction === 'left' ? _KeyboardArrowLeft || (_KeyboardArrowLeft = /*#__PURE__*/_jsx(KeyboardArrowLeft, {
      fontSize: "small"
    })) : _KeyboardArrowRight || (_KeyboardArrowRight = /*#__PURE__*/_jsx(KeyboardArrowRight, {
      fontSize: "small"
    }))
  }));
});
process.env.NODE_ENV !== "production" ? TabScrollButton.propTypes
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
   * The direction the button should indicate.
   */
  direction: PropTypes.oneOf(['left', 'right']).isRequired,

  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The component orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default TabScrollButton;