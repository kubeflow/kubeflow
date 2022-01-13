import _extends from "@babel/runtime/helpers/esm/extends";

var _GlobalStyles;

import * as React from 'react';
import PropTypes from 'prop-types';
import useThemeProps from '../styles/useThemeProps';
import GlobalStyles from '../GlobalStyles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var html = {
  WebkitFontSmoothing: 'antialiased',
  // Antialiasing.
  MozOsxFontSmoothing: 'grayscale',
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box',
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: '100%'
};
export var body = function body(theme) {
  return _extends({
    color: theme.palette.text.primary
  }, theme.typography.body1, {
    backgroundColor: theme.palette.background.default,
    '@media print': {
      // Save printer ink.
      backgroundColor: theme.palette.common.white
    }
  });
};
export var styles = function styles(theme) {
  var _theme$components, _theme$components$Mui;

  var defaultStyles = {
    html: html,
    '*, *::before, *::after': {
      boxSizing: 'inherit'
    },
    'strong, b': {
      fontWeight: theme.typography.fontWeightBold
    },
    body: _extends({
      margin: 0
    }, body(theme), {
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      '&::backdrop': {
        backgroundColor: theme.palette.background.default
      }
    })
  };
  var themeOverrides = (_theme$components = theme.components) == null ? void 0 : (_theme$components$Mui = _theme$components.MuiCssBaseline) == null ? void 0 : _theme$components$Mui.styleOverrides;

  if (themeOverrides) {
    defaultStyles = [defaultStyles, themeOverrides];
  }

  return defaultStyles;
};
/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */

function CssBaseline(inProps) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiCssBaseline'
  });
  var children = props.children;
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [_GlobalStyles || (_GlobalStyles = /*#__PURE__*/_jsx(GlobalStyles, {
      styles: styles
    })), children]
  });
}

process.env.NODE_ENV !== "production" ? CssBaseline.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * You can wrap a node.
   */
  children: PropTypes.node
} : void 0;
export default CssBaseline;