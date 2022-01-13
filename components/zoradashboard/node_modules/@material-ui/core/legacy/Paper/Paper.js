import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, integerPropType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '@material-ui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import { getPaperUtilityClass } from './paperClasses'; // Inspired by https://github.com/material-components/material-components-ios/blob/bca36107405594d5b7b16265a5b0ed698f85a5ee/components/Elevation/src/UIColor%2BMaterialElevation.m#L61

import { jsx as _jsx } from "react/jsx-runtime";

var getOverlayAlpha = function getOverlayAlpha(elevation) {
  var alphaValue;

  if (elevation < 1) {
    alphaValue = 5.11916 * Math.pow(elevation, 2);
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }

  return (alphaValue / 100).toFixed(2);
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var square = styleProps.square,
      elevation = styleProps.elevation,
      variant = styleProps.variant,
      classes = styleProps.classes;
  var slots = {
    root: ['root', variant, !square && 'rounded', variant === 'elevation' && "elevation".concat(elevation)]
  };
  return composeClasses(slots, getPaperUtilityClass, classes);
};

var PaperRoot = styled('div', {
  name: 'MuiPaper',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles[styleProps.variant], !styleProps.square && styles.rounded, styleProps.variant === 'elevation' && styles["elevation".concat(styleProps.elevation)]];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    transition: theme.transitions.create('box-shadow')
  }, !styleProps.square && {
    borderRadius: theme.shape.borderRadius
  }, styleProps.variant === 'outlined' && {
    border: "1px solid ".concat(theme.palette.divider)
  }, styleProps.variant === 'elevation' && _extends({
    boxShadow: theme.shadows[styleProps.elevation]
  }, theme.palette.mode === 'dark' && {
    backgroundImage: "linear-gradient(".concat(alpha('#fff', getOverlayAlpha(styleProps.elevation)), ", ").concat(alpha('#fff', getOverlayAlpha(styleProps.elevation)), ")")
  }));
});
var Paper = /*#__PURE__*/React.forwardRef(function Paper(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPaper'
  });

  var className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'div' : _props$component,
      _props$elevation = props.elevation,
      elevation = _props$elevation === void 0 ? 1 : _props$elevation,
      _props$square = props.square,
      square = _props$square === void 0 ? false : _props$square,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'elevation' : _props$variant,
      other = _objectWithoutProperties(props, ["className", "component", "elevation", "square", "variant"]);

  var styleProps = _extends({}, props, {
    component: component,
    elevation: elevation,
    square: square,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var theme = useTheme();

    if (theme.shadows[elevation] === undefined) {
      console.error(["Material-UI: The elevation provided <Paper elevation={".concat(elevation, "}> is not available in the theme."), "Please make sure that `theme.shadows[".concat(elevation, "]` is defined.")].join('\n'));
    }
  }

  return /*#__PURE__*/_jsx(PaperRoot, _extends({
    as: component,
    styleProps: styleProps,
    className: clsx(classes.root, className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Paper.propTypes
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: chainPropTypes(integerPropType, function (props) {
    var elevation = props.elevation,
        variant = props.variant;

    if (elevation > 0 && variant === 'outlined') {
      return new Error("Material-UI: Combining `elevation={".concat(elevation, "}` with `variant=\"").concat(variant, "\"` has no effect. Either use `elevation={0}` or use a different `variant`."));
    }

    return null;
  }),

  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['elevation', 'outlined']), PropTypes.string])
} : void 0;
export default Paper;