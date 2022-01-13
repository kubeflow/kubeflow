import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses, isHostComponent } from '@material-ui/unstyled';
import { chainPropTypes, elementTypeAcceptingRef } from '@material-ui/utils';
import { alpha } from '@material-ui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import isMuiElement from '../utils/isMuiElement';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import ListContext from '../List/ListContext';
import listItemClasses, { getListItemUtilityClass } from './listItemClasses';
import { listItemButtonClasses } from '../ListItemButton';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return [styles.root, styleProps.dense && styles.dense, styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart, styleProps.divider && styles.divider, !styleProps.disableGutters && styles.gutters, !styleProps.disablePadding && styles.padding, styleProps.button && styles.button, styleProps.hasSecondaryAction && styles.secondaryAction];
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var alignItems = styleProps.alignItems,
      button = styleProps.button,
      classes = styleProps.classes,
      dense = styleProps.dense,
      disabled = styleProps.disabled,
      disableGutters = styleProps.disableGutters,
      disablePadding = styleProps.disablePadding,
      divider = styleProps.divider,
      hasSecondaryAction = styleProps.hasSecondaryAction,
      selected = styleProps.selected;
  var slots = {
    root: ['root', dense && 'dense', !disableGutters && 'gutters', !disablePadding && 'padding', divider && 'divider', disabled && 'disabled', button && 'button', alignItems === 'flex-start' && 'alignItemsFlexStart', hasSecondaryAction && 'secondaryAction', selected && 'selected'],
    container: ['container']
  };
  return composeClasses(slots, getListItemUtilityClass, classes);
};

export var ListItemRoot = styled('div', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var _extends2;

  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'left'
  }, !styleProps.disablePadding && _extends({
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
  }), !!styleProps.secondaryAction && _defineProperty({}, "& > .".concat(listItemButtonClasses.root), {
    paddingRight: 48
  }), (_extends2 = {}, _defineProperty(_extends2, "&.".concat(listItemClasses.focusVisible), {
    backgroundColor: theme.palette.action.focus
  }), _defineProperty(_extends2, "&.".concat(listItemClasses.selected), _defineProperty({
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
  }, "&.".concat(listItemClasses.focusVisible), {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  })), _defineProperty(_extends2, "&.".concat(listItemClasses.disabled), {
    opacity: theme.palette.action.disabledOpacity
  }), _extends2), styleProps.alignItems === 'flex-start' && {
    alignItems: 'flex-start'
  }, styleProps.divider && {
    borderBottom: "1px solid ".concat(theme.palette.divider),
    backgroundClip: 'padding-box'
  }, styleProps.button && _defineProperty({
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
    }
  }, "&.".concat(listItemClasses.selected, ":hover"), {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  }), styleProps.hasSecondaryAction && {
    // Add some space to avoid collision as `ListItemSecondaryAction`
    // is absolutely positioned.
    paddingRight: 48
  });
});
var ListItemContainer = styled('li', {
  name: 'MuiListItem',
  slot: 'Container',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.container;
  }
})({
  position: 'relative'
});
/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */

var ListItem = /*#__PURE__*/React.forwardRef(function ListItem(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiListItem'
  });
  var _props$alignItems = props.alignItems,
      alignItems = _props$alignItems === void 0 ? 'center' : _props$alignItems,
      _props$autoFocus = props.autoFocus,
      autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
      _props$button = props.button,
      button = _props$button === void 0 ? false : _props$button,
      childrenProp = props.children,
      className = props.className,
      componentProp = props.component,
      _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      _props$ContainerCompo = props.ContainerComponent,
      ContainerComponent = _props$ContainerCompo === void 0 ? 'li' : _props$ContainerCompo,
      _props$ContainerProps = props.ContainerProps;
  _props$ContainerProps = _props$ContainerProps === void 0 ? {} : _props$ContainerProps;

  var ContainerClassName = _props$ContainerProps.className,
      ContainerProps = _objectWithoutProperties(_props$ContainerProps, ["className"]),
      _props$dense = props.dense,
      dense = _props$dense === void 0 ? false : _props$dense,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      _props$disablePadding = props.disablePadding,
      disablePadding = _props$disablePadding === void 0 ? false : _props$disablePadding,
      _props$divider = props.divider,
      divider = _props$divider === void 0 ? false : _props$divider,
      focusVisibleClassName = props.focusVisibleClassName,
      secondaryAction = props.secondaryAction,
      _props$selected = props.selected,
      selected = _props$selected === void 0 ? false : _props$selected,
      other = _objectWithoutProperties(props, ["alignItems", "autoFocus", "button", "children", "className", "component", "components", "componentsProps", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "disablePadding", "divider", "focusVisibleClassName", "secondaryAction", "selected"]);

  var context = React.useContext(ListContext);
  var childContext = {
    dense: dense || context.dense || false,
    alignItems: alignItems,
    disableGutters: disableGutters
  };
  var listItemRef = React.useRef(null);
  useEnhancedEffect(function () {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('Material-UI: Unable to set focus to a ListItem whose component has not been rendered.');
      }
    }
  }, [autoFocus]);
  var children = React.Children.toArray(childrenProp); // v4 implementation, deprecated in v5, will be removed in v6

  var hasSecondaryAction = children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction']);

  var styleProps = _extends({}, props, {
    alignItems: alignItems,
    autoFocus: autoFocus,
    button: button,
    dense: childContext.dense,
    disabled: disabled,
    disableGutters: disableGutters,
    disablePadding: disablePadding,
    divider: divider,
    hasSecondaryAction: hasSecondaryAction,
    selected: selected
  });

  var classes = useUtilityClasses(styleProps);
  var handleRef = useForkRef(listItemRef, ref);
  var Root = components.Root || ListItemRoot;
  var rootProps = componentsProps.root || {};

  var componentProps = _extends({
    className: clsx(classes.root, rootProps.className, className),
    disabled: disabled
  }, other);

  var Component = componentProp || 'li';

  if (button) {
    componentProps.component = componentProp || 'div';
    componentProps.focusVisibleClassName = clsx(listItemClasses.focusVisible, focusVisibleClassName);
    Component = ButtonBase;
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

    return /*#__PURE__*/_jsx(ListContext.Provider, {
      value: childContext,
      children: /*#__PURE__*/_jsxs(ListItemContainer, _extends({
        as: ContainerComponent,
        className: clsx(classes.container, ContainerClassName),
        ref: handleRef,
        styleProps: styleProps
      }, ContainerProps, {
        children: [/*#__PURE__*/_jsx(Root, _extends({}, rootProps, !isHostComponent(Root) && {
          as: Component,
          styleProps: _extends({}, styleProps, rootProps.styleProps)
        }, componentProps, {
          children: children
        })), children.pop()]
      }))
    });
  }

  return /*#__PURE__*/_jsx(ListContext.Provider, {
    value: childContext,
    children: /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, {
      as: Component,
      ref: handleRef,
      styleProps: styleProps
    }, !isHostComponent(Root) && {
      styleProps: _extends({}, styleProps, rootProps.styleProps)
    }, componentProps, {
      children: [children, secondaryAction && /*#__PURE__*/_jsx(ListItemSecondaryAction, {
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
  alignItems: PropTypes.oneOf(['center', 'flex-start']),

  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  autoFocus: PropTypes.bool,

  /**
   * If `true`, the list item is a button (using `ButtonBase`). Props intended
   * for `ButtonBase` can then be applied to `ListItem`.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  button: PropTypes.bool,

  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: chainPropTypes(PropTypes.node, function (props) {
    var children = React.Children.toArray(props.children); // React.Children.toArray(props.children).findLastIndex(isListItemSecondaryAction)

    var secondaryActionIndex = -1;

    for (var i = children.length - 1; i >= 0; i -= 1) {
      var child = children[i];

      if (isMuiElement(child, ['ListItemSecondaryAction'])) {
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
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   * @deprecated
   */
  ContainerComponent: elementTypeAcceptingRef,

  /**
   * Props applied to the container component if used.
   * @default {}
   * @deprecated
   */
  ContainerProps: PropTypes.object,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,

  /**
   * If `true`, the component is disabled.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,

  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding: PropTypes.bool,

  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: PropTypes.bool,

  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction: PropTypes.node,

  /**
   * Use to apply selected styling.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  selected: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default ListItem;