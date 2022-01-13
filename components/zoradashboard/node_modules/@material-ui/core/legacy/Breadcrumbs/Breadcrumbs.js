import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { integerPropType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Typography from '../Typography';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';
import breadcrumbsClasses, { getBreadcrumbsUtilityClass } from './breadcrumbsClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root'],
    li: ['li'],
    ol: ['ol'],
    separator: ['separator']
  };
  return composeClasses(slots, getBreadcrumbsUtilityClass, classes);
};

var BreadcrumbsRoot = styled(Typography, {
  name: 'MuiBreadcrumbs',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return [_defineProperty({}, "& .".concat(breadcrumbsClasses.li), styles.li), styles.root];
  }
})({});
var BreadcrumbsOl = styled('ol', {
  name: 'MuiBreadcrumbs',
  slot: 'Ol',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.ol;
  }
})({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none'
});
var BreadcrumbsSeparator = styled('li', {
  name: 'MuiBreadcrumbs',
  slot: 'Separator',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.separator;
  }
})({
  display: 'flex',
  userSelect: 'none',
  marginLeft: 8,
  marginRight: 8
});

function insertSeparators(items, className, separator, styleProps) {
  return items.reduce(function (acc, current, index) {
    if (index < items.length - 1) {
      acc = acc.concat(current, /*#__PURE__*/_jsx(BreadcrumbsSeparator, {
        "aria-hidden": true,
        className: className,
        styleProps: styleProps,
        children: separator
      }, "separator-".concat(index)));
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
}

var Breadcrumbs = /*#__PURE__*/React.forwardRef(function Breadcrumbs(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiBreadcrumbs'
  });

  var children = props.children,
      className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'nav' : _props$component,
      _props$expandText = props.expandText,
      expandText = _props$expandText === void 0 ? 'Show path' : _props$expandText,
      _props$itemsAfterColl = props.itemsAfterCollapse,
      itemsAfterCollapse = _props$itemsAfterColl === void 0 ? 1 : _props$itemsAfterColl,
      _props$itemsBeforeCol = props.itemsBeforeCollapse,
      itemsBeforeCollapse = _props$itemsBeforeCol === void 0 ? 1 : _props$itemsBeforeCol,
      _props$maxItems = props.maxItems,
      maxItems = _props$maxItems === void 0 ? 8 : _props$maxItems,
      _props$separator = props.separator,
      separator = _props$separator === void 0 ? '/' : _props$separator,
      other = _objectWithoutProperties(props, ["children", "className", "component", "expandText", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "separator"]);

  var _React$useState = React.useState(false),
      expanded = _React$useState[0],
      setExpanded = _React$useState[1];

  var styleProps = _extends({}, props, {
    component: component,
    expanded: expanded,
    expandText: expandText,
    itemsAfterCollapse: itemsAfterCollapse,
    itemsBeforeCollapse: itemsBeforeCollapse,
    maxItems: maxItems,
    separator: separator
  });

  var classes = useUtilityClasses(styleProps);
  var listRef = React.useRef(null);

  var renderItemsBeforeAndAfter = function renderItemsBeforeAndAfter(allItems) {
    var handleClickExpand = function handleClickExpand() {
      setExpanded(true); // The clicked element received the focus but gets removed from the DOM.
      // Let's keep the focus in the component after expanding.
      // Moving it to the <ol> or <nav> does not cause any announcement in NVDA.
      // By moving it to some link/button at least we have some announcement.

      var focusable = listRef.current.querySelector('a[href],button,[tabindex]');

      if (focusable) {
        focusable.focus();
      }
    }; // This defends against someone passing weird input, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem


    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(['Material-UI: You have provided an invalid combination of props to the Breadcrumbs.', "itemsAfterCollapse={".concat(itemsAfterCollapse, "} + itemsBeforeCollapse={").concat(itemsBeforeCollapse, "} >= maxItems={").concat(maxItems, "}")].join('\n'));
      }

      return allItems;
    }

    return [].concat(_toConsumableArray(allItems.slice(0, itemsBeforeCollapse)), [/*#__PURE__*/_jsx(BreadcrumbCollapsed, {
      "aria-label": expandText,
      onClick: handleClickExpand
    }, "ellipsis")], _toConsumableArray(allItems.slice(allItems.length - itemsAfterCollapse, allItems.length)));
  };

  var allItems = React.Children.toArray(children).filter(function (child) {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(["Material-UI: The Breadcrumbs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return /*#__PURE__*/React.isValidElement(child);
  }).map(function (child, index) {
    return /*#__PURE__*/_jsx("li", {
      className: classes.li,
      children: child
    }, "child-".concat(index));
  });
  return /*#__PURE__*/_jsx(BreadcrumbsRoot, _extends({
    ref: ref,
    component: component,
    color: "text.secondary",
    className: clsx(classes.root, className),
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/_jsx(BreadcrumbsOl, {
      className: classes.ol,
      ref: listRef,
      styleProps: styleProps,
      children: insertSeparators(expanded || maxItems && allItems.length <= maxItems ? allItems : renderItemsBeforeAndAfter(allItems), classes.separator, separator, styleProps)
    })
  }));
});
process.env.NODE_ENV !== "production" ? Breadcrumbs.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

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
   * Override the default label for the expand button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Show path'
   */
  expandText: PropTypes.string,

  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   * @default 1
   */
  itemsAfterCollapse: integerPropType,

  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   * @default 1
   */
  itemsBeforeCollapse: integerPropType,

  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more
   * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
   * will be shown, with an ellipsis in between.
   * @default 8
   */
  maxItems: integerPropType,

  /**
   * Custom separator node.
   * @default '/'
   */
  separator: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Breadcrumbs;