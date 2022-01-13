import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { duration } from '../styles/createTransitions';
import ClickAwayListener from '../ClickAwayListener';
import useEventCallback from '../utils/useEventCallback';
import capitalize from '../utils/capitalize';
import Grow from '../Grow';
import SnackbarContent from '../SnackbarContent';
import { getSnackbarUtilityClass } from './snackbarClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      anchorOrigin = styleProps.anchorOrigin;
  var slots = {
    root: ['root', "anchorOrigin".concat(capitalize(anchorOrigin.vertical)).concat(capitalize(anchorOrigin.horizontal))]
  };
  return composeClasses(slots, getSnackbarUtilityClass, classes);
};

var SnackbarRoot = styled('div', {
  name: 'MuiSnackbar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles["anchorOrigin".concat(capitalize(styleProps.anchorOrigin.vertical)).concat(capitalize(styleProps.anchorOrigin.horizontal))]];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  var center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)'
  };
  return _extends({
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
  }, _defineProperty({}, theme.breakpoints.up('sm'), _extends({}, styleProps.anchorOrigin.vertical === 'top' ? {
    top: 24
  } : {
    bottom: 24
  }, styleProps.anchorOrigin.horizontal === 'center' && center, styleProps.anchorOrigin.horizontal === 'left' && {
    left: 24,
    right: 'auto'
  }, styleProps.anchorOrigin.horizontal === 'right' && {
    right: 24,
    left: 'auto'
  })));
});
var Snackbar = /*#__PURE__*/React.forwardRef(function Snackbar(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiSnackbar'
  });
  var action = props.action,
      _props$anchorOrigin = props.anchorOrigin;
  _props$anchorOrigin = _props$anchorOrigin === void 0 ? {
    vertical: 'bottom',
    horizontal: 'left'
  } : _props$anchorOrigin;
  var vertical = _props$anchorOrigin.vertical,
      horizontal = _props$anchorOrigin.horizontal,
      _props$autoHideDurati = props.autoHideDuration,
      autoHideDuration = _props$autoHideDurati === void 0 ? null : _props$autoHideDurati,
      children = props.children,
      className = props.className,
      ClickAwayListenerProps = props.ClickAwayListenerProps,
      ContentProps = props.ContentProps,
      _props$disableWindowB = props.disableWindowBlurListener,
      disableWindowBlurListener = _props$disableWindowB === void 0 ? false : _props$disableWindowB,
      message = props.message,
      onClose = props.onClose,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave,
      open = props.open,
      resumeHideDuration = props.resumeHideDuration,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Grow : _props$TransitionComp,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === void 0 ? {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  } : _props$transitionDura,
      _props$TransitionProp = props.TransitionProps;
  _props$TransitionProp = _props$TransitionProp === void 0 ? {} : _props$TransitionProp;

  var onEnter = _props$TransitionProp.onEnter,
      onExited = _props$TransitionProp.onExited,
      TransitionProps = _objectWithoutProperties(_props$TransitionProp, ["onEnter", "onExited"]),
      other = _objectWithoutProperties(props, ["action", "anchorOrigin", "autoHideDuration", "children", "className", "ClickAwayListenerProps", "ContentProps", "disableWindowBlurListener", "message", "onClose", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration", "TransitionComponent", "transitionDuration", "TransitionProps"]);

  var styleProps = _extends({}, props, {
    anchorOrigin: {
      vertical: vertical,
      horizontal: horizontal
    }
  });

  var classes = useUtilityClasses(styleProps);
  var timerAutoHide = React.useRef();

  var _React$useState = React.useState(true),
      exited = _React$useState[0],
      setExited = _React$useState[1];

  var handleClose = useEventCallback(function () {
    if (onClose) {
      onClose.apply(void 0, arguments);
    }
  });
  var setAutoHideTimer = useEventCallback(function (autoHideDurationParam) {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }

    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(function () {
      handleClose(null, 'timeout');
    }, autoHideDurationParam);
  });
  React.useEffect(function () {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }

    return function () {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, autoHideDuration, setAutoHideTimer]); // Pause the timer when the user is interacting with the Snackbar
  // or when the user hide the window.

  var handlePause = function handlePause() {
    clearTimeout(timerAutoHide.current);
  }; // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window is shown back.


  var handleResume = React.useCallback(function () {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);

  var handleMouseEnter = function handleMouseEnter(event) {
    if (onMouseEnter) {
      onMouseEnter(event);
    }

    handlePause();
  };

  var handleMouseLeave = function handleMouseLeave(event) {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    handleResume();
  };

  var handleClickAway = function handleClickAway(event) {
    if (onClose) {
      onClose(event, 'clickaway');
    }
  };

  var handleExited = function handleExited(node) {
    setExited(true);

    if (onExited) {
      onExited(node);
    }
  };

  var handleEnter = function handleEnter(node, isAppearing) {
    setExited(false);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  React.useEffect(function () {
    // TODO: window global should be refactored here
    if (!disableWindowBlurListener && open) {
      window.addEventListener('focus', handleResume);
      window.addEventListener('blur', handlePause);
      return function () {
        window.removeEventListener('focus', handleResume);
        window.removeEventListener('blur', handlePause);
      };
    }

    return undefined;
  }, [disableWindowBlurListener, handleResume, open]); // So we only render active snackbars.

  if (!open && exited) {
    return null;
  }

  return /*#__PURE__*/_jsx(ClickAwayListener, _extends({
    onClickAway: handleClickAway
  }, ClickAwayListenerProps, {
    children: /*#__PURE__*/_jsx(SnackbarRoot, _extends({
      className: clsx(classes.root, className),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      styleProps: styleProps,
      ref: ref
    }, other, {
      children: /*#__PURE__*/_jsx(TransitionComponent, _extends({
        appear: true,
        in: open,
        timeout: transitionDuration,
        direction: vertical === 'top' ? 'down' : 'up',
        onEnter: handleEnter,
        onExited: handleExited
      }, TransitionProps, {
        children: children || /*#__PURE__*/_jsx(SnackbarContent, _extends({
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
  action: PropTypes.node,

  /**
   * The anchor of the `Snackbar`.
   * On smaller screens, the component grows to occupy all the available width,
   * the horizontal alignment is ignored.
   * @default { vertical: 'bottom', horizontal: 'left' }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired
  }),

  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: PropTypes.number,

  /**
   * Replace the `SnackbarContent` component.
   */
  children: PropTypes.element,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: PropTypes.object,

  /**
   * Props applied to the [`SnackbarContent`](/api/snackbar-content/) element.
   */
  ContentProps: PropTypes.object,

  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: PropTypes.bool,

  /**
   * When displaying multiple consecutive Snackbars from a parent rendering a single
   * <Snackbar/>, add the key prop to ensure independent treatment of each message.
   * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
   * features such as autoHideDuration may be canceled.
   */
  key: function key() {
    return null;
  },

  /**
   * The message to display.
   */
  message: PropTypes.node,

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
  onClose: PropTypes.func,

  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,

  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,

  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: PropTypes.number,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: duration.enteringScreen,
   *   exit: duration.leavingScreen,
   * }
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })]),

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   * @default {}
   */
  TransitionProps: PropTypes.object
} : void 0;
export default Snackbar;