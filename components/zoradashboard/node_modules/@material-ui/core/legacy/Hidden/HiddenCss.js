import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import capitalize from '../utils/capitalize';
import styled from '../styles/styled';
import useTheme from '../styles/useTheme';
import { getHiddenCssUtilityClass } from './hiddenCssClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      breakpoints = styleProps.breakpoints;
  var slots = {
    root: ['root'].concat(_toConsumableArray(breakpoints.map(function (_ref) {
      var breakpoint = _ref.breakpoint,
          dir = _ref.dir;
      return dir === 'only' ? "".concat(dir).concat(capitalize(breakpoint)) : "".concat(breakpoint).concat(capitalize(dir));
    })))
  };
  return composeClasses(slots, getHiddenCssUtilityClass, classes);
};

var HiddenCssRoot = styled('div', {
  name: 'PrivateHiddenCss',
  slot: 'Root'
})(function (_ref2) {
  var theme = _ref2.theme,
      styleProps = _ref2.styleProps;
  var hidden = {
    display: 'none'
  };
  return _extends({}, styleProps.breakpoints.map(function (_ref3) {
    var breakpoint = _ref3.breakpoint,
        dir = _ref3.dir;

    if (dir === 'only') {
      return _defineProperty({}, theme.breakpoints.only(breakpoint), hidden);
    }

    return dir === 'up' ? _defineProperty({}, theme.breakpoints.up(breakpoint), hidden) : _defineProperty({}, theme.breakpoints.down(breakpoint), hidden);
  }).reduce(function (r, o) {
    Object.keys(o).forEach(function (k) {
      r[k] = o[k];
    });
    return r;
  }, {}));
});
/**
 * @ignore - internal component.
 */

function HiddenCss(props) {
  var children = props.children,
      className = props.className,
      only = props.only,
      other = _objectWithoutProperties(props, ["children", "className", "only"]);

  var theme = useTheme();

  if (process.env.NODE_ENV !== 'production') {
    var unknownProps = Object.keys(other).filter(function (propName) {
      var isUndeclaredBreakpoint = !theme.breakpoints.keys.some(function (breakpoint) {
        return "".concat(breakpoint, "Up") === propName || "".concat(breakpoint, "Down") === propName;
      });
      return !['classes', 'theme', 'isRtl', 'sx'].includes(propName) && isUndeclaredBreakpoint;
    });

    if (unknownProps.length > 0) {
      console.error("Material-UI: Unsupported props received by `<Hidden implementation=\"css\" />`: ".concat(unknownProps.join(', '), ". Did you forget to wrap this component in a ThemeProvider declaring these breakpoints?"));
    }
  }

  var breakpoints = [];

  for (var i = 0; i < theme.breakpoints.keys.length; i += 1) {
    var breakpoint = theme.breakpoints.keys[i];
    var breakpointUp = other["".concat(breakpoint, "Up")];
    var breakpointDown = other["".concat(breakpoint, "Down")];

    if (breakpointUp) {
      breakpoints.push({
        breakpoint: breakpoint,
        dir: 'up'
      });
    }

    if (breakpointDown) {
      breakpoints.push({
        breakpoint: breakpoint,
        dir: 'down'
      });
    }
  }

  if (only) {
    var onlyBreakpoints = Array.isArray(only) ? only : [only];
    onlyBreakpoints.forEach(function (breakpoint) {
      breakpoints.push({
        breakpoint: breakpoint,
        dir: 'only'
      });
    });
  }

  var styleProps = _extends({}, props, {
    breakpoints: breakpoints
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(HiddenCssRoot, {
    className: clsx(classes.root, className),
    styleProps: styleProps,
    children: children
  });
}

process.env.NODE_ENV !== "production" ? HiddenCss.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   */
  implementation: PropTypes.oneOf(['js', 'css']),

  /**
   * If `true`, screens this size and down are hidden.
   */
  lgDown: PropTypes.bool,

  /**
   * If `true`, screens this size and up are hidden.
   */
  lgUp: PropTypes.bool,

  /**
   * If `true`, screens this size and down are hidden.
   */
  mdDown: PropTypes.bool,

  /**
   * If `true`, screens this size and up are hidden.
   */
  mdUp: PropTypes.bool,

  /**
   * Hide the given breakpoint(s).
   */
  only: PropTypes.oneOfType([PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), PropTypes.arrayOf(PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']))]),

  /**
   * If `true`, screens this size and down are hidden.
   */
  smDown: PropTypes.bool,

  /**
   * If `true`, screens this size and up are hidden.
   */
  smUp: PropTypes.bool,

  /**
   * If `true`, screens this size and down are hidden.
   */
  xlDown: PropTypes.bool,

  /**
   * If `true`, screens this size and up are hidden.
   */
  xlUp: PropTypes.bool,

  /**
   * If `true`, screens this size and down are hidden.
   */
  xsDown: PropTypes.bool,

  /**
   * If `true`, screens this size and up are hidden.
   */
  xsUp: PropTypes.bool
} : void 0;
export default HiddenCss;