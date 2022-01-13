import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { integerPropType } from '@material-ui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getImageListUtilityClass } from './imageListClasses';
import ImageListContext from './ImageListContext';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      variant = styleProps.variant;
  var slots = {
    root: ['root', variant]
  };
  return composeClasses(slots, getImageListUtilityClass, classes);
};

var ImageListRoot = styled('ul', {
  name: 'MuiImageList',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles[styleProps.variant]];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
    display: 'grid',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    // Add iOS momentum scrolling for iOS < 13.0
    WebkitOverflowScrolling: 'touch'
  }, styleProps.variant === 'masonry' && {
    display: 'block'
  });
});
var ImageList = /*#__PURE__*/React.forwardRef(function ImageList(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiImageList'
  });

  var children = props.children,
      className = props.className,
      _props$cols = props.cols,
      cols = _props$cols === void 0 ? 2 : _props$cols,
      _props$component = props.component,
      component = _props$component === void 0 ? 'ul' : _props$component,
      _props$rowHeight = props.rowHeight,
      rowHeight = _props$rowHeight === void 0 ? 'auto' : _props$rowHeight,
      _props$gap = props.gap,
      gap = _props$gap === void 0 ? 4 : _props$gap,
      styleProp = props.style,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      other = _objectWithoutProperties(props, ["children", "className", "cols", "component", "rowHeight", "gap", "style", "variant"]);

  var contextValue = React.useMemo(function () {
    return {
      rowHeight: rowHeight,
      gap: gap,
      variant: variant
    };
  }, [rowHeight, gap, variant]);
  React.useEffect(function () {
    if (process.env.NODE_ENV !== 'production') {
      // Detect Internet Explorer 8+
      if (document !== undefined && 'objectFit' in document.documentElement.style === false) {
        console.error(['Material-UI: ImageList v5+ no longer natively supports Internet Explorer.', 'Use v4 of this component instead, or polyfill CSS object-fit.'].join('\n'));
      }
    }
  }, []);
  var style = variant === 'masonry' ? _extends({
    columnCount: cols,
    columnGap: gap
  }, styleProp) : _extends({
    gridTemplateColumns: "repeat(".concat(cols, ", 1fr)"),
    gap: gap
  }, styleProp);

  var styleProps = _extends({}, props, {
    component: component,
    gap: gap,
    rowHeight: rowHeight,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(ImageListRoot, _extends({
    as: component,
    className: clsx(classes.root, classes[variant], className),
    ref: ref,
    style: style,
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/_jsx(ImageListContext.Provider, {
      value: contextValue,
      children: children
    })
  }));
});
process.env.NODE_ENV !== "production" ? ImageList.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally `ImageListItem`s.
   */
  children: PropTypes
  /* @typescript-to-proptypes-ignore */
  .node.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Number of columns.
   * @default 2
   */
  cols: integerPropType,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * The gap between items in px.
   * @default 4
   */
  gap: PropTypes.number,

  /**
   * The height of one row in px.
   * @default 'auto'
   */
  rowHeight: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['masonry', 'quilted', 'standard', 'woven']), PropTypes.string])
} : void 0;
export default ImageList;