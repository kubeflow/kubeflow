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

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _InputBase2 = _interopRequireDefault(require("../InputBase"));

var _MenuItem = _interopRequireDefault(require("../MenuItem"));

var _Select = _interopRequireDefault(require("../Select"));

var _TableCell = _interopRequireDefault(require("../TableCell"));

var _Toolbar = _interopRequireDefault(require("../Toolbar"));

var _TablePaginationActions = _interopRequireDefault(require("./TablePaginationActions"));

var _useId = _interopRequireDefault(require("../utils/useId"));

var _tablePaginationClasses = _interopRequireWildcard(require("./tablePaginationClasses"));

var _jsxRuntime = require("react/jsx-runtime");

var _InputBase;

const _excluded = ["ActionsComponent", "backIconButtonProps", "className", "colSpan", "component", "count", "getItemAriaLabel", "labelDisplayedRows", "labelRowsPerPage", "nextIconButtonProps", "onPageChange", "onRowsPerPageChange", "page", "rowsPerPage", "rowsPerPageOptions", "SelectProps", "showFirstButton", "showLastButton"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const TablePaginationRoot = (0, _styled.default)(_TableCell.default, {
  name: 'MuiTablePagination',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => ({
  overflow: 'auto',
  color: theme.palette.text.primary,
  fontSize: theme.typography.pxToRem(14),
  // Increase the specificity to override TableCell.
  '&:last-child': {
    padding: 0
  }
}));
const TablePaginationToolbar = (0, _styled.default)(_Toolbar.default, {
  name: 'MuiTablePagination',
  slot: 'Toolbar',
  overridesResolver: (props, styles) => (0, _extends2.default)({
    [`& .${_tablePaginationClasses.default.actions}`]: styles.actions
  }, styles.toolbar)
})(({
  theme
}) => ({
  minHeight: 52,
  paddingRight: 2,
  [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
    minHeight: 52
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: 52,
    paddingRight: 2
  },
  [`& .${_tablePaginationClasses.default.actions}`]: {
    flexShrink: 0,
    marginLeft: 20
  }
}));
const TablePaginationSpacer = (0, _styled.default)('div', {
  name: 'MuiTablePagination',
  slot: 'Spacer',
  overridesResolver: (props, styles) => styles.spacer
})({
  flex: '1 1 100%'
});
const TablePaginationSelectLabel = (0, _styled.default)('p', {
  name: 'MuiTablePagination',
  slot: 'SelectLabel',
  overridesResolver: (props, styles) => styles.selectLabel
})(({
  theme
}) => (0, _extends2.default)({}, theme.typography.body2, {
  flexShrink: 0
}));
const TablePaginationSelect = (0, _styled.default)(_Select.default, {
  name: 'MuiTablePagination',
  slot: 'Select',
  overridesResolver: (props, styles) => (0, _extends2.default)({
    [`& .${_tablePaginationClasses.default.selectIcon}`]: styles.selectIcon,
    [`& .${_tablePaginationClasses.default.select}`]: styles.select
  }, styles.input, styles.selectRoot)
})({
  color: 'inherit',
  fontSize: 'inherit',
  flexShrink: 0,
  marginRight: 32,
  marginLeft: 8,
  [`& .${_tablePaginationClasses.default.select}`]: {
    paddingLeft: 8,
    paddingRight: 24,
    textAlign: 'right',
    textAlignLast: 'right' // Align <select> on Chrome.

  }
});
const TablePaginationMenuItem = (0, _styled.default)(_MenuItem.default, {
  name: 'MuiTablePagination',
  slot: 'MenuItem',
  overridesResolver: (props, styles) => styles.menuItem
})({});
const TablePaginationDisplayedRows = (0, _styled.default)('p', {
  name: 'MuiTablePagination',
  slot: 'DisplayedRows',
  overridesResolver: (props, styles) => styles.displayedRows
})(({
  theme
}) => (0, _extends2.default)({}, theme.typography.body2, {
  flexShrink: 0
}));

function defaultLabelDisplayedRows({
  from,
  to,
  count
}) {
  return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function defaultGetAriaLabel(type) {
  return `Go to ${type} page`;
}

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root'],
    toolbar: ['toolbar'],
    spacer: ['spacer'],
    selectLabel: ['selectLabel'],
    select: ['select'],
    input: ['input'],
    selectIcon: ['selectIcon'],
    menuItem: ['menuItem'],
    displayedRows: ['displayedRows'],
    actions: ['actions']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _tablePaginationClasses.getTablePaginationUtilityClass, classes);
};
/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */


const TablePagination = /*#__PURE__*/React.forwardRef(function TablePagination(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiTablePagination'
  });
  const {
    ActionsComponent = _TablePaginationActions.default,
    backIconButtonProps,
    className,
    colSpan: colSpanProp,
    component = _TableCell.default,
    count,
    getItemAriaLabel = defaultGetAriaLabel,
    labelDisplayedRows = defaultLabelDisplayedRows,
    labelRowsPerPage = 'Rows per page:',
    nextIconButtonProps,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    rowsPerPageOptions = [10, 25, 50, 100],
    SelectProps = {},
    showFirstButton = false,
    showLastButton = false
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = props;
  const classes = useUtilityClasses(styleProps);
  const MenuItemComponent = SelectProps.native ? 'option' : TablePaginationMenuItem;
  let colSpan;

  if (component === _TableCell.default || component === 'td') {
    colSpan = colSpanProp || 1000; // col-span over everything
  }

  const selectId = (0, _useId.default)(SelectProps.id);
  const labelId = (0, _useId.default)(SelectProps.labelId);

  const getLabelDisplayedRowsTo = () => {
    if (count === -1) return (page + 1) * rowsPerPage;
    return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TablePaginationRoot, (0, _extends2.default)({
    colSpan: colSpan,
    ref: ref,
    as: component,
    styleProps: styleProps,
    className: (0, _clsx.default)(classes.root, className)
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(TablePaginationToolbar, {
      className: classes.toolbar,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(TablePaginationSpacer, {
        className: classes.spacer
      }), rowsPerPageOptions.length > 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(TablePaginationSelectLabel, {
        className: classes.selectLabel,
        id: labelId,
        children: labelRowsPerPage
      }), rowsPerPageOptions.length > 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(TablePaginationSelect, (0, _extends2.default)({
        variant: "standard",
        input: _InputBase || (_InputBase = /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputBase2.default, {})),
        value: rowsPerPage,
        onChange: onRowsPerPageChange,
        id: selectId,
        labelId: labelId
      }, SelectProps, {
        classes: (0, _extends2.default)({}, SelectProps.classes, {
          // TODO v5 remove `classes.input`
          root: (0, _clsx.default)(classes.input, classes.selectRoot, (SelectProps.classes || {}).root),
          select: (0, _clsx.default)(classes.select, (SelectProps.classes || {}).select),
          // TODO v5 remove `selectIcon`
          icon: (0, _clsx.default)(classes.selectIcon, (SelectProps.classes || {}).icon)
        }),
        children: rowsPerPageOptions.map(rowsPerPageOption => /*#__PURE__*/(0, React.createElement)(MenuItemComponent, (0, _extends2.default)({}, !(0, _unstyled.isHostComponent)(MenuItemComponent) && {
          styleProps
        }, {
          className: classes.menuItem,
          key: rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption,
          value: rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
        }), rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption))
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)(TablePaginationDisplayedRows, {
        className: classes.displayedRows,
        children: labelDisplayedRows({
          from: count === 0 ? 0 : page * rowsPerPage + 1,
          to: getLabelDisplayedRowsTo(),
          count: count === -1 ? -1 : count,
          page
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ActionsComponent, {
        className: classes.actions,
        backIconButtonProps: backIconButtonProps,
        count: count,
        nextIconButtonProps: nextIconButtonProps,
        onPageChange: onPageChange,
        page: page,
        rowsPerPage: rowsPerPage,
        showFirstButton: showFirstButton,
        showLastButton: showLastButton,
        getItemAriaLabel: getItemAriaLabel
      })]
    })
  }));
});
process.env.NODE_ENV !== "production" ? TablePagination.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The component used for displaying the actions.
   * Either a string to use a HTML element or a component.
   * @default TablePaginationActions
   */
  ActionsComponent: _propTypes.default.elementType,

  /**
   * Props applied to the back arrow [`IconButton`](/api/icon-button/) component.
   */
  backIconButtonProps: _propTypes.default.object,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * @ignore
   */
  colSpan: _propTypes.default.number,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: _utils.integerPropType.isRequired,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel: _propTypes.default.func,

  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }) {
   *   return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows: _propTypes.default.func,

  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage: _propTypes.default.node,

  /**
   * Props applied to the next arrow [`IconButton`](/api/icon-button/) element.
   */
  nextIconButtonProps: _propTypes.default.object,

  /**
   * Callback fired when the page is changed.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: _propTypes.default.func.isRequired,

  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   */
  onRowsPerPageChange: _propTypes.default.func,

  /**
   * The zero-based index of the current page.
   */
  page: (0, _utils.chainPropTypes)(_utils.integerPropType.isRequired, props => {
    const {
      count,
      page,
      rowsPerPage
    } = props;

    if (count === -1) {
      return null;
    }

    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

    if (page < 0 || page > newLastPage) {
      return new Error('Material-UI: The page prop of a TablePagination is out of range ' + `(0 to ${newLastPage}, but page is ${page}).`);
    }

    return null;
  }),

  /**
   * The number of rows per page.
   *
   * Set -1 to display all the rows.
   */
  rowsPerPage: _utils.integerPropType.isRequired,

  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   * Use -1 for the value with a custom label to show all the rows.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    label: _propTypes.default.string.isRequired,
    value: _propTypes.default.number.isRequired
  })]).isRequired),

  /**
   * Props applied to the rows per page [`Select`](/api/select/) element.
   * @default {}
   */
  SelectProps: _propTypes.default.object,

  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: _propTypes.default.bool,

  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = TablePagination;
exports.default = _default;