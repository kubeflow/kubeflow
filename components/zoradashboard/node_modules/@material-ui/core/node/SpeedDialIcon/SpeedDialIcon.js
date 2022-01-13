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

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _Add = _interopRequireDefault(require("../internal/svg-icons/Add"));

var _speedDialIconClasses = _interopRequireWildcard(require("./speedDialIconClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "icon", "open", "openIcon"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    open,
    openIcon
  } = styleProps;
  const slots = {
    root: ['root'],
    icon: ['icon', open && 'iconOpen', openIcon && open && 'iconWithOpenIconOpen'],
    openIcon: ['openIcon', open && 'openIconOpen']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _speedDialIconClasses.getSpeedDialIconUtilityClass, classes);
};

const SpeedDialIconRoot = (0, _styled.default)('span', {
  name: 'MuiSpeedDialIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [{
      [`& .${_speedDialIconClasses.default.icon}`]: styles.icon
    }, {
      [`& .${_speedDialIconClasses.default.icon}`]: styleProps.open && styles.iconOpen
    }, {
      [`& .${_speedDialIconClasses.default.icon}`]: styleProps.open && styleProps.openIcon && styles.iconWithOpenIconOpen
    }, {
      [`& .${_speedDialIconClasses.default.openIcon}`]: styles.openIcon
    }, {
      [`& .${_speedDialIconClasses.default.openIcon}`]: styleProps.open && styles.openIconOpen
    }, styles.root];
  }
})(({
  theme,
  styleProps
}) => ({
  height: 24,
  [`& .${_speedDialIconClasses.default.icon}`]: (0, _extends2.default)({
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    })
  }, styleProps.open && (0, _extends2.default)({
    transform: 'rotate(45deg)'
  }, styleProps.openIcon && {
    opacity: 0
  })),
  [`& .${_speedDialIconClasses.default.openIcon}`]: (0, _extends2.default)({
    position: 'absolute',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0,
    transform: 'rotate(-45deg)'
  }, styleProps.open && {
    transform: 'rotate(0deg)',
    opacity: 1
  })
}));
const SpeedDialIcon = /*#__PURE__*/React.forwardRef(function SpeedDialIcon(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiSpeedDialIcon'
  });
  const {
    className,
    icon: iconProp,
    openIcon: openIconProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = props;
  const classes = useUtilityClasses(styleProps);

  function formatIcon(icon, newClassName) {
    if ( /*#__PURE__*/React.isValidElement(icon)) {
      return /*#__PURE__*/React.cloneElement(icon, {
        className: newClassName
      });
    }

    return icon;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SpeedDialIconRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [openIconProp ? formatIcon(openIconProp, classes.openIcon) : null, iconProp ? formatIcon(iconProp, classes.icon) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Add.default, {
      className: classes.icon
    })]
  }));
});
process.env.NODE_ENV !== "production" ? SpeedDialIcon.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The icon to display.
   */
  icon: _propTypes.default.node,

  /**
   * @ignore
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool,

  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: _propTypes.default.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
SpeedDialIcon.muiName = 'SpeedDialIcon';
var _default = SpeedDialIcon;
exports.default = _default;