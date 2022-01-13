import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["active", "children", "className", "completed", "disabled", "expanded", "index", "last"];
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

const useUtilityClasses = styleProps => {
  const {
    classes,
    orientation,
    alternativeLabel,
    completed
  } = styleProps;
  const slots = {
    root: ['root', orientation, alternativeLabel && 'alternativeLabel', completed && 'completed']
  };
  return composeClasses(slots, getStepUtilityClass, classes);
};

const StepRoot = styled('div', {
  name: 'MuiStep',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[styleProps.orientation], styleProps.alternativeLabel && styles.alternativeLabel, styleProps.completed && styles.completed];
  }
})(({
  styleProps
}) => _extends({}, styleProps.orientation === 'horizontal' && {
  paddingLeft: 8,
  paddingRight: 8
}, styleProps.alternativeLabel && {
  flex: 1,
  position: 'relative'
}));
const Step = /*#__PURE__*/React.forwardRef(function Step(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiStep'
  });

  const {
    active: activeProp,
    children,
    className,
    completed: completedProp,
    disabled: disabledProp,
    expanded = false,
    index,
    last
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const {
    activeStep,
    connector,
    alternativeLabel,
    orientation,
    nonLinear
  } = React.useContext(StepperContext);
  let [active = false, completed = false, disabled = false] = [activeProp, completedProp, disabledProp];

  if (activeStep === index) {
    active = activeProp !== undefined ? activeProp : true;
  } else if (!nonLinear && activeStep > index) {
    completed = completedProp !== undefined ? completedProp : true;
  } else if (!nonLinear && activeStep < index) {
    disabled = disabledProp !== undefined ? disabledProp : true;
  }

  const contextValue = React.useMemo(() => ({
    index,
    last,
    expanded,
    icon: index + 1,
    active,
    completed,
    disabled
  }), [index, last, expanded, active, completed, disabled]);

  const styleProps = _extends({}, props, {
    active,
    orientation,
    alternativeLabel,
    completed,
    disabled,
    expanded
  });

  const classes = useUtilityClasses(styleProps);

  const newChildren = /*#__PURE__*/_jsxs(StepRoot, _extends({
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