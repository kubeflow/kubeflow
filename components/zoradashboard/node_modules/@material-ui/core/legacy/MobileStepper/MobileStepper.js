import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { integerPropType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Paper from '../Paper';
import capitalize from '../utils/capitalize';
import LinearProgress from '../LinearProgress';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getMobileStepperUtilityClass } from './mobileStepperClasses';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      position = styleProps.position;
  var slots = {
    root: ['root', "position".concat(capitalize(position))],
    dots: ['dots'],
    dot: ['dot'],
    dotActive: ['dotActive'],
    progress: ['progress']
  };
  return composeClasses(slots, getMobileStepperUtilityClass, classes);
};

var MobileStepperRoot = styled(Paper, {
  name: 'MuiMobileStepper',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles["position".concat(capitalize(styleProps.position))]];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.default,
    padding: 8
  }, styleProps.position === 'bottom' && {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper
  }, styleProps.position === 'top' && {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper
  });
});
var MobileStepperDots = styled('div', {
  name: 'MuiMobileStepper',
  slot: 'Dots',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.dots;
  }
})(function (_ref2) {
  var styleProps = _ref2.styleProps;
  return _extends({}, styleProps.variant === 'dots' && {
    display: 'flex',
    flexDirection: 'row'
  });
});
var MobileStepperDot = styled('div', {
  name: 'MuiMobileStepper',
  slot: 'Dot',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.dot, styleProps.dotActive && styles.dotActive];
  }
})(function (_ref3) {
  var theme = _ref3.theme,
      styleProps = _ref3.styleProps;
  return _extends({}, styleProps.variant === 'dots' && _extends({
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest
    }),
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '50%',
    width: 8,
    height: 8,
    margin: '0 2px'
  }, styleProps.dotActive && {
    backgroundColor: theme.palette.primary.main
  }));
});
var MobileStepperProgress = styled(LinearProgress, {
  name: 'MuiMobileStepper',
  slot: 'Progress',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.progress;
  }
})(function (_ref4) {
  var styleProps = _ref4.styleProps;
  return _extends({}, styleProps.variant === 'progress' && {
    width: '50%'
  });
});
var MobileStepper = /*#__PURE__*/React.forwardRef(function MobileStepper(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiMobileStepper'
  });

  var _props$activeStep = props.activeStep,
      activeStep = _props$activeStep === void 0 ? 0 : _props$activeStep,
      backButton = props.backButton,
      className = props.className,
      LinearProgressProps = props.LinearProgressProps,
      nextButton = props.nextButton,
      _props$position = props.position,
      position = _props$position === void 0 ? 'bottom' : _props$position,
      steps = props.steps,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'dots' : _props$variant,
      other = _objectWithoutProperties(props, ["activeStep", "backButton", "className", "LinearProgressProps", "nextButton", "position", "steps", "variant"]);

  var styleProps = _extends({}, props, {
    activeStep: activeStep,
    position: position,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(MobileStepperRoot, _extends({
    square: true,
    elevation: 0,
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [backButton, variant === 'text' && /*#__PURE__*/_jsxs(React.Fragment, {
      children: [activeStep + 1, " / ", steps]
    }), variant === 'dots' && /*#__PURE__*/_jsx(MobileStepperDots, {
      styleProps: styleProps,
      className: classes.dots,
      children: _toConsumableArray(new Array(steps)).map(function (_, index) {
        return /*#__PURE__*/_jsx(MobileStepperDot, {
          className: clsx(classes.dot, index === activeStep && classes.dotActive),
          styleProps: _extends({}, styleProps, {
            dotActive: index === activeStep
          })
        }, index);
      })
    }), variant === 'progress' && /*#__PURE__*/_jsx(MobileStepperProgress, _extends({
      styleProps: styleProps,
      className: classes.progress,
      variant: "determinate",
      value: Math.ceil(activeStep / (steps - 1) * 100)
    }, LinearProgressProps)), nextButton]
  }));
});
process.env.NODE_ENV !== "production" ? MobileStepper.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   * @default 0
   */
  activeStep: integerPropType,

  /**
   * A back button element. For instance, it can be a `Button` or an `IconButton`.
   */
  backButton: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Props applied to the `LinearProgress` element.
   */
  LinearProgressProps: PropTypes.object,

  /**
   * A next button element. For instance, it can be a `Button` or an `IconButton`.
   */
  nextButton: PropTypes.node,

  /**
   * Set the positioning type.
   * @default 'bottom'
   */
  position: PropTypes.oneOf(['bottom', 'static', 'top']),

  /**
   * The total steps.
   */
  steps: integerPropType.isRequired,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   * @default 'dots'
   */
  variant: PropTypes.oneOf(['dots', 'progress', 'text'])
} : void 0;
export default MobileStepper;