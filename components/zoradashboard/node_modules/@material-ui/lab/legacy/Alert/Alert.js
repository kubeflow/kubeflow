import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Alert from '@material-ui/core/Alert';
import { jsx as _jsx } from "react/jsx-runtime";
var warnedOnce = false;
/**
 * @ignore - do not document.
 */

export default /*#__PURE__*/React.forwardRef(function DeprecatedAlert(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The Alert component was moved from the lab to the core.', '', "You should use `import { Alert } from '@material-ui/core'`", "or `import Alert from '@material-ui/core/Alert'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/_jsx(Alert, _extends({
    ref: ref
  }, props));
});