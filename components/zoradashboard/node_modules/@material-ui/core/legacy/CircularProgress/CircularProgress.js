import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { keyframes, css } from '@material-ui/system';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getCircularProgressUtilityClass } from './circularProgressClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var SIZE = 44;
var circularRotateKeyframe = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])));
var circularDashKeyframe = keyframes(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])));

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      variant = styleProps.variant,
      color = styleProps.color,
      disableShrink = styleProps.disableShrink;
  var slots = {
    root: ['root', variant, "color".concat(capitalize(color))],
    svg: ['svg'],
    circle: ['circle', "circle".concat(capitalize(variant)), disableShrink && 'circleDisableShrink']
  };
  return composeClasses(slots, getCircularProgressUtilityClass, classes);
};

var CircularProgressRoot = styled('span', {
  name: 'MuiCircularProgress',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles[styleProps.variant], styles["color".concat(capitalize(styleProps.color))]];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps,
      theme = _ref.theme;
  return _extends({
    display: 'inline-block'
  }, styleProps.variant === 'determinate' && {
    transition: theme.transitions.create('transform')
  }, styleProps.color !== 'inherit' && {
    color: theme.palette[styleProps.color].main
  });
}, function (_ref2) {
  var styleProps = _ref2.styleProps;
  return styleProps.variant === 'indeterminate' && css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n      animation: ", " 1.4s linear infinite;\n    "])), circularRotateKeyframe);
});
var CircularProgressSVG = styled('svg', {
  name: 'MuiCircularProgress',
  slot: 'Svg',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.svg;
  }
})({
  display: 'block' // Keeps the progress centered

});
var CircularProgressCircle = styled('circle', {
  name: 'MuiCircularProgress',
  slot: 'Circle',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.circle, styles["circle".concat(capitalize(styleProps.variant))], styleProps.disableShrink && styles.circleDisableShrink];
  }
})(function (_ref3) {
  var styleProps = _ref3.styleProps,
      theme = _ref3.theme;
  return _extends({
    stroke: 'currentColor'
  }, styleProps.variant === 'determinate' && {
    transition: theme.transitions.create('stroke-dashoffset')
  }, styleProps.variant === 'indeterminate' && {
    // Some default value that looks fine waiting for the animation to kicks in.
    strokeDasharray: '80px, 200px',
    strokeDashoffset: 0 // Add the unit to fix a Edge 16 and below bug.

  });
}, function (_ref4) {
  var styleProps = _ref4.styleProps;
  return styleProps.variant === 'indeterminate' && !styleProps.disableShrink && css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n      animation: ", " 1.4s ease-in-out infinite;\n    "])), circularDashKeyframe);
});
/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */

var CircularProgress = /*#__PURE__*/React.forwardRef(function CircularProgress(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiCircularProgress'
  });

  var className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      _props$disableShrink = props.disableShrink,
      disableShrink = _props$disableShrink === void 0 ? false : _props$disableShrink,
      _props$size = props.size,
      size = _props$size === void 0 ? 40 : _props$size,
      style = props.style,
      _props$thickness = props.thickness,
      thickness = _props$thickness === void 0 ? 3.6 : _props$thickness,
      _props$value = props.value,
      value = _props$value === void 0 ? 0 : _props$value,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'indeterminate' : _props$variant,
      other = _objectWithoutProperties(props, ["className", "color", "disableShrink", "size", "style", "thickness", "value", "variant"]);

  var styleProps = _extends({}, props, {
    color: color,
    disableShrink: disableShrink,
    size: size,
    thickness: thickness,
    value: value,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  var circleStyle = {};
  var rootStyle = {};
  var rootProps = {};

  if (variant === 'determinate') {
    var circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(value);
    circleStyle.strokeDashoffset = "".concat(((100 - value) / 100 * circumference).toFixed(3), "px");
    rootStyle.transform = 'rotate(-90deg)';
  }

  return /*#__PURE__*/_jsx(CircularProgressRoot, _extends({
    className: clsx(classes.root, className),
    style: _extends({
      width: size,
      height: size
    }, rootStyle, style),
    styleProps: styleProps,
    ref: ref,
    role: "progressbar"
  }, rootProps, other, {
    children: /*#__PURE__*/_jsx(CircularProgressSVG, {
      className: classes.svg,
      styleProps: styleProps,
      viewBox: "".concat(SIZE / 2, " ").concat(SIZE / 2, " ").concat(SIZE, " ").concat(SIZE),
      children: /*#__PURE__*/_jsx(CircularProgressCircle, {
        className: classes.circle,
        style: circleStyle,
        styleProps: styleProps,
        cx: SIZE,
        cy: SIZE,
        r: (SIZE - thickness) / 2,
        fill: "none",
        strokeWidth: thickness
      })
    })
  }));
});
process.env.NODE_ENV !== "production" ? CircularProgress.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),

  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: chainPropTypes(PropTypes.bool, function (props) {
    if (props.disableShrink && props.variant && props.variant !== 'indeterminate') {
      return new Error('Material-UI: You have provided the `disableShrink` prop ' + 'with a variant other than `indeterminate`. This will have no effect.');
    }

    return null;
  }),

  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, e.g '3rem'.
   * @default 40
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The thickness of the circle.
   * @default 3.6
   */
  thickness: PropTypes.number,

  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number,

  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(['determinate', 'indeterminate'])
} : void 0;
export default CircularProgress;