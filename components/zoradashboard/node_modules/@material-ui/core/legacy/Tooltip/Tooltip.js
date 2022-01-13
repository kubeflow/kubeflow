import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { elementAcceptingRef } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '@material-ui/system';
import styled from '../styles/styled';
import useTheme from '../styles/useTheme';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import Grow from '../Grow';
import Popper from '../Popper';
import useEventCallback from '../utils/useEventCallback';
import useForkRef from '../utils/useForkRef';
import useId from '../utils/useId';
import useIsFocusVisible from '../utils/useIsFocusVisible';
import useControlled from '../utils/useControlled';
import tooltipClasses, { getTooltipUtilityClass } from './tooltipClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      disableInteractive = styleProps.disableInteractive,
      arrow = styleProps.arrow,
      touch = styleProps.touch,
      placement = styleProps.placement;
  var slots = {
    popper: ['popper', !disableInteractive && 'popperInteractive', arrow && 'popperArrow'],
    tooltip: ['tooltip', arrow && 'tooltipArrow', touch && 'touch', "tooltipPlacement".concat(capitalize(placement.split('-')[0]))],
    arrow: ['arrow']
  };
  return composeClasses(slots, getTooltipUtilityClass, classes);
};

var TooltipPopper = styled(Popper, {
  name: 'MuiTooltip',
  slot: 'Popper',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.popper, !styleProps.disableInteractive && styles.popperInteractive, styleProps.arrow && styles.popperArrow, !styleProps.open && styles.popperClose];
  }
})(function (_ref) {
  var _ref2;

  var theme = _ref.theme,
      styleProps = _ref.styleProps,
      open = _ref.open;
  return _extends({
    zIndex: theme.zIndex.tooltip,
    pointerEvents: 'none'
  }, !styleProps.disableInteractive && {
    pointerEvents: 'auto'
  }, !open && {
    pointerEvents: 'none'
  }, styleProps.arrow && (_ref2 = {}, _defineProperty(_ref2, "&[data-popper-placement*=\"bottom\"] .".concat(tooltipClasses.arrow), {
    top: 0,
    left: 0,
    marginTop: '-0.71em',
    '&::before': {
      transformOrigin: '0 100%'
    }
  }), _defineProperty(_ref2, "&[data-popper-placement*=\"top\"] .".concat(tooltipClasses.arrow), {
    bottom: 0,
    left: 0,
    marginBottom: '-0.71em',
    '&::before': {
      transformOrigin: '100% 0'
    }
  }), _defineProperty(_ref2, "&[data-popper-placement*=\"right\"] .".concat(tooltipClasses.arrow), {
    left: 0,
    marginLeft: '-0.71em',
    height: '1em',
    width: '0.71em',
    '&::before': {
      transformOrigin: '100% 100%'
    }
  }), _defineProperty(_ref2, "&[data-popper-placement*=\"left\"] .".concat(tooltipClasses.arrow), {
    right: 0,
    marginRight: '-0.71em',
    height: '1em',
    width: '0.71em',
    '&::before': {
      transformOrigin: '0 0'
    }
  }), _ref2));
});
var TooltipTooltip = styled('div', {
  name: 'MuiTooltip',
  slot: 'Tooltip',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.tooltip, styleProps.touch && styles.touch, styleProps.arrow && styles.tooltipArrow, styles["tooltipPlacement".concat(capitalize(styleProps.placement.split('-')[0]))]];
  }
})(function (_ref3) {
  var _extends2;

  var theme = _ref3.theme,
      styleProps = _ref3.styleProps;
  return _extends({
    backgroundColor: alpha(theme.palette.grey[700], 0.92),
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    fontFamily: theme.typography.fontFamily,
    padding: '4px 8px',
    fontSize: theme.typography.pxToRem(11),
    maxWidth: 300,
    margin: 2,
    wordWrap: 'break-word',
    fontWeight: theme.typography.fontWeightMedium
  }, styleProps.arrow && {
    position: 'relative',
    margin: 0
  }, styleProps.touch && {
    padding: '8px 16px',
    fontSize: theme.typography.pxToRem(14),
    lineHeight: "".concat(round(16 / 14), "em"),
    fontWeight: theme.typography.fontWeightRegular
  }, (_extends2 = {}, _defineProperty(_extends2, ".".concat(tooltipClasses.popper, "[data-popper-placement*=\"left\"] &"), _extends({
    transformOrigin: 'right center',
    marginRight: '14px'
  }, styleProps.touch && {
    marginRight: '24px'
  })), _defineProperty(_extends2, ".".concat(tooltipClasses.popper, "[data-popper-placement*=\"right\"] &"), _extends({
    transformOrigin: 'left center',
    marginLeft: '14px'
  }, styleProps.touch && {
    marginLeft: '24px'
  })), _defineProperty(_extends2, ".".concat(tooltipClasses.popper, "[data-popper-placement*=\"top\"] &"), _extends({
    transformOrigin: 'center bottom',
    marginBottom: '14px'
  }, styleProps.touch && {
    marginBottom: '24px'
  })), _defineProperty(_extends2, ".".concat(tooltipClasses.popper, "[data-popper-placement*=\"bottom\"] &"), _extends({
    transformOrigin: 'center top',
    marginTop: '14px'
  }, styleProps.touch && {
    marginTop: '24px'
  })), _extends2));
});
var TooltipArrow = styled('span', {
  name: 'MuiTooltip',
  slot: 'Arrow',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.arrow;
  }
})(function (_ref4) {
  var theme = _ref4.theme;
  return {
    overflow: 'hidden',
    position: 'absolute',
    width: '1em',
    height: '0.71em'
    /* = width / sqrt(2) = (length of the hypotenuse) */
    ,
    boxSizing: 'border-box',
    color: alpha(theme.palette.grey[700], 0.9),
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundColor: 'currentColor',
      transform: 'rotate(45deg)'
    }
  };
});
var hystersisOpen = false;
var hystersisTimer = null;
export function testReset() {
  hystersisOpen = false;
  clearTimeout(hystersisTimer);
}

function composeEventHandler(handler, eventHandler) {
  return function (event) {
    if (eventHandler) {
      eventHandler(event);
    }

    handler(event);
  };
}

var Tooltip = /*#__PURE__*/React.forwardRef(function Tooltip(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTooltip'
  });

  var _props$arrow = props.arrow,
      arrow = _props$arrow === void 0 ? false : _props$arrow,
      children = props.children,
      classesProp = props.classes,
      _props$describeChild = props.describeChild,
      describeChild = _props$describeChild === void 0 ? false : _props$describeChild,
      _props$disableFocusLi = props.disableFocusListener,
      disableFocusListener = _props$disableFocusLi === void 0 ? false : _props$disableFocusLi,
      _props$disableHoverLi = props.disableHoverListener,
      disableHoverListener = _props$disableHoverLi === void 0 ? false : _props$disableHoverLi,
      _props$disableInterac = props.disableInteractive,
      disableInteractiveProp = _props$disableInterac === void 0 ? false : _props$disableInterac,
      _props$disableTouchLi = props.disableTouchListener,
      disableTouchListener = _props$disableTouchLi === void 0 ? false : _props$disableTouchLi,
      _props$enterDelay = props.enterDelay,
      enterDelay = _props$enterDelay === void 0 ? 100 : _props$enterDelay,
      _props$enterNextDelay = props.enterNextDelay,
      enterNextDelay = _props$enterNextDelay === void 0 ? 0 : _props$enterNextDelay,
      _props$enterTouchDela = props.enterTouchDelay,
      enterTouchDelay = _props$enterTouchDela === void 0 ? 700 : _props$enterTouchDela,
      _props$followCursor = props.followCursor,
      followCursor = _props$followCursor === void 0 ? false : _props$followCursor,
      idProp = props.id,
      _props$leaveDelay = props.leaveDelay,
      leaveDelay = _props$leaveDelay === void 0 ? 0 : _props$leaveDelay,
      _props$leaveTouchDela = props.leaveTouchDelay,
      leaveTouchDelay = _props$leaveTouchDela === void 0 ? 1500 : _props$leaveTouchDela,
      onClose = props.onClose,
      onOpen = props.onOpen,
      openProp = props.open,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'bottom' : _props$placement,
      _props$PopperComponen = props.PopperComponent,
      PopperComponent = _props$PopperComponen === void 0 ? Popper : _props$PopperComponen,
      _props$PopperProps = props.PopperProps,
      PopperProps = _props$PopperProps === void 0 ? {} : _props$PopperProps,
      title = props.title,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Grow : _props$TransitionComp,
      TransitionProps = props.TransitionProps,
      other = _objectWithoutProperties(props, ["arrow", "children", "classes", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"]);

  var theme = useTheme();

  var _React$useState = React.useState(),
      childNode = _React$useState[0],
      setChildNode = _React$useState[1];

  var _React$useState2 = React.useState(null),
      arrowRef = _React$useState2[0],
      setArrowRef = _React$useState2[1];

  var ignoreNonTouchEvents = React.useRef(false);
  var disableInteractive = disableInteractiveProp || followCursor;
  var closeTimer = React.useRef();
  var enterTimer = React.useRef();
  var leaveTimer = React.useRef();
  var touchTimer = React.useRef();

  var _useControlled = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open'
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      openState = _useControlled2[0],
      setOpenState = _useControlled2[1];

  var open = openState;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var _React$useRef = React.useRef(openProp !== undefined),
        isControlled = _React$useRef.current; // eslint-disable-next-line react-hooks/rules-of-hooks


    React.useEffect(function () {
      if (childNode && childNode.disabled && !isControlled && title !== '' && childNode.tagName.toLowerCase() === 'button') {
        console.error(['Material-UI: You are providing a disabled `button` child to the Tooltip component.', 'A disabled element does not fire events.', "Tooltip needs to listen to the child element's events to display the title.", '', 'Add a simple wrapper element, such as a `span`.'].join('\n'));
      }
    }, [title, childNode, isControlled]);
  }

  var id = useId(idProp);
  var prevUserSelect = React.useRef();
  var stopTouchInteraction = React.useCallback(function () {
    if (prevUserSelect.current !== undefined) {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = undefined;
    }

    clearTimeout(touchTimer.current);
  }, []);
  React.useEffect(function () {
    return function () {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      stopTouchInteraction();
    };
  }, [stopTouchInteraction]);

  var handleOpen = function handleOpen(event) {
    clearTimeout(hystersisTimer);
    hystersisOpen = true; // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.

    setOpenState(true);

    if (onOpen && !open) {
      onOpen(event);
    }
  };

  var handleClose = useEventCallback(
  /**
   * @param {React.SyntheticEvent | Event} event
   */
  function (event) {
    clearTimeout(hystersisTimer);
    hystersisTimer = setTimeout(function () {
      hystersisOpen = false;
    }, 800 + leaveDelay);
    setOpenState(false);

    if (onClose && open) {
      onClose(event);
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(function () {
      ignoreNonTouchEvents.current = false;
    }, theme.transitions.duration.shortest);
  });

  var handleEnter = function handleEnter(event) {
    if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
      return;
    } // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).


    if (childNode) {
      childNode.removeAttribute('title');
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);

    if (enterDelay || hystersisOpen && enterNextDelay) {
      enterTimer.current = setTimeout(function () {
        handleOpen(event);
      }, hystersisOpen ? enterNextDelay : enterDelay);
    } else {
      handleOpen(event);
    }
  };

  var handleLeave = function handleLeave(event) {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(function () {
      handleClose(event);
    }, leaveDelay);
  };

  var _useIsFocusVisible = useIsFocusVisible(),
      isFocusVisibleRef = _useIsFocusVisible.isFocusVisibleRef,
      handleBlurVisible = _useIsFocusVisible.onBlur,
      handleFocusVisible = _useIsFocusVisible.onFocus,
      focusVisibleRef = _useIsFocusVisible.ref; // We don't necessarily care about the focusVisible state (which is safe to access via ref anyway).
  // We just need to re-render the Tooltip if the focus-visible state changes.


  var _React$useState3 = React.useState(false),
      setChildIsFocusVisible = _React$useState3[1];

  var handleBlur = function handleBlur(event) {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setChildIsFocusVisible(false);
      handleLeave(event);
    }
  };

  var handleFocus = function handleFocus(event) {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setChildIsFocusVisible(true);
      handleEnter(event);
    }
  };

  var detectTouchStart = function detectTouchStart(event) {
    ignoreNonTouchEvents.current = true;
    var childrenProps = children.props;

    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  var handleMouseOver = handleEnter;
  var handleMouseLeave = handleLeave;

  var handleTouchStart = function handleTouchStart(event) {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    stopTouchInteraction();
    prevUserSelect.current = document.body.style.WebkitUserSelect; // Prevent iOS text selection on long-tap.

    document.body.style.WebkitUserSelect = 'none';
    touchTimer.current = setTimeout(function () {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      handleEnter(event);
    }, enterTouchDelay);
  };

  var handleTouchEnd = function handleTouchEnd(event) {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    clearTimeout(touchTimer.current);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(function () {
      handleClose(event);
    }, leaveTouchDelay);
  };

  React.useEffect(function () {
    if (!open) {
      return undefined;
    }
    /**
     * @param {KeyboardEvent} nativeEvent
     */


    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        handleClose(nativeEvent);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, open]);
  var handleUseRef = useForkRef(setChildNode, ref);
  var handleFocusRef = useForkRef(focusVisibleRef, handleUseRef);
  var handleRef = useForkRef(children.ref, handleFocusRef); // There is no point in displaying an empty tooltip.

  if (title === '') {
    open = false;
  }

  var positionRef = React.useRef({
    x: 0,
    y: 0
  });
  var popperRef = React.useRef();

  var handleMouseMove = function handleMouseMove(event) {
    var childrenProps = children.props;

    if (childrenProps.onMouseMove) {
      childrenProps.onMouseMove(event);
    }

    positionRef.current = {
      x: event.clientX,
      y: event.clientY
    };

    if (popperRef.current) {
      popperRef.current.update();
    }
  };

  var nameOrDescProps = {};
  var titleIsString = typeof title === 'string';

  if (describeChild) {
    nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps['aria-describedby'] = open ? id : null;
  } else {
    nameOrDescProps['aria-label'] = titleIsString ? title : null;
    nameOrDescProps['aria-labelledby'] = open && !titleIsString ? id : null;
  }

  var childrenProps = _extends({}, nameOrDescProps, other, children.props, {
    className: clsx(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef
  }, followCursor ? {
    onMouseMove: handleMouseMove
  } : {});

  if (process.env.NODE_ENV !== 'production') {
    childrenProps['data-mui-internal-clone-element'] = true; // eslint-disable-next-line react-hooks/rules-of-hooks

    React.useEffect(function () {
      if (childNode && !childNode.getAttribute('data-mui-internal-clone-element')) {
        console.error(['Material-UI: The `children` component of the Tooltip is not forwarding its props correctly.', 'Please make sure that props are spread on the same element that the ref is applied to.'].join('\n'));
      }
    }, [childNode]);
  }

  var interactiveWrapperListeners = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
    childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);

    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);

    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (children.props.title) {
      console.error(['Material-UI: You have provided a `title` prop to the child of <Tooltip />.', "Remove this title prop `".concat(children.props.title, "` or the Tooltip component.")].join('\n'));
    }
  }

  var popperOptions = React.useMemo(function () {
    var _PopperProps$popperOp;

    var tooltipModifiers = [{
      name: 'arrow',
      enabled: Boolean(arrowRef),
      options: {
        element: arrowRef,
        padding: 4
      }
    }];

    if ((_PopperProps$popperOp = PopperProps.popperOptions) != null && _PopperProps$popperOp.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(PopperProps.popperOptions.modifiers);
    }

    return _extends({}, PopperProps.popperOptions, {
      modifiers: tooltipModifiers
    });
  }, [arrowRef, PopperProps]);

  var styleProps = _extends({}, props, {
    arrow: arrow,
    disableInteractive: disableInteractive,
    placement: placement,
    PopperComponent: PopperComponent,
    touch: ignoreNonTouchEvents.current
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/React.cloneElement(children, childrenProps), /*#__PURE__*/_jsx(TooltipPopper, _extends({
      as: PopperComponent,
      className: classes.popper,
      placement: placement,
      anchorEl: followCursor ? {
        getBoundingClientRect: function getBoundingClientRect() {
          return {
            top: positionRef.current.y,
            left: positionRef.current.x,
            right: positionRef.current.x,
            bottom: positionRef.current.y,
            width: 0,
            height: 0
          };
        }
      } : childNode,
      popperRef: popperRef,
      open: childNode ? open : false,
      id: id,
      transition: true
    }, interactiveWrapperListeners, PopperProps, {
      popperOptions: popperOptions,
      styleProps: styleProps,
      children: function children(_ref5) {
        var TransitionPropsInner = _ref5.TransitionProps;
        return /*#__PURE__*/_jsx(TransitionComponent, _extends({
          timeout: theme.transitions.duration.shorter
        }, TransitionPropsInner, TransitionProps, {
          children: /*#__PURE__*/_jsxs(TooltipTooltip, {
            className: classes.tooltip,
            styleProps: styleProps,
            children: [title, arrow ? /*#__PURE__*/_jsx(TooltipArrow, {
              className: classes.arrow,
              ref: setArrowRef,
              styleProps: styleProps
            }) : null]
          })
        }));
      }
    }))]
  });
});
process.env.NODE_ENV !== "production" ? Tooltip.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: PropTypes.bool,

  /**
   * Tooltip reference element.
   */
  children: elementAcceptingRef.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: PropTypes.bool,

  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: PropTypes.bool,

  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: PropTypes.bool,

  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: PropTypes.bool,

  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: PropTypes.bool,

  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: PropTypes.number,

  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: PropTypes.number,

  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: PropTypes.number,

  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: PropTypes.bool,

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,

  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: PropTypes.number,

  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: PropTypes.number,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: PropTypes.func,

  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: PropTypes.func,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,

  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: PropTypes.elementType,

  /**
   * Props applied to the [`Popper`](/api/popper/) element.
   * @default {}
   */
  PopperProps: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: PropTypes
  /* @typescript-to-proptypes-ignore */
  .node.isRequired,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: PropTypes.object
} : void 0;
export default Tooltip;