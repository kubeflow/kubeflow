import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import { useTabContext, getTabId, getPanelId } from '../TabContext';
import { jsx as _jsx } from "react/jsx-runtime";
var TabList = /*#__PURE__*/React.forwardRef(function TabList(props, ref) {
  var childrenProp = props.children,
      other = _objectWithoutProperties(props, ["children"]);

  var context = useTabContext();

  if (context === null) {
    throw new TypeError('No TabContext provided');
  }

  var children = React.Children.map(childrenProp, function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return null;
    }

    return /*#__PURE__*/React.cloneElement(child, {
      // SOMEDAY: `Tabs` will set those themselves
      'aria-controls': getPanelId(context, child.props.value),
      id: getTabId(context, child.props.value)
    });
  });
  return /*#__PURE__*/_jsx(Tabs, _extends({}, other, {
    ref: ref,
    value: context.value,
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? TabList.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A list of `<Tab />` elements.
   */
  children: PropTypes.node
} : void 0;
export default TabList;