import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Collapse from '../Collapse';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import { getStepContentUtilityClass } from './stepContentClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      last = styleProps.last;
  var slots = {
    root: ['root', last && 'last'],
    transition: ['transition']
  };
  return composeClasses(slots, getStepContentUtilityClass, classes);
};

var StepContentRoot = styled('div', {
  name: 'MuiStepContent',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.last && styles.last];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps,
      theme = _ref.theme;
  return _extends({
    marginLeft: 12,
    // half icon
    paddingLeft: 8 + 12,
    // margin + half icon
    paddingRight: 8,
    borderLeft: "1px solid ".concat(theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600])
  }, styleProps.last && {
    borderLeft: 'none'
  });
});
var StepContentTransition = styled(Collapse, {
  name: 'MuiStepContent',
  slot: 'Transition',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.transition;
  }
})({});
var StepContent = /*#__PURE__*/React.forwardRef(function StepContent(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiStepContent'
  });

  var children = props.children,
      className = props.className,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Collapse : _props$TransitionComp,
      _props$transitionDura = props.transitionDuration,
      transitionDurationProp = _props$transitionDura === void 0 ? 'auto' : _props$transitionDura,
      TransitionProps = props.TransitionProps,
      other = _objectWithoutProperties(props, ["children", "className", "TransitionComponent", "transitionDuration", "TransitionProps"]);

  var _React$useContext = React.useContext(StepperContext),
      orientation = _React$useContext.orientation;

  var _React$useContext2 = React.useContext(StepContext),
      active = _React$useContext2.active,
      last = _React$useContext2.last,
      expanded = _React$useContext2.expanded;

  var styleProps = _extends({}, props, {
    last: last
  });

  var classes = useUtilityClasses(styleProps);

  if (process.env.NODE_ENV !== 'production') {
    if (orientation !== 'vertical') {
      console.error('Material-UI: <StepContent /> is only designed for use with the vertical stepper.');
    }
  }

  var transitionDuration = transitionDurationProp;

  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  }

  return /*#__PURE__*/_jsx(StepContentRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/_jsx(StepContentTransition, _extends({
      as: TransitionComponent,
      in: active || expanded,
      className: classes.transition,
      styleProps: styleProps,
      timeout: transitionDuration,
      unmountOnExit: true
    }, TransitionProps, {
      children: children
    }))
  }));
});
process.env.NODE_ENV !== "production" ? StepContent.propTypes
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })]),

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: PropTypes.object
} : void 0;
export default StepContent;