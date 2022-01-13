"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testReset = testReset;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _system = require("@material-ui/system");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _Grow = _interopRequireDefault(require("../Grow"));

var _Popper = _interopRequireDefault(require("../Popper"));

var _useEventCallback = _interopRequireDefault(require("../utils/useEventCallback"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _useId = _interopRequireDefault(require("../utils/useId"));

var _useIsFocusVisible = _interopRequireDefault(require("../utils/useIsFocusVisible"));

var _useControlled = _interopRequireDefault(require("../utils/useControlled"));

var _tooltipClasses = _interopRequireWildcard(require("./tooltipClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["arrow", "children", "classes", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

const useUtilityClasses = styleProps => {
  const {
    classes,
    disableInteractive,
    arrow,
    touch,
    placement
  } = styleProps;
  const slots = {
    popper: ['popper', !disableInteractive && 'popperInteractive', arrow && 'popperArrow'],
    tooltip: ['tooltip', arrow && 'tooltipArrow', touch && 'touch', `tooltipPlacement${(0, _capitalize.default)(placement.split('-')[0])}`],
    arrow: ['arrow']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _tooltipClasses.getTooltipUtilityClass, classes);
};

const TooltipPopper = (0, _styled.default)(_Popper.default, {
  name: 'MuiTooltip',
  slot: 'Popper',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.popper, !styleProps.disableInteractive && styles.popperInteractive, styleProps.arrow && styles.popperArrow, !styleProps.open && styles.popperClose];
  }
})(({
  theme,
  styleProps,
  open
}) => (0, _extends2.default)({
  zIndex: theme.zIndex.tooltip,
  pointerEvents: 'none'
}, !styleProps.disableInteractive && {
  pointerEvents: 'auto'
}, !open && {
  pointerEvents: 'none'
}, styleProps.arrow && {
  [`&[data-popper-placement*="bottom"] .${_tooltipClasses.default.arrow}`]: {
    top: 0,
    left: 0,
    marginTop: '-0.71em',
    '&::before': {
      transformOrigin: '0 100%'
    }
  },
  [`&[data-popper-placement*="top"] .${_tooltipClasses.default.arrow}`]: {
    bottom: 0,
    left: 0,
    marginBottom: '-0.71em',
    '&::before': {
      transformOrigin: '100% 0'
    }
  },
  [`&[data-popper-placement*="right"] .${_tooltipClasses.default.arrow}`]: {
    left: 0,
    marginLeft: '-0.71em',
    height: '1em',
    width: '0.71em',
    '&::before': {
      transformOrigin: '100% 100%'
    }
  },
  [`&[data-popper-placement*="left"] .${_tooltipClasses.default.arrow}`]: {
    right: 0,
    marginRight: '-0.71em',
    height: '1em',
    width: '0.71em',
    '&::before': {
      transformOrigin: '0 0'
    }
  }
}));
const TooltipTooltip = (0, _styled.default)('div', {
  name: 'MuiTooltip',
  slot: 'Tooltip',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.tooltip, styleProps.touch && styles.touch, styleProps.arrow && styles.tooltipArrow, styles[`tooltipPlacement${(0, _capitalize.default)(styleProps.placement.split('-')[0])}`]];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  backgroundColor: (0, _system.alpha)(theme.palette.grey[700], 0.92),
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
  lineHeight: `${round(16 / 14)}em`,
  fontWeight: theme.typography.fontWeightRegular
}, {
  [`.${_tooltipClasses.default.popper}[data-popper-placement*="left"] &`]: (0, _extends2.default)({
    transformOrigin: 'right center',
    marginRight: '14px'
  }, styleProps.touch && {
    marginRight: '24px'
  }),
  [`.${_tooltipClasses.default.popper}[data-popper-placement*="right"] &`]: (0, _extends2.default)({
    transformOrigin: 'left center',
    marginLeft: '14px'
  }, styleProps.touch && {
    marginLeft: '24px'
  }),
  [`.${_tooltipClasses.default.popper}[data-popper-placement*="top"] &`]: (0, _extends2.default)({
    transformOrigin: 'center bottom',
    marginBottom: '14px'
  }, styleProps.touch && {
    marginBottom: '24px'
  }),
  [`.${_tooltipClasses.default.popper}[data-popper-placement*="bottom"] &`]: (0, _extends2.default)({
    transformOrigin: 'center top',
    marginTop: '14px'
  }, styleProps.touch && {
    marginTop: '24px'
  })
}));
const TooltipArrow = (0, _styled.default)('span', {
  name: 'MuiTooltip',
  slot: 'Arrow',
  overridesResolver: (props, styles) => styles.arrow
})(({
  theme
}) => ({
  overflow: 'hidden',
  position: 'absolute',
  width: '1em',
  height: '0.71em'
  /* = width / sqrt(2) = (length of the hypotenuse) */
  ,
  boxSizing: 'border-box',
  color: (0, _system.alpha)(theme.palette.grey[700], 0.9),
  '&::before': {
    content: '""',
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundColor: 'currentColor',
    transform: 'rotate(45deg)'
  }
}));
let hystersisOpen = false;
let hystersisTimer = null;

function testReset() {
  hystersisOpen = false;
  clearTimeout(hystersisTimer);
}

function composeEventHandler(handler, eventHandler) {
  return event => {
    if (eventHandler) {
      eventHandler(event);
    }

    handler(event);
  };
}

const Tooltip = /*#__PURE__*/React.forwardRef(function Tooltip(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiTooltip'
  });
  const {
    arrow = false,
    children,
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableInteractive: disableInteractiveProp = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    followCursor = false,
    id: idProp,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = 'bottom',
    PopperComponent = _Popper.default,
    PopperProps = {},
    title,
    TransitionComponent = _Grow.default,
    TransitionProps
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const theme = (0, _useTheme.default)();
  const [childNode, setChildNode] = React.useState();
  const [arrowRef, setArrowRef] = React.useState(null);
  const ignoreNonTouchEvents = React.useRef(false);
  const disableInteractive = disableInteractiveProp || followCursor;
  const closeTimer = React.useRef();
  const enterTimer = React.useRef();
  const leaveTimer = React.useRef();
  const touchTimer = React.useRef();
  const [openState, setOpenState] = (0, _useControlled.default)({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open'
  });
  let open = openState;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {
      current: isControlled
    } = React.useRef(openProp !== undefined); // eslint-disable-next-line react-hooks/rules-of-hooks

    React.useEffect(() => {
      if (childNode && childNode.disabled && !isControlled && title !== '' && childNode.tagName.toLowerCase() === 'button') {
        console.error(['Material-UI: You are providing a disabled `button` child to the Tooltip component.', 'A disabled element does not fire events.', "Tooltip needs to listen to the child element's events to display the title.", '', 'Add a simple wrapper element, such as a `span`.'].join('\n'));
      }
    }, [title, childNode, isControlled]);
  }

  const id = (0, _useId.default)(idProp);
  const prevUserSelect = React.useRef();
  const stopTouchInteraction = React.useCallback(() => {
    if (prevUserSelect.current !== undefined) {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = undefined;
    }

    clearTimeout(touchTimer.current);
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      stopTouchInteraction();
    };
  }, [stopTouchInteraction]);

  const handleOpen = event => {
    clearTimeout(hystersisTimer);
    hystersisOpen = true; // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.

    setOpenState(true);

    if (onOpen && !open) {
      onOpen(event);
    }
  };

  const handleClose = (0, _useEventCallback.default)(
  /**
   * @param {React.SyntheticEvent | Event} event
   */
  event => {
    clearTimeout(hystersisTimer);
    hystersisTimer = setTimeout(() => {
      hystersisOpen = false;
    }, 800 + leaveDelay);
    setOpenState(false);

    if (onClose && open) {
      onClose(event);
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      ignoreNonTouchEvents.current = false;
    }, theme.transitions.duration.shortest);
  });

  const handleEnter = event => {
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
      enterTimer.current = setTimeout(() => {
        handleOpen(event);
      }, hystersisOpen ? enterNextDelay : enterDelay);
    } else {
      handleOpen(event);
    }
  };

  const handleLeave = event => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveDelay);
  };

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = (0, _useIsFocusVisible.default)(); // We don't necessarily care about the focusVisible state (which is safe to access via ref anyway).
  // We just need to re-render the Tooltip if the focus-visible state changes.

  const [, setChildIsFocusVisible] = React.useState(false);

  const handleBlur = event => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setChildIsFocusVisible(false);
      handleLeave(event);
    }
  };

  const handleFocus = event => {
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

  const detectTouchStart = event => {
    ignoreNonTouchEvents.current = true;
    const childrenProps = children.props;

    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  const handleMouseOver = handleEnter;
  const handleMouseLeave = handleLeave;

  const handleTouchStart = event => {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    stopTouchInteraction();
    prevUserSelect.current = document.body.style.WebkitUserSelect; // Prevent iOS text selection on long-tap.

    document.body.style.WebkitUserSelect = 'none';
    touchTimer.current = setTimeout(() => {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      handleEnter(event);
    }, enterTouchDelay);
  };

  const handleTouchEnd = event => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    clearTimeout(touchTimer.current);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveTouchDelay);
  };

  React.useEffect(() => {
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
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, open]);
  const handleUseRef = (0, _useForkRef.default)(setChildNode, ref);
  const handleFocusRef = (0, _useForkRef.default)(focusVisibleRef, handleUseRef);
  const handleRef = (0, _useForkRef.default)(children.ref, handleFocusRef); // There is no point in displaying an empty tooltip.

  if (title === '') {
    open = false;
  }

  const positionRef = React.useRef({
    x: 0,
    y: 0
  });
  const popperRef = React.useRef();

  const handleMouseMove = event => {
    const childrenProps = children.props;

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

  const nameOrDescProps = {};
  const titleIsString = typeof title === 'string';

  if (describeChild) {
    nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps['aria-describedby'] = open ? id : null;
  } else {
    nameOrDescProps['aria-label'] = titleIsString ? title : null;
    nameOrDescProps['aria-labelledby'] = open && !titleIsString ? id : null;
  }

  const childrenProps = (0, _extends2.default)({}, nameOrDescProps, other, children.props, {
    className: (0, _clsx.default)(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef
  }, followCursor ? {
    onMouseMove: handleMouseMove
  } : {});

  if (process.env.NODE_ENV !== 'production') {
    childrenProps['data-mui-internal-clone-element'] = true; // eslint-disable-next-line react-hooks/rules-of-hooks

    React.useEffect(() => {
      if (childNode && !childNode.getAttribute('data-mui-internal-clone-element')) {
        console.error(['Material-UI: The `children` component of the Tooltip is not forwarding its props correctly.', 'Please make sure that props are spread on the same element that the ref is applied to.'].join('\n'));
      }
    }, [childNode]);
  }

  const interactiveWrapperListeners = {};

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
      console.error(['Material-UI: You have provided a `title` prop to the child of <Tooltip />.', `Remove this title prop \`${children.props.title}\` or the Tooltip component.`].join('\n'));
    }
  }

  const popperOptions = React.useMemo(() => {
    var _PopperProps$popperOp;

    let tooltipModifiers = [{
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

    return (0, _extends2.default)({}, PopperProps.popperOptions, {
      modifiers: tooltipModifiers
    });
  }, [arrowRef, PopperProps]);
  const styleProps = (0, _extends2.default)({}, props, {
    arrow,
    disableInteractive,
    placement,
    PopperComponent,
    touch: ignoreNonTouchEvents.current
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/React.cloneElement(children, childrenProps), /*#__PURE__*/(0, _jsxRuntime.jsx)(TooltipPopper, (0, _extends2.default)({
      as: PopperComponent,
      className: classes.popper,
      placement: placement,
      anchorEl: followCursor ? {
        getBoundingClientRect: () => ({
          top: positionRef.current.y,
          left: positionRef.current.x,
          right: positionRef.current.x,
          bottom: positionRef.current.y,
          width: 0,
          height: 0
        })
      } : childNode,
      popperRef: popperRef,
      open: childNode ? open : false,
      id: id,
      transition: true
    }, interactiveWrapperListeners, PopperProps, {
      popperOptions: popperOptions,
      styleProps: styleProps,
      children: ({
        TransitionProps: TransitionPropsInner
      }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(TransitionComponent, (0, _extends2.default)({
        timeout: theme.transitions.duration.shorter
      }, TransitionPropsInner, TransitionProps, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(TooltipTooltip, {
          className: classes.tooltip,
          styleProps: styleProps,
          children: [title, arrow ? /*#__PURE__*/(0, _jsxRuntime.jsx)(TooltipArrow, {
            className: classes.arrow,
            ref: setArrowRef,
            styleProps: styleProps
          }) : null]
        })
      }))
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
  arrow: _propTypes.default.bool,

  /**
   * Tooltip reference element.
   */
  children: _utils.elementAcceptingRef.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: _propTypes.default.bool,

  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: _propTypes.default.bool,

  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: _propTypes.default.bool,

  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: _propTypes.default.bool,

  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: _propTypes.default.bool,

  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: _propTypes.default.number,

  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: _propTypes.default.number,

  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: _propTypes.default.number,

  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: _propTypes.default.bool,

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: _propTypes.default.string,

  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: _propTypes.default.number,

  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: _propTypes.default.number,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: _propTypes.default.func,

  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: _propTypes.default.func,

  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool,

  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: _propTypes.default.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: _propTypes.default.elementType,

  /**
   * Props applied to the [`Popper`](/api/popper/) element.
   * @default {}
   */
  PopperProps: _propTypes.default.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .node.isRequired,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: _propTypes.default.object
} : void 0;
var _default = Tooltip;
exports.default = _default;