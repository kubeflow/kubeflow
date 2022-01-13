import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PaginationItem from '@material-ui/core/PaginationItem';
import { jsx as _jsx } from "react/jsx-runtime";
let warnedOnce = false;
/**
 * @ignore - do not document.
 */

export default /*#__PURE__*/React.forwardRef(function DeprecatedPaginationItem(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The PaginationItem component was moved from the lab to the core.', '', "You should use `import { PaginationItem } from '@material-ui/core'`", "or `import PaginationItem from '@material-ui/core/PaginationItem'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/_jsx(PaginationItem, _extends({
    ref: ref
  }, props));
});