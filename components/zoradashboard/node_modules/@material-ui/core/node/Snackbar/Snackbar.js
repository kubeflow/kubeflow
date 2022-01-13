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

var _createTransitions = require("../styles/createTransitions");

var _ClickAwayListener = _interopRequireDefault(require("../ClickAwayListener"));

var _useEventCallback = _interopRequireDefault(require("../utils/useEventCallback"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _Grow = _interopRequireDefault(require("../Grow"));

var _SnackbarContent = _interopRequireDefault(require("../SnackbarContent"));

var _snackbarClasses = require("./snackbarClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["onEnter", "onExited"],
      _excluded2 = ["action", "anchorOrigin", "autoHideDuration", "children", "className", "ClickAwayListenerProps", "ContentProps", "disableWindowBlurListener", "message", "onClose", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration", "TransitionComponent", "transitionDuration", "TransitionProps"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    anchorOrigin
  } = styleProps;
  const slots = {
    root: ['root', `anchorOrigin${(0, _capitalize.default)(anchorOrigin.vertical)}${(0, _capitalize.default)(anchorOrigin.horizontal)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _snackbarClasses.getSnackbarUtilityClass, classes);
};

const SnackbarRoot = (0, _styled.default)('div', {
  name: 'MuiSnackbar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[`anchorOrigin${(0, _capitalize.default)(styleProps.anchorOrigin.vertical)}${(0, _capitalize.default)(styleProps.anchorOrigin.horizontal)}`]];
  }
})(({
  theme,
  styleProps
}) => {
  const center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)'
  };
  return (0, _extends2.default)({
    zIndex: theme.zIndex.snackbar,
    position: 'fixed',
    display: 'flex',
    left: 8,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }, styleProps.anchorOrigin.vertical === 'top' ? {
    top: 8
  } : {
    bottom: 8
  }, styleProps.anchorOrigin.horizontal === 'left' && {
    justifyContent: 'flex-start'
  }, styleProps.anchorOrigin.horizontal === 'right' && {
    justifyContent: 'flex-end'
  }, {
    [theme.breakpoints.up('sm')]: (0, _extends2.default)({}, styleProps.anchorOrigin.vertical === 'top' ? {
      top: 24
    } : {
      bottom: 24
    }, styleProps.anchorOrigin.horizontal === 'center' && center, styleProps.anchorOrigin.horizontal === 'left' && {
      left: 24,
      right: 'auto'
    }, styleProps.anchorOrigin.horizontal === 'right' && {
      right: 24,
      left: 'auto'
    })
  });
});
const Snackbar = /*#__PURE__*/React.forwardRef(function Snackbar(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiSnackbar'
  });
  const {
    action,
    anchorOrigin: {
      vertical,
      horizontal
    } = {
      vertical: 'bottom',
      horizontal: 'left'
    },
    autoHideDuration = null,
    children,
    className,
    ClickAwayListenerProps,
    ContentProps,
    disableWindowBlurListener = false,
    message,
    onClose,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    TransitionComponent = _Grow.default,
    transitionDuration = {
      enter: _createTransitions.duration.enteringScreen,
      exit: _createTransitions.duration.leavingScreen
    },
    TransitionProps: {
      onEnter,
      onExited
    } = {}
  } = props,
        TransitionProps = (0, _objectWithoutPropertiesLoose2.default)(props.TransitionProps, _excluded),
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded2);
  const styleProps = (0, _extends2.default)({}, props, {
    anchorOrigin: {
      vertical,
      horizontal
    }
  });
  const classes = useUtilityClasses(styleProps);
  const timerAutoHide = React.useRef();
  const [exited, setExited] = React.useState(true);
  const handleClose = (0, _useEventCallback.default)((...args) => {
    if (onClose) {
      onClose(...args);
    }
  });
  const setAutoHideTimer = (0, _useEventCallback.default)(autoHideDurationParam => {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }

    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(() => {
      handleClose(null, 'timeout');
    }, autoHideDurationParam);
  });
  React.useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }

    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, autoHideDuration, setAutoHideTimer]); // Pause the timer when the user is interacting with the Snackbar
  // or when the user hide the window.

  const handlePause = () => {
    clearTimeout(timerAutoHide.current);
  }; // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window is shown back.


  const handleResume = React.useCallback(() => {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);

  const handleMouseEnter = event => {
    if (onMouseEnter) {
      onMouseEnter(event);
    }

    handlePause();
  };

  const handleMouseLeave = event => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    handleResume();
  };

  const handleClickAway = event => {
    if (onClose) {
      onClose(event, 'clickaway');
    }
  };

  const handleExited = node => {
    setExited(true);

    if (onExited) {
      onExited(node);
    }
  };

  const handleEnter = (node, isAppearing) => {
    setExited(false);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  React.useEffect(() => {
    // TODO: window global should be refactored here
    if (!disableWindowBlurListener && open) {
      window.addEventListener('focus', handleResume);
      window.addEventListener('blur', handlePause);
      return () => {
        window.removeEventListener('focus', handleResume);
        window.removeEventListener('blur', handlePause);
      };
    }

    return undefined;
  }, [disableWindowBlurListener, handleResume, open]); // So we only render active snackbars.

  if (!open && exited) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClickAwayListener.default, (0, _extends2.default)({
    onClickAway: handleClickAway
  }, ClickAwayListenerProps, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SnackbarRoot, (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, className),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      styleProps: styleProps,
      ref: ref
    }, other, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(TransitionComponent, (0, _extends2.default)({
        appear: true,
        in: open,
        timeout: transitionDuration,
        direction: vertical === 'top' ? 'down' : 'up',
        onEnter: handleEnter,
        onExited: handleExited
      }, TransitionProps, {
        children: children || /*#__PURE__*/(0, _jsxRuntime.jsx)(_SnackbarContent.default, (0, _extends2.default)({
          message: message,
          action: action
        }, ContentProps))
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" ? Snackbar.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: _propTypes.default.node,

  /**
   * The anchor of the `Snackbar`.
   * On smaller screens, the component grows to occupy all the available width,
   * the horizontal alignment is ignored.
   * @default { vertical: 'bottom', horizontal: 'left' }
   */
  anchorOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOf(['center', 'left', 'right']).isRequired,
    vertical: _propTypes.default.oneOf(['bottom', 'top']).isRequired
  }),

  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: _propTypes.default.number,

  /**
   * Replace the `SnackbarContent` component.
   */
  children: _propTypes.default.element,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: _propTypes.default.object,

  /**
   * Props applied to the [`SnackbarContent`](/api/snackbar-content/) element.
   */
  ContentProps: _propTypes.default.object,

  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: _propTypes.default.bool,

  /**
   * When displaying multiple consecutive Snackbars from a parent rendering a single
   * <Snackbar/>, add the key prop to ensure independent treatment of each message.
   * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
   * features such as autoHideDuration may be canceled.
   */
  key: () => null,

  /**
   * The message to display.
   */
  message: _propTypes.default.node,

  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any>} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`.
   */
  onClose: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseEnter: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseLeave: _propTypes.default.func,

  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool,

  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: _propTypes.default.number,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: duration.enteringScreen,
   *   exit: duration.leavingScreen,
   * }
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   * @default {}
   */
  TransitionProps: _propTypes.default.object
} : void 0;
var _default = Snackbar;
exports.default = _default;