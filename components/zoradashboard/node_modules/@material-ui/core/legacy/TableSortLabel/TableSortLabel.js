import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import ButtonBase from '../ButtonBase';
import ArrowDownwardIcon from '../internal/svg-icons/ArrowDownward';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import tableSortLabelClasses, { getTableSortLabelUtilityClass } from './tableSortLabelClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      direction = styleProps.direction,
      active = styleProps.active;
  var slots = {
    root: ['root', active && 'active'],
    icon: ['icon', "iconDirection".concat(capitalize(direction))]
  };
  return composeClasses(slots, getTableSortLabelUtilityClass, classes);
};

var TableSortLabelRoot = styled(ButtonBase, {
  name: 'MuiTableSortLabel',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.active && styles.active];
  }
})(function (_ref) {
  var theme = _ref.theme;
  return _defineProperty({
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'inherit',
    alignItems: 'center',
    '&:focus': {
      color: theme.palette.text.secondary
    },
    '&:hover': _defineProperty({
      color: theme.palette.text.secondary
    }, "& .".concat(tableSortLabelClasses.icon), {
      opacity: 0.5
    })
  }, "&.".concat(tableSortLabelClasses.active), _defineProperty({
    color: theme.palette.text.primary
  }, "& .".concat(tableSortLabelClasses.icon), {
    opacity: 1,
    color: theme.palette.text.secondary
  }));
});
var TableSortLabelIcon = styled('span', {
  name: 'MuiTableSortLabel',
  slot: 'Icon',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.icon, styles["iconDirection".concat(capitalize(styleProps.direction))]];
  }
})(function (_ref3) {
  var theme = _ref3.theme,
      styleProps = _ref3.styleProps;
  return _extends({
    fontSize: 18,
    marginRight: 4,
    marginLeft: 4,
    opacity: 0,
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shorter
    }),
    userSelect: 'none'
  }, styleProps.direction === 'desc' && {
    transform: 'rotate(0deg)'
  }, styleProps.direction === 'asc' && {
    transform: 'rotate(180deg)'
  });
});
/**
 * A button based label for placing inside `TableCell` for column sorting.
 */

var TableSortLabel = /*#__PURE__*/React.forwardRef(function TableSortLabel(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTableSortLabel'
  });

  var _props$active = props.active,
      active = _props$active === void 0 ? false : _props$active,
      children = props.children,
      className = props.className,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'asc' : _props$direction,
      _props$hideSortIcon = props.hideSortIcon,
      hideSortIcon = _props$hideSortIcon === void 0 ? false : _props$hideSortIcon,
      _props$IconComponent = props.IconComponent,
      IconComponent = _props$IconComponent === void 0 ? ArrowDownwardIcon : _props$IconComponent,
      other = _objectWithoutProperties(props, ["active", "children", "className", "direction", "hideSortIcon", "IconComponent"]);

  var styleProps = _extends({}, props, {
    active: active,
    direction: direction,
    hideSortIcon: hideSortIcon,
    IconComponent: IconComponent
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(TableSortLabelRoot, _extends({
    className: clsx(classes.root, className),
    component: "span",
    disableRipple: true,
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: [children, hideSortIcon && !active ? null : /*#__PURE__*/_jsx(TableSortLabelIcon, {
      as: IconComponent,
      className: clsx(classes.icon),
      styleProps: styleProps
    })]
  }));
});
process.env.NODE_ENV !== "production" ? TableSortLabel.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   * @default false
   */
  active: PropTypes.bool,

  /**
   * Label contents, the arrow will be appended automatically.
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
   * The current sort direction.
   * @default 'asc'
   */
  direction: PropTypes.oneOf(['asc', 'desc']),

  /**
   * Hide sort icon when active is false.
   * @default false
   */
  hideSortIcon: PropTypes.bool,

  /**
   * Sort icon to use.
   * @default ArrowDownwardIcon
   */
  IconComponent: PropTypes.elementType,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default TableSortLabel;