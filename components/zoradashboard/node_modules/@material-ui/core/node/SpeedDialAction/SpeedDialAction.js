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

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _Fab = _interopRequireDefault(require("../Fab"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _speedDialActionClasses = _interopRequireWildcard(require("./speedDialActionClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "delay", "FabProps", "icon", "id", "open", "TooltipClasses", "tooltipOpen", "tooltipPlacement", "tooltipTitle"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    open,
    tooltipPlacement,
    classes
  } = styleProps;
  const slots = {
    fab: ['fab', !open && 'fabClosed'],
    staticTooltip: ['staticTooltip', `tooltipPlacement${(0, _capitalize.default)(tooltipPlacement)}`, !open && 'staticTooltipClosed'],
    staticTooltipLabel: ['staticTooltipLabel']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _speedDialActionClasses.getSpeedDialActionUtilityClass, classes);
};

const SpeedDialActionFab = (0, _styled.default)(_Fab.default, {
  name: 'MuiSpeedDialAction',
  slot: 'Fab',
  skipVariantsResolver: false,
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.fab, !styleProps.open && styles.fabClosed];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  margin: 8,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: (0, _system.emphasize)(theme.palette.background.paper, 0.15)
  },
  transition: `${theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter
  })}, opacity 0.8s`,
  opacity: 1
}, !styleProps.open && {
  opacity: 0,
  transform: 'scale(0)'
}));
const SpeedDialActionStaticTooltip = (0, _styled.default)('span', {
  name: 'MuiSpeedDialAction',
  slot: 'StaticTooltip',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.staticTooltip, !styleProps.open && styles.staticTooltipClosed, styles[`tooltipPlacement${(0, _capitalize.default)(styleProps.tooltipPlacement)}`]];
  }
})(({
  theme,
  styleProps
}) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [`& .${_speedDialActionClasses.default.staticTooltipLabel}`]: (0, _extends2.default)({
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.shorter
    }),
    opacity: 1
  }, !styleProps.open && {
    opacity: 0,
    transform: 'scale(0.5)'
  }, styleProps.tooltipPlacement === 'left' && {
    transformOrigin: '100% 50%',
    right: '100%',
    marginRight: 8
  }, styleProps.tooltipPlacement === 'right' && {
    transformOrigin: '0% 50%',
    left: '100%',
    marginLeft: 8
  })
}));
const SpeedDialActionStaticTooltipLabel = (0, _styled.default)('span', {
  name: 'MuiSpeedDialAction',
  slot: 'StaticTooltipLabel',
  overridesResolver: (props, styles) => styles.staticTooltipLabel
})(({
  theme
}) => (0, _extends2.default)({
  position: 'absolute'
}, theme.typography.body1, {
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  color: theme.palette.text.secondary,
  padding: '4px 16px',
  wordBreak: 'keep-all'
}));
const SpeedDialAction = /*#__PURE__*/React.forwardRef(function SpeedDialAction(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiSpeedDialAction'
  });
  const {
    className,
    delay = 0,
    FabProps = {},
    icon,
    id,
    open,
    TooltipClasses,
    tooltipOpen: tooltipOpenProp = false,
    tooltipPlacement = 'left',
    tooltipTitle
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    tooltipPlacement
  });
  const classes = useUtilityClasses(styleProps);
  const [tooltipOpen, setTooltipOpen] = React.useState(tooltipOpenProp);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const transitionStyle = {
    transitionDelay: `${delay}ms`
  };
  const fab = /*#__PURE__*/(0, _jsxRuntime.jsx)(SpeedDialActionFab, (0, _extends2.default)({
    size: "small",
    className: (0, _clsx.default)(classes.fab, className),
    tabIndex: -1,
    role: "menuitem",
    styleProps: styleProps
  }, FabProps, {
    style: (0, _extends2.default)({}, transitionStyle, FabProps.style),
    children: icon
  }));

  if (tooltipOpenProp) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SpeedDialActionStaticTooltip, (0, _extends2.default)({
      id: id,
      ref: ref,
      className: classes.staticTooltip,
      styleProps: styleProps
    }, other, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(SpeedDialActionStaticTooltipLabel, {
        style: transitionStyle,
        id: `${id}-label`,
        className: classes.staticTooltipLabel,
        styleProps: styleProps,
        children: tooltipTitle
      }), /*#__PURE__*/React.cloneElement(fab, {
        'aria-labelledby': `${id}-label`
      })]
    }));
  }

  if (!open && tooltipOpen) {
    setTooltipOpen(false);
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, (0, _extends2.default)({
    id: id,
    ref: ref,
    title: tooltipTitle,
    placement: tooltipPlacement,
    onClose: handleTooltipClose,
    onOpen: handleTooltipOpen,
    open: open && tooltipOpen,
    classes: TooltipClasses
  }, other, {
    children: fab
  }));
});
process.env.NODE_ENV !== "production" ? SpeedDialAction.propTypes
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
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   * @default 0
   */
  delay: _propTypes.default.number,

  /**
   * Props applied to the [`Fab`](/api/fab/) component.
   * @default {}
   */
  FabProps: _propTypes.default.object,

  /**
   * The icon to display in the SpeedDial Fab.
   */
  icon: _propTypes.default.node,

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: _propTypes.default.string,

  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * `classes` prop applied to the [`Tooltip`](/api/tooltip/) element.
   */
  TooltipClasses: _propTypes.default.object,

  /**
   * Make the tooltip always visible when the SpeedDial is open.
   * @default false
   */
  tooltipOpen: _propTypes.default.bool,

  /**
   * Placement of the tooltip.
   * @default 'left'
   */
  tooltipPlacement: _propTypes.default.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: _propTypes.default.node
} : void 0;
var _default = SpeedDialAction;
exports.default = _default;