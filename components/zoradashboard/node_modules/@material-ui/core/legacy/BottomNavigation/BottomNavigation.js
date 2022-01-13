import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getBottomNavigationUtilityClass } from './bottomNavigationClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getBottomNavigationUtilityClass, classes);
};

var BottomNavigationRoot = styled('div', {
  name: 'MuiBottomNavigation',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'flex',
    justifyContent: 'center',
    height: 56,
    backgroundColor: theme.palette.background.paper
  };
});
var BottomNavigation = /*#__PURE__*/React.forwardRef(function BottomNavigation(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiBottomNavigation'
  });

  var children = props.children,
      className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'div' : _props$component,
      onChange = props.onChange,
      _props$showLabels = props.showLabels,
      showLabels = _props$showLabels === void 0 ? false : _props$showLabels,
      value = props.value,
      other = _objectWithoutProperties(props, ["children", "className", "component", "onChange", "showLabels", "value"]);

  var styleProps = _extends({}, props, {
    component: component,
    showLabels: showLabels
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(BottomNavigationRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: React.Children.map(children, function (child, childIndex) {
      if (! /*#__PURE__*/React.isValidElement(child)) {
        return null;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (isFragment(child)) {
          console.error(["Material-UI: The BottomNavigation component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
        }
      }

      var childValue = child.props.value === undefined ? childIndex : child.props.value;
      return /*#__PURE__*/React.cloneElement(child, {
        selected: childValue === value,
        showLabel: child.props.showLabel !== undefined ? child.props.showLabel : showLabels,
        value: childValue,
        onChange: onChange
      });
    })
  }));
});
process.env.NODE_ENV !== "production" ? BottomNavigation.propTypes
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
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child.
   */
  onChange: PropTypes.func,

  /**
   * If `true`, all `BottomNavigationAction`s will show their labels.
   * By default, only the selected `BottomNavigationAction` will show its label.
   * @default false
   */
  showLabels: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The value of the currently selected `BottomNavigationAction`.
   */
  value: PropTypes.any
} : void 0;
export default BottomNavigation;