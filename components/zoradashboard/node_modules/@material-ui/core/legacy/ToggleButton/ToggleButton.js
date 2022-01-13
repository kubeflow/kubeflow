import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
// @inheritedComponent ButtonBase
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '../styles';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import toggleButtonClasses, { getToggleButtonUtilityClass } from './toggleButtonClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      fullWidth = styleProps.fullWidth,
      selected = styleProps.selected,
      disabled = styleProps.disabled,
      size = styleProps.size,
      color = styleProps.color;
  var slots = {
    root: ['root', selected && 'selected', disabled && 'disabled', fullWidth && 'fullWidth', "size".concat(capitalize(size)), color]
  };
  return composeClasses(slots, getToggleButtonUtilityClass, classes);
};

var ToggleButtonRoot = styled(ButtonBase, {
  name: 'MuiToggleButton',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles["size".concat(capitalize(styleProps.size))]];
  }
})(function (_ref) {
  var _extends2;

  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  var selectedColor = styleProps.color === 'standard' ? theme.palette.text.primary : theme.palette[styleProps.color].main;
  return _extends({}, theme.typography.button, {
    borderRadius: theme.shape.borderRadius,
    padding: 11,
    border: "1px solid ".concat(theme.palette.divider),
    color: theme.palette.action.active
  }, styleProps.fullWidth && {
    width: '100%'
  }, (_extends2 = {}, _defineProperty(_extends2, "&.".concat(toggleButtonClasses.disabled), {
    color: theme.palette.action.disabled,
    border: "1px solid ".concat(theme.palette.action.disabledBackground)
  }), _defineProperty(_extends2, '&:hover', {
    textDecoration: 'none',
    // Reset on mouse devices
    backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }), _defineProperty(_extends2, "&.".concat(toggleButtonClasses.selected), {
    color: selectedColor,
    backgroundColor: alpha(selectedColor, theme.palette.action.selectedOpacity),
    '&:hover': {
      backgroundColor: alpha(selectedColor, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: alpha(selectedColor, theme.palette.action.selectedOpacity)
      }
    }
  }), _extends2), styleProps.size === 'small' && {
    padding: 7,
    fontSize: theme.typography.pxToRem(13)
  }, styleProps.size === 'large' && {
    padding: 15,
    fontSize: theme.typography.pxToRem(15)
  });
});
var ToggleButton = /*#__PURE__*/React.forwardRef(function ToggleButton(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiToggleButton'
  });

  var children = props.children,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'standard' : _props$color,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      onChange = props.onChange,
      onClick = props.onClick,
      selected = props.selected,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      value = props.value,
      other = _objectWithoutProperties(props, ["children", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "onChange", "onClick", "selected", "size", "value"]);

  var styleProps = _extends({}, props, {
    color: color,
    disabled: disabled,
    disableFocusRipple: disableFocusRipple,
    fullWidth: fullWidth,
    size: size
  });

  var classes = useUtilityClasses(styleProps);

  var handleChange = function handleChange(event) {
    if (onClick) {
      onClick(event, value);

      if (event.defaultPrevented) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return /*#__PURE__*/_jsx(ToggleButtonRoot, _extends({
    className: clsx(classes.root, className),
    color: color,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    ref: ref,
    onClick: handleChange,
    onChange: onChange,
    value: value,
    styleProps: styleProps,
    "aria-pressed": selected
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? ToggleButton.propTypes
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
   * The color of the button when it is in an active state.
   * @default 'standard'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,

  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,

  /**
   * @ignore
   */
  onChange: PropTypes.func,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * If `true`, the button is rendered in an active state.
   */
  selected: PropTypes.bool,

  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: PropTypes.any.isRequired
} : void 0;
export default ToggleButton;