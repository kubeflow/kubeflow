"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.badgeClasses = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _BadgeUnstyled = _interopRequireWildcard(require("@material-ui/unstyled/BadgeUnstyled"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["components", "componentsProps", "color", "invisible", "badgeContent", "showZero", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const badgeClasses = (0, _extends2.default)({}, _BadgeUnstyled.badgeUnstyledClasses, (0, _unstyled.generateUtilityClasses)('MuiBadge', ['colorError', 'colorPrimary', 'colorSecondary']));
exports.badgeClasses = badgeClasses;
const RADIUS_STANDARD = 10;
const RADIUS_DOT = 4;

const extendUtilityClasses = styleProps => {
  const {
    color,
    classes = {}
  } = styleProps;
  return (0, _extends2.default)({}, classes, {
    badge: (0, _clsx.default)(classes.badge, color !== 'default' && [(0, _BadgeUnstyled.getBadgeUtilityClass)(`color${(0, _capitalize.default)(color)}`), classes[`color${(0, _capitalize.default)(color)}`]])
  });
};

const BadgeRoot = (0, _styled.default)('span', {
  name: 'MuiBadge',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  position: 'relative',
  display: 'inline-flex',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  flexShrink: 0
});
const BadgeBadge = (0, _styled.default)('span', {
  name: 'MuiBadge',
  slot: 'Badge',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.badge, styles[styleProps.variant], styles[`anchorOrigin${(0, _capitalize.default)(styleProps.anchorOrigin.vertical)}${(0, _capitalize.default)(styleProps.anchorOrigin.horizontal)}${(0, _capitalize.default)(styleProps.overlap)}`], styleProps.color !== 'default' && styles[`color${(0, _capitalize.default)(styleProps.color)}`], styleProps.invisible && styles.invisible];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  boxSizing: 'border-box',
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(12),
  minWidth: RADIUS_STANDARD * 2,
  lineHeight: 1,
  padding: '0 6px',
  height: RADIUS_STANDARD * 2,
  borderRadius: RADIUS_STANDARD,
  zIndex: 1,
  // Render the badge on top of potential ripples.
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen
  })
}, styleProps.color !== 'default' && {
  backgroundColor: theme.palette[styleProps.color].main,
  color: theme.palette[styleProps.color].contrastText
}, styleProps.variant === 'dot' && {
  borderRadius: RADIUS_DOT,
  height: RADIUS_DOT * 2,
  minWidth: RADIUS_DOT * 2,
  padding: 0
}, styleProps.anchorOrigin.vertical === 'top' && styleProps.anchorOrigin.horizontal === 'right' && styleProps.overlap === 'rectangular' && {
  top: 0,
  right: 0,
  transform: 'scale(1) translate(50%, -50%)',
  transformOrigin: '100% 0%',
  [`&.${badgeClasses.invisible}`]: {
    transform: 'scale(0) translate(50%, -50%)'
  }
}, styleProps.anchorOrigin.vertical === 'bottom' && styleProps.anchorOrigin.horizontal === 'right' && styleProps.overlap === 'rectangular' && {
  bottom: 0,
  right: 0,
  transform: 'scale(1) translate(50%, 50%)',
  transformOrigin: '100% 100%',
  [`&.${badgeClasses.invisible}`]: {
    transform: 'scale(0) translate(50%, 50%)'
  }
}, styleProps.anchorOrigin.vertical === 'top' && styleProps.anchorOrigin.horizontal === 'left' && styleProps.overlap === 'rectangular' && {
  top: 0,
  left: 0,
  transform: 'scale(1) translate(-50%, -50%)',
  transformOrigin: '0% 0%',
  [`&.${badgeClasses.invisible}`]: {
    transform: 'scale(0) translate(-50%, -50%)'
  }
}, styleProps.anchorOrigin.vertical === 'bottom' && styleProps.anchorOrigin.horizontal === 'left' && styleProps.overlap === 'rectangular' && {
  bottom: 0,
  left: 0,
  transform: 'scale(1) translate(-50%, 50%)',
  transformOrigin: '0% 100%',
  [`&.${badgeClasses.invisible}`]: {
    transform: 'scale(0) translate(-50%, 50%)'
  }
}, styleProps.anchorOrigin.vertical === 'top' && styleProps.anchorOrigin.horizontal === 'right' && styleProps.overlap === 'circular' && {
  top: '14%',
  right: '14%',
  transform: 'scale(1) translate(50%, -50%)',
  transformOrigin: '100% 0%',
  [`&.${badgeClasses.invisible}`]: {
    transform: 'scale(0) translate(50%, -50%)'
  }
}, styleProps.anchorOrigin.vertical === 'bottom' && styleProps.anchorOrigin.horizontal === 'right' && styleProps.overlap === 'circular' && {
  bottom: '14%',
  right: '14%',
  transform: 'scale(1) translate(50%, 50%)',
  transformOrigin: '100% 100%',
  [`&.${badgeClasses.invisible}`]: {
    transform: 'scale(0) translate(50%, 50%)'
  }
}, styleProps.anchorOrigin.vertical === 'top' && styleProps.anchorOrigin.horizontal === 'left' && styleProps.overlap === 'circular' && {
  top: '14%',
  left: '14%',
  transform: 'scale(1) translate(-50%, -50%)',
  transformOrigin: '0% 0%',
  [`&.${badgeClasses.invisible}`]: {
    transform: 'scale(0) translate(-50%, -50%)'
  }
}, styleProps.anchorOrigin.vertical === 'bottom' && styleProps.anchorOrigin.horizontal === 'left' && styleProps.overlap === 'circular' && {
  bottom: '14%',
  left: '14%',
  transform: 'scale(1) translate(-50%, 50%)',
  transformOrigin: '0% 100%',
  [`&.${badgeClasses.invisible}`]: {
    transform: 'scale(0) translate(-50%, 50%)'
  }
}, styleProps.invisible && {
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.leavingScreen
  })
}));
const Badge = /*#__PURE__*/React.forwardRef(function Badge(inProps, ref) {
  var _componentsProps$root, _componentsProps$badg;

  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiBadge'
  });
  const {
    components = {},
    componentsProps = {},
    color: colorProp = 'default',
    invisible: invisibleProp,
    badgeContent: badgeContentProp,
    showZero = false,
    variant: variantProp = 'standard'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const prevProps = (0, _utils.usePreviousProps)({
    color: colorProp
  });
  let invisible = invisibleProp;

  if (invisibleProp == null && (badgeContentProp === 0 && !showZero || badgeContentProp == null && variantProp !== 'dot')) {
    invisible = true;
  }

  const {
    color = colorProp
  } = invisible ? prevProps : props;
  const styleProps = (0, _extends2.default)({}, props, {
    invisible,
    color
  });
  const classes = extendUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BadgeUnstyled.default, (0, _extends2.default)({
    invisible: invisibleProp,
    badgeContent: badgeContentProp,
    showZero: showZero,
    variant: variantProp
  }, other, {
    components: (0, _extends2.default)({
      Root: BadgeRoot,
      Badge: BadgeBadge
    }, components),
    componentsProps: {
      root: (0, _extends2.default)({}, componentsProps.root, (!components.Root || !(0, _unstyled.isHostComponent)(components.Root)) && {
        styleProps: (0, _extends2.default)({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.styleProps, {
          color
        })
      }),
      badge: (0, _extends2.default)({}, componentsProps.badge, (!components.Thumb || !(0, _unstyled.isHostComponent)(components.Thumb)) && {
        styleProps: (0, _extends2.default)({}, (_componentsProps$badg = componentsProps.badge) == null ? void 0 : _componentsProps$badg.styleProps, {
          color
        })
      })
    },
    classes: classes,
    ref: ref
  }));
});
process.env.NODE_ENV !== "production" ? Badge.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The anchor of the badge.
   * @default {
   *   vertical: 'top',
   *   horizontal: 'right',
   * }
   */
  anchorOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOf(['left', 'right']).isRequired,
    vertical: _propTypes.default.oneOf(['bottom', 'top']).isRequired
  }),

  /**
   * The content rendered within the badge.
   */
  badgeContent: _propTypes.default.node,

  /**
   * The badge will be added relative to this node.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),

  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: _propTypes.default.shape({
    Badge: _propTypes.default.elementType,
    Root: _propTypes.default.elementType
  }),

  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  componentsProps: _propTypes.default.object,

  /**
   * If `true`, the badge is invisible.
   */
  invisible: _propTypes.default.bool,

  /**
   * Max count to show.
   * @default 99
   */
  max: _propTypes.default.number,

  /**
   * Wrapped shape the badge should overlap.
   * @default 'rectangular'
   */
  overlap: _propTypes.default.oneOf(['circular', 'rectangular']),

  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['dot', 'standard']), _propTypes.default.string])
} : void 0;
var _default = Badge;
exports.default = _default;