"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _system = require("@material-ui/system");

var _Cancel = _interopRequireDefault(require("../internal/svg-icons/Cancel"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _unsupportedProp = _interopRequireDefault(require("../utils/unsupportedProp"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _chipClasses = _interopRequireWildcard(require("./chipClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["avatar", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    disabled,
    size,
    color,
    onDelete,
    clickable,
    variant
  } = styleProps;
  const slots = {
    root: ['root', variant, disabled && 'disabled', `size${(0, _capitalize.default)(size)}`, `color${(0, _capitalize.default)(color)}`, clickable && 'clickable', clickable && `clickableColor${(0, _capitalize.default)(color)}`, onDelete && 'deletable', onDelete && `deletableColor${(0, _capitalize.default)(color)}`, `${variant}${(0, _capitalize.default)(color)}`],
    label: ['label', `label${(0, _capitalize.default)(size)}`],
    avatar: ['avatar', `avatar${(0, _capitalize.default)(size)}`, `avatarColor${(0, _capitalize.default)(color)}`],
    icon: ['icon', `icon${(0, _capitalize.default)(size)}`, `iconColor${(0, _capitalize.default)(color)}`],
    deleteIcon: ['deleteIcon', `deleteIcon${(0, _capitalize.default)(size)}`, `deleteIconColor${(0, _capitalize.default)(color)}`, `deleteIconOutlinedColor${(0, _capitalize.default)(color)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _chipClasses.getChipUtilityClass, classes);
};

const ChipRoot = (0, _styled.default)('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    const {
      color,
      clickable,
      onDelete,
      size,
      variant
    } = styleProps;
    return [{
      [`& .${_chipClasses.default.avatar}`]: styles.avatar
    }, {
      [`& .${_chipClasses.default.avatar}`]: styles[`avatar${(0, _capitalize.default)(size)}`]
    }, {
      [`& .${_chipClasses.default.avatar}`]: styles[`avatarColor${(0, _capitalize.default)(color)}`]
    }, {
      [`& .${_chipClasses.default.icon}`]: styles.icon
    }, {
      [`& .${_chipClasses.default.icon}`]: styles[`icon${(0, _capitalize.default)(size)}`]
    }, {
      [`& .${_chipClasses.default.icon}`]: styles[`iconColor${(0, _capitalize.default)(color)}`]
    }, {
      [`& .${_chipClasses.default.deleteIcon}`]: styles.deleteIcon
    }, {
      [`& .${_chipClasses.default.deleteIcon}`]: styles[`deleteIcon${(0, _capitalize.default)(size)}`]
    }, {
      [`& .${_chipClasses.default.deleteIcon}`]: styles[`deleteIconColor${(0, _capitalize.default)(color)}`]
    }, {
      [`& .${_chipClasses.default.deleteIcon}`]: styles[`deleteIconOutlinedColor${(0, _capitalize.default)(color)}`]
    }, styles.root, styles[`size${(0, _capitalize.default)(size)}`], styles[`color${(0, _capitalize.default)(color)}`], clickable && styles.clickable, clickable && color !== 'default' && styles[`clickableColor${(0, _capitalize.default)(color)})`], onDelete && styles.deletable, onDelete && color !== 'default' && styles[`deletableColor${(0, _capitalize.default)(color)}`], styles[variant], variant === 'outlined' && styles[`outlined${(0, _capitalize.default)(color)}`]];
  }
})(({
  theme,
  styleProps
}) => {
  const deleteIconColor = (0, _system.alpha)(theme.palette.text.primary, 0.26);
  return (0, _extends2.default)({
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
    boxSizing: 'border-box',
    [`&.${_chipClasses.default.disabled}`]: {
      opacity: theme.palette.action.disabledOpacity,
      pointerEvents: 'none'
    },
    [`& .${_chipClasses.default.avatar}`]: {
      marginLeft: 5,
      marginRight: -6,
      width: 24,
      height: 24,
      color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
      fontSize: theme.typography.pxToRem(12)
    },
    [`& .${_chipClasses.default.avatarColorPrimary}`]: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark
    },
    [`& .${_chipClasses.default.avatarColorSecondary}`]: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.dark
    },
    [`& .${_chipClasses.default.avatarSmall}`]: {
      marginLeft: 4,
      marginRight: -4,
      width: 18,
      height: 18,
      fontSize: theme.typography.pxToRem(10)
    },
    [`& .${_chipClasses.default.icon}`]: (0, _extends2.default)({
      color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
      marginLeft: 5,
      marginRight: -6
    }, styleProps.size === 'small' && {
      fontSize: 18,
      marginLeft: 4,
      marginRight: -4
    }, styleProps.color !== 'default' && {
      color: 'inherit'
    }),
    [`& .${_chipClasses.default.deleteIcon}`]: (0, _extends2.default)({
      WebkitTapHighlightColor: 'transparent',
      color: deleteIconColor,
      fontSize: 22,
      cursor: 'pointer',
      margin: '0 5px 0 -6px',
      '&:hover': {
        color: (0, _system.alpha)(deleteIconColor, 0.4)
      }
    }, styleProps.size === 'small' && {
      fontSize: 16,
      marginRight: 4,
      marginLeft: -4
    }, styleProps.color !== 'default' && {
      color: (0, _system.alpha)(theme.palette[styleProps.color].contrastText, 0.7),
      '&:hover, &:active': {
        color: theme.palette[styleProps.color].contrastText
      }
    })
  }, styleProps.size === 'small' && {
    height: 24
  }, styleProps.color !== 'default' && {
    backgroundColor: theme.palette[styleProps.color].main,
    color: theme.palette[styleProps.color].contrastText
  }, styleProps.onDelete && {
    [`&.${_chipClasses.default.focusVisible}`]: {
      backgroundColor: (0, _system.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  }, styleProps.onDelete && styleProps.color !== 'default' && {
    [`&.${_chipClasses.default.focusVisible}`]: {
      backgroundColor: theme.palette[styleProps.color].dark
    }
  });
}, ({
  theme,
  styleProps
}) => (0, _extends2.default)({}, styleProps.clickable && {
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: (0, _system.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity)
  },
  [`&.${_chipClasses.default.focusVisible}`]: {
    backgroundColor: (0, _system.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  },
  '&:active': {
    boxShadow: theme.shadows[1]
  }
}, styleProps.clickable && styleProps.color !== 'default' && {
  [`&:hover, &.${_chipClasses.default.focusVisible}`]: {
    backgroundColor: theme.palette[styleProps.color].dark
  }
}), ({
  theme,
  styleProps
}) => (0, _extends2.default)({}, styleProps.variant === 'outlined' && {
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]}`,
  [`&.${_chipClasses.default.clickable}:hover`]: {
    backgroundColor: theme.palette.action.hover
  },
  [`&.${_chipClasses.default.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`& .${_chipClasses.default.avatar}`]: {
    marginLeft: 4
  },
  [`& .${_chipClasses.default.avatarSmall}`]: {
    marginLeft: 2
  },
  [`& .${_chipClasses.default.icon}`]: {
    marginLeft: 4
  },
  [`& .${_chipClasses.default.iconSmall}`]: {
    marginLeft: 2
  },
  [`& .${_chipClasses.default.deleteIcon}`]: {
    marginRight: 5
  },
  [`& .${_chipClasses.default.deleteIconSmall}`]: {
    marginRight: 3
  }
}, styleProps.variant === 'outlined' && styleProps.color !== 'default' && {
  color: theme.palette[styleProps.color].main,
  border: `1px solid ${(0, _system.alpha)(theme.palette[styleProps.color].main, 0.7)}`,
  [`&.${_chipClasses.default.clickable}:hover`]: {
    backgroundColor: (0, _system.alpha)(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity)
  },
  [`&.${_chipClasses.default.focusVisible}`]: {
    backgroundColor: (0, _system.alpha)(theme.palette[styleProps.color].main, theme.palette.action.focusOpacity)
  },
  [`& .${_chipClasses.default.deleteIcon}`]: {
    color: (0, _system.alpha)(theme.palette[styleProps.color].main, 0.7),
    '&:hover, &:active': {
      color: theme.palette[styleProps.color].main
    }
  }
}));
const ChipLabel = (0, _styled.default)('span', {
  name: 'MuiChip',
  slot: 'Label',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    const {
      size
    } = styleProps;
    return [styles.label, styles[`label${(0, _capitalize.default)(size)}`]];
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: 'nowrap'
}, styleProps.size === 'small' && {
  paddingLeft: 8,
  paddingRight: 8
}));

function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}
/**
 * Chips represent complex entities in small blocks, such as a contact.
 */


const Chip = /*#__PURE__*/React.forwardRef(function Chip(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiChip'
  });
  const {
    avatar: avatarProp,
    className,
    clickable: clickableProp,
    color = 'default',
    component: ComponentProp,
    deleteIcon: deleteIconProp,
    disabled = false,
    icon: iconProp,
    label,
    onClick,
    onDelete,
    onKeyDown,
    onKeyUp,
    size = 'medium',
    variant = 'filled'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const chipRef = React.useRef(null);
  const handleRef = (0, _useForkRef.default)(chipRef, ref);

  const handleDeleteIconClick = event => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();

    if (onDelete) {
      onDelete(event);
    }
  };

  const handleKeyDown = event => {
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

  const handleKeyUp = event => {
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

  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const small = size === 'small';
  const component = clickable || onDelete ? _ButtonBase.default : ComponentProp || 'div';
  const styleProps = (0, _extends2.default)({}, props, {
    component,
    disabled,
    size,
    color,
    onDelete: !!onDelete,
    clickable,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  const moreProps = component === _ButtonBase.default ? {
    component: ComponentProp || 'div',
    focusVisibleClassName: classes.focusVisible,
    disableRipple: Boolean(onDelete)
  } : {};
  let deleteIcon = null;

  if (onDelete) {
    const customClasses = (0, _clsx.default)(color !== 'default' && (variant === 'outlined' ? classes[`deleteIconOutlinedColor${(0, _capitalize.default)(color)}`] : classes[`deleteIconColor${(0, _capitalize.default)(color)}`]), small && classes.deleteIconSmall);
    deleteIcon = deleteIconProp && /*#__PURE__*/React.isValidElement(deleteIconProp) ? /*#__PURE__*/React.cloneElement(deleteIconProp, {
      className: (0, _clsx.default)(deleteIconProp.props.className, classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Cancel.default, {
      className: (0, _clsx.default)(classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    });
  }

  let avatar = null;

  if (avatarProp && /*#__PURE__*/React.isValidElement(avatarProp)) {
    avatar = /*#__PURE__*/React.cloneElement(avatarProp, {
      className: (0, _clsx.default)(classes.avatar, avatarProp.props.className)
    });
  }

  let icon = null;

  if (iconProp && /*#__PURE__*/React.isValidElement(iconProp)) {
    icon = /*#__PURE__*/React.cloneElement(iconProp, {
      className: (0, _clsx.default)(classes.icon, iconProp.props.className)
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    if (avatar && icon) {
      console.error('Material-UI: The Chip component can not handle the avatar ' + 'and the icon prop at the same time. Pick one.');
    }
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(ChipRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, className),
    disabled: clickable && disabled ? true : undefined,
    onClick: onClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    ref: handleRef,
    styleProps: styleProps
  }, moreProps, other, {
    children: [avatar || icon, /*#__PURE__*/(0, _jsxRuntime.jsx)(ChipLabel, {
      className: (0, _clsx.default)(classes.label),
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
  avatar: _propTypes.default.element,

  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: _unsupportedProp.default,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable: _propTypes.default.bool,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: _propTypes.default.element,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * Icon element.
   */
  icon: _propTypes.default.element,

  /**
   * The content of the component.
   */
  label: _propTypes.default.node,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyDown: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyUp: _propTypes.default.func,

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['medium', 'small']), _propTypes.default.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   * @default 'filled'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['filled', 'outlined']), _propTypes.default.string])
} : void 0;
var _default = Chip;
exports.default = _default;