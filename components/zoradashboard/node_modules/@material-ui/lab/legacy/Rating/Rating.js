import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Rating from '@material-ui/core/Rating';
import { jsx as _jsx } from "react/jsx-runtime";
var warnedOnce = false;
/**
 * @ignore - do not document.
 */

export default /*#__PURE__*/React.forwardRef(function DeprecatedRating(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The Rating component was moved from the lab to the core.', '', "You should use `import { Rating } from '@material-ui/core'`", "or `import Rating from '@material-ui/core/Rating'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/_jsx(Rating, _extends({
    ref: ref
  }, props));
});