import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import unsupportedProp from '../utils/unsupportedProp';
import bottomNavigationActionClasses, { getBottomNavigationActionUtilityClass } from './bottomNavigationActionClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      showLabel = styleProps.showLabel,
      selected = styleProps.selected;
  var slots = {
    root: ['root', !showLabel && !selected && 'iconOnly', selected && 'selected'],
    label: ['label', !showLabel && !selected && 'iconOnly', selected && 'selected']
  };
  return composeClasses(slots, getBottomNavigationActionUtilityClass, classes);
};

var BottomNavigationActionRoot = styled(ButtonBase, {
  name: 'MuiBottomNavigationAction',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, !styleProps.showLabel && !styleProps.selected && styles.iconOnly];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    transition: theme.transitions.create(['color', 'padding-top'], {
      duration: theme.transitions.duration.short
    }),
    padding: '6px 12px 8px',
    minWidth: 80,
    maxWidth: 168,
    color: theme.palette.text.secondary,
    flexDirection: 'column',
    flex: '1'
  }, !styleProps.showLabel && !styleProps.selected && {
    paddingTop: 16
  }, _defineProperty({}, "&.".concat(bottomNavigationActionClasses.selected), {
    paddingTop: 6,
    color: theme.palette.primary.main
  }));
});
var BottomNavigationActionLabel = styled('span', {
  name: 'MuiBottomNavigationAction',
  slot: 'Label',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.label;
  }
})(function (_ref2) {
  var theme = _ref2.theme,
      styleProps = _ref2.styleProps;
  return _extends({
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    opacity: 1,
    transition: 'font-size 0.2s, opacity 0.2s',
    transitionDelay: '0.1s'
  }, !styleProps.showLabel && !styleProps.selected && {
    opacity: 0,
    transitionDelay: '0s'
  }, _defineProperty({}, "&.".concat(bottomNavigationActionClasses.selected), {
    fontSize: theme.typography.pxToRem(14)
  }));
});
var BottomNavigationAction = /*#__PURE__*/React.forwardRef(function BottomNavigationAction(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiBottomNavigationAction'
  });

  var className = props.className,
      icon = props.icon,
      label = props.label,
      onChange = props.onChange,
      onTouchStart = props.onTouchStart,
      onTouchEnd = props.onTouchEnd,
      onClick = props.onClick,
      selected = props.selected,
      showLabel = props.showLabel,
      value = props.value,
      other = _objectWithoutProperties(props, ["className", "icon", "label", "onChange", "onTouchStart", "onTouchEnd", "onClick", "selected", "showLabel", "value"]);

  var styleProps = props;
  var classes = useUtilityClasses(styleProps);
  var touchStartPos = React.useRef();
  var touchTimer = React.useRef();
  React.useEffect(function () {
    return function () {
      clearTimeout(touchTimer.current);
    };
  }, [touchTimer]);

  var handleTouchStart = function handleTouchStart(event) {
    if (onTouchStart) {
      onTouchStart(event);
    }

    var _event$touches$ = event.touches[0],
        clientX = _event$touches$.clientX,
        clientY = _event$touches$.clientY;
    touchStartPos.current = {
      clientX: clientX,
      clientY: clientY
    };
  };

  var handleTouchEnd = function handleTouchEnd(event) {
    if (onTouchEnd) onTouchEnd(event);
    var target = event.target;
    var _event$changedTouches = event.changedTouches[0],
        clientX = _event$changedTouches.clientX,
        clientY = _event$changedTouches.clientY;

    if (Math.abs(clientX - touchStartPos.current.clientX) < 10 && Math.abs(clientY - touchStartPos.current.clientY) < 10) {
      touchTimer.current = setTimeout(function () {
        // Simulate the native tap behavior on mobile.
        // On the web, a tap won't trigger a click if a container is scrolling.
        //
        // Note that the synthetic behavior won't trigger a native <a> nor
        // it will trigger a click at all on iOS.
        target.dispatchEvent(new Event('click', {
          bubbles: true
        }));
      }, 10);
    }
  };

  var handleChange = function handleChange(event) {
    clearTimeout(touchTimer.current);

    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return /*#__PURE__*/_jsxs(BottomNavigationActionRoot, _extends({
    ref: ref,
    className: clsx(classes.root, className),
    focusRipple: true,
    onClick: handleChange,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    styleProps: styleProps
  }, other, {
    children: [icon, /*#__PURE__*/_jsx(BottomNavigationActionLabel, {
      className: classes.label,
      styleProps: styleProps,
      children: label
    })]
  }));
});
process.env.NODE_ENV !== "production" ? BottomNavigationAction.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The icon to display.
   */
  icon: PropTypes.node,

  /**
   * The label element.
   */
  label: PropTypes.node,

  /**
   * @ignore
   */
  onChange: PropTypes.func,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,

  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,

  /**
   * If `true`, the `BottomNavigationAction` will show its label.
   * By default, only the selected `BottomNavigationAction`
   * inside `BottomNavigation` will show its label.
   *
   * The prop defaults to the value (`false`) inherited from the parent BottomNavigation component.
   */
  showLabel: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any
} : void 0;
export default BottomNavigationAction;