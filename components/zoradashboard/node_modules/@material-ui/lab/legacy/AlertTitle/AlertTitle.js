import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import AlertTitle from '@material-ui/core/AlertTitle';
import { jsx as _jsx } from "react/jsx-runtime";
var warnedOnce = false;
/**
 * @ignore - do not document.
 */

export default /*#__PURE__*/React.forwardRef(function DeprecatedAlertTitle(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The AlertTitle component was moved from the lab to the core.', '', "You should use `import { AlertTitle } from '@material-ui/core'`", "or `import AlertTitle from '@material-ui/core/AlertTitle'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/_jsx(AlertTitle, _extends({
    ref: ref
  }, props));
});