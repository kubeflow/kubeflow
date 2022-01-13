import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { integerPropType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import StepperContext from '../Stepper/StepperContext';
import StepContext from './StepContext';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getStepUtilityClass } from './stepClasses';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      orientation = styleProps.orientation,
      alternativeLabel = styleProps.alternativeLabel,
      completed = styleProps.completed;
  var slots = {
    root: ['root', orientation, alternativeLabel && 'alternativeLabel', completed && 'completed']
  };
  return composeClasses(slots, getStepUtilityClass, classes);
};

var StepRoot = styled('div', {
  name: 'MuiStep',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles[styleProps.orientation], styleProps.alternativeLabel && styles.alternativeLabel, styleProps.completed && styles.completed];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({}, styleProps.orientation === 'horizontal' && {
    paddingLeft: 8,
    paddingRight: 8
  }, styleProps.alternativeLabel && {
    flex: 1,
    position: 'relative'
  });
});
var Step = /*#__PURE__*/React.forwardRef(function Step(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiStep'
  });

  var activeProp = props.active,
      children = props.children,
      className = props.className,
      completedProp = props.completed,
      disabledProp = props.disabled,
      _props$expanded = props.expanded,
      expanded = _props$expanded === void 0 ? false : _props$expanded,
      index = props.index,
      last = props.last,
      other = _objectWithoutProperties(props, ["active", "children", "className", "completed", "disabled", "expanded", "index", "last"]);

  var _React$useContext = React.useContext(StepperContext),
      activeStep = _React$useContext.activeStep,
      connector = _React$useContext.connector,
      alternativeLabel = _React$useContext.alternativeLabel,
      orientation = _React$useContext.orientation,
      nonLinear = _React$useContext.nonLinear;

  var _activeProp = activeProp,
      active = _activeProp === void 0 ? false : _activeProp,
      _completedProp = completedProp,
      completed = _completedProp === void 0 ? false : _completedProp,
      _disabledProp = disabledProp,
      disabled = _disabledProp === void 0 ? false : _disabledProp;

  if (activeStep === index) {
    active = activeProp !== undefined ? activeProp : true;
  } else if (!nonLinear && activeStep > index) {
    completed = completedProp !== undefined ? completedProp : true;
  } else if (!nonLinear && activeStep < index) {
    disabled = disabledProp !== undefined ? disabledProp : true;
  }

  var contextValue = React.useMemo(function () {
    return {
      index: index,
      last: last,
      expanded: expanded,
      icon: index + 1,
      active: active,
      completed: completed,
      disabled: disabled
    };
  }, [index, last, expanded, active, completed, disabled]);

  var styleProps = _extends({}, props, {
    active: active,
    orientation: orientation,
    alternativeLabel: alternativeLabel,
    completed: completed,
    disabled: disabled,
    expanded: expanded
  });

  var classes = useUtilityClasses(styleProps);

  var newChildren = /*#__PURE__*/_jsxs(StepRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [connector && alternativeLabel && index !== 0 ? connector : null, children]
  }));

  return /*#__PURE__*/_jsx(StepContext.Provider, {
    value: contextValue,
    children: connector && !alternativeLabel && index !== 0 ? /*#__PURE__*/_jsxs(React.Fragment, {
      children: [connector, newChildren]
    }) : newChildren
  });
});
process.env.NODE_ENV !== "production" ? Step.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Sets the step as active. Is passed to child components.
   */
  active: PropTypes.bool,

  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
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
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,

  /**
   * If `true`, the step is disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: PropTypes.bool,

  /**
   * Expand the step.
   * @default false
   */
  expanded: PropTypes.bool,

  /**
   * The position of the step.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  index: integerPropType,

  /**
   * If `true`, the Step is displayed as rendered last.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  last: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Step;