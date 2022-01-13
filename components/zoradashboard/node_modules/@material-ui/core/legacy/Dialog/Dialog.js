import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { unstable_useId as useId } from '@material-ui/utils';
import capitalize from '../utils/capitalize';
import Modal from '../Modal';
import Fade from '../Fade';
import { duration } from '../styles/createTransitions';
import Paper from '../Paper';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import dialogClasses, { getDialogUtilityClass } from './dialogClasses';
import DialogContext from './DialogContext';
import Backdrop from '../Backdrop';
import { jsx as _jsx } from "react/jsx-runtime";
var DialogBackdrop = styled(Backdrop, {
  name: 'MuiDialog',
  slot: 'Backdrop',
  overrides: function overrides(props, styles) {
    return styles.backdrop;
  }
})({
  // Improve scrollable dialog support.
  zIndex: -1
});

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      scroll = styleProps.scroll,
      maxWidth = styleProps.maxWidth,
      fullWidth = styleProps.fullWidth,
      fullScreen = styleProps.fullScreen;
  var slots = {
    root: ['root'],
    container: ['container', "scroll".concat(capitalize(scroll))],
    paper: ['paper', "paperScroll".concat(capitalize(scroll)), "paperWidth".concat(capitalize(String(maxWidth))), fullWidth && 'paperFullWidth', fullScreen && 'paperFullScreen']
  };
  return composeClasses(slots, getDialogUtilityClass, classes);
};

var DialogRoot = styled(Modal, {
  name: 'MuiDialog',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({
  '@media print': {
    // Use !important to override the Modal inline-style.
    position: 'absolute !important'
  }
});
var DialogContainer = styled('div', {
  name: 'MuiDialog',
  slot: 'Container',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.container, styles["scroll".concat(capitalize(styleProps.scroll))]];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
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
  });
});
var DialogPaper = styled(Paper, {
  name: 'MuiDialog',
  slot: 'Paper',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.paper, styles["scrollPaper".concat(capitalize(styleProps.scroll))], styles["paperWidth".concat(capitalize(String(styleProps.maxWidth)))], styleProps.fullWidth && styles.paperFullWidth, styleProps.fullScreen && styles.paperFullScreen];
  }
})(function (_ref2) {
  var theme = _ref2.theme,
      styleProps = _ref2.styleProps;
  return _extends({
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
  }, styleProps.maxWidth === 'xs' && _defineProperty({
    maxWidth: theme.breakpoints.unit === 'px' ? Math.max(theme.breakpoints.values.xs, 444) : "".concat(theme.breakpoints.values.xs).concat(theme.breakpoints.unit)
  }, "&.".concat(dialogClasses.paperScrollBody), _defineProperty({}, theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 32 * 2), {
    maxWidth: 'calc(100% - 64px)'
  })), styleProps.maxWidth !== 'xs' && _defineProperty({
    maxWidth: "".concat(theme.breakpoints.values[styleProps.maxWidth]).concat(theme.breakpoints.unit)
  }, "&.".concat(dialogClasses.paperScrollBody), _defineProperty({}, theme.breakpoints.down(theme.breakpoints.values[styleProps.maxWidth] + 32 * 2), {
    maxWidth: 'calc(100% - 64px)'
  })), styleProps.fullWidth && {
    width: 'calc(100% - 64px)'
  }, styleProps.fullScreen && _defineProperty({
    margin: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: 'none',
    borderRadius: 0
  }, "&.".concat(dialogClasses.paperScrollBody), {
    margin: 0,
    maxWidth: '100%'
  }));
});
var defaultTransitionDuration = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen
};
/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */

var Dialog = /*#__PURE__*/React.forwardRef(function Dialog(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDialog'
  });

  var ariaDescribedby = props['aria-describedby'],
      ariaLabelledbyProp = props['aria-labelledby'],
      BackdropComponent = props.BackdropComponent,
      BackdropProps = props.BackdropProps,
      children = props.children,
      className = props.className,
      _props$disableEscapeK = props.disableEscapeKeyDown,
      disableEscapeKeyDown = _props$disableEscapeK === void 0 ? false : _props$disableEscapeK,
      _props$fullScreen = props.fullScreen,
      fullScreen = _props$fullScreen === void 0 ? false : _props$fullScreen,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      _props$maxWidth = props.maxWidth,
      maxWidth = _props$maxWidth === void 0 ? 'sm' : _props$maxWidth,
      onBackdropClick = props.onBackdropClick,
      onClose = props.onClose,
      open = props.open,
      _props$PaperComponent = props.PaperComponent,
      PaperComponent = _props$PaperComponent === void 0 ? Paper : _props$PaperComponent,
      _props$PaperProps = props.PaperProps,
      PaperProps = _props$PaperProps === void 0 ? {} : _props$PaperProps,
      _props$scroll = props.scroll,
      scroll = _props$scroll === void 0 ? 'paper' : _props$scroll,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Fade : _props$TransitionComp,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === void 0 ? defaultTransitionDuration : _props$transitionDura,
      TransitionProps = props.TransitionProps,
      other = _objectWithoutProperties(props, ["aria-describedby", "aria-labelledby", "BackdropComponent", "BackdropProps", "children", "className", "disableEscapeKeyDown", "fullScreen", "fullWidth", "maxWidth", "onBackdropClick", "onClose", "open", "PaperComponent", "PaperProps", "scroll", "TransitionComponent", "transitionDuration", "TransitionProps"]);

  var styleProps = _extends({}, props, {
    disableEscapeKeyDown: disableEscapeKeyDown,
    fullScreen: fullScreen,
    fullWidth: fullWidth,
    maxWidth: maxWidth,
    scroll: scroll
  });

  var classes = useUtilityClasses(styleProps);
  var backdropClick = React.useRef();

  var handleMouseDown = function handleMouseDown(event) {
    // We don't want to close the dialog when clicking the dialog content.
    // Make sure the event starts and ends on the same DOM element.
    backdropClick.current = event.target === event.currentTarget;
  };

  var handleBackdropClick = function handleBackdropClick(event) {
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

  var ariaLabelledby = useId(ariaLabelledbyProp);
  var dialogContextValue = React.useMemo(function () {
    return {
      titleId: ariaLabelledby
    };
  }, [ariaLabelledby]);
  return /*#__PURE__*/_jsx(DialogRoot, _extends({
    className: clsx(classes.root, className),
    BackdropProps: _extends({
      transitionDuration: transitionDuration,
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
    children: /*#__PURE__*/_jsx(TransitionComponent, _extends({
      appear: true,
      in: open,
      timeout: transitionDuration,
      role: "presentation"
    }, TransitionProps, {
      children: /*#__PURE__*/_jsx(DialogContainer, {
        className: clsx(classes.container),
        onMouseDown: handleMouseDown,
        styleProps: styleProps,
        children: /*#__PURE__*/_jsx(DialogPaper, _extends({
          as: PaperComponent,
          elevation: 24,
          role: "dialog",
          "aria-describedby": ariaDescribedby,
          "aria-labelledby": ariaLabelledby
        }, PaperProps, {
          className: clsx(classes.paper, PaperProps.className),
          styleProps: styleProps,
          children: /*#__PURE__*/_jsx(DialogContext.Provider, {
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
  'aria-describedby': PropTypes.string,

  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby': PropTypes.string,

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
  BackdropComponent: PropTypes.elementType,

  /**
   * @ignore
   */
  BackdropProps: PropTypes.object,

  /**
   * Dialog children, usually the included sub-components.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: PropTypes.bool,

  /**
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen: PropTypes.bool,

  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth: PropTypes.bool,

  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]), PropTypes.string]),

  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: PropTypes.func,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,

  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  PaperComponent: PropTypes.elementType,

  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   * @default {}
   */
  PaperProps: PropTypes.object,

  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll: PropTypes.oneOf(['body', 'paper']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: PropTypes.elementType,

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
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: PropTypes.object
} : void 0;
export default Dialog;