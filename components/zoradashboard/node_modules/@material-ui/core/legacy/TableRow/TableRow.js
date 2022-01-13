import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '@material-ui/system';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import tableRowClasses, { getTableRowUtilityClass } from './tableRowClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      selected = styleProps.selected,
      hover = styleProps.hover,
      head = styleProps.head,
      footer = styleProps.footer;
  var slots = {
    root: ['root', selected && 'selected', hover && 'hover', head && 'head', footer && 'footer']
  };
  return composeClasses(slots, getTableRowUtilityClass, classes);
};

var TableRowRoot = styled('tr', {
  name: 'MuiTableRow',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.head && styles.head, styleProps.footer && styles.footer];
  }
})(function (_ref) {
  var _ref2;

  var theme = _ref.theme;
  return _ref2 = {
    color: 'inherit',
    display: 'table-row',
    verticalAlign: 'middle',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0
  }, _defineProperty(_ref2, "&.".concat(tableRowClasses.hover, ":hover"), {
    backgroundColor: theme.palette.action.hover
  }), _defineProperty(_ref2, "&.".concat(tableRowClasses.selected), {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity)
    }
  }), _ref2;
});
var defaultComponent = 'tr';
/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */

var TableRow = /*#__PURE__*/React.forwardRef(function TableRow(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTableRow'
  });

  var className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? defaultComponent : _props$component,
      _props$hover = props.hover,
      hover = _props$hover === void 0 ? false : _props$hover,
      _props$selected = props.selected,
      selected = _props$selected === void 0 ? false : _props$selected,
      other = _objectWithoutProperties(props, ["className", "component", "hover", "selected"]);

  var tablelvl2 = React.useContext(Tablelvl2Context);

  var styleProps = _extends({}, props, {
    component: component,
    hover: hover,
    selected: selected,
    head: tablelvl2 && tablelvl2.variant === 'head',
    footer: tablelvl2 && tablelvl2.variant === 'footer'
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(TableRowRoot, _extends({
    as: component,
    ref: ref,
    className: clsx(classes.root, className),
    role: component === defaultComponent ? null : 'row',
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? TableRow.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Should be valid <tr> children such as `TableCell`.
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
   * If `true`, the table row will shade on hover.
   * @default false
   */
  hover: PropTypes.bool,

  /**
   * If `true`, the table row will have the selected shading.
   * @default false
   */
  selected: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default TableRow;