"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _KeyboardArrowLeft3 = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowLeft"));

var _KeyboardArrowRight3 = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowRight"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _LastPage = _interopRequireDefault(require("../internal/svg-icons/LastPage"));

var _FirstPage = _interopRequireDefault(require("../internal/svg-icons/FirstPage"));

var _jsxRuntime = require("react/jsx-runtime");

var _LastPageIcon, _FirstPageIcon, _KeyboardArrowRight, _KeyboardArrowLeft, _KeyboardArrowLeft2, _KeyboardArrowRight2, _FirstPageIcon2, _LastPageIcon2;

const _excluded = ["backIconButtonProps", "count", "getItemAriaLabel", "nextIconButtonProps", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @ignore - internal component.
 */
const TablePaginationActions = /*#__PURE__*/React.forwardRef(function TablePaginationActions(props, ref) {
  const {
    backIconButtonProps,
    count,
    getItemAriaLabel,
    nextIconButtonProps,
    onPageChange,
    page,
    rowsPerPage,
    showFirstButton,
    showLastButton
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const theme = (0, _useTheme.default)();

  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2.default)({
    ref: ref
  }, other, {
    children: [showFirstButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
      onClick: handleFirstPageButtonClick,
      disabled: page === 0,
      "aria-label": getItemAriaLabel('first', page),
      title: getItemAriaLabel('first', page),
      children: theme.direction === 'rtl' ? _LastPageIcon || (_LastPageIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_LastPage.default, {})) : _FirstPageIcon || (_FirstPageIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_FirstPage.default, {}))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, (0, _extends2.default)({
      onClick: handleBackButtonClick,
      disabled: page === 0,
      color: "inherit",
      "aria-label": getItemAriaLabel('previous', page),
      title: getItemAriaLabel('previous', page)
    }, backIconButtonProps, {
      children: theme.direction === 'rtl' ? _KeyboardArrowRight || (_KeyboardArrowRight = /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardArrowRight3.default, {})) : _KeyboardArrowLeft || (_KeyboardArrowLeft = /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardArrowLeft3.default, {}))
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, (0, _extends2.default)({
      onClick: handleNextButtonClick,
      disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
      color: "inherit",
      "aria-label": getItemAriaLabel('next', page),
      title: getItemAriaLabel('next', page)
    }, nextIconButtonProps, {
      children: theme.direction === 'rtl' ? _KeyboardArrowLeft2 || (_KeyboardArrowLeft2 = /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardArrowLeft3.default, {})) : _KeyboardArrowRight2 || (_KeyboardArrowRight2 = /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardArrowRight3.default, {}))
    })), showLastButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
      onClick: handleLastPageButtonClick,
      disabled: page >= Math.ceil(count / rowsPerPage) - 1,
      "aria-label": getItemAriaLabel('last', page),
      title: getItemAriaLabel('last', page),
      children: theme.direction === 'rtl' ? _FirstPageIcon2 || (_FirstPageIcon2 = /*#__PURE__*/(0, _jsxRuntime.jsx)(_FirstPage.default, {})) : _LastPageIcon2 || (_LastPageIcon2 = /*#__PURE__*/(0, _jsxRuntime.jsx)(_LastPage.default, {}))
    })]
  }));
});
process.env.NODE_ENV !== "production" ? TablePaginationActions.propTypes = {
  /**
   * Props applied to the back arrow [`IconButton`](/api/icon-button/) element.
   */
  backIconButtonProps: _propTypes.default.object,

  /**
   * The total number of rows.
   */
  count: _propTypes.default.number.isRequired,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @returns {string}
   */
  getItemAriaLabel: _propTypes.default.func.isRequired,

  /**
   * Props applied to the next arrow [`IconButton`](/api/icon-button/) element.
   */
  nextIconButtonProps: _propTypes.default.object,

  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: _propTypes.default.func.isRequired,

  /**
   * The zero-based index of the current page.
   */
  page: _propTypes.default.number.isRequired,

  /**
   * The number of rows per page.
   */
  rowsPerPage: _propTypes.default.number.isRequired,

  /**
   * If `true`, show the first-page button.
   */
  showFirstButton: _propTypes.default.bool.isRequired,

  /**
   * If `true`, show the last-page button.
   */
  showLastButton: _propTypes.default.bool.isRequired
} : void 0;
var _default = TablePaginationActions;
exports.default = _default;