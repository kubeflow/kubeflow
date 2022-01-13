import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import StepIcon from '../StepIcon';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import stepLabelClasses, { getStepLabelUtilityClass } from './stepLabelClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      orientation = styleProps.orientation,
      active = styleProps.active,
      completed = styleProps.completed,
      error = styleProps.error,
      disabled = styleProps.disabled,
      alternativeLabel = styleProps.alternativeLabel;
  var slots = {
    root: ['root', orientation, error && 'error', disabled && 'disabled', alternativeLabel && 'alternativeLabel'],
    label: ['label', active && 'active', completed && 'completed', error && 'error', disabled && 'disabled', alternativeLabel && 'alternativeLabel'],
    iconContainer: ['iconContainer', alternativeLabel && 'alternativeLabel'],
    labelContainer: ['labelContainer']
  };
  return composeClasses(slots, getStepLabelUtilityClass, classes);
};

var StepLabelRoot = styled('span', {
  name: 'MuiStepLabel',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles[styleProps.orientation]];
  }
})(function (_ref) {
  var _extends2;

  var styleProps = _ref.styleProps;
  return _extends((_extends2 = {
    display: 'flex',
    alignItems: 'center'
  }, _defineProperty(_extends2, "&.".concat(stepLabelClasses.alternativeLabel), {
    flexDirection: 'column'
  }), _defineProperty(_extends2, "&.".concat(stepLabelClasses.disabled), {
    cursor: 'default'
  }), _extends2), styleProps.orientation === 'vertical' && {
    textAlign: 'left',
    padding: '8px 0'
  });
});
var StepLabelLabel = styled('span', {
  name: 'MuiStepLabel',
  slot: 'Label',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.label;
  }
})(function (_ref2) {
  var _extends3;

  var theme = _ref2.theme;
  return _extends({}, theme.typography.body2, (_extends3 = {
    display: 'block',
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest
    })
  }, _defineProperty(_extends3, "&.".concat(stepLabelClasses.active), {
    color: theme.palette.text.primary,
    fontWeight: 500
  }), _defineProperty(_extends3, "&.".concat(stepLabelClasses.completed), {
    color: theme.palette.text.primary,
    fontWeight: 500
  }), _defineProperty(_extends3, "&.".concat(stepLabelClasses.alternativeLabel), {
    textAlign: 'center',
    marginTop: 16
  }), _defineProperty(_extends3, "&.".concat(stepLabelClasses.error), {
    color: theme.palette.error.main
  }), _extends3));
});
var StepLabelIconContainer = styled('span', {
  name: 'MuiStepLabel',
  slot: 'IconContainer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.iconContainer;
  }
})(function () {
  return _defineProperty({
    flexShrink: 0,
    // Fix IE11 issue
    display: 'flex',
    paddingRight: 8
  }, "&.".concat(stepLabelClasses.alternativeLabel), {
    paddingRight: 0
  });
});
var StepLabelLabelContainer = styled('span', {
  name: 'MuiStepLabel',
  slot: 'LabelContainer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.labelContainer;
  }
})(function (_ref4) {
  var theme = _ref4.theme;
  return {
    width: '100%',
    color: theme.palette.text.secondary
  };
});
var StepLabel = /*#__PURE__*/React.forwardRef(function StepLabel(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiStepLabel'
  });

  var children = props.children,
      className = props.className,
      _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      _props$error = props.error,
      error = _props$error === void 0 ? false : _props$error,
      iconProp = props.icon,
      optional = props.optional,
      StepIconComponentProp = props.StepIconComponent,
      StepIconProps = props.StepIconProps,
      other = _objectWithoutProperties(props, ["children", "className", "componentsProps", "error", "icon", "optional", "StepIconComponent", "StepIconProps"]);

  var _React$useContext = React.useContext(StepperContext),
      alternativeLabel = _React$useContext.alternativeLabel,
      orientation = _React$useContext.orientation;

  var _React$useContext2 = React.useContext(StepContext),
      active = _React$useContext2.active,
      disabled = _React$useContext2.disabled,
      completed = _React$useContext2.completed,
      iconContext = _React$useContext2.icon;

  var icon = iconProp || iconContext;
  var StepIconComponent = StepIconComponentProp;

  if (icon && !StepIconComponent) {
    StepIconComponent = StepIcon;
  }

  var styleProps = _extends({}, props, {
    active: active,
    alternativeLabel: alternativeLabel,
    completed: completed,
    disabled: disabled,
    error: error,
    orientation: orientation
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(StepLabelRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [icon || StepIconComponent ? /*#__PURE__*/_jsx(StepLabelIconContainer, {
      className: classes.iconContainer,
      styleProps: styleProps,
      children: /*#__PURE__*/_jsx(StepIconComponent, _extends({
        completed: completed,
        active: active,
        error: error,
        icon: icon
      }, StepIconProps))
    }) : null, /*#__PURE__*/_jsxs(StepLabelLabelContainer, {
      className: classes.labelContainer,
      styleProps: styleProps,
      children: [children ? /*#__PURE__*/_jsx(StepLabelLabel, _extends({
        className: classes.label,
        styleProps: styleProps
      }, componentsProps.label, {
        children: children
      })) : null, optional]
    })]
  }));
});
process.env.NODE_ENV !== "production" ? StepLabel.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * In most cases will simply be a string containing a title for the label.
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
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: PropTypes.bool,

  /**
   * Override the default label of the step icon.
   */
  icon: PropTypes.node,

  /**
   * The optional node to display.
   */
  optional: PropTypes.node,

  /**
   * The component to render in place of the [`StepIcon`](/api/step-icon/).
   */
  StepIconComponent: PropTypes.elementType,

  /**
   * Props applied to the [`StepIcon`](/api/step-icon/) element.
   */
  StepIconProps: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
StepLabel.muiName = 'StepLabel';
export default StepLabel;