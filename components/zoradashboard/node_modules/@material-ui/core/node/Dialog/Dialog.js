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

var _utils = require("@material-ui/utils");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _Fade = _interopRequireDefault(require("../Fade"));

var _createTransitions = require("../styles/createTransitions");

var _Paper = _interopRequireDefault(require("../Paper"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _dialogClasses = _interopRequireWildcard(require("./dialogClasses"));

var _DialogContext = _interopRequireDefault(require("./DialogContext"));

var _Backdrop = _interopRequireDefault(require("../Backdrop"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["aria-describedby", "aria-labelledby", "BackdropComponent", "BackdropProps", "children", "className", "disableEscapeKeyDown", "fullScreen", "fullWidth", "maxWidth", "onBackdropClick", "onClose", "open", "PaperComponent", "PaperProps", "scroll", "TransitionComponent", "transitionDuration", "TransitionProps"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DialogBackdrop = (0, _styled.default)(_Backdrop.default, {
  name: 'MuiDialog',
  slot: 'Backdrop',
  overrides: (props, styles) => styles.backdrop
})({
  // Improve scrollable dialog support.
  zIndex: -1
});

const useUtilityClasses = styleProps => {
  const {
    classes,
    scroll,
    maxWidth,
    fullWidth,
    fullScreen
  } = styleProps;
  const slots = {
    root: ['root'],
    container: ['container', `scroll${(0, _capitalize.default)(scroll)}`],
    paper: ['paper', `paperScroll${(0, _capitalize.default)(scroll)}`, `paperWidth${(0, _capitalize.default)(String(maxWidth))}`, fullWidth && 'paperFullWidth', fullScreen && 'paperFullScreen']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _dialogClasses.getDialogUtilityClass, classes);
};

const DialogRoot = (0, _styled.default)(_Modal.default, {
  name: 'MuiDialog',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  '@media print': {
    // Use !important to override the Modal inline-style.
    position: 'absolute !important'
  }
});
const DialogContainer = (0, _styled.default)('div', {
  name: 'MuiDialog',
  slot: 'Container',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.container, styles[`scroll${(0, _capitalize.default)(styleProps.scroll)}`]];
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  height: '100%',
  '@media print': {
    height: 'auto'
  },
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}, styleProps.scroll === 'paper' && {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}, styleProps.scroll === 'body' && {
  overflowY: 'auto',
  overflowX: 'hidden',
  textAlign: 'center',
  '&:after': {
    content: '""',
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '100%',
    width: '0'
  }
}));
const DialogPaper = (0, _styled.default)(_Paper.default, {
  name: 'MuiDialog',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.paper, styles[`scrollPaper${(0, _capitalize.default)(styleProps.scroll)}`], styles[`paperWidth${(0, _capitalize.default)(String(styleProps.maxWidth))}`], styleProps.fullWidth && styles.paperFullWidth, styleProps.fullScreen && styles.paperFullScreen];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  margin: 32,
  position: 'relative',
  overflowY: 'auto',
  // Fix IE11 issue, to remove at some point.
  '@media print': {
    overflowY: 'visible',
    boxShadow: 'none'
  }
}, styleProps.scroll === 'paper' && {
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 'calc(100% - 64px)'
}, styleProps.scroll === 'body' && {
  display: 'inline-block',
  verticalAlign: 'middle',
  textAlign: 'left' // 'initial' doesn't work on IE11

}, !styleProps.maxWidth && {
  maxWidth: 'calc(100% - 64px)'
}, styleProps.maxWidth === 'xs' && {
  maxWidth: theme.breakpoints.unit === 'px' ? Math.max(theme.breakpoints.values.xs, 444) : `${theme.breakpoints.values.xs}${theme.breakpoints.unit}`,
  [`&.${_dialogClasses.default.paperScrollBody}`]: {
    [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 32 * 2)]: {
      maxWidth: 'calc(100% - 64px)'
    }
  }
}, styleProps.maxWidth !== 'xs' && {
  maxWidth: `${theme.breakpoints.values[styleProps.maxWidth]}${theme.breakpoints.unit}`,
  [`&.${_dialogClasses.default.paperScrollBody}`]: {
    [theme.breakpoints.down(theme.breakpoints.values[styleProps.maxWidth] + 32 * 2)]: {
      maxWidth: 'calc(100% - 64px)'
    }
  }
}, styleProps.fullWidth && {
  width: 'calc(100% - 64px)'
}, styleProps.fullScreen && {
  margin: 0,
  width: '100%',
  maxWidth: '100%',
  height: '100%',
  maxHeight: 'none',
  borderRadius: 0,
  [`&.${_dialogClasses.default.paperScrollBody}`]: {
    margin: 0,
    maxWidth: '100%'
  }
}));
const defaultTransitionDuration = {
  enter: _createTransitions.duration.enteringScreen,
  exit: _createTransitions.duration.leavingScreen
};
/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */

const Dialog = /*#__PURE__*/React.forwardRef(function Dialog(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiDialog'
  });
  const {
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledbyProp,
    BackdropComponent,
    BackdropProps,
    children,
    className,
    disableEscapeKeyDown = false,
    fullScreen = false,
    fullWidth = false,
    maxWidth = 'sm',
    onBackdropClick,
    onClose,
    open,
    PaperComponent = _Paper.default,
    PaperProps = {},
    scroll = 'paper',
    TransitionComponent = _Fade.default,
    transitionDuration = defaultTransitionDuration,
    TransitionProps
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    disableEscapeKeyDown,
    fullScreen,
    fullWidth,
    maxWidth,
    scroll
  });
  const classes = useUtilityClasses(styleProps);
  const backdropClick = React.useRef();

  const handleMouseDown = event => {
    // We don't want to close the dialog when clicking the dialog content.
    // Make sure the event starts and ends on the same DOM element.
    backdropClick.current = event.target === event.currentTarget;
  };

  const handleBackdropClick = event => {
    // Ignore the events not coming from the "backdrop".
    if (!backdropClick.current) {
      return;
    }

    backdropClick.current = null;

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const ariaLabelledby = (0, _utils.unstable_useId)(ariaLabelledbyProp);
  const dialogContextValue = React.useMemo(() => {
    return {
      titleId: ariaLabelledby
    };
  }, [ariaLabelledby]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DialogRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    BackdropProps: (0, _extends2.default)({
      transitionDuration,
      as: BackdropComponent
    }, BackdropProps),
    closeAfterTransition: true,
    BackdropComponent: DialogBackdrop,
    disableEscapeKeyDown: disableEscapeKeyDown,
    onClose: onClose,
    open: open,
    ref: ref,
    onClick: handleBackdropClick,
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(TransitionComponent, (0, _extends2.default)({
      appear: true,
      in: open,
      timeout: transitionDuration,
      role: "presentation"
    }, TransitionProps, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(DialogContainer, {
        className: (0, _clsx.default)(classes.container),
        onMouseDown: handleMouseDown,
        styleProps: styleProps,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(DialogPaper, (0, _extends2.default)({
          as: PaperComponent,
          elevation: 24,
          role: "dialog",
          "aria-describedby": ariaDescribedby,
          "aria-labelledby": ariaLabelledby
        }, PaperProps, {
          className: (0, _clsx.default)(classes.paper, PaperProps.className),
          styleProps: styleProps,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogContext.default.Provider, {
            value: dialogContextValue,
            children: children
          })
        }))
      })
    }))
  }));
});
process.env.NODE_ENV !== "production" ? Dialog.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby': _propTypes.default.string,

  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby': _propTypes.default.string,

  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: _propTypes.default.elementType,

  /**
   * @ignore
   */
  BackdropProps: _propTypes.default.object,

  /**
   * Dialog children, usually the included sub-components.
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
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: _propTypes.default.bool,

  /**
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen: _propTypes.default.bool,

  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth: _propTypes.default.bool,

  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]), _propTypes.default.string]),

  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: _propTypes.default.func,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: _propTypes.default.func,

  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool.isRequired,

  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  PaperComponent: _propTypes.default.elementType,

  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   * @default {}
   */
  PaperProps: _propTypes.default.object,

  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll: _propTypes.default.oneOf(['body', 'paper']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: _propTypes.default.elementType,

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
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: _propTypes.default.object
} : void 0;
var _default = Dialog;
exports.default = _default;