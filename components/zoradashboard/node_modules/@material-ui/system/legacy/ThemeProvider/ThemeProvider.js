import _typeof from "@babel/runtime/helpers/esm/typeof";
import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/private-theming';
import { exactProp } from '@material-ui/utils';
import { ThemeContext as StyledEngineThemeContext } from '@material-ui/styled-engine';
import useTheme from '../useTheme';
import { jsx as _jsx } from "react/jsx-runtime";

function InnerThemeProvider(props) {
  var theme = useTheme();
  return /*#__PURE__*/_jsx(StyledEngineThemeContext.Provider, {
    value: _typeof(theme) === 'object' ? theme : {},
    children: props.children
  });
}

process.env.NODE_ENV !== "production" ? InnerThemeProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node
} : void 0;
/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 */

function ThemeProvider(props) {
  var children = props.children,
      localTheme = props.theme;
  return /*#__PURE__*/_jsx(MuiThemeProvider, {
    theme: localTheme,
    children: /*#__PURE__*/_jsx(InnerThemeProvider, {
      children: children
    })
  });
}

process.env.NODE_ENV !== "production" ? ThemeProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,

  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV !== "production" ? ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes) : void 0;
}

export default ThemeProvider;