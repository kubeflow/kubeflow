import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getTableFooterUtilityClass } from './tableFooterClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getTableFooterUtilityClass, classes);
};

var TableFooterRoot = styled('tfoot', {
  name: 'MuiTableFooter',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({
  display: 'table-footer-group'
});
var tablelvl2 = {
  variant: 'footer'
};
var defaultComponent = 'tfoot';
var TableFooter = /*#__PURE__*/React.forwardRef(function TableFooter(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTableFooter'
  });

  var className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? defaultComponent : _props$component,
      other = _objectWithoutProperties(props, ["className", "component"]);

  var styleProps = _extends({}, props, {
    component: component
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(Tablelvl2Context.Provider, {
    value: tablelvl2,
    children: /*#__PURE__*/_jsx(TableFooterRoot, _extends({
      as: component,
      className: clsx(classes.root, className),
      ref: ref,
      role: component === defaultComponent ? null : 'rowgroup',
      styleProps: styleProps
    }, other))
  });
});
process.env.NODE_ENV !== "production" ? TableFooter.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally `TableRow`.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default TableFooter;