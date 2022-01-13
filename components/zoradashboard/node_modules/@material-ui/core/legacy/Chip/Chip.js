import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '@material-ui/system';
import CancelIcon from '../internal/svg-icons/Cancel';
import useForkRef from '../utils/useForkRef';
import unsupportedProp from '../utils/unsupportedProp';
import capitalize from '../utils/capitalize';
import ButtonBase from '../ButtonBase';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import chipClasses, { getChipUtilityClass } from './chipClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      disabled = styleProps.disabled,
      size = styleProps.size,
      color = styleProps.color,
      onDelete = styleProps.onDelete,
      clickable = styleProps.clickable,
      variant = styleProps.variant;
  var slots = {
    root: ['root', variant, disabled && 'disabled', "size".concat(capitalize(size)), "color".concat(capitalize(color)), clickable && 'clickable', clickable && "clickableColor".concat(capitalize(color)), onDelete && 'deletable', onDelete && "deletableColor".concat(capitalize(color)), "".concat(variant).concat(capitalize(color))],
    label: ['label', "label".concat(capitalize(size))],
    avatar: ['avatar', "avatar".concat(capitalize(size)), "avatarColor".concat(capitalize(color))],
    icon: ['icon', "icon".concat(capitalize(size)), "iconColor".concat(capitalize(color))],
    deleteIcon: ['deleteIcon', "deleteIcon".concat(capitalize(size)), "deleteIconColor".concat(capitalize(color)), "deleteIconOutlinedColor".concat(capitalize(color))]
  };
  return composeClasses(slots, getChipUtilityClass, classes);
};

var ChipRoot = styled('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    var color = styleProps.color,
        clickable = styleProps.clickable,
        onDelete = styleProps.onDelete,
        size = styleProps.size,
        variant = styleProps.variant;
    return [_defineProperty({}, "& .".concat(chipClasses.avatar), styles.avatar), _defineProperty({}, "& .".concat(chipClasses.avatar), styles["avatar".concat(capitalize(size))]), _defineProperty({}, "& .".concat(chipClasses.avatar), styles["avatarColor".concat(capitalize(color))]), _defineProperty({}, "& .".concat(chipClasses.icon), styles.icon), _defineProperty({}, "& .".concat(chipClasses.icon), styles["icon".concat(capitalize(size))]), _defineProperty({}, "& .".concat(chipClasses.icon), styles["iconColor".concat(capitalize(color))]), _defineProperty({}, "& .".concat(chipClasses.deleteIcon), styles.deleteIcon), _defineProperty({}, "& .".concat(chipClasses.deleteIcon), styles["deleteIcon".concat(capitalize(size))]), _defineProperty({}, "& .".concat(chipClasses.deleteIcon), styles["deleteIconColor".concat(capitalize(color))]), _defineProperty({}, "& .".concat(chipClasses.deleteIcon), styles["deleteIconOutlinedColor".concat(capitalize(color))]), styles.root, styles["size".concat(capitalize(size))], styles["color".concat(capitalize(color))], clickable && styles.clickable, clickable && color !== 'default' && styles["clickableColor".concat(capitalize(color), ")")], onDelete && styles.deletable, onDelete && color !== 'default' && styles["deletableColor".concat(capitalize(color))], styles[variant], variant === 'outlined' && styles["outlined".concat(capitalize(color))]];
  }
})(function (_ref11) {
  var _extends2;

  var theme = _ref11.theme,
      styleProps = _ref11.styleProps;
  var deleteIconColor = alpha(theme.palette.text.primary, 0.26);
  return _extends((_extends2 = {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(13),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.selected,
    borderRadius: 32 / 2,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create(['background-color', 'box-shadow']),
    // label will inherit this from root, then `clickable` class overrides this for both
    cursor: 'default',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    textDecoration: 'none',
    border: 0,
    // Remove `button` border
    padding: 0,
    // Remove `button` padding
    verticalAlign: 'middle',
    boxSizing: 'border-box'
  }, _defineProperty(_extends2, "&.".concat(chipClasses.disabled), {
    opacity: theme.palette.action.disabledOpacity,
    pointerEvents: 'none'
  }), _defineProperty(_extends2, "& .".concat(chipClasses.avatar), {
    marginLeft: 5,
    marginRight: -6,
    width: 24,
    height: 24,
    color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
    fontSize: theme.typography.pxToRem(12)
  }), _defineProperty(_extends2, "& .".concat(chipClasses.avatarColorPrimary), {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark
  }), _defineProperty(_extends2, "& .".concat(chipClasses.avatarColorSecondary), {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.dark
  }), _defineProperty(_extends2, "& .".concat(chipClasses.avatarSmall), {
    marginLeft: 4,
    marginRight: -4,
    width: 18,
    height: 18,
    fontSize: theme.typography.pxToRem(10)
  }), _defineProperty(_extends2, "& .".concat(chipClasses.icon), _extends({
    color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
    marginLeft: 5,
    marginRight: -6
  }, styleProps.size === 'small' && {
    fontSize: 18,
    marginLeft: 4,
    marginRight: -4
  }, styleProps.color !== 'default' && {
    color: 'inherit'
  })), _defineProperty(_extends2, "& .".concat(chipClasses.deleteIcon), _extends({
    WebkitTapHighlightColor: 'transparent',
    color: deleteIconColor,
    fontSize: 22,
    cursor: 'pointer',
    margin: '0 5px 0 -6px',
    '&:hover': {
      color: alpha(deleteIconColor, 0.4)
    }
  }, styleProps.size === 'small' && {
    fontSize: 16,
    marginRight: 4,
    marginLeft: -4
  }, styleProps.color !== 'default' && {
    color: alpha(theme.palette[styleProps.color].contrastText, 0.7),
    '&:hover, &:active': {
      color: theme.palette[styleProps.color].contrastText
    }
  })), _extends2), styleProps.size === 'small' && {
    height: 24
  }, styleProps.color !== 'default' && {
    backgroundColor: theme.palette[styleProps.color].main,
    color: theme.palette[styleProps.color].contrastText
  }, styleProps.onDelete && _defineProperty({}, "&.".concat(chipClasses.focusVisible), {
    backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  }), styleProps.onDelete && styleProps.color !== 'default' && _defineProperty({}, "&.".concat(chipClasses.focusVisible), {
    backgroundColor: theme.palette[styleProps.color].dark
  }));
}, function (_ref14) {
  var _ref15;

  var theme = _ref14.theme,
      styleProps = _ref14.styleProps;
  return _extends({}, styleProps.clickable && (_ref15 = {
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity)
    }
  }, _defineProperty(_ref15, "&.".concat(chipClasses.focusVisible), {
    backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  }), _defineProperty(_ref15, '&:active', {
    boxShadow: theme.shadows[1]
  }), _ref15), styleProps.clickable && styleProps.color !== 'default' && _defineProperty({}, "&:hover, &.".concat(chipClasses.focusVisible), {
    backgroundColor: theme.palette[styleProps.color].dark
  }));
}, function (_ref17) {
  var _ref18, _ref19;

  var theme = _ref17.theme,
      styleProps = _ref17.styleProps;
  return _extends({}, styleProps.variant === 'outlined' && (_ref18 = {
    backgroundColor: 'transparent',
    border: "1px solid ".concat(theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700])
  }, _defineProperty(_ref18, "&.".concat(chipClasses.clickable, ":hover"), {
    backgroundColor: theme.palette.action.hover
  }), _defineProperty(_ref18, "&.".concat(chipClasses.focusVisible), {
    backgroundColor: theme.palette.action.focus
  }), _defineProperty(_ref18, "& .".concat(chipClasses.avatar), {
    marginLeft: 4
  }), _defineProperty(_ref18, "& .".concat(chipClasses.avatarSmall), {
    marginLeft: 2
  }), _defineProperty(_ref18, "& .".concat(chipClasses.icon), {
    marginLeft: 4
  }), _defineProperty(_ref18, "& .".concat(chipClasses.iconSmall), {
    marginLeft: 2
  }), _defineProperty(_ref18, "& .".concat(chipClasses.deleteIcon), {
    marginRight: 5
  }), _defineProperty(_ref18, "& .".concat(chipClasses.deleteIconSmall), {
    marginRight: 3
  }), _ref18), styleProps.variant === 'outlined' && styleProps.color !== 'default' && (_ref19 = {
    color: theme.palette[styleProps.color].main,
    border: "1px solid ".concat(alpha(theme.palette[styleProps.color].main, 0.7))
  }, _defineProperty(_ref19, "&.".concat(chipClasses.clickable, ":hover"), {
    backgroundColor: alpha(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity)
  }), _defineProperty(_ref19, "&.".concat(chipClasses.focusVisible), {
    backgroundColor: alpha(theme.palette[styleProps.color].main, theme.palette.action.focusOpacity)
  }), _defineProperty(_ref19, "& .".concat(chipClasses.deleteIcon), {
    color: alpha(theme.palette[styleProps.color].main, 0.7),
    '&:hover, &:active': {
      color: theme.palette[styleProps.color].main
    }
  }), _ref19));
});
var ChipLabel = styled('span', {
  name: 'MuiChip',
  slot: 'Label',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    var size = styleProps.size;
    return [styles.label, styles["label".concat(capitalize(size))]];
  }
})(function (_ref20) {
  var styleProps = _ref20.styleProps;
  return _extends({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingLeft: 12,
    paddingRight: 12,
    whiteSpace: 'nowrap'
  }, styleProps.size === 'small' && {
    paddingLeft: 8,
    paddingRight: 8
  });
});

function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}
/**
 * Chips represent complex entities in small blocks, such as a contact.
 */


var Chip = /*#__PURE__*/React.forwardRef(function Chip(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiChip'
  });

  var avatarProp = props.avatar,
      className = props.className,
      clickableProp = props.clickable,
      _props$color = props.color,
      color = _props$color === void 0 ? 'default' : _props$color,
      ComponentProp = props.component,
      deleteIconProp = props.deleteIcon,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      iconProp = props.icon,
      label = props.label,
      onClick = props.onClick,
      onDelete = props.onDelete,
      onKeyDown = props.onKeyDown,
      onKeyUp = props.onKeyUp,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'filled' : _props$variant,
      other = _objectWithoutProperties(props, ["avatar", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant"]);

  var chipRef = React.useRef(null);
  var handleRef = useForkRef(chipRef, ref);

  var handleDeleteIconClick = function handleDeleteIconClick(event) {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();

    if (onDelete) {
      onDelete(event);
    }
  };

  var handleKeyDown = function handleKeyDown(event) {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) {
      // Will be handled in keyUp, otherwise some browsers
      // might init navigation
      event.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  var handleKeyUp = function handleKeyUp(event) {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      } else if (event.key === 'Escape' && chipRef.current) {
        chipRef.current.blur();
      }
    }

    if (onKeyUp) {
      onKeyUp(event);
    }
  };

  var clickable = clickableProp !== false && onClick ? true : clickableProp;
  var small = size === 'small';
  var component = clickable || onDelete ? ButtonBase : ComponentProp || 'div';

  var styleProps = _extends({}, props, {
    component: component,
    disabled: disabled,
    size: size,
    color: color,
    onDelete: !!onDelete,
    clickable: clickable,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  var moreProps = component === ButtonBase ? {
    component: ComponentProp || 'div',
    focusVisibleClassName: classes.focusVisible,
    disableRipple: Boolean(onDelete)
  } : {};
  var deleteIcon = null;

  if (onDelete) {
    var customClasses = clsx(color !== 'default' && (variant === 'outlined' ? classes["deleteIconOutlinedColor".concat(capitalize(color))] : classes["deleteIconColor".concat(capitalize(color))]), small && classes.deleteIconSmall);
    deleteIcon = deleteIconProp && /*#__PURE__*/React.isValidElement(deleteIconProp) ? /*#__PURE__*/React.cloneElement(deleteIconProp, {
      className: clsx(deleteIconProp.props.className, classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    }) : /*#__PURE__*/_jsx(CancelIcon, {
      className: clsx(classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    });
  }

  var avatar = null;

  if (avatarProp && /*#__PURE__*/React.isValidElement(avatarProp)) {
    avatar = /*#__PURE__*/React.cloneElement(avatarProp, {
      className: clsx(classes.avatar, avatarProp.props.className)
    });
  }

  var icon = null;

  if (iconProp && /*#__PURE__*/React.isValidElement(iconProp)) {
    icon = /*#__PURE__*/React.cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className)
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    if (avatar && icon) {
      console.error('Material-UI: The Chip component can not handle the avatar ' + 'and the icon prop at the same time. Pick one.');
    }
  }

  return /*#__PURE__*/_jsxs(ChipRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    disabled: clickable && disabled ? true : undefined,
    onClick: onClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    ref: handleRef,
    styleProps: styleProps
  }, moreProps, other, {
    children: [avatar || icon, /*#__PURE__*/_jsx(ChipLabel, {
      className: clsx(classes.label),
      styleProps: styleProps,
      children: label
    }), deleteIcon]
  }));
});
process.env.NODE_ENV !== "production" ? Chip.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The Avatar element to display.
   */
  avatar: PropTypes.element,

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
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable: PropTypes.bool,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: PropTypes.element,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * Icon element.
   */
  icon: PropTypes.element,

  /**
   * The content of the component.
   */
  label: PropTypes.node,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: PropTypes.func,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,

  /**
   * The size of the component.
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
   * The variant to use.
   * @default 'filled'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['filled', 'outlined']), PropTypes.string])
} : void 0;
export default Chip;