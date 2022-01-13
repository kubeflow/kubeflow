import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import HiddenJs from './HiddenJs';
import HiddenCss from './HiddenCss';
/**
 * Responsively hides children based on the selected implementation.
 */

import { jsx as _jsx } from "react/jsx-runtime";

function Hidden(props) {
  var _props$implementation = props.implementation,
      implementation = _props$implementation === void 0 ? 'js' : _props$implementation,
      _props$lgDown = props.lgDown,
      lgDown = _props$lgDown === void 0 ? false : _props$lgDown,
      _props$lgUp = props.lgUp,
      lgUp = _props$lgUp === void 0 ? false : _props$lgUp,
      _props$mdDown = props.mdDown,
      mdDown = _props$mdDown === void 0 ? false : _props$mdDown,
      _props$mdUp = props.mdUp,
      mdUp = _props$mdUp === void 0 ? false : _props$mdUp,
      _props$smDown = props.smDown,
      smDown = _props$smDown === void 0 ? false : _props$smDown,
      _props$smUp = props.smUp,
      smUp = _props$smUp === void 0 ? false : _props$smUp,
      _props$xlDown = props.xlDown,
      xlDown = _props$xlDown === void 0 ? false : _props$xlDown,
      _props$xlUp = props.xlUp,
      xlUp = _props$xlUp === void 0 ? false : _props$xlUp,
      _props$xsDown = props.xsDown,
      xsDown = _props$xsDown === void 0 ? false : _props$xsDown,
      _props$xsUp = props.xsUp,
      xsUp = _props$xsUp === void 0 ? false : _props$xsUp,
      other = _objectWithoutProperties(props, ["implementation", "lgDown", "lgUp", "mdDown", "mdUp", "smDown", "smUp", "xlDown", "xlUp", "xsDown", "xsUp"]);

  if (implementation === 'js') {
    return /*#__PURE__*/_jsx(HiddenJs, _extends({
      lgDown: lgDown,
      lgUp: lgUp,
      mdDown: mdDown,
      mdUp: mdUp,
      smDown: smDown,
      smUp: smUp,
      xlDown: xlDown,
      xlUp: xlUp,
      xsDown: xsDown,
      xsUp: xsUp
    }, other));
  }

  return /*#__PURE__*/_jsx(HiddenCss, _extends({
    lgDown: lgDown,
    lgUp: lgUp,
    mdDown: mdDown,
    mdUp: mdUp,
    smDown: smDown,
    smUp: smUp,
    xlDown: xlDown,
    xlUp: xlUp,
    xsDown: xsDown,
    xsUp: xsUp
  }, other));
}

process.env.NODE_ENV !== "production" ? Hidden.propTypes
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
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   * @default 'js'
   */
  implementation: PropTypes.oneOf(['css', 'js']),

  /**
   * You can use this prop when choosing the `js` implementation with server-side rendering.
   *
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
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  lgDown: PropTypes.bool,

  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  lgUp: PropTypes.bool,

  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  mdDown: PropTypes.bool,

  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  mdUp: PropTypes.bool,

  /**
   * Hide the given breakpoint(s).
   */
  only: PropTypes.oneOfType([PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), PropTypes.arrayOf(PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired)]),

  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  smDown: PropTypes.bool,

  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  smUp: PropTypes.bool,

  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  xlDown: PropTypes.bool,

  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  xlUp: PropTypes.bool,

  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  xsDown: PropTypes.bool,

  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  xsUp: PropTypes.bool
} : void 0;
export default Hidden;