import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '@material-ui/system';
import styled, { rootShouldForwardProp } from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ListContext from '../List/ListContext';
import ButtonBase from '../ButtonBase';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import { dividerClasses } from '../Divider';
import { listItemIconClasses } from '../ListItemIcon';
import { listItemTextClasses } from '../ListItemText';
import menuItemClasses, { getMenuItemUtilityClass } from './menuItemClasses';
import { jsx as _jsx } from "react/jsx-runtime";
export var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return [styles.root, styleProps.dense && styles.dense, styleProps.divider && styles.divider, !styleProps.disableGutters && styles.gutters];
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var disabled = styleProps.disabled,
      dense = styleProps.dense,
      divider = styleProps.divider,
      disableGutters = styleProps.disableGutters,
      selected = styleProps.selected,
      classes = styleProps.classes;
  var slots = {
    root: ['root', dense && 'dense', disabled && 'disabled', !disableGutters && 'gutters', divider && 'divider', selected && 'selected']
  };
  var composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};

var MenuItemRoot = styled(ButtonBase, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return rootShouldForwardProp(prop) || prop === 'classes';
  },
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var _extends2;

  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({}, theme.typography.body1, {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    minHeight: 48,
    paddingTop: 6,
    paddingBottom: 6,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap'
  }, !styleProps.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16
  }, styleProps.divider && {
    borderBottom: "1px solid ".concat(theme.palette.divider),
    backgroundClip: 'padding-box'
  }, (_extends2 = {
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }, _defineProperty(_extends2, "&.".concat(menuItemClasses.selected), _defineProperty({
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
  }, "&.".concat(menuItemClasses.focusVisible), {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  })), _defineProperty(_extends2, "&.".concat(menuItemClasses.selected, ":hover"), {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  }), _defineProperty(_extends2, "&.".concat(menuItemClasses.focusVisible), {
    backgroundColor: theme.palette.action.focus
  }), _defineProperty(_extends2, "&.".concat(menuItemClasses.disabled), {
    opacity: theme.palette.action.disabledOpacity
  }), _defineProperty(_extends2, "& + .".concat(dividerClasses.root), {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }), _defineProperty(_extends2, "& + .".concat(dividerClasses.inset), {
    marginLeft: 52
  }), _defineProperty(_extends2, "& .".concat(listItemTextClasses.root), {
    marginTop: 0,
    marginBottom: 0
  }), _defineProperty(_extends2, "& .".concat(listItemTextClasses.inset), {
    paddingLeft: 36
  }), _defineProperty(_extends2, "& .".concat(listItemIconClasses.root), {
    minWidth: 36
  }), _extends2), !styleProps.dense && _defineProperty({}, theme.breakpoints.up('sm'), {
    minHeight: 'auto'
  }), styleProps.dense && _extends({
    minHeight: 36
  }, theme.typography.body2, _defineProperty({}, "& .".concat(listItemIconClasses.root, " svg"), {
    fontSize: '1.25rem'
  })));
});
var MenuItem = /*#__PURE__*/React.forwardRef(function MenuItem(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiMenuItem'
  });

  var _props$autoFocus = props.autoFocus,
      autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
      _props$component = props.component,
      component = _props$component === void 0 ? 'li' : _props$component,
      _props$dense = props.dense,
      dense = _props$dense === void 0 ? false : _props$dense,
      _props$divider = props.divider,
      divider = _props$divider === void 0 ? false : _props$divider,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      focusVisibleClassName = props.focusVisibleClassName,
      _props$role = props.role,
      role = _props$role === void 0 ? 'menuitem' : _props$role,
      tabIndexProp = props.tabIndex,
      other = _objectWithoutProperties(props, ["autoFocus", "component", "dense", "divider", "disableGutters", "focusVisibleClassName", "role", "tabIndex"]);

  var context = React.useContext(ListContext);
  var childContext = {
    dense: dense || context.dense || false,
    disableGutters: disableGutters
  };
  var menuItemRef = React.useRef(null);
  useEnhancedEffect(function () {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('Material-UI: Unable to set focus to a MenuItem whose component has not been rendered.');
      }
    }
  }, [autoFocus]);

  var styleProps = _extends({}, props, {
    dense: childContext.dense,
    divider: divider,
    disableGutters: disableGutters
  });

  var classes = useUtilityClasses(props);
  var handleRef = useForkRef(menuItemRef, ref);
  var tabIndex;

  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return /*#__PURE__*/_jsx(ListContext.Provider, {
    value: childContext,
    children: /*#__PURE__*/_jsx(MenuItemRoot, _extends({
      ref: handleRef,
      role: role,
      tabIndex: tabIndex,
      component: component,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName)
    }, other, {
      styleProps: styleProps,
      classes: classes
    }))
  });
});
process.env.NODE_ENV !== "production" ? MenuItem.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent Menu component.
   * @default false
   */
  dense: PropTypes.bool,

  /**
   * @ignore
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,

  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider: PropTypes.bool,

  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * @ignore
   */
  role: PropTypes
  /* @typescript-to-proptypes-ignore */
  .string,

  /**
   * @ignore
   */
  selected: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * @default 0
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} : void 0;
export default MenuItem;