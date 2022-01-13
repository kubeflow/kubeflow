import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { jsx as _jsx } from "react/jsx-runtime";

function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

export default function GlobalStyles(props) {
  const {
    styles,
    defaultTheme = {}
  } = props;
  const globalStyles = typeof styles === 'function' ? themeInput => styles(isEmpty(themeInput) ? defaultTheme : themeInput) : styles;
  return /*#__PURE__*/_jsx(Global, {
    styles: globalStyles
  });
}
process.env.NODE_ENV !== "production" ? GlobalStyles.propTypes = {
  defaultTheme: PropTypes.object,
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func])
} : void 0;