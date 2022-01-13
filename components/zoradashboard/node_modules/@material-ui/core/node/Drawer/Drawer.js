"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHorizontal = isHorizontal;
exports.getAnchor = getAnchor;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _Modal = _interopRequireDefault(require("../Modal"));

var _Slide = _interopRequireDefault(require("../Slide"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _createTransitions = require("../styles/createTransitions");

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireWildcard(require("../styles/styled"));

var _drawerClasses = require("./drawerClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["BackdropProps"],
      _excluded2 = ["anchor", "BackdropProps", "children", "className", "elevation", "hideBackdrop", "ModalProps", "onClose", "open", "PaperProps", "SlideProps", "TransitionComponent", "transitionDuration", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return [styles.root, (styleProps.variant === 'permanent' || styleProps.variant === 'persistent') && styles.docked, styles.modal];
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    anchor,
    variant
  } = styleProps;
  const slots = {
    root: ['root'],
    docked: [(variant === 'permanent' || variant === 'persistent') && 'docked'],
    modal: ['modal'],
    paper: ['paper', `paperAnchor${(0, _capitalize.default)(anchor)}`, variant !== 'temporary' && `paperAnchorDocked${(0, _capitalize.default)(anchor)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _drawerClasses.getDrawerUtilityClass, classes);
};

const DrawerRoot = (0, _styled.default)(_Modal.default, {
  name: 'MuiDrawer',
  slot: 'Root',
  overridesResolver
})(({
  theme
}) => ({
  zIndex: theme.zIndex.drawer
}));
const DrawerDockedRoot = (0, _styled.default)('div', {
  shouldForwardProp: _styled.rootShouldForwardProp,
  name: 'MuiDrawer',
  slot: 'Docked',
  skipVariantsResolver: false,
  overridesResolver
})({
  flex: '0 0 auto'
});
const DrawerPaper = (0, _styled.default)(_Paper.default, {
  name: 'MuiDrawer',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.paper, styles[`paperAnchor${(0, _capitalize.default)(styleProps.anchor)}`], styleProps.variant !== 'temporary' && styles[`paperAnchorDocked${(0, _capitalize.default)(styleProps.anchor)}`]];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: '1 0 auto',
  zIndex: theme.zIndex.drawer,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  // temporary style
  position: 'fixed',
  top: 0,
  // We disable the focus ring for mouse, touch and keyboard users.
  // At some point, it would be better to keep it for keyboard users.
  // :focus-ring CSS pseudo-class will help.
  outline: 0
}, styleProps.anchor === 'left' && {
  left: 0
}, styleProps.anchor === 'top' && {
  top: 0,
  left: 0,
  right: 0,
  height: 'auto',
  maxHeight: '100%'
}, styleProps.anchor === 'right' && {
  right: 0
}, styleProps.anchor === 'bottom' && {
  top: 'auto',
  left: 0,
  bottom: 0,
  right: 0,
  height: 'auto',
  maxHeight: '100%'
}, styleProps.anchor === 'left' && styleProps.variant !== 'temporary' && {
  borderRight: `1px solid ${theme.palette.divider}`
}, styleProps.anchor === 'top' && styleProps.variant !== 'temporary' && {
  borderBottom: `1px solid ${theme.palette.divider}`
}, styleProps.anchor === 'right' && styleProps.variant !== 'temporary' && {
  borderLeft: `1px solid ${theme.palette.divider}`
}, styleProps.anchor === 'bottom' && styleProps.variant !== 'temporary' && {
  borderTop: `1px solid ${theme.palette.divider}`
}));
const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up'
};

function isHorizontal(anchor) {
  return ['left', 'right'].indexOf(anchor) !== -1;
}

function getAnchor(theme, anchor) {
  return theme.direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}

const defaultTransitionDuration = {
  enter: _createTransitions.duration.enteringScreen,
  exit: _createTransitions.duration.leavingScreen
};
/**
 * The props of the [Modal](/api/modal/) component are available
 * when `variant="temporary"` is set.
 */

const Drawer = /*#__PURE__*/React.forwardRef(function Drawer(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiDrawer'
  });
  const {
    anchor: anchorProp = 'left',
    BackdropProps,
    children,
    className,
    elevation = 16,
    hideBackdrop = false,
    ModalProps: {
      BackdropProps: BackdropPropsProp
    } = {},
    onClose,
    open = false,
    PaperProps = {},
    SlideProps,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = _Slide.default,
    transitionDuration = defaultTransitionDuration,
    variant = 'temporary'
  } = props,
        ModalProps = (0, _objectWithoutPropertiesLoose2.default)(props.ModalProps, _excluded),
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded2);
  const theme = (0, _useTheme.default)(); // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.

  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);
  const anchorInvariant = getAnchor(theme, anchorProp);
  const anchor = anchorProp;
  const styleProps = (0, _extends2.default)({}, props, {
    anchor,
    elevation,
    open,
    variant
  }, other);
  const classes = useUtilityClasses(styleProps);
  const drawer = /*#__PURE__*/(0, _jsxRuntime.jsx)(DrawerPaper, (0, _extends2.default)({
    elevation: variant === 'temporary' ? elevation : 0,
    square: true
  }, PaperProps, {
    className: (0, _clsx.default)(classes.paper, PaperProps.className),
    styleProps: styleProps,
    children: children
  }));

  if (variant === 'permanent') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(DrawerDockedRoot, (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, classes.docked, className),
      styleProps: styleProps,
      ref: ref
    }, other, {
      children: drawer
    }));
  }

  const slidingDrawer = /*#__PURE__*/(0, _jsxRuntime.jsx)(TransitionComponent, (0, _extends2.default)({
    in: open,
    direction: oppositeDirection[anchorInvariant],
    timeout: transitionDuration,
    appear: mounted.current
  }, SlideProps, {
    children: drawer
  }));

  if (variant === 'persistent') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(DrawerDockedRoot, (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, classes.docked, className),
      styleProps: styleProps,
      ref: ref
    }, other, {
      children: slidingDrawer
    }));
  } // variant === temporary


  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DrawerRoot, (0, _extends2.default)({
    BackdropProps: (0, _extends2.default)({}, BackdropProps, BackdropPropsProp, {
      transitionDuration
    }),
    className: (0, _clsx.default)(classes.root, classes.modal, className),
    open: open,
    styleProps: styleProps,
    onClose: onClose,
    hideBackdrop: hideBackdrop,
    ref: ref
  }, other, ModalProps, {
    children: slidingDrawer
  }));
});
process.env.NODE_ENV !== "production" ? Drawer.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor: _propTypes.default.oneOf(['bottom', 'left', 'right', 'top']),

  /**
   * @ignore
   */
  BackdropProps: _propTypes.default.object,

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The elevation of the drawer.
   * @default 16
   */
  elevation: _utils.integerPropType,

  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: _propTypes.default.bool,

  /**
   * Props applied to the [`Modal`](/api/modal/) element.
   * @default {}
   */
  ModalProps: _propTypes.default.object,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: _propTypes.default.func,

  /**
   * If `true`, the component is shown.
   * @default false
   */
  open: _propTypes.default.bool,

  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   * @default {}
   */
  PaperProps: _propTypes.default.object,

  /**
   * Props applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps: _propTypes.default.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default { enter: duration.enteringScreen, exit: duration.leavingScreen }
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),

  /**
   * The variant to use.
   * @default 'temporary'
   */
  variant: _propTypes.default.oneOf(['permanent', 'persistent', 'temporary'])
} : void 0;
var _default = Drawer;
exports.default = _default;