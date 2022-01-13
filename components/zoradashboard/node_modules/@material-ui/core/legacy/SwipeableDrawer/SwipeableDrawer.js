import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { elementTypeAcceptingRef } from '@material-ui/utils';
import { useThemeProps } from '@material-ui/system';
import { NoSsr } from '@material-ui/unstyled';
import Drawer, { getAnchor, isHorizontal } from '../Drawer/Drawer';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';
import useEventCallback from '../utils/useEventCallback';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import { duration } from '../styles/createTransitions';
import useTheme from '../styles/useTheme';
import { getTransitionProps } from '../transitions/utils';
import SwipeArea from './SwipeArea'; // This value is closed to what browsers are using internally to
// trigger a native scroll.

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var UNCERTAINTY_THRESHOLD = 3; // px
// This is the part of the drawer displayed on touch start.

var DRAG_STARTED_SIGNAL = 20; // px
// We can only have one instance at the time claiming ownership for handling the swipe.
// Otherwise, the UX would be confusing.
// That's why we use a singleton here.

var claimedSwipeInstance = null; // Exported for test purposes.

export function reset() {
  claimedSwipeInstance = null;
}

function calculateCurrentX(anchor, touches, doc) {
  return anchor === 'right' ? doc.body.offsetWidth - touches[0].pageX : touches[0].pageX;
}

function calculateCurrentY(anchor, touches, containerWindow) {
  return anchor === 'bottom' ? containerWindow.innerHeight - touches[0].clientY : touches[0].clientY;
}

function getMaxTranslate(horizontalSwipe, paperInstance) {
  return horizontalSwipe ? paperInstance.clientWidth : paperInstance.clientHeight;
}

function getTranslate(currentTranslate, startLocation, open, maxTranslate) {
  return Math.min(Math.max(open ? startLocation - currentTranslate : maxTranslate + startLocation - currentTranslate, 0), maxTranslate);
}
/**
 * @param {Element | null} element
 * @param {Element} rootNode
 */


function getDomTreeShapes(element, rootNode) {
  // Adapted from https://github.com/oliviertassinari/react-swipeable-views/blob/7666de1dba253b896911adf2790ce51467670856/packages/react-swipeable-views/src/SwipeableViews.js#L129
  var domTreeShapes = [];

  while (element && element !== rootNode.parentElement) {
    var style = ownerWindow(rootNode).getComputedStyle(element);

    if ( // Ignore the scroll children if the element is absolute positioned.
    style.getPropertyValue('position') === 'absolute' || // Ignore the scroll children if the element has an overflowX hidden
    style.getPropertyValue('overflow-x') === 'hidden') {// noop
    } else if (element.clientWidth > 0 && element.scrollWidth > element.clientWidth || element.clientHeight > 0 && element.scrollHeight > element.clientHeight) {
      // Ignore the nodes that have no width.
      // Keep elements with a scroll
      domTreeShapes.push(element);
    }

    element = element.parentElement;
  }

  return domTreeShapes;
}
/**
 * @param {object} param0
 * @param {ReturnType<getDomTreeShapes>} param0.domTreeShapes
 */


function computeHasNativeHandler(_ref) {
  var domTreeShapes = _ref.domTreeShapes,
      start = _ref.start,
      current = _ref.current,
      anchor = _ref.anchor;
  // Adapted from https://github.com/oliviertassinari/react-swipeable-views/blob/7666de1dba253b896911adf2790ce51467670856/packages/react-swipeable-views/src/SwipeableViews.js#L175
  var axisProperties = {
    scrollPosition: {
      x: 'scrollLeft',
      y: 'scrollTop'
    },
    scrollLength: {
      x: 'scrollWidth',
      y: 'scrollHeight'
    },
    clientLength: {
      x: 'clientWidth',
      y: 'clientHeight'
    }
  };
  return domTreeShapes.some(function (shape) {
    // Determine if we are going backward or forward.
    var goingForward = current >= start;

    if (anchor === 'top' || anchor === 'left') {
      goingForward = !goingForward;
    }

    var axis = anchor === 'left' || anchor === 'right' ? 'x' : 'y';
    var scrollPosition = Math.round(shape[axisProperties.scrollPosition[axis]]);
    var areNotAtStart = scrollPosition > 0;
    var areNotAtEnd = scrollPosition + shape[axisProperties.clientLength[axis]] < shape[axisProperties.scrollLength[axis]];

    if (goingForward && areNotAtEnd || !goingForward && areNotAtStart) {
      return true;
    }

    return false;
  });
}

var iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
var transitionDurationDefault = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen
};
var SwipeableDrawer = /*#__PURE__*/React.forwardRef(function SwipeableDrawer(inProps, ref) {
  var props = useThemeProps({
    name: 'MuiSwipeableDrawer',
    props: inProps
  });
  var theme = useTheme();
  var _props$anchor = props.anchor,
      anchor = _props$anchor === void 0 ? 'left' : _props$anchor,
      _props$disableBackdro = props.disableBackdropTransition,
      disableBackdropTransition = _props$disableBackdro === void 0 ? false : _props$disableBackdro,
      _props$disableDiscove = props.disableDiscovery,
      disableDiscovery = _props$disableDiscove === void 0 ? false : _props$disableDiscove,
      _props$disableSwipeTo = props.disableSwipeToOpen,
      disableSwipeToOpen = _props$disableSwipeTo === void 0 ? iOS : _props$disableSwipeTo,
      hideBackdrop = props.hideBackdrop,
      _props$hysteresis = props.hysteresis,
      hysteresis = _props$hysteresis === void 0 ? 0.52 : _props$hysteresis,
      _props$minFlingVeloci = props.minFlingVelocity,
      minFlingVelocity = _props$minFlingVeloci === void 0 ? 450 : _props$minFlingVeloci,
      _props$ModalProps = props.ModalProps;
  _props$ModalProps = _props$ModalProps === void 0 ? {} : _props$ModalProps;

  var BackdropProps = _props$ModalProps.BackdropProps,
      ModalPropsProp = _objectWithoutProperties(_props$ModalProps, ["BackdropProps"]),
      onClose = props.onClose,
      onOpen = props.onOpen,
      open = props.open,
      _props$PaperProps = props.PaperProps,
      PaperProps = _props$PaperProps === void 0 ? {} : _props$PaperProps,
      SwipeAreaProps = props.SwipeAreaProps,
      _props$swipeAreaWidth = props.swipeAreaWidth,
      swipeAreaWidth = _props$swipeAreaWidth === void 0 ? 20 : _props$swipeAreaWidth,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === void 0 ? transitionDurationDefault : _props$transitionDura,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'temporary' : _props$variant,
      other = _objectWithoutProperties(props, ["anchor", "disableBackdropTransition", "disableDiscovery", "disableSwipeToOpen", "hideBackdrop", "hysteresis", "minFlingVelocity", "ModalProps", "onClose", "onOpen", "open", "PaperProps", "SwipeAreaProps", "swipeAreaWidth", "transitionDuration", "variant"]);

  var _React$useState = React.useState(false),
      maybeSwiping = _React$useState[0],
      setMaybeSwiping = _React$useState[1];

  var swipeInstance = React.useRef({
    isSwiping: null
  });
  var swipeAreaRef = React.useRef();
  var backdropRef = React.useRef();
  var paperRef = React.useRef();
  var touchDetected = React.useRef(false); // Ref for transition duration based on / to match swipe speed

  var calculatedDurationRef = React.useRef(); // Use a ref so the open value used is always up to date inside useCallback.

  useEnhancedEffect(function () {
    calculatedDurationRef.current = null;
  }, [open]);
  var setPosition = React.useCallback(function (translate) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$mode = options.mode,
        mode = _options$mode === void 0 ? null : _options$mode,
        _options$changeTransi = options.changeTransition,
        changeTransition = _options$changeTransi === void 0 ? true : _options$changeTransi;
    var anchorRtl = getAnchor(theme, anchor);
    var rtlTranslateMultiplier = ['right', 'bottom'].indexOf(anchorRtl) !== -1 ? 1 : -1;
    var horizontalSwipe = isHorizontal(anchor);
    var transform = horizontalSwipe ? "translate(".concat(rtlTranslateMultiplier * translate, "px, 0)") : "translate(0, ".concat(rtlTranslateMultiplier * translate, "px)");
    var drawerStyle = paperRef.current.style;
    drawerStyle.webkitTransform = transform;
    drawerStyle.transform = transform;
    var transition = '';

    if (mode) {
      transition = theme.transitions.create('all', getTransitionProps({
        easing: undefined,
        style: undefined,
        timeout: transitionDuration
      }, {
        mode: mode
      }));
    }

    if (changeTransition) {
      drawerStyle.webkitTransition = transition;
      drawerStyle.transition = transition;
    }

    if (!disableBackdropTransition && !hideBackdrop) {
      var backdropStyle = backdropRef.current.style;
      backdropStyle.opacity = 1 - translate / getMaxTranslate(horizontalSwipe, paperRef.current);

      if (changeTransition) {
        backdropStyle.webkitTransition = transition;
        backdropStyle.transition = transition;
      }
    }
  }, [anchor, disableBackdropTransition, hideBackdrop, theme, transitionDuration]);
  var handleBodyTouchEnd = useEventCallback(function (nativeEvent) {
    if (!touchDetected.current) {
      return;
    }

    claimedSwipeInstance = null;
    touchDetected.current = false;
    setMaybeSwiping(false); // The swipe wasn't started.

    if (!swipeInstance.current.isSwiping) {
      swipeInstance.current.isSwiping = null;
      return;
    }

    swipeInstance.current.isSwiping = null;
    var anchorRtl = getAnchor(theme, anchor);
    var horizontal = isHorizontal(anchor);
    var current;

    if (horizontal) {
      current = calculateCurrentX(anchorRtl, nativeEvent.changedTouches, ownerDocument(nativeEvent.currentTarget));
    } else {
      current = calculateCurrentY(anchorRtl, nativeEvent.changedTouches, ownerWindow(nativeEvent.currentTarget));
    }

    var startLocation = horizontal ? swipeInstance.current.startX : swipeInstance.current.startY;
    var maxTranslate = getMaxTranslate(horizontal, paperRef.current);
    var currentTranslate = getTranslate(current, startLocation, open, maxTranslate);
    var translateRatio = currentTranslate / maxTranslate;

    if (Math.abs(swipeInstance.current.velocity) > minFlingVelocity) {
      // Calculate transition duration to match swipe speed
      calculatedDurationRef.current = Math.abs((maxTranslate - currentTranslate) / swipeInstance.current.velocity) * 1000;
    }

    if (open) {
      if (swipeInstance.current.velocity > minFlingVelocity || translateRatio > hysteresis) {
        onClose();
      } else {
        // Reset the position, the swipe was aborted.
        setPosition(0, {
          mode: 'exit'
        });
      }

      return;
    }

    if (swipeInstance.current.velocity < -minFlingVelocity || 1 - translateRatio > hysteresis) {
      onOpen();
    } else {
      // Reset the position, the swipe was aborted.
      setPosition(getMaxTranslate(horizontal, paperRef.current), {
        mode: 'enter'
      });
    }
  });
  var handleBodyTouchMove = useEventCallback(function (nativeEvent) {
    // the ref may be null when a parent component updates while swiping
    if (!paperRef.current || !touchDetected.current) {
      return;
    } // We are not supposed to handle this touch move because the swipe was started in a scrollable container in the drawer


    if (claimedSwipeInstance !== null && claimedSwipeInstance !== swipeInstance.current) {
      return;
    }

    var anchorRtl = getAnchor(theme, anchor);
    var horizontalSwipe = isHorizontal(anchor);
    var currentX = calculateCurrentX(anchorRtl, nativeEvent.touches, ownerDocument(nativeEvent.currentTarget));
    var currentY = calculateCurrentY(anchorRtl, nativeEvent.touches, ownerWindow(nativeEvent.currentTarget));

    if (open && paperRef.current.contains(nativeEvent.target) && claimedSwipeInstance === null) {
      var domTreeShapes = getDomTreeShapes(nativeEvent.target, paperRef.current);
      var hasNativeHandler = computeHasNativeHandler({
        domTreeShapes: domTreeShapes,
        start: horizontalSwipe ? swipeInstance.current.startX : swipeInstance.current.startY,
        current: horizontalSwipe ? currentX : currentY,
        anchor: anchor
      });

      if (hasNativeHandler) {
        claimedSwipeInstance = true;
        return;
      }

      claimedSwipeInstance = swipeInstance.current;
    } // We don't know yet.


    if (swipeInstance.current.isSwiping == null) {
      var dx = Math.abs(currentX - swipeInstance.current.startX);
      var dy = Math.abs(currentY - swipeInstance.current.startY);
      var definitelySwiping = horizontalSwipe ? dx > dy && dx > UNCERTAINTY_THRESHOLD : dy > dx && dy > UNCERTAINTY_THRESHOLD;

      if (definitelySwiping && nativeEvent.cancelable) {
        nativeEvent.preventDefault();
      }

      if (definitelySwiping === true || (horizontalSwipe ? dy > UNCERTAINTY_THRESHOLD : dx > UNCERTAINTY_THRESHOLD)) {
        swipeInstance.current.isSwiping = definitelySwiping;

        if (!definitelySwiping) {
          handleBodyTouchEnd(nativeEvent);
          return;
        } // Shift the starting point.


        swipeInstance.current.startX = currentX;
        swipeInstance.current.startY = currentY; // Compensate for the part of the drawer displayed on touch start.

        if (!disableDiscovery && !open) {
          if (horizontalSwipe) {
            swipeInstance.current.startX -= DRAG_STARTED_SIGNAL;
          } else {
            swipeInstance.current.startY -= DRAG_STARTED_SIGNAL;
          }
        }
      }
    }

    if (!swipeInstance.current.isSwiping) {
      return;
    }

    var maxTranslate = getMaxTranslate(horizontalSwipe, paperRef.current);
    var startLocation = horizontalSwipe ? swipeInstance.current.startX : swipeInstance.current.startY;

    if (open && !swipeInstance.current.paperHit) {
      startLocation = Math.min(startLocation, maxTranslate);
    }

    var translate = getTranslate(horizontalSwipe ? currentX : currentY, startLocation, open, maxTranslate);

    if (open) {
      if (!swipeInstance.current.paperHit) {
        var paperHit = horizontalSwipe ? currentX < maxTranslate : currentY < maxTranslate;

        if (paperHit) {
          swipeInstance.current.paperHit = true;
          swipeInstance.current.startX = currentX;
          swipeInstance.current.startY = currentY;
        } else {
          return;
        }
      } else if (translate === 0) {
        swipeInstance.current.startX = currentX;
        swipeInstance.current.startY = currentY;
      }
    }

    if (swipeInstance.current.lastTranslate === null) {
      swipeInstance.current.lastTranslate = translate;
      swipeInstance.current.lastTime = performance.now() + 1;
    }

    var velocity = (translate - swipeInstance.current.lastTranslate) / (performance.now() - swipeInstance.current.lastTime) * 1e3; // Low Pass filter.

    swipeInstance.current.velocity = swipeInstance.current.velocity * 0.4 + velocity * 0.6;
    swipeInstance.current.lastTranslate = translate;
    swipeInstance.current.lastTime = performance.now(); // We are swiping, let's prevent the scroll event on iOS.

    if (nativeEvent.cancelable) {
      nativeEvent.preventDefault();
    }

    setPosition(translate);
  });
  var handleBodyTouchStart = useEventCallback(function (nativeEvent) {
    // We are not supposed to handle this touch move.
    // Example of use case: ignore the event if there is a Slider.
    if (nativeEvent.defaultPrevented) {
      return;
    } // We can only have one node at the time claiming ownership for handling the swipe.


    if (nativeEvent.defaultMuiPrevented) {
      return;
    } // At least one element clogs the drawer interaction zone.


    if (open && (hideBackdrop || !backdropRef.current.contains(nativeEvent.target)) && !paperRef.current.contains(nativeEvent.target)) {
      return;
    }

    var anchorRtl = getAnchor(theme, anchor);
    var horizontalSwipe = isHorizontal(anchor);
    var currentX = calculateCurrentX(anchorRtl, nativeEvent.touches, ownerDocument(nativeEvent.currentTarget));
    var currentY = calculateCurrentY(anchorRtl, nativeEvent.touches, ownerWindow(nativeEvent.currentTarget));

    if (!open) {
      if (disableSwipeToOpen || nativeEvent.target !== swipeAreaRef.current) {
        return;
      }

      if (horizontalSwipe) {
        if (currentX > swipeAreaWidth) {
          return;
        }
      } else if (currentY > swipeAreaWidth) {
        return;
      }
    }

    nativeEvent.defaultMuiPrevented = true;
    claimedSwipeInstance = null;
    swipeInstance.current.startX = currentX;
    swipeInstance.current.startY = currentY;
    setMaybeSwiping(true);

    if (!open && paperRef.current) {
      // The ref may be null when a parent component updates while swiping.
      setPosition(getMaxTranslate(horizontalSwipe, paperRef.current) + (disableDiscovery ? 15 : -DRAG_STARTED_SIGNAL), {
        changeTransition: false
      });
    }

    swipeInstance.current.velocity = 0;
    swipeInstance.current.lastTime = null;
    swipeInstance.current.lastTranslate = null;
    swipeInstance.current.paperHit = false;
    touchDetected.current = true;
  });
  React.useEffect(function () {
    if (variant === 'temporary') {
      var doc = ownerDocument(paperRef.current);
      doc.addEventListener('touchstart', handleBodyTouchStart); // A blocking listener prevents Firefox's navbar to auto-hide on scroll.
      // It only needs to prevent scrolling on the drawer's content when open.
      // When closed, the overlay prevents scrolling.

      doc.addEventListener('touchmove', handleBodyTouchMove, {
        passive: !open
      });
      doc.addEventListener('touchend', handleBodyTouchEnd);
      return function () {
        doc.removeEventListener('touchstart', handleBodyTouchStart);
        doc.removeEventListener('touchmove', handleBodyTouchMove, {
          passive: !open
        });
        doc.removeEventListener('touchend', handleBodyTouchEnd);
      };
    }

    return undefined;
  }, [variant, open, handleBodyTouchStart, handleBodyTouchMove, handleBodyTouchEnd]);
  React.useEffect(function () {
    return function () {
      // We need to release the lock.
      if (claimedSwipeInstance === swipeInstance.current) {
        claimedSwipeInstance = null;
      }
    };
  }, []);
  React.useEffect(function () {
    if (!open) {
      setMaybeSwiping(false);
    }
  }, [open]);
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(Drawer, _extends({
      open: variant === 'temporary' && maybeSwiping ? true : open,
      variant: variant,
      ModalProps: _extends({
        BackdropProps: _extends({}, BackdropProps, {
          ref: backdropRef
        })
      }, ModalPropsProp),
      hideBackdrop: hideBackdrop,
      PaperProps: _extends({}, PaperProps, {
        style: _extends({
          pointerEvents: variant === 'temporary' && !open ? 'none' : ''
        }, PaperProps.style),
        ref: paperRef
      }),
      anchor: anchor,
      transitionDuration: calculatedDurationRef.current || transitionDuration,
      onClose: onClose,
      ref: ref
    }, other)), !disableSwipeToOpen && variant === 'temporary' && /*#__PURE__*/_jsx(NoSsr, {
      children: /*#__PURE__*/_jsx(SwipeArea, _extends({
        anchor: anchor,
        ref: swipeAreaRef,
        width: swipeAreaWidth
      }, SwipeAreaProps))
    })]
  });
});
process.env.NODE_ENV !== "production" ? SwipeableDrawer.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  anchor: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Disable the backdrop transition.
   * This can improve the FPS on low-end devices.
   * @default false
   */
  disableBackdropTransition: PropTypes.bool,

  /**
   * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
   * to promote accidental discovery of the swipe gesture.
   * @default false
   */
  disableDiscovery: PropTypes.bool,

  /**
   * If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers
   * navigation actions. Swipe to open is disabled on iOS browsers by default.
   * @default typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
   */
  disableSwipeToOpen: PropTypes.bool,

  /**
   * @ignore
   */
  hideBackdrop: PropTypes.bool,

  /**
   * Affects how far the drawer must be opened/closed to change its state.
   * Specified as percent (0-1) of the width of the drawer
   * @default 0.52
   */
  hysteresis: PropTypes.number,

  /**
   * Defines, from which (average) velocity on, the swipe is
   * defined as complete although hysteresis isn't reached.
   * Good threshold is between 250 - 1000 px/s
   * @default 450
   */
  minFlingVelocity: PropTypes.number,

  /**
   * @ignore
   */
  ModalProps: PropTypes
  /* @typescript-to-proptypes-ignore */
  .shape({
    BackdropProps: PropTypes.shape({
      component: elementTypeAcceptingRef
    })
  }),

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func.isRequired,

  /**
   * Callback fired when the component requests to be opened.
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func.isRequired,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,

  /**
   * @ignore
   */
  PaperProps: PropTypes
  /* @typescript-to-proptypes-ignore */
  .shape({
    component: elementTypeAcceptingRef,
    style: PropTypes.object
  }),

  /**
   * The element is used to intercept the touch events on the edge.
   */
  SwipeAreaProps: PropTypes.object,

  /**
   * The width of the left most (or right most) area in `px` that
   * the drawer can be swiped open from.
   * @default 20
   */
  swipeAreaWidth: PropTypes.number,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default { enter: duration.enteringScreen, exit: duration.leavingScreen }
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })]),

  /**
   * @ignore
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary'])
} : void 0;
export default SwipeableDrawer;