import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from '@material-ui/utils';
import { getThemeProps } from '@material-ui/system';
import hoistNonReactStatics from 'hoist-non-react-statics';
import useTheme from '../styles/useTheme';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useMediaQuery from '../useMediaQuery';
import { jsx as _jsx } from "react/jsx-runtime";
var breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl']; // By default, returns true if screen width is the same or greater than the given breakpoint.

export var isWidthUp = function isWidthUp(breakpoint, width) {
  var inclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (inclusive) {
    return breakpointKeys.indexOf(breakpoint) <= breakpointKeys.indexOf(width);
  }

  return breakpointKeys.indexOf(breakpoint) < breakpointKeys.indexOf(width);
}; // By default, returns true if screen width is the same or less than the given breakpoint.

export var isWidthDown = function isWidthDown(breakpoint, width) {
  var inclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (inclusive) {
    return breakpointKeys.indexOf(width) <= breakpointKeys.indexOf(breakpoint);
  }

  return breakpointKeys.indexOf(width) < breakpointKeys.indexOf(breakpoint);
};

var withWidth = function withWidth() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    var _options$withTheme = options.withTheme,
        withThemeOption = _options$withTheme === void 0 ? false : _options$withTheme,
        _options$noSSR = options.noSSR,
        noSSR = _options$noSSR === void 0 ? false : _options$noSSR,
        initialWidthOption = options.initialWidth;

    function WithWidth(props) {
      var contextTheme = useTheme();
      var theme = props.theme || contextTheme;

      var _getThemeProps = getThemeProps({
        theme: theme,
        name: 'MuiWithWidth',
        props: props
      }),
          initialWidth = _getThemeProps.initialWidth,
          width = _getThemeProps.width,
          other = _objectWithoutProperties(_getThemeProps, ["initialWidth", "width"]);

      var _React$useState = React.useState(false),
          mountedState = _React$useState[0],
          setMountedState = _React$useState[1];

      useEnhancedEffect(function () {
        setMountedState(true);
      }, []);
      /**
       * innerWidth |xs      sm      md      lg      xl
       *            |-------|-------|-------|-------|------>
       * width      |  xs   |  sm   |  md   |  lg   |  xl
       */

      var keys = theme.breakpoints.keys.slice().reverse();
      var widthComputed = keys.reduce(function (output, key) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        var matches = useMediaQuery(theme.breakpoints.up(key));
        return !output && matches ? key : output;
      }, null);

      var more = _extends({
        width: width || (mountedState || noSSR ? widthComputed : undefined) || initialWidth || initialWidthOption
      }, withThemeOption ? {
        theme: theme
      } : {}, other); // When rendering the component on the server,
      // we have no idea about the client browser screen width.
      // In order to prevent blinks and help the reconciliation of the React tree
      // we are not rendering the child component.
      //
      // An alternative is to use the `initialWidth` property.


      if (more.width === undefined) {
        return null;
      }

      return /*#__PURE__*/_jsx(Component, _extends({}, more));
    }

    process.env.NODE_ENV !== "production" ? WithWidth.propTypes = {
      /**
       * As `window.innerWidth` is unavailable on the server,
       * we default to rendering an empty component during the first mount.
       * You might want to use a heuristic to approximate
       * the screen width of the client browser screen width.
       *
       * For instance, you could be using the user-agent or the client-hints.
       * https://caniuse.com/#search=client%20hint
       */
      initialWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),

      /**
       * @ignore
       */
      theme: PropTypes.object,

      /**
       * Bypass the width calculation logic.
       */
      width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
    } : void 0;

    if (process.env.NODE_ENV !== 'production') {
      WithWidth.displayName = "WithWidth(".concat(getDisplayName(Component), ")");
    }

    hoistNonReactStatics(WithWidth, Component);
    return WithWidth;
  };
};

export default withWidth;