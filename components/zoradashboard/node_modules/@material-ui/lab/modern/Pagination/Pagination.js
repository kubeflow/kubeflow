import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Pagination from '@material-ui/core/Pagination';
import { jsx as _jsx } from "react/jsx-runtime";
let warnedOnce = false;
/**
 * @ignore - do not document.
 */

export default /*#__PURE__*/React.forwardRef(function DeprecatedPagination(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The Pagination component was moved from the lab to the core.', '', "You should use `import { Pagination } from '@material-ui/core'`", "or `import Pagination from '@material-ui/core/Pagination'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/_jsx(Pagination, _extends({
    ref: ref
  }, props));
});