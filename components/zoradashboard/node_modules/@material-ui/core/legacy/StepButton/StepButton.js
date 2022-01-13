import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import StepLabel from '../StepLabel';
import isMuiElement from '../utils/isMuiElement';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import stepButtonClasses, { getStepButtonUtilityClass } from './stepButtonClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      orientation = styleProps.orientation;
  var slots = {
    root: ['root', orientation],
    touchRipple: ['touchRipple']
  };
  return composeClasses(slots, getStepButtonUtilityClass, classes);
};

var StepButtonRoot = styled(ButtonBase, {
  name: 'MuiStepButton',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [_defineProperty({}, "& .".concat(stepButtonClasses.touchRipple), styles.touchRipple), styles.root, styles[styleProps.orientation]];
  }
})(function (_ref2) {
  var styleProps = _ref2.styleProps;
  return _extends({
    width: '100%',
    padding: '24px 16px',
    margin: '-24px -16px',
    boxSizing: 'content-box'
  }, styleProps.orientation === 'vertical' && {
    justifyContent: 'flex-start',
    padding: '8px',
    margin: '-8px'
  }, _defineProperty({}, "& .".concat(stepButtonClasses.touchRipple), {
    color: 'rgba(0, 0, 0, 0.3)'
  }));
});
var StepButton = /*#__PURE__*/React.forwardRef(function StepButton(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiStepButton'
  });

  var children = props.children,
      className = props.className,
      icon = props.icon,
      optional = props.optional,
      other = _objectWithoutProperties(props, ["children", "className", "icon", "optional"]);

  var _React$useContext = React.useContext(StepContext),
      disabled = _React$useContext.disabled;

  var _React$useContext2 = React.useContext(StepperContext),
      orientation = _React$useContext2.orientation;

  var styleProps = _extends({}, props, {
    orientation: orientation
  });

  var classes = useUtilityClasses(styleProps);
  var childProps = {
    icon: icon,
    optional: optional
  };
  var child = isMuiElement(children, ['StepLabel']) ? /*#__PURE__*/React.cloneElement(children, childProps) : /*#__PURE__*/_jsx(StepLabel, _extends({}, childProps, {
    children: children
  }));
  return /*#__PURE__*/_jsx(StepButtonRoot, _extends({
    focusRipple: true,
    disabled: disabled,
    TouchRippleProps: {
      className: classes.touchRipple
    },
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: child
  }));
});
process.env.NODE_ENV !== "production" ? StepButton.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
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
   * The icon displayed by the step label.
   */
  icon: PropTypes.node,

  /**
   * The optional node to display.
   */
  optional: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default StepButton;