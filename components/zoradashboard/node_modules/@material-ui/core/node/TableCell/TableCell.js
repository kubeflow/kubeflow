"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _system = require("@material-ui/system");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _TableContext = _interopRequireDefault(require("../Table/TableContext"));

var _Tablelvl2Context = _interopRequireDefault(require("../Table/Tablelvl2Context"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _tableCellClasses = _interopRequireWildcard(require("./tableCellClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["align", "className", "component", "padding", "scope", "size", "sortDirection", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    variant,
    align,
    padding,
    size,
    stickyHeader
  } = styleProps;
  const slots = {
    root: ['root', variant, stickyHeader && 'stickyHeader', align !== 'inherit' && `align${(0, _capitalize.default)(align)}`, padding !== 'normal' && `padding${(0, _capitalize.default)(padding)}`, `size${(0, _capitalize.default)(size)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _tableCellClasses.getTableCellUtilityClass, classes);
};

const TableCellRoot = (0, _styled.default)('td', {
  name: 'MuiTableCell',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[styleProps.variant], styles[`size${(0, _capitalize.default)(styleProps.size)}`], styleProps.padding !== 'normal' && styles[`padding${(0, _capitalize.default)(styleProps.padding)}`], styleProps.align !== 'inherit' && styles[`align${(0, _capitalize.default)(styleProps.align)}`], styleProps.stickyHeader && styles.stickyHeader];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({}, theme.typography.body2, {
  display: 'table-cell',
  verticalAlign: 'inherit',
  // Workaround for a rendering bug with spanned columns in Chrome 62.0.
  // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
  borderBottom: `1px solid
    ${theme.palette.mode === 'light' ? (0, _system.lighten)((0, _system.alpha)(theme.palette.divider, 1), 0.88) : (0, _system.darken)((0, _system.alpha)(theme.palette.divider, 1), 0.68)}`,
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
}, styleProps.size === 'small' && {
  padding: '6px 16px',
  [`&.${_tableCellClasses.default.paddingCheckbox}`]: {
    width: 24,
    // prevent the checkbox column from growing
    padding: '0 12px 0 16px',
    '& > *': {
      padding: 0
    }
  }
}, styleProps.padding === 'checkbox' && {
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
}));
/**
 * The component renders a `<th>` element when the parent context is a header
 * or otherwise a `<td>` element.
 */

const TableCell = /*#__PURE__*/React.forwardRef(function TableCell(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiTableCell'
  });
  const {
    align = 'inherit',
    className,
    component: componentProp,
    padding: paddingProp,
    scope: scopeProp,
    size: sizeProp,
    sortDirection,
    variant: variantProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const table = React.useContext(_TableContext.default);
  const tablelvl2 = React.useContext(_Tablelvl2Context.default);
  const isHeadCell = tablelvl2 && tablelvl2.variant === 'head';
  let component;

  if (componentProp) {
    component = componentProp;
  } else {
    component = isHeadCell ? 'th' : 'td';
  }

  let scope = scopeProp;

  if (!scope && isHeadCell) {
    scope = 'col';
  }

  const variant = variantProp || tablelvl2 && tablelvl2.variant;
  const styleProps = (0, _extends2.default)({}, props, {
    align,
    component,
    padding: paddingProp || (table && table.padding ? table.padding : 'normal'),
    size: sizeProp || (table && table.size ? table.size : 'medium'),
    sortDirection,
    stickyHeader: variant === 'head' && table && table.stickyHeader,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  let ariaSort = null;

  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TableCellRoot, (0, _extends2.default)({
    as: component,
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
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
  align: _propTypes.default.oneOf(['center', 'inherit', 'justify', 'left', 'right']),

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Sets the padding applied to the cell.
   * The prop defaults to the value (`'default'`) inherited from the parent Table component.
   */
  padding: _propTypes.default.oneOf(['checkbox', 'none', 'normal']),

  /**
   * Set scope attribute.
   */
  scope: _propTypes.default.string,

  /**
   * Specify the size of the cell.
   * The prop defaults to the value (`'medium'`) inherited from the parent Table component.
   */
  size: _propTypes.default.oneOf(['small', 'medium']),

  /**
   * Set aria-sort direction.
   */
  sortDirection: _propTypes.default.oneOf(['asc', 'desc', false]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * Specify the cell type.
   * The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.
   */
  variant: _propTypes.default.oneOf(['body', 'footer', 'head'])
} : void 0;
var _default = TableCell;
exports.default = _default;