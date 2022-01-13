import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { integerPropType } from '@material-ui/utils';
import useThemeProps from '../styles/useThemeProps';
import { getPaginationUtilityClass } from './paginationClasses';
import usePagination from '../usePagination';
import PaginationItem from '../PaginationItem';
import styled from '../styles/styled';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      variant = styleProps.variant;
  var slots = {
    root: ['root', variant],
    ul: ['ul']
  };
  return composeClasses(slots, getPaginationUtilityClass, classes);
};

var PaginationRoot = styled('nav', {
  name: 'MuiPagination',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles[styleProps.variant]];
  }
})({});
var PaginationUl = styled('ul', {
  name: 'MuiPagination',
  slot: 'Ul',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.ul;
  }
})({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none'
});

function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return "".concat(selected ? '' : 'Go to ', "page ").concat(page);
  }

  return "Go to ".concat(type, " page");
}

var Pagination = /*#__PURE__*/React.forwardRef(function Pagination(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPagination'
  });

  var _props$boundaryCount = props.boundaryCount,
      boundaryCount = _props$boundaryCount === void 0 ? 1 : _props$boundaryCount,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'standard' : _props$color,
      _props$count = props.count,
      count = _props$count === void 0 ? 1 : _props$count,
      _props$defaultPage = props.defaultPage,
      defaultPage = _props$defaultPage === void 0 ? 1 : _props$defaultPage,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$getItemAriaLab = props.getItemAriaLabel,
      getItemAriaLabel = _props$getItemAriaLab === void 0 ? defaultGetAriaLabel : _props$getItemAriaLab,
      _props$hideNextButton = props.hideNextButton,
      hideNextButton = _props$hideNextButton === void 0 ? false : _props$hideNextButton,
      _props$hidePrevButton = props.hidePrevButton,
      hidePrevButton = _props$hidePrevButton === void 0 ? false : _props$hidePrevButton,
      onChange = props.onChange,
      page = props.page,
      _props$renderItem = props.renderItem,
      renderItem = _props$renderItem === void 0 ? function (item) {
    return /*#__PURE__*/_jsx(PaginationItem, _extends({}, item));
  } : _props$renderItem,
      _props$shape = props.shape,
      shape = _props$shape === void 0 ? 'circular' : _props$shape,
      _props$showFirstButto = props.showFirstButton,
      showFirstButton = _props$showFirstButto === void 0 ? false : _props$showFirstButto,
      _props$showLastButton = props.showLastButton,
      showLastButton = _props$showLastButton === void 0 ? false : _props$showLastButton,
      _props$siblingCount = props.siblingCount,
      siblingCount = _props$siblingCount === void 0 ? 1 : _props$siblingCount,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'text' : _props$variant,
      other = _objectWithoutProperties(props, ["boundaryCount", "className", "color", "count", "defaultPage", "disabled", "getItemAriaLabel", "hideNextButton", "hidePrevButton", "onChange", "page", "renderItem", "shape", "showFirstButton", "showLastButton", "siblingCount", "size", "variant"]);

  var _usePagination = usePagination(_extends({}, props, {
    componentName: 'Pagination'
  })),
      items = _usePagination.items;

  var styleProps = _extends({}, props, {
    boundaryCount: boundaryCount,
    color: color,
    count: count,
    defaultPage: defaultPage,
    disabled: disabled,
    getItemAriaLabel: getItemAriaLabel,
    hideNextButton: hideNextButton,
    hidePrevButton: hidePrevButton,
    renderItem: renderItem,
    shape: shape,
    showFirstButton: showFirstButton,
    showLastButton: showLastButton,
    siblingCount: siblingCount,
    size: size,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(PaginationRoot, _extends({
    "aria-label": "pagination navigation",
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: /*#__PURE__*/_jsx(PaginationUl, {
      className: classes.ul,
      styleProps: styleProps,
      children: items.map(function (item, index) {
        return /*#__PURE__*/_jsx("li", {
          children: renderItem(_extends({}, item, {
            color: color,
            'aria-label': getItemAriaLabel(item.type, item.page, item.selected),
            shape: shape,
            size: size,
            variant: variant
          }))
        }, index);
      })
    })
  }));
}); // @default tags synced with default values from usePagination

process.env.NODE_ENV !== "production" ? Pagination.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount: integerPropType,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The active color.
   * @default 'standard'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['primary', 'secondary', 'standard']), PropTypes.string]),

  /**
   * The total number of pages.
   * @default 1
   */
  count: integerPropType,

  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage: integerPropType,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func,

  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton: PropTypes.bool,

  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton: PropTypes.bool,

  /**
   * Callback fired when the page is changed.
   *
   * @param {React.ChangeEvent<unknown>} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: PropTypes.func,

  /**
   * The current page.
   */
  page: integerPropType,

  /**
   * Render the item.
   * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   * @default (item) => <PaginationItem {...item} />
   */
  renderItem: PropTypes.func,

  /**
   * The shape of the pagination items.
   * @default 'circular'
   */
  shape: PropTypes.oneOf(['circular', 'rounded']),

  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: PropTypes.bool,

  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: PropTypes.bool,

  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount: integerPropType,

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['outlined', 'text']), PropTypes.string])
} : void 0;
export default Pagination;