import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children"];
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import { useTabContext, getTabId, getPanelId } from '../TabContext';
import { jsx as _jsx } from "react/jsx-runtime";
const TabList = /*#__PURE__*/React.forwardRef(function TabList(props, ref) {
  const {
    children: childrenProp
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const context = useTabContext();

  if (context === null) {
    throw new TypeError('No TabContext provided');
  }

  const children = React.Children.map(childrenProp, child => {
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