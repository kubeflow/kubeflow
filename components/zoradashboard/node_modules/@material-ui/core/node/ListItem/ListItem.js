"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ListItemRoot = exports.overridesResolver = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _utils = require("@material-ui/utils");

var _system = require("@material-ui/system");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _isMuiElement = _interopRequireDefault(require("../utils/isMuiElement"));

var _useEnhancedEffect = _interopRequireDefault(require("../utils/useEnhancedEffect"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _ListContext = _interopRequireDefault(require("../List/ListContext"));

var _listItemClasses = _interopRequireWildcard(require("./listItemClasses"));

var _ListItemButton = require("../ListItemButton");

var _ListItemSecondaryAction = _interopRequireDefault(require("../ListItemSecondaryAction"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className"],
      _excluded2 = ["alignItems", "autoFocus", "button", "children", "className", "component", "components", "componentsProps", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "disablePadding", "divider", "focusVisibleClassName", "secondaryAction", "selected"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return [styles.root, styleProps.dense && styles.dense, styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart, styleProps.divider && styles.divider, !styleProps.disableGutters && styles.gutters, !styleProps.disablePadding && styles.padding, styleProps.button && styles.button, styleProps.hasSecondaryAction && styles.secondaryAction];
};

exports.overridesResolver = overridesResolver;

const useUtilityClasses = styleProps => {
  const {
    alignItems,
    button,
    classes,
    dense,
    disabled,
    disableGutters,
    disablePadding,
    divider,
    hasSecondaryAction,
    selected
  } = styleProps;
  const slots = {
    root: ['root', dense && 'dense', !disableGutters && 'gutters', !disablePadding && 'padding', divider && 'divider', disabled && 'disabled', button && 'button', alignItems === 'flex-start' && 'alignItemsFlexStart', hasSecondaryAction && 'secondaryAction', selected && 'selected'],
    container: ['container']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _listItemClasses.getListItemUtilityClass, classes);
};

const ListItemRoot = (0, _styled.default)('div', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'left'
}, !styleProps.disablePadding && (0, _extends2.default)({
  paddingTop: 8,
  paddingBottom: 8
}, styleProps.dense && {
  paddingTop: 4,
  paddingBottom: 4
}, !styleProps.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, !!styleProps.secondaryAction && {
  // Add some space to avoid collision as `ListItemSecondaryAction`
  // is absolutely positioned.
  paddingRight: 48
}), !!styleProps.secondaryAction && {
  [`& > .${_ListItemButton.listItemButtonClasses.root}`]: {
    paddingRight: 48
  }
}, {
  [`&.${_listItemClasses.default.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${_listItemClasses.default.selected}`]: {
    backgroundColor: (0, _system.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${_listItemClasses.default.focusVisible}`]: {
      backgroundColor: (0, _system.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${_listItemClasses.default.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity
  }
}, styleProps.alignItems === 'flex-start' && {
  alignItems: 'flex-start'
}, styleProps.divider && {
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundClip: 'padding-box'
}, styleProps.button && {
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: theme.palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${_listItemClasses.default.selected}:hover`]: {
    backgroundColor: (0, _system.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: (0, _system.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  }
}, styleProps.hasSecondaryAction && {
  // Add some space to avoid collision as `ListItemSecondaryAction`
  // is absolutely positioned.
  paddingRight: 48
}));
exports.ListItemRoot = ListItemRoot;
const ListItemContainer = (0, _styled.default)('li', {
  name: 'MuiListItem',
  slot: 'Container',
  overridesResolver: (props, styles) => styles.container
})({
  position: 'relative'
});
/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */

const ListItem = /*#__PURE__*/React.forwardRef(function ListItem(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiListItem'
  });
  const {
    alignItems = 'center',
    autoFocus = false,
    button = false,
    children: childrenProp,
    className,
    component: componentProp,
    components = {},
    componentsProps = {},
    ContainerComponent = 'li',
    ContainerProps: {
      className: ContainerClassName
    } = {},
    dense = false,
    disabled = false,
    disableGutters = false,
    disablePadding = false,
    divider = false,
    focusVisibleClassName,
    secondaryAction,
    selected = false
  } = props,
        ContainerProps = (0, _objectWithoutPropertiesLoose2.default)(props.ContainerProps, _excluded),
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded2);
  const context = React.useContext(_ListContext.default);
  const childContext = {
    dense: dense || context.dense || false,
    alignItems,
    disableGutters
  };
  const listItemRef = React.useRef(null);
  (0, _useEnhancedEffect.default)(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('Material-UI: Unable to set focus to a ListItem whose component has not been rendered.');
      }
    }
  }, [autoFocus]);
  const children = React.Children.toArray(childrenProp); // v4 implementation, deprecated in v5, will be removed in v6

  const hasSecondaryAction = children.length && (0, _isMuiElement.default)(children[children.length - 1], ['ListItemSecondaryAction']);
  const styleProps = (0, _extends2.default)({}, props, {
    alignItems,
    autoFocus,
    button,
    dense: childContext.dense,
    disabled,
    disableGutters,
    disablePadding,
    divider,
    hasSecondaryAction,
    selected
  });
  const classes = useUtilityClasses(styleProps);
  const handleRef = (0, _useForkRef.default)(listItemRef, ref);
  const Root = components.Root || ListItemRoot;
  const rootProps = componentsProps.root || {};
  const componentProps = (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, rootProps.className, className),
    disabled
  }, other);
  let Component = componentProp || 'li';

  if (button) {
    componentProps.component = componentProp || 'div';
    componentProps.focusVisibleClassName = (0, _clsx.default)(_listItemClasses.default.focusVisible, focusVisibleClassName);
    Component = _ButtonBase.default;
  } // v4 implementation, deprecated in v5, will be removed in v6


  if (hasSecondaryAction) {
    // Use div by default.
    Component = !componentProps.component && !componentProp ? 'div' : Component; // Avoid nesting of li > li.

    if (ContainerComponent === 'li') {
      if (Component === 'li') {
        Component = 'div';
      } else if (componentProps.component === 'li') {
        componentProps.component = 'div';
      }
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListContext.default.Provider, {
      value: childContext,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(ListItemContainer, (0, _extends2.default)({
        as: ContainerComponent,
        className: (0, _clsx.default)(classes.container, ContainerClassName),
        ref: handleRef,
        styleProps: styleProps
      }, ContainerProps, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Root, (0, _extends2.default)({}, rootProps, !(0, _unstyled.isHostComponent)(Root) && {
          as: Component,
          styleProps: (0, _extends2.default)({}, styleProps, rootProps.styleProps)
        }, componentProps, {
          children: children
        })), children.pop()]
      }))
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListContext.default.Provider, {
    value: childContext,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(Root, (0, _extends2.default)({}, rootProps, {
      as: Component,
      ref: handleRef,
      styleProps: styleProps
    }, !(0, _unstyled.isHostComponent)(Root) && {
      styleProps: (0, _extends2.default)({}, styleProps, rootProps.styleProps)
    }, componentProps, {
      children: [children, secondaryAction && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemSecondaryAction.default, {
        children: secondaryAction
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" ? ListItem.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: _propTypes.default.oneOf(['center', 'flex-start']),

  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  autoFocus: _propTypes.default.bool,

  /**
   * If `true`, the list item is a button (using `ButtonBase`). Props intended
   * for `ButtonBase` can then be applied to `ListItem`.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  button: _propTypes.default.bool,

  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: (0, _utils.chainPropTypes)(_propTypes.default.node, props => {
    const children = React.Children.toArray(props.children); // React.Children.toArray(props.children).findLastIndex(isListItemSecondaryAction)

    let secondaryActionIndex = -1;

    for (let i = children.length - 1; i >= 0; i -= 1) {
      const child = children[i];

      if ((0, _isMuiElement.default)(child, ['ListItemSecondaryAction'])) {
        secondaryActionIndex = i;
        break;
      }
    } //  is ListItemSecondaryAction the last child of ListItem


    if (secondaryActionIndex !== -1 && secondaryActionIndex !== children.length - 1) {
      return new Error('Material-UI: You used an element after ListItemSecondaryAction. ' + 'For ListItem to detect that it has a secondary action ' + 'you must pass it as the last child to ListItem.');
    }

    return null;
  }),

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
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: _propTypes.default.shape({
    Root: _propTypes.default.elementType
  }),

  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: _propTypes.default.object,

  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   * @deprecated
   */
  ContainerComponent: _utils.elementTypeAcceptingRef,

  /**
   * Props applied to the container component if used.
   * @default {}
   * @deprecated
   */
  ContainerProps: _propTypes.default.object,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: _propTypes.default.bool,

  /**
   * If `true`, the component is disabled.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: _propTypes.default.bool,

  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding: _propTypes.default.bool,

  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: _propTypes.default.bool,

  /**
   * @ignore
   */
  focusVisibleClassName: _propTypes.default.string,

  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction: _propTypes.default.node,

  /**
   * Use to apply selected styling.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  selected: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = ListItem;
exports.default = _default;