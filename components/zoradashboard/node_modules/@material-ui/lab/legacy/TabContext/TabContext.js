import * as React from 'react';
import PropTypes from 'prop-types';
/**
 * @type {React.Context<{ idPrefix: string; value: string } | null>}
 */

import { jsx as _jsx } from "react/jsx-runtime";
var Context = /*#__PURE__*/React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'TabContext';
}

function useUniquePrefix() {
  var _React$useState = React.useState(null),
      id = _React$useState[0],
      setId = _React$useState[1];

  React.useEffect(function () {
    setId("mui-p-".concat(Math.round(Math.random() * 1e5)));
  }, []);
  return id;
}

export default function TabContext(props) {
  var children = props.children,
      value = props.value;
  var idPrefix = useUniquePrefix();
  var context = React.useMemo(function () {
    return {
      idPrefix: idPrefix,
      value: value
    };
  }, [idPrefix, value]);
  return /*#__PURE__*/_jsx(Context.Provider, {
    value: context,
    children: children
  });
}
process.env.NODE_ENV !== "production" ? TabContext.propTypes
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
   * The value of the currently selected `Tab`.
   */
  value: PropTypes.string.isRequired
} : void 0;
/**
 * @returns {unknown}
 */

export function useTabContext() {
  return React.useContext(Context);
}
export function getPanelId(context, value) {
  var idPrefix = context.idPrefix;

  if (idPrefix === null) {
    return null;
  }

  return "".concat(context.idPrefix, "-P-").concat(value);
}
export function getTabId(context, value) {
  var idPrefix = context.idPrefix;

  if (idPrefix === null) {
    return null;
  }

  return "".concat(context.idPrefix, "-T-").concat(value);
}