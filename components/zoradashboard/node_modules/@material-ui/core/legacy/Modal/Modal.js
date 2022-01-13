import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { isHostComponent } from '@material-ui/unstyled';
import { elementAcceptingRef, HTMLElementType } from '@material-ui/utils';
import ModalUnstyled, { modalUnstyledClasses } from '@material-ui/unstyled/ModalUnstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Backdrop from '../Backdrop';
import { jsx as _jsx } from "react/jsx-runtime";
export var modalClasses = modalUnstyledClasses;

var extendUtilityClasses = function extendUtilityClasses(styleProps) {
  return styleProps.classes;
};

var ModalRoot = styled('div', {
  name: 'MuiModal',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, !styleProps.open && styleProps.exited && styles.hidden];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    position: 'fixed',
    zIndex: theme.zIndex.modal,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0
  }, !styleProps.open && styleProps.exited && {
    visibility: 'hidden'
  });
});
var ModalBackdrop = styled(Backdrop, {
  name: 'MuiModal',
  slot: 'Backdrop',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.backdrop;
  }
})({
  zIndex: -1
});
/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/api/dialog/)
 * - [Drawer](/api/drawer/)
 * - [Menu](/api/menu/)
 * - [Popover](/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */

var Modal = /*#__PURE__*/React.forwardRef(function Modal(inProps, ref) {
  var _componentsProps$root;

  var props = useThemeProps({
    name: 'MuiModal',
    props: inProps
  });

  var _props$BackdropCompon = props.BackdropComponent,
      BackdropComponent = _props$BackdropCompon === void 0 ? ModalBackdrop : _props$BackdropCompon,
      _props$closeAfterTran = props.closeAfterTransition,
      closeAfterTransition = _props$closeAfterTran === void 0 ? false : _props$closeAfterTran,
      children = props.children,
      _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      _props$disableAutoFoc = props.disableAutoFocus,
      disableAutoFocus = _props$disableAutoFoc === void 0 ? false : _props$disableAutoFoc,
      _props$disableEnforce = props.disableEnforceFocus,
      disableEnforceFocus = _props$disableEnforce === void 0 ? false : _props$disableEnforce,
      _props$disableEscapeK = props.disableEscapeKeyDown,
      disableEscapeKeyDown = _props$disableEscapeK === void 0 ? false : _props$disableEscapeK,
      _props$disablePortal = props.disablePortal,
      disablePortal = _props$disablePortal === void 0 ? false : _props$disablePortal,
      _props$disableRestore = props.disableRestoreFocus,
      disableRestoreFocus = _props$disableRestore === void 0 ? false : _props$disableRestore,
      _props$disableScrollL = props.disableScrollLock,
      disableScrollLock = _props$disableScrollL === void 0 ? false : _props$disableScrollL,
      _props$hideBackdrop = props.hideBackdrop,
      hideBackdrop = _props$hideBackdrop === void 0 ? false : _props$hideBackdrop,
      _props$keepMounted = props.keepMounted,
      keepMounted = _props$keepMounted === void 0 ? false : _props$keepMounted,
      other = _objectWithoutProperties(props, ["BackdropComponent", "closeAfterTransition", "children", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted"]);

  var _React$useState = React.useState(true),
      exited = _React$useState[0],
      setExited = _React$useState[1];

  var commonProps = {
    closeAfterTransition: closeAfterTransition,
    disableAutoFocus: disableAutoFocus,
    disableEnforceFocus: disableEnforceFocus,
    disableEscapeKeyDown: disableEscapeKeyDown,
    disablePortal: disablePortal,
    disableRestoreFocus: disableRestoreFocus,
    disableScrollLock: disableScrollLock,
    hideBackdrop: hideBackdrop,
    keepMounted: keepMounted
  };

  var styleProps = _extends({}, props, commonProps, {
    exited: exited
  });

  var classes = extendUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(ModalUnstyled, _extends({
    components: _extends({
      Root: ModalRoot
    }, components),
    componentsProps: {
      root: _extends({}, componentsProps.root, (!components.Root || !isHostComponent(components.Root)) && {
        styleProps: _extends({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.styleProps)
      })
    },
    BackdropComponent: BackdropComponent,
    onTransitionEnter: function onTransitionEnter() {
      return setExited(false);
    },
    onTransitionExited: function onTransitionExited() {
      return setExited(true);
    },
    ref: ref
  }, other, {
    classes: classes
  }, commonProps, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? Modal.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

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
   * Props applied to the [`Backdrop`](/api/backdrop/) element.
   */
  BackdropProps: PropTypes.object,

  /**
   * A single child content element.
   */
  children: elementAcceptingRef.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: PropTypes.bool,

  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([HTMLElementType, PropTypes.func]),

  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: PropTypes.bool,

  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: PropTypes.bool,

  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: PropTypes.bool,

  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,

  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden.
   * @default false
   */
  disableRestoreFocus: PropTypes.bool,

  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: PropTypes.bool,

  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: PropTypes.bool,

  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: PropTypes.bool,

  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: PropTypes.func,

  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Modal;