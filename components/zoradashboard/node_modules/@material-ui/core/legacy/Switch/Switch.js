import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
// @inheritedComponent IconButton
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha, darken, lighten } from '@material-ui/system';
import capitalize from '../utils/capitalize';
import SwitchBase from '../internal/SwitchBase';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      edge = styleProps.edge,
      size = styleProps.size,
      color = styleProps.color,
      checked = styleProps.checked,
      disabled = styleProps.disabled;
  var slots = {
    root: ['root', edge && "edge".concat(capitalize(edge)), "size".concat(capitalize(size))],
    switchBase: ['switchBase', "color".concat(capitalize(color)), checked && 'checked', disabled && 'disabled'],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input']
  };
  var composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};

var SwitchRoot = styled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.edge && styles["edge".concat(capitalize(styleProps.edge))], styles["size".concat(capitalize(styleProps.size))]];
  }
})(function (_ref) {
  var _ref2;

  var styleProps = _ref.styleProps;
  return _extends({
    display: 'inline-flex',
    width: 34 + 12 * 2,
    height: 14 + 12 * 2,
    overflow: 'hidden',
    padding: 12,
    boxSizing: 'border-box',
    position: 'relative',
    flexShrink: 0,
    zIndex: 0,
    // Reset the stacking context.
    verticalAlign: 'middle',
    // For correct alignment with the text.
    '@media print': {
      colorAdjust: 'exact'
    }
  }, styleProps.edge === 'start' && {
    marginLeft: -8
  }, styleProps.edge === 'end' && {
    marginRight: -8
  }, styleProps.size === 'small' && (_ref2 = {
    width: 40,
    height: 24,
    padding: 7
  }, _defineProperty(_ref2, "& .".concat(switchClasses.thumb), {
    width: 16,
    height: 16
  }), _defineProperty(_ref2, "& .".concat(switchClasses.switchBase), _defineProperty({
    padding: 4
  }, "&.".concat(switchClasses.checked), {
    transform: 'translateX(16px)'
  })), _ref2));
});
var SwitchSwitchBase = styled(SwitchBase, {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.switchBase, styles.input, styleProps.color !== 'default' && styles["color".concat(capitalize(styleProps.color))]];
  }
})(function (_ref3) {
  var _ref4;

  var theme = _ref3.theme;
  return _ref4 = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    // Render above the focus ripple.
    color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300],
    transition: theme.transitions.create(['left', 'transform'], {
      duration: theme.transitions.duration.shortest
    })
  }, _defineProperty(_ref4, "&.".concat(switchClasses.checked), {
    transform: 'translateX(20px)'
  }), _defineProperty(_ref4, "&.".concat(switchClasses.disabled), {
    color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
  }), _defineProperty(_ref4, "&.".concat(switchClasses.checked, " + .").concat(switchClasses.track), {
    opacity: 0.5
  }), _defineProperty(_ref4, "&.".concat(switchClasses.disabled, " + .").concat(switchClasses.track), {
    opacity: theme.palette.mode === 'light' ? 0.12 : 0.2
  }), _defineProperty(_ref4, "& .".concat(switchClasses.input), {
    left: '-100%',
    width: '300%'
  }), _ref4;
}, function (_ref5) {
  var _ref6;

  var theme = _ref5.theme,
      styleProps = _ref5.styleProps;
  return _extends({
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }, styleProps.color !== 'default' && (_ref6 = {}, _defineProperty(_ref6, "&.".concat(switchClasses.checked), _defineProperty({
    color: theme.palette[styleProps.color].main,
    '&:hover': {
      backgroundColor: alpha(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }, "&.".concat(switchClasses.disabled), {
    color: theme.palette.mode === 'light' ? lighten(theme.palette[styleProps.color].main, 0.62) : darken(theme.palette[styleProps.color].main, 0.55)
  })), _defineProperty(_ref6, "&.".concat(switchClasses.checked, " + .").concat(switchClasses.track), {
    backgroundColor: theme.palette[styleProps.color].main
  }), _ref6));
});
var SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.track;
  }
})(function (_ref7) {
  var theme = _ref7.theme;
  return {
    height: '100%',
    width: '100%',
    borderRadius: 14 / 2,
    zIndex: -1,
    transition: theme.transitions.create(['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest
    }),
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
    opacity: theme.palette.mode === 'light' ? 0.38 : 0.3
  };
});
var SwitchThumb = styled('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.thumb;
  }
})(function (_ref8) {
  var theme = _ref8.theme;
  return {
    boxShadow: theme.shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%'
  };
});
var Switch = /*#__PURE__*/React.forwardRef(function Switch(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiSwitch'
  });

  var className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      _props$edge = props.edge,
      edge = _props$edge === void 0 ? false : _props$edge,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      sx = props.sx,
      other = _objectWithoutProperties(props, ["className", "color", "edge", "size", "sx"]);

  var styleProps = _extends({}, props, {
    color: color,
    edge: edge,
    size: size
  });

  var classes = useUtilityClasses(styleProps);

  var icon = /*#__PURE__*/_jsx(SwitchThumb, {
    className: classes.thumb,
    styleProps: styleProps
  });

  return /*#__PURE__*/_jsxs(SwitchRoot, {
    className: clsx(classes.root, className),
    sx: sx,
    styleProps: styleProps,
    children: [/*#__PURE__*/_jsx(SwitchSwitchBase, _extends({
      type: "checkbox",
      icon: icon,
      checkedIcon: icon,
      ref: ref,
      styleProps: styleProps
    }, other, {
      classes: _extends({}, classes, {
        root: classes.switchBase
      })
    })), /*#__PURE__*/_jsx(SwitchTrack, {
      className: classes.track,
      styleProps: styleProps
    })]
  });
});
process.env.NODE_ENV !== "production" ? Switch.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,

  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),

  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,

  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: PropTypes.bool,

  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),

  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,

  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,

  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,

  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,

  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any
} : void 0;
export default Switch;