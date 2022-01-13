import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
import { jsx as _jsx } from "react/jsx-runtime";
var warnedOnce = false;
/**
 * @ignore - do not document.
 */

export default /*#__PURE__*/React.forwardRef(function DeprecatedSpeedDialIcon(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The SpeedDialIcon component was moved from the lab to the core.', '', "You should use `import { SpeedDialIcon } from '@material-ui/core'`", "or `import SpeedDialIcon from '@material-ui/core/SpeedDialIcon'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/_jsx(SpeedDialIcon, _extends({
    ref: ref
  }, props));
});