"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _reactIs = require("react-is");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _BreadcrumbCollapsed = _interopRequireDefault(require("./BreadcrumbCollapsed"));

var _breadcrumbsClasses = _interopRequireWildcard(require("./breadcrumbsClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "component", "expandText", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "separator"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root'],
    li: ['li'],
    ol: ['ol'],
    separator: ['separator']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _breadcrumbsClasses.getBreadcrumbsUtilityClass, classes);
};

const BreadcrumbsRoot = (0, _styled.default)(_Typography.default, {
  name: 'MuiBreadcrumbs',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [{
      [`& .${_breadcrumbsClasses.default.li}`]: styles.li
    }, styles.root];
  }
})({});
const BreadcrumbsOl = (0, _styled.default)('ol', {
  name: 'MuiBreadcrumbs',
  slot: 'Ol',
  overridesResolver: (props, styles) => styles.ol
})({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none'
});
const BreadcrumbsSeparator = (0, _styled.default)('li', {
  name: 'MuiBreadcrumbs',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator
})({
  display: 'flex',
  userSelect: 'none',
  marginLeft: 8,
  marginRight: 8
});

function insertSeparators(items, className, separator, styleProps) {
  return items.reduce((acc, current, index) => {
    if (index < items.length - 1) {
      acc = acc.concat(current, /*#__PURE__*/(0, _jsxRuntime.jsx)(BreadcrumbsSeparator, {
        "aria-hidden": true,
        className: className,
        styleProps: styleProps,
        children: separator
      }, `separator-${index}`));
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
}

const Breadcrumbs = /*#__PURE__*/React.forwardRef(function Breadcrumbs(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiBreadcrumbs'
  });
  const {
    children,
    className,
    component = 'nav',
    expandText = 'Show path',
    itemsAfterCollapse = 1,
    itemsBeforeCollapse = 1,
    maxItems = 8,
    separator = '/'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const [expanded, setExpanded] = React.useState(false);
  const styleProps = (0, _extends2.default)({}, props, {
    component,
    expanded,
    expandText,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    maxItems,
    separator
  });
  const classes = useUtilityClasses(styleProps);
  const listRef = React.useRef(null);

  const renderItemsBeforeAndAfter = allItems => {
    const handleClickExpand = () => {
      setExpanded(true); // The clicked element received the focus but gets removed from the DOM.
      // Let's keep the focus in the component after expanding.
      // Moving it to the <ol> or <nav> does not cause any announcement in NVDA.
      // By moving it to some link/button at least we have some announcement.

      const focusable = listRef.current.querySelector('a[href],button,[tabindex]');

      if (focusable) {
        focusable.focus();
      }
    }; // This defends against someone passing weird input, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem


    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(['Material-UI: You have provided an invalid combination of props to the Breadcrumbs.', `itemsAfterCollapse={${itemsAfterCollapse}} + itemsBeforeCollapse={${itemsBeforeCollapse}} >= maxItems={${maxItems}}`].join('\n'));
      }

      return allItems;
    }

    return [...allItems.slice(0, itemsBeforeCollapse), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BreadcrumbCollapsed.default, {
      "aria-label": expandText,
      onClick: handleClickExpand
    }, "ellipsis"), ...allItems.slice(allItems.length - itemsAfterCollapse, allItems.length)];
  };

  const allItems = React.Children.toArray(children).filter(child => {
    if (process.env.NODE_ENV !== 'production') {
      if ((0, _reactIs.isFragment)(child)) {
        console.error(["Material-UI: The Breadcrumbs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return /*#__PURE__*/React.isValidElement(child);
  }).map((child, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
    className: classes.li,
    children: child
  }, `child-${index}`));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(BreadcrumbsRoot, (0, _extends2.default)({
    ref: ref,
    component: component,
    color: "text.secondary",
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(BreadcrumbsOl, {
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
   * Override the default label for the expand button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Show path'
   */
  expandText: _propTypes.default.string,

  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   * @default 1
   */
  itemsAfterCollapse: _utils.integerPropType,

  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   * @default 1
   */
  itemsBeforeCollapse: _utils.integerPropType,

  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more
   * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
   * will be shown, with an ellipsis in between.
   * @default 8
   */
  maxItems: _utils.integerPropType,

  /**
   * Custom separator node.
   * @default '/'
   */
  separator: _propTypes.default.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = Breadcrumbs;
exports.default = _default;