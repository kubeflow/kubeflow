import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { darken, alpha, lighten } from '@material-ui/system';
import capitalize from '../utils/capitalize';
import TableContext from '../Table/TableContext';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import tableCellClasses, { getTableCellUtilityClass } from './tableCellClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      variant = styleProps.variant,
      align = styleProps.align,
      padding = styleProps.padding,
      size = styleProps.size,
      stickyHeader = styleProps.stickyHeader;
  var slots = {
    root: ['root', variant, stickyHeader && 'stickyHeader', align !== 'inherit' && "align".concat(capitalize(align)), padding !== 'normal' && "padding".concat(capitalize(padding)), "size".concat(capitalize(size))]
  };
  return composeClasses(slots, getTableCellUtilityClass, classes);
};

var TableCellRoot = styled('td', {
  name: 'MuiTableCell',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles[styleProps.variant], styles["size".concat(capitalize(styleProps.size))], styleProps.padding !== 'normal' && styles["padding".concat(capitalize(styleProps.padding))], styleProps.align !== 'inherit' && styles["align".concat(capitalize(styleProps.align))], styleProps.stickyHeader && styles.stickyHeader];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({}, theme.typography.body2, {
    display: 'table-cell',
    verticalAlign: 'inherit',
    // Workaround for a rendering bug with spanned columns in Chrome 62.0.
    // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
    borderBottom: "1px solid\n    ".concat(theme.palette.mode === 'light' ? lighten(alpha(theme.palette.divider, 1), 0.88) : darken(alpha(theme.palette.divider, 1), 0.68)),
    textAlign: 'left',
    padding: 16
  }, styleProps.variant === 'head' && {
    color: theme.palette.text.primary,
    lineHeight: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightMedium
  }, styleProps.variant === 'body' && {
    color: theme.palette.text.primary
  }, styleProps.variant === 'footer' && {
    color: theme.palette.text.secondary,
    lineHeight: theme.typography.pxToRem(21),
    fontSize: theme.typography.pxToRem(12)
  }, styleProps.size === 'small' && _defineProperty({
    padding: '6px 16px'
  }, "&.".concat(tableCellClasses.paddingCheckbox), {
    width: 24,
    // prevent the checkbox column from growing
    padding: '0 12px 0 16px',
    '& > *': {
      padding: 0
    }
  }), styleProps.padding === 'checkbox' && {
    width: 48,
    // prevent the checkbox column from growing
    padding: '0 0 0 4px'
  }, styleProps.padding === 'none' && {
    padding: 0
  }, styleProps.align === 'left' && {
    textAlign: 'left'
  }, styleProps.align === 'center' && {
    textAlign: 'center'
  }, styleProps.align === 'right' && {
    textAlign: 'right',
    flexDirection: 'row-reverse'
  }, styleProps.align === 'justify' && {
    textAlign: 'justify'
  }, styleProps.stickyHeader && {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  });
});
/**
 * The component renders a `<th>` element when the parent context is a header
 * or otherwise a `<td>` element.
 */

var TableCell = /*#__PURE__*/React.forwardRef(function TableCell(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTableCell'
  });

  var _props$align = props.align,
      align = _props$align === void 0 ? 'inherit' : _props$align,
      className = props.className,
      componentProp = props.component,
      paddingProp = props.padding,
      scopeProp = props.scope,
      sizeProp = props.size,
      sortDirection = props.sortDirection,
      variantProp = props.variant,
      other = _objectWithoutProperties(props, ["align", "className", "component", "padding", "scope", "size", "sortDirection", "variant"]);

  var table = React.useContext(TableContext);
  var tablelvl2 = React.useContext(Tablelvl2Context);
  var isHeadCell = tablelvl2 && tablelvl2.variant === 'head';
  var component;

  if (componentProp) {
    component = componentProp;
  } else {
    component = isHeadCell ? 'th' : 'td';
  }

  var scope = scopeProp;

  if (!scope && isHeadCell) {
    scope = 'col';
  }

  var variant = variantProp || tablelvl2 && tablelvl2.variant;

  var styleProps = _extends({}, props, {
    align: align,
    component: component,
    padding: paddingProp || (table && table.padding ? table.padding : 'normal'),
    size: sizeProp || (table && table.size ? table.size : 'medium'),
    sortDirection: sortDirection,
    stickyHeader: variant === 'head' && table && table.stickyHeader,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  var ariaSort = null;

  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return /*#__PURE__*/_jsx(TableCellRoot, _extends({
    as: component,
    ref: ref,
    className: clsx(classes.root, className),
    "aria-sort": ariaSort,
    scope: scope,
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? TableCell.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   * @default 'inherit'
   */
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),

  /**
   * The content of the component.
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
   * Sets the padding applied to the cell.
   * The prop defaults to the value (`'default'`) inherited from the parent Table component.
   */
  padding: PropTypes.oneOf(['checkbox', 'none', 'normal']),

  /**
   * Set scope attribute.
   */
  scope: PropTypes.string,

  /**
   * Specify the size of the cell.
   * The prop defaults to the value (`'medium'`) inherited from the parent Table component.
   */
  size: PropTypes.oneOf(['small', 'medium']),

  /**
   * Set aria-sort direction.
   */
  sortDirection: PropTypes.oneOf(['asc', 'desc', false]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * Specify the cell type.
   * The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.
   */
  variant: PropTypes.oneOf(['body', 'footer', 'head'])
} : void 0;
export default TableCell;