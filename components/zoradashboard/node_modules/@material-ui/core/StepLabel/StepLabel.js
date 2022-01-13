import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["children", "className", "componentsProps", "error", "icon", "optional", "StepIconComponent", "StepIconProps"];
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

const useUtilityClasses = styleProps => {
  const {
    classes,
    orientation,
    active,
    completed,
    error,
    disabled,
    alternativeLabel
  } = styleProps;
  const slots = {
    root: ['root', orientation, error && 'error', disabled && 'disabled', alternativeLabel && 'alternativeLabel'],
    label: ['label', active && 'active', completed && 'completed', error && 'error', disabled && 'disabled', alternativeLabel && 'alternativeLabel'],
    iconContainer: ['iconContainer', alternativeLabel && 'alternativeLabel'],
    labelContainer: ['labelContainer']
  };
  return composeClasses(slots, getStepLabelUtilityClass, classes);
};

const StepLabelRoot = styled('span', {
  name: 'MuiStepLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[styleProps.orientation]];
  }
})(({
  styleProps
}) => _extends({
  display: 'flex',
  alignItems: 'center',
  [`&.${stepLabelClasses.alternativeLabel}`]: {
    flexDirection: 'column'
  },
  [`&.${stepLabelClasses.disabled}`]: {
    cursor: 'default'
  }
}, styleProps.orientation === 'vertical' && {
  textAlign: 'left',
  padding: '8px 0'
}));
const StepLabelLabel = styled('span', {
  name: 'MuiStepLabel',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label
})(({
  theme
}) => _extends({}, theme.typography.body2, {
  display: 'block',
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${stepLabelClasses.active}`]: {
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  [`&.${stepLabelClasses.completed}`]: {
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  [`&.${stepLabelClasses.alternativeLabel}`]: {
    textAlign: 'center',
    marginTop: 16
  },
  [`&.${stepLabelClasses.error}`]: {
    color: theme.palette.error.main
  }
}));
const StepLabelIconContainer = styled('span', {
  name: 'MuiStepLabel',
  slot: 'IconContainer',
  overridesResolver: (props, styles) => styles.iconContainer
})(() => ({
  flexShrink: 0,
  // Fix IE11 issue
  display: 'flex',
  paddingRight: 8,
  [`&.${stepLabelClasses.alternativeLabel}`]: {
    paddingRight: 0
  }
}));
const StepLabelLabelContainer = styled('span', {
  name: 'MuiStepLabel',
  slot: 'LabelContainer',
  overridesResolver: (props, styles) => styles.labelContainer
})(({
  theme
}) => ({
  width: '100%',
  color: theme.palette.text.secondary
}));
const StepLabel = /*#__PURE__*/React.forwardRef(function StepLabel(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiStepLabel'
  });

  const {
    children,
    className,
    componentsProps = {},
    error = false,
    icon: iconProp,
    optional,
    StepIconComponent: StepIconComponentProp,
    StepIconProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const {
    alternativeLabel,
    orientation
  } = React.useContext(StepperContext);
  const {
    active,
    disabled,
    completed,
    icon: iconContext
  } = React.useContext(StepContext);
  const icon = iconProp || iconContext;
  let StepIconComponent = StepIconComponentProp;

  if (icon && !StepIconComponent) {
    StepIconComponent = StepIcon;
  }

  const styleProps = _extends({}, props, {
    active,
    alternativeLabel,
    completed,
    disabled,
    error,
    orientation
  });

  const classes = useUtilityClasses(styleProps);
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