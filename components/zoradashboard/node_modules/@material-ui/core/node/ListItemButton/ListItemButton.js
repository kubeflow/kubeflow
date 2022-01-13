"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.overridesResolver = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _system = require("@material-ui/system");

var _styled = _interopRequireWildcard(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _useEnhancedEffect = _interopRequireDefault(require("../utils/useEnhancedEffect"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _ListContext = _interopRequireDefault(require("../List/ListContext"));

var _listItemButtonClasses = _interopRequireWildcard(require("./listItemButtonClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["alignItems", "autoFocus", "component", "children", "dense", "disableGutters", "divider", "focusVisibleClassName", "selected"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return [styles.root, styleProps.dense && styles.dense, styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart, styleProps.divider && styles.divider, !styleProps.disableGutters && styles.gutters];
};

exports.overridesResolver = overridesResolver;

const useUtilityClasses = styleProps => {
  const {
    alignItems,
    classes,
    dense,
    disabled,
    disableGutters,
    divider,
    selected
  } = styleProps;
  const slots = {
    root: ['root', dense && 'dense', !disableGutters && 'gutters', divider && 'divider', disabled && 'disabled', alignItems === 'flex-start' && 'alignItemsFlexStart', selected && 'selected']
  };
  const composedClasses = (0, _unstyled.unstable_composeClasses)(slots, _listItemButtonClasses.getListItemButtonUtilityClass, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
};

const ListItemButtonRoot = (0, _styled.default)(_ButtonBase.default, {
  shouldForwardProp: prop => (0, _styled.rootShouldForwardProp)(prop) || prop === 'classes',
  name: 'MuiListItemButton',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  boxSizing: 'border-box',
  textAlign: 'left',
  paddingTop: 8,
  paddingBottom: 8,
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
  [`&.${_listItemButtonClasses.default.selected}`]: {
    backgroundColor: (0, _system.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${_listItemButtonClasses.default.focusVisible}`]: {
      backgroundColor: (0, _system.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${_listItemButtonClasses.default.selected}:hover`]: {
    backgroundColor: (0, _system.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: (0, _system.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  },
  [`&.${_listItemButtonClasses.default.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${_listItemButtonClasses.default.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity
  }
}, styleProps.divider && {
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundClip: 'padding-box'
}, styleProps.alignItems === 'flex-start' && {
  alignItems: 'flex-start'
}, !styleProps.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, styleProps.dense && {
  paddingTop: 4,
  paddingBottom: 4
}));
const ListItemButton = /*#__PURE__*/React.forwardRef(function ListItemButton(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiListItemButton'
  });
  const {
    alignItems = 'center',
    autoFocus = false,
    component = 'div',
    children,
    dense = false,
    disableGutters = false,
    divider = false,
    focusVisibleClassName,
    selected = false
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
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
        console.error('Material-UI: Unable to set focus to a ListItemButton whose component has not been rendered.');
      }
    }
  }, [autoFocus]);
  const styleProps = (0, _extends2.default)({}, props, {
    alignItems,
    dense: childContext.dense,
    disableGutters,
    divider,
    selected
  });
  const classes = useUtilityClasses(styleProps);
  const handleRef = (0, _useForkRef.default)(listItemRef, ref);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListContext.default.Provider, {
    value: childContext,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ListItemButtonRoot, (0, _extends2.default)({
      ref: handleRef,
      component: component,
      focusVisibleClassName: (0, _clsx.default)(classes.focusVisible, focusVisibleClassName),
      styleProps: styleProps
    }, other, {
      classes: classes,
      children: children
    }))
  });
});
process.env.NODE_ENV !== "production" ? ListItemButton.propTypes
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
   */
  autoFocus: _propTypes.default.bool,

  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: _propTypes.default.bool,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: _propTypes.default.bool,

  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: _propTypes.default.bool,

  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: _propTypes.default.string,

  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = ListItemButton;
exports.default = _default;