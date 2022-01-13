import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import TableContext from './TableContext';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getTableUtilityClass } from './tableClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      stickyHeader = styleProps.stickyHeader;
  var slots = {
    root: ['root', stickyHeader && 'stickyHeader']
  };
  return composeClasses(slots, getTableUtilityClass, classes);
};

var TableRoot = styled('table', {
  name: 'MuiTable',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.stickyHeader && styles.stickyHeader];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    '& caption': _extends({}, theme.typography.body2, {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      textAlign: 'left',
      captionSide: 'bottom'
    })
  }, styleProps.stickyHeader && {
    borderCollapse: 'separate'
  });
});
var defaultComponent = 'table';
var Table = /*#__PURE__*/React.forwardRef(function Table(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTable'
  });

  var className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? defaultComponent : _props$component,
      _props$padding = props.padding,
      padding = _props$padding === void 0 ? 'normal' : _props$padding,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$stickyHeader = props.stickyHeader,
      stickyHeader = _props$stickyHeader === void 0 ? false : _props$stickyHeader,
      other = _objectWithoutProperties(props, ["className", "component", "padding", "size", "stickyHeader"]);

  var styleProps = _extends({}, props, {
    component: component,
    padding: padding,
    size: size,
    stickyHeader: stickyHeader
  });

  var classes = useUtilityClasses(styleProps);
  var table = React.useMemo(function () {
    return {
      padding: padding,
      size: size,
      stickyHeader: stickyHeader
    };
  }, [padding, size, stickyHeader]);
  return /*#__PURE__*/_jsx(TableContext.Provider, {
    value: table,
    children: /*#__PURE__*/_jsx(TableRoot, _extends({
      as: component,
      role: component === defaultComponent ? null : 'table',
      ref: ref,
      className: clsx(classes.root, className),
      styleProps: styleProps
    }, other))
  });
});
process.env.NODE_ENV !== "production" ? Table.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the table, normally `TableHead` and `TableBody`.
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
   * Allows TableCells to inherit padding of the Table.
   * @default 'normal'
   */
  padding: PropTypes.oneOf(['checkbox', 'none', 'normal']),

  /**
   * Allows TableCells to inherit size of the Table.
   * @default 'medium'
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.string]),

  /**
   * Set the header sticky.
   *
   * ⚠️ It doesn't work with IE11.
   * @default false
   */
  stickyHeader: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Table;