import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";

var _KeyboardArrowLeft, _KeyboardArrowRight;

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

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      orientation = styleProps.orientation,
      disabled = styleProps.disabled;
  var slots = {
    root: ['root', orientation, disabled && 'disabled']
  };
  return composeClasses(slots, getTabScrollButtonUtilityClass, classes);
};

var TabScrollButtonRoot = styled(ButtonBase, {
  name: 'MuiTabScrollButton',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.orientation && styles[styleProps.orientation]];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends(_defineProperty({
    width: 40,
    flexShrink: 0,
    opacity: 0.8
  }, "&.".concat(tabScrollButtonClasses.disabled), {
    opacity: 0
  }), styleProps.orientation === 'vertical' && {
    width: '100%',
    height: 40,
    '& svg': {
      transform: "rotate(".concat(styleProps.isRtl ? -90 : 90, "deg)")
    }
  });
});
var TabScrollButton = /*#__PURE__*/React.forwardRef(function TabScrollButton(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTabScrollButton'
  });

  var className = props.className,
      direction = props.direction,
      orientation = props.orientation,
      disabled = props.disabled,
      other = _objectWithoutProperties(props, ["className", "direction", "orientation", "disabled"]);

  var theme = useTheme();
  var isRtl = theme.direction === 'rtl';

  var styleProps = _extends({
    isRtl: isRtl
  }, props);

  var classes = useUtilityClasses(styleProps);
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