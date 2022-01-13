import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { keyframes, css, darken, lighten } from '@material-ui/system';
import capitalize from '../utils/capitalize';
import useTheme from '../styles/useTheme';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getLinearProgressUtilityClass } from './linearProgressClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var TRANSITION_DURATION = 4; // seconds

var indeterminate1Keyframe = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  0% {\n    left: -35%;\n    right: 100%;\n  }\n\n  60% {\n    left: 100%;\n    right: -90%;\n  }\n\n  100% {\n    left: 100%;\n    right: -90%;\n  }\n"])));
var indeterminate2Keyframe = keyframes(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  0% {\n    left: -200%;\n    right: 100%;\n  }\n\n  60% {\n    left: 107%;\n    right: -8%;\n  }\n\n  100% {\n    left: 107%;\n    right: -8%;\n  }\n"])));
var bufferKeyframe = keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  0% {\n    opacity: 1;\n    background-position: 0 -23px;\n  }\n\n  60% {\n    opacity: 0;\n    background-position: 0 -23px;\n  }\n\n  100% {\n    opacity: 1;\n    background-position: -200px -23px;\n  }\n"])));

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      variant = styleProps.variant,
      color = styleProps.color;
  var slots = {
    root: ['root', "color".concat(capitalize(color)), variant],
    dashed: ['dashed', "dashedColor".concat(capitalize(color))],
    bar1: ['bar', "barColor".concat(capitalize(color)), (variant === 'indeterminate' || variant === 'query') && 'bar1Indeterminate', variant === 'determinate' && 'bar1Determinate', variant === 'buffer' && 'bar1Buffer'],
    bar2: ['bar', variant !== 'buffer' && "barColor".concat(capitalize(color)), variant === 'buffer' && "color".concat(capitalize(color)), (variant === 'indeterminate' || variant === 'query') && 'bar2Indeterminate', variant === 'buffer' && 'bar2Buffer']
  };
  return composeClasses(slots, getLinearProgressUtilityClass, classes);
};

var getColorShade = function getColorShade(theme, color) {
  if (color === 'inherit') {
    return 'currentColor';
  }

  return theme.palette.mode === 'light' ? lighten(theme.palette[color].main, 0.62) : darken(theme.palette[color].main, 0.5);
};

var LinearProgressRoot = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles["color".concat(capitalize(styleProps.color))], styles[styleProps.variant]];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps,
      theme = _ref.theme;
  return _extends({
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    height: 4,
    zIndex: 0,
    // Fix Safari's bug during composition of different paint.
    '@media print': {
      colorAdjust: 'exact'
    },
    backgroundColor: getColorShade(theme, styleProps.color)
  }, styleProps.color === 'inherit' && styleProps.variant !== 'buffer' && {
    backgroundColor: 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'currentColor',
      opacity: 0.3
    }
  }, styleProps.variant === 'buffer' && {
    backgroundColor: 'transparent'
  }, styleProps.variant === 'query' && {
    transform: 'rotate(180deg)'
  });
});
var LinearProgressDashed = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Dashed',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.dashed, styles["dashedColor".concat(capitalize(styleProps.color))]];
  }
})(function (_ref2) {
  var styleProps = _ref2.styleProps,
      theme = _ref2.theme;
  var backgroundColor = getColorShade(theme, styleProps.color);
  return _extends({
    position: 'absolute',
    marginTop: 0,
    height: '100%',
    width: '100%'
  }, styleProps.color === 'inherit' && {
    opacity: 0.3
  }, {
    backgroundImage: "radial-gradient(".concat(backgroundColor, " 0%, ").concat(backgroundColor, " 16%, transparent 42%)"),
    backgroundSize: '10px 10px',
    backgroundPosition: '0 -23px'
  });
}, css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    animation: ", " 3s infinite linear;\n  "])), bufferKeyframe));
var LinearProgressBar1 = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar1',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.bar, styles["barColor".concat(capitalize(styleProps.color))], (styleProps.variant === 'indeterminate' || styleProps.variant === 'query') && styles.bar1Indeterminate, styleProps.variant === 'determinate' && styles.bar1Determinate, styleProps.variant === 'buffer' && styles.bar1Buffer];
  }
})(function (_ref3) {
  var styleProps = _ref3.styleProps,
      theme = _ref3.theme;
  return _extends({
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    transition: 'transform 0.2s linear',
    transformOrigin: 'left',
    backgroundColor: styleProps.color === 'inherit' ? 'currentColor' : theme.palette[styleProps.color].main
  }, styleProps.variant === 'determinate' && {
    transition: "transform .".concat(TRANSITION_DURATION, "s linear")
  }, styleProps.variant === 'buffer' && {
    zIndex: 1,
    transition: "transform .".concat(TRANSITION_DURATION, "s linear")
  });
}, function (_ref4) {
  var styleProps = _ref4.styleProps;
  return (styleProps.variant === 'indeterminate' || styleProps.variant === 'query') && css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n      width: auto;\n      animation: ", " 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n    "])), indeterminate1Keyframe);
});
var LinearProgressBar2 = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar2',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.bar, styles["barColor".concat(capitalize(styleProps.color))], (styleProps.variant === 'indeterminate' || styleProps.variant === 'query') && styles.bar2Indeterminate, styleProps.variant === 'buffer' && styles.bar2Buffer];
  }
})(function (_ref5) {
  var styleProps = _ref5.styleProps,
      theme = _ref5.theme;
  return _extends({
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    transition: 'transform 0.2s linear',
    transformOrigin: 'left'
  }, styleProps.variant !== 'buffer' && {
    backgroundColor: styleProps.color === 'inherit' ? 'currentColor' : theme.palette[styleProps.color].main
  }, styleProps.color === 'inherit' && {
    opacity: 0.3
  }, styleProps.variant === 'buffer' && {
    backgroundColor: getColorShade(theme, styleProps.color),
    transition: "transform .".concat(TRANSITION_DURATION, "s linear")
  });
}, function (_ref6) {
  var styleProps = _ref6.styleProps;
  return (styleProps.variant === 'indeterminate' || styleProps.variant === 'query') && css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n      width: auto;\n      animation: ", " 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;\n    "])), indeterminate2Keyframe);
});
/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */

var LinearProgress = /*#__PURE__*/React.forwardRef(function LinearProgress(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiLinearProgress'
  });

  var className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      value = props.value,
      valueBuffer = props.valueBuffer,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'indeterminate' : _props$variant,
      other = _objectWithoutProperties(props, ["className", "color", "value", "valueBuffer", "variant"]);

  var styleProps = _extends({}, props, {
    color: color,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  var theme = useTheme();
  var rootProps = {};
  var inlineStyles = {
    bar1: {},
    bar2: {}
  };

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      rootProps['aria-valuenow'] = Math.round(value);
      rootProps['aria-valuemin'] = 0;
      rootProps['aria-valuemax'] = 100;
      var transform = value - 100;

      if (theme.direction === 'rtl') {
        transform = -transform;
      }

      inlineStyles.bar1.transform = "translateX(".concat(transform, "%)");
    } else if (process.env.NODE_ENV !== 'production') {
      console.error('Material-UI: You need to provide a value prop ' + 'when using the determinate or buffer variant of LinearProgress .');
    }
  }

  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      var _transform = (valueBuffer || 0) - 100;

      if (theme.direction === 'rtl') {
        _transform = -_transform;
      }

      inlineStyles.bar2.transform = "translateX(".concat(_transform, "%)");
    } else if (process.env.NODE_ENV !== 'production') {
      console.error('Material-UI: You need to provide a valueBuffer prop ' + 'when using the buffer variant of LinearProgress.');
    }
  }

  return /*#__PURE__*/_jsxs(LinearProgressRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    role: "progressbar"
  }, rootProps, {
    ref: ref
  }, other, {
    children: [variant === 'buffer' ? /*#__PURE__*/_jsx(LinearProgressDashed, {
      className: classes.dashed,
      styleProps: styleProps
    }) : null, /*#__PURE__*/_jsx(LinearProgressBar1, {
      className: classes.bar1,
      styleProps: styleProps,
      style: inlineStyles.bar1
    }), variant === 'determinate' ? null : /*#__PURE__*/_jsx(LinearProgressBar2, {
      className: classes.bar2,
      styleProps: styleProps,
      style: inlineStyles.bar2
    })]
  }));
});
process.env.NODE_ENV !== "production" ? LinearProgress.propTypes
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
  .oneOfType([PropTypes.oneOf(['inherit', 'primary', 'secondary']), PropTypes.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number,

  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer: PropTypes.number,

  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(['buffer', 'determinate', 'indeterminate', 'query'])
} : void 0;
export default LinearProgress;