import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { integerPropType } from '@material-ui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { isFragment } from 'react-is';
import ImageListContext from '../ImageList/ImageListContext';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import isMuiElement from '../utils/isMuiElement';
import imageListItemClasses, { getImageListItemUtilityClass } from './imageListItemClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      variant = styleProps.variant;
  var slots = {
    root: ['root', variant],
    img: ['img']
  };
  return composeClasses(slots, getImageListItemUtilityClass, classes);
};

var ImageListItemRoot = styled('li', {
  name: 'MuiImageListItem',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [_defineProperty({}, "& .".concat(imageListItemClasses.img), styles.img), styles.root, styles[styleProps.variant]];
  }
})(function (_ref2) {
  var styleProps = _ref2.styleProps;
  return _extends({
    display: 'inline-block',
    position: 'relative',
    lineHeight: 0
  }, styleProps.variant === 'standard' && {
    // For titlebar under list item
    display: 'flex',
    flexDirection: 'column'
  }, styleProps.variant === 'woven' && {
    height: '100%',
    alignSelf: 'center',
    '&:nth-of-type(even)': {
      height: '70%'
    }
  }, _defineProperty({}, "& .".concat(imageListItemClasses.img), _extends({
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  }, styleProps.variant === 'standard' && {
    height: 'auto',
    flexGrow: 1
  })));
});
var ImageListItem = /*#__PURE__*/React.forwardRef(function ImageListItem(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiImageListItem'
  }); // TODO: - Use jsdoc @default?: "cols rows default values are for docs only"

  var children = props.children,
      className = props.className,
      _props$cols = props.cols,
      cols = _props$cols === void 0 ? 1 : _props$cols,
      _props$component = props.component,
      component = _props$component === void 0 ? 'li' : _props$component,
      _props$rows = props.rows,
      rows = _props$rows === void 0 ? 1 : _props$rows,
      style = props.style,
      other = _objectWithoutProperties(props, ["children", "className", "cols", "component", "rows", "style"]);

  var _React$useContext = React.useContext(ImageListContext),
      _React$useContext$row = _React$useContext.rowHeight,
      rowHeight = _React$useContext$row === void 0 ? 'auto' : _React$useContext$row,
      gap = _React$useContext.gap,
      variant = _React$useContext.variant;

  var height = 'auto';

  if (variant === 'woven') {
    height = undefined;
  } else if (rowHeight !== 'auto') {
    height = rowHeight * rows + gap * (rows - 1);
  }

  var styleProps = _extends({}, props, {
    cols: cols,
    component: component,
    gap: gap,
    rowHeight: rowHeight,
    rows: rows,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(ImageListItemRoot, _extends({
    as: component,
    className: clsx(classes.root, classes[variant], className),
    ref: ref,
    style: _extends({
      height: height,
      gridColumnEnd: variant !== 'masonry' ? "span ".concat(cols) : undefined,
      gridRowEnd: variant !== 'masonry' ? "span ".concat(rows) : undefined,
      marginBottom: variant === 'masonry' ? gap : undefined
    }, style),
    styleProps: styleProps
  }, other, {
    children: React.Children.map(children, function (child) {
      if (! /*#__PURE__*/React.isValidElement(child)) {
        return null;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (isFragment(child)) {
          console.error(["Material-UI: The ImageListItem component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
        }
      }

      if (child.type === 'img' || isMuiElement(child, ['Image'])) {
        return /*#__PURE__*/React.cloneElement(child, {
          className: clsx(classes.img, child.props.className)
        });
      }

      return child;
    })
  }));
});
process.env.NODE_ENV !== "production" ? ImageListItem.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally an `<img>`.
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
   * Width of the item in number of grid columns.
   * @default 1
   */
  cols: integerPropType,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Height of the item in number of grid rows.
   * @default 1
   */
  rows: integerPropType,

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default ImageListItem;