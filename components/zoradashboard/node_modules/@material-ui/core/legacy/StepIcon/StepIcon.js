import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _circle;

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import Warning from '../internal/svg-icons/Warning';
import SvgIcon from '../SvgIcon';
import stepIconClasses, { getStepIconUtilityClass } from './stepIconClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      active = styleProps.active,
      completed = styleProps.completed,
      error = styleProps.error;
  var slots = {
    root: ['root', active && 'active', completed && 'completed', error && 'error'],
    text: ['text']
  };
  return composeClasses(slots, getStepIconUtilityClass, classes);
};

var StepIconRoot = styled(SvgIcon, {
  name: 'MuiStepIcon',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function (_ref) {
  var _ref2;

  var theme = _ref.theme;
  return _ref2 = {
    display: 'block',
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest
    }),
    color: theme.palette.text.disabled
  }, _defineProperty(_ref2, "&.".concat(stepIconClasses.completed), {
    color: theme.palette.primary.main
  }), _defineProperty(_ref2, "&.".concat(stepIconClasses.active), {
    color: theme.palette.primary.main
  }), _defineProperty(_ref2, "&.".concat(stepIconClasses.error), {
    color: theme.palette.error.main
  }), _ref2;
});
var StepIconText = styled('text', {
  name: 'MuiStepIcon',
  slot: 'Text',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.text;
  }
})(function (_ref3) {
  var theme = _ref3.theme;
  return {
    fill: theme.palette.primary.contrastText,
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily
  };
});
var StepIcon = /*#__PURE__*/React.forwardRef(function StepIcon(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiStepIcon'
  });

  var _props$active = props.active,
      active = _props$active === void 0 ? false : _props$active,
      classNameProp = props.className,
      _props$completed = props.completed,
      completed = _props$completed === void 0 ? false : _props$completed,
      _props$error = props.error,
      error = _props$error === void 0 ? false : _props$error,
      icon = props.icon,
      other = _objectWithoutProperties(props, ["active", "className", "completed", "error", "icon"]);

  var styleProps = _extends({}, props, {
    active: active,
    completed: completed,
    error: error
  });

  var classes = useUtilityClasses(styleProps);

  if (typeof icon === 'number' || typeof icon === 'string') {
    var className = clsx(classNameProp, classes.root);

    if (error) {
      return /*#__PURE__*/_jsx(StepIconRoot, _extends({
        as: Warning,
        className: className,
        ref: ref,
        styleProps: styleProps
      }, other));
    }

    if (completed) {
      return /*#__PURE__*/_jsx(StepIconRoot, _extends({
        as: CheckCircle,
        className: className,
        ref: ref,
        styleProps: styleProps
      }, other));
    }

    return /*#__PURE__*/_jsxs(StepIconRoot, _extends({
      className: className,
      ref: ref,
      styleProps: styleProps
    }, other, {
      children: [_circle || (_circle = /*#__PURE__*/_jsx("circle", {
        cx: "12",
        cy: "12",
        r: "12"
      })), /*#__PURE__*/_jsx(StepIconText, {
        className: classes.text,
        x: "12",
        y: "16",
        textAnchor: "middle",
        styleProps: styleProps,
        children: icon
      })]
    }));
  }

  return icon;
});
process.env.NODE_ENV !== "production" ? StepIcon.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,

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
   * @default false
   */
  completed: PropTypes.bool,

  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: PropTypes.bool,

  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default StepIcon;