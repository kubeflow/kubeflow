import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { integerPropType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getStepperUtilityClass } from './stepperClasses';
import StepConnector from '../StepConnector';
import StepperContext from './StepperContext';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var orientation = styleProps.orientation,
      alternativeLabel = styleProps.alternativeLabel,
      classes = styleProps.classes;
  var slots = {
    root: ['root', orientation, alternativeLabel && 'alternativeLabel']
  };
  return composeClasses(slots, getStepperUtilityClass, classes);
};

var StepperRoot = styled('div', {
  name: 'MuiStepper',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles[styleProps.orientation], styleProps.alternativeLabel && styles.alternativeLabel];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
    display: 'flex'
  }, styleProps.orientation === 'horizontal' && {
    flexDirection: 'row',
    alignItems: 'center'
  }, styleProps.orientation === 'vertical' && {
    flexDirection: 'column'
  }, styleProps.alternativeLabel && {
    alignItems: 'flex-start'
  });
});

var defaultConnector = /*#__PURE__*/_jsx(StepConnector, {});

var Stepper = /*#__PURE__*/React.forwardRef(function Stepper(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiStepper'
  });

  var _props$activeStep = props.activeStep,
      activeStep = _props$activeStep === void 0 ? 0 : _props$activeStep,
      _props$alternativeLab = props.alternativeLabel,
      alternativeLabel = _props$alternativeLab === void 0 ? false : _props$alternativeLab,
      children = props.children,
      className = props.className,
      _props$connector = props.connector,
      connector = _props$connector === void 0 ? defaultConnector : _props$connector,
      _props$nonLinear = props.nonLinear,
      nonLinear = _props$nonLinear === void 0 ? false : _props$nonLinear,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      other = _objectWithoutProperties(props, ["activeStep", "alternativeLabel", "children", "className", "connector", "nonLinear", "orientation"]);

  var styleProps = _extends({}, props, {
    alternativeLabel: alternativeLabel,
    orientation: orientation
  });

  var classes = useUtilityClasses(styleProps);
  var childrenArray = React.Children.toArray(children).filter(Boolean);
  var steps = childrenArray.map(function (step, index) {
    return /*#__PURE__*/React.cloneElement(step, _extends({
      index: index,
      last: index + 1 === childrenArray.length
    }, step.props));
  });
  var contextValue = React.useMemo(function () {
    return {
      activeStep: activeStep,
      alternativeLabel: alternativeLabel,
      connector: connector,
      nonLinear: nonLinear,
      orientation: orientation
    };
  }, [activeStep, alternativeLabel, connector, nonLinear, orientation]);
  return /*#__PURE__*/_jsx(StepperContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(StepperRoot, _extends({
      styleProps: styleProps,
      className: clsx(classes.root, className),
      ref: ref
    }, other, {
      children: steps
    }))
  });
});
process.env.NODE_ENV !== "production" ? Stepper.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   * @default 0
   */
  activeStep: integerPropType,

  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   * @default false
   */
  alternativeLabel: PropTypes.bool,

  /**
   * Two or more `<Step />` components.
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
   * An element to be placed between each step.
   * @default <StepConnector />
   */
  connector: PropTypes.element,

  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   * @default false
   */
  nonLinear: PropTypes.bool,

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Stepper;