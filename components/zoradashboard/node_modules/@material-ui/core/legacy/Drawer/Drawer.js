import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { integerPropType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Modal from '../Modal';
import Slide from '../Slide';
import Paper from '../Paper';
import capitalize from '../utils/capitalize';
import { duration } from '../styles/createTransitions';
import useTheme from '../styles/useTheme';
import useThemeProps from '../styles/useThemeProps';
import styled, { rootShouldForwardProp } from '../styles/styled';
import { getDrawerUtilityClass } from './drawerClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return [styles.root, (styleProps.variant === 'permanent' || styleProps.variant === 'persistent') && styles.docked, styles.modal];
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      anchor = styleProps.anchor,
      variant = styleProps.variant;
  var slots = {
    root: ['root'],
    docked: [(variant === 'permanent' || variant === 'persistent') && 'docked'],
    modal: ['modal'],
    paper: ['paper', "paperAnchor".concat(capitalize(anchor)), variant !== 'temporary' && "paperAnchorDocked".concat(capitalize(anchor))]
  };
  return composeClasses(slots, getDrawerUtilityClass, classes);
};

var DrawerRoot = styled(Modal, {
  name: 'MuiDrawer',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme;
  return {
    zIndex: theme.zIndex.drawer
  };
});
var DrawerDockedRoot = styled('div', {
  shouldForwardProp: rootShouldForwardProp,
  name: 'MuiDrawer',
  slot: 'Docked',
  skipVariantsResolver: false,
  overridesResolver: overridesResolver
})({
  flex: '0 0 auto'
});
var DrawerPaper = styled(Paper, {
  name: 'MuiDrawer',
  slot: 'Paper',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.paper, styles["paperAnchor".concat(capitalize(styleProps.anchor))], styleProps.variant !== 'temporary' && styles["paperAnchorDocked".concat(capitalize(styleProps.anchor))]];
  }
})(function (_ref2) {
  var theme = _ref2.theme,
      styleProps = _ref2.styleProps;
  return _extends({
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
    borderRight: "1px solid ".concat(theme.palette.divider)
  }, styleProps.anchor === 'top' && styleProps.variant !== 'temporary' && {
    borderBottom: "1px solid ".concat(theme.palette.divider)
  }, styleProps.anchor === 'right' && styleProps.variant !== 'temporary' && {
    borderLeft: "1px solid ".concat(theme.palette.divider)
  }, styleProps.anchor === 'bottom' && styleProps.variant !== 'temporary' && {
    borderTop: "1px solid ".concat(theme.palette.divider)
  });
});
var oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up'
};
export function isHorizontal(anchor) {
  return ['left', 'right'].indexOf(anchor) !== -1;
}
export function getAnchor(theme, anchor) {
  return theme.direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}
var defaultTransitionDuration = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen
};
/**
 * The props of the [Modal](/api/modal/) component are available
 * when `variant="temporary"` is set.
 */

var Drawer = /*#__PURE__*/React.forwardRef(function Drawer(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiDrawer'
  });
  var _props$anchor = props.anchor,
      anchorProp = _props$anchor === void 0 ? 'left' : _props$anchor,
      BackdropProps = props.BackdropProps,
      children = props.children,
      className = props.className,
      _props$elevation = props.elevation,
      elevation = _props$elevation === void 0 ? 16 : _props$elevation,
      _props$hideBackdrop = props.hideBackdrop,
      hideBackdrop = _props$hideBackdrop === void 0 ? false : _props$hideBackdrop,
      _props$ModalProps = props.ModalProps;
  _props$ModalProps = _props$ModalProps === void 0 ? {} : _props$ModalProps;

  var BackdropPropsProp = _props$ModalProps.BackdropProps,
      ModalProps = _objectWithoutProperties(_props$ModalProps, ["BackdropProps"]),
      onClose = props.onClose,
      _props$open = props.open,
      open = _props$open === void 0 ? false : _props$open,
      _props$PaperProps = props.PaperProps,
      PaperProps = _props$PaperProps === void 0 ? {} : _props$PaperProps,
      SlideProps = props.SlideProps,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Slide : _props$TransitionComp,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === void 0 ? defaultTransitionDuration : _props$transitionDura,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'temporary' : _props$variant,
      other = _objectWithoutProperties(props, ["anchor", "BackdropProps", "children", "className", "elevation", "hideBackdrop", "ModalProps", "onClose", "open", "PaperProps", "SlideProps", "TransitionComponent", "transitionDuration", "variant"]);

  var theme = useTheme(); // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.

  var mounted = React.useRef(false);
  React.useEffect(function () {
    mounted.current = true;
  }, []);
  var anchorInvariant = getAnchor(theme, anchorProp);
  var anchor = anchorProp;

  var styleProps = _extends({}, props, {
    anchor: anchor,
    elevation: elevation,
    open: open,
    variant: variant
  }, other);

  var classes = useUtilityClasses(styleProps);

  var drawer = /*#__PURE__*/_jsx(DrawerPaper, _extends({
    elevation: variant === 'temporary' ? elevation : 0,
    square: true
  }, PaperProps, {
    className: clsx(classes.paper, PaperProps.className),
    styleProps: styleProps,
    children: children
  }));

  if (variant === 'permanent') {
    return /*#__PURE__*/_jsx(DrawerDockedRoot, _extends({
      className: clsx(classes.root, classes.docked, className),
      styleProps: styleProps,
      ref: ref
    }, other, {
      children: drawer
    }));
  }

  var slidingDrawer = /*#__PURE__*/_jsx(TransitionComponent, _extends({
    in: open,
    direction: oppositeDirection[anchorInvariant],
    timeout: transitionDuration,
    appear: mounted.current
  }, SlideProps, {
    children: drawer
  }));

  if (variant === 'persistent') {
    return /*#__PURE__*/_jsx(DrawerDockedRoot, _extends({
      className: clsx(classes.root, classes.docked, className),
      styleProps: styleProps,
      ref: ref
    }, other, {
      children: slidingDrawer
    }));
  } // variant === temporary


  return /*#__PURE__*/_jsx(DrawerRoot, _extends({
    BackdropProps: _extends({}, BackdropProps, BackdropPropsProp, {
      transitionDuration: transitionDuration
    }),
    className: clsx(classes.root, classes.modal, className),
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
  anchor: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),

  /**
   * @ignore
   */
  BackdropProps: PropTypes.object,

  /**
   * The content of the component.
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
   * The elevation of the drawer.
   * @default 16
   */
  elevation: integerPropType,

  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: PropTypes.bool,

  /**
   * Props applied to the [`Modal`](/api/modal/) element.
   * @default {}
   */
  ModalProps: PropTypes.object,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,

  /**
   * If `true`, the component is shown.
   * @default false
   */
  open: PropTypes.bool,

  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   * @default {}
   */
  PaperProps: PropTypes.object,

  /**
   * Props applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

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
   * The variant to use.
   * @default 'temporary'
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary'])
} : void 0;
export default Drawer;