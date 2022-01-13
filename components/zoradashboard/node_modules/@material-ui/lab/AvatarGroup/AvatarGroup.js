import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import AvatarGroup from '@material-ui/core/AvatarGroup';
import { jsx as _jsx } from "react/jsx-runtime";
let warnedOnce = false;
/**
 * @ignore - do not document.
 */

export default /*#__PURE__*/React.forwardRef(function DeprecatedAvatarGroup(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The AvatarGroup component was moved from the lab to the core.', '', "You should use `import { AvatarGroup } from '@material-ui/core'`", "or `import AvatarGroup from '@material-ui/core/AvatarGroup'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/_jsx(AvatarGroup, _extends({
    ref: ref
  }, props));
});