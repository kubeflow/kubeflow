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

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _unsupportedProp = _interopRequireDefault(require("../utils/unsupportedProp"));

var _bottomNavigationActionClasses = _interopRequireWildcard(require("./bottomNavigationActionClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "icon", "label", "onChange", "onTouchStart", "onTouchEnd", "onClick", "selected", "showLabel", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    showLabel,
    selected
  } = styleProps;
  const slots = {
    root: ['root', !showLabel && !selected && 'iconOnly', selected && 'selected'],
    label: ['label', !showLabel && !selected && 'iconOnly', selected && 'selected']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _bottomNavigationActionClasses.getBottomNavigationActionUtilityClass, classes);
};

const BottomNavigationActionRoot = (0, _styled.default)(_ButtonBase.default, {
  name: 'MuiBottomNavigationAction',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, !styleProps.showLabel && !styleProps.selected && styles.iconOnly];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
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
}, {
  [`&.${_bottomNavigationActionClasses.default.selected}`]: {
    paddingTop: 6,
    color: theme.palette.primary.main
  }
}));
const BottomNavigationActionLabel = (0, _styled.default)('span', {
  name: 'MuiBottomNavigationAction',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(12),
  opacity: 1,
  transition: 'font-size 0.2s, opacity 0.2s',
  transitionDelay: '0.1s'
}, !styleProps.showLabel && !styleProps.selected && {
  opacity: 0,
  transitionDelay: '0s'
}, {
  [`&.${_bottomNavigationActionClasses.default.selected}`]: {
    fontSize: theme.typography.pxToRem(14)
  }
}));
const BottomNavigationAction = /*#__PURE__*/React.forwardRef(function BottomNavigationAction(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiBottomNavigationAction'
  });
  const {
    className,
    icon,
    label,
    onChange,
    onTouchStart,
    onTouchEnd,
    onClick,
    value
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = props;
  const classes = useUtilityClasses(styleProps);
  const touchStartPos = React.useRef();
  const touchTimer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(touchTimer.current);
    };
  }, [touchTimer]);

  const handleTouchStart = event => {
    if (onTouchStart) {
      onTouchStart(event);
    }

    const {
      clientX,
      clientY
    } = event.touches[0];
    touchStartPos.current = {
      clientX,
      clientY
    };
  };

  const handleTouchEnd = event => {
    if (onTouchEnd) onTouchEnd(event);
    const target = event.target;
    const {
      clientX,
      clientY
    } = event.changedTouches[0];

    if (Math.abs(clientX - touchStartPos.current.clientX) < 10 && Math.abs(clientY - touchStartPos.current.clientY) < 10) {
      touchTimer.current = setTimeout(() => {
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

  const handleChange = event => {
    clearTimeout(touchTimer.current);

    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(BottomNavigationActionRoot, (0, _extends2.default)({
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
    focusRipple: true,
    onClick: handleChange,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    styleProps: styleProps
  }, other, {
    children: [icon, /*#__PURE__*/(0, _jsxRuntime.jsx)(BottomNavigationActionLabel, {
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
   * The icon to display.
   */
  icon: _propTypes.default.node,

  /**
   * The label element.
   */
  label: _propTypes.default.node,

  /**
   * @ignore
   */
  onChange: _propTypes.default.func,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * @ignore
   */
  onTouchEnd: _propTypes.default.func,

  /**
   * @ignore
   */
  onTouchStart: _propTypes.default.func,

  /**
   * If `true`, the `BottomNavigationAction` will show its label.
   * By default, only the selected `BottomNavigationAction`
   * inside `BottomNavigation` will show its label.
   *
   * The prop defaults to the value (`false`) inherited from the parent BottomNavigation component.
   */
  showLabel: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: _propTypes.default.any
} : void 0;
var _default = BottomNavigationAction;
exports.default = _default;