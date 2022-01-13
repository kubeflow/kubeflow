import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import SpeedDialAction from '@material-ui/core/SpeedDialAction';
import { jsx as _jsx } from "react/jsx-runtime";
var warnedOnce = false;
/**
 * @ignore - do not document.
 */

export default /*#__PURE__*/React.forwardRef(function DeprecatedSpeedDialAction(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The SpeedDialAction component was moved from the lab to the core.', '', "You should use `import { SpeedDialAction } from '@material-ui/core'`", "or `import SpeedDialAction from '@material-ui/core/SpeedDialAction'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/_jsx(SpeedDialAction, _extends({
    ref: ref
  }, props));
});