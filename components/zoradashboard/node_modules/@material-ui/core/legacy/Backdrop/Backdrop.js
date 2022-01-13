import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { isHostComponent } from '@material-ui/unstyled';
import BackdropUnstyled, { backdropUnstyledClasses } from '@material-ui/unstyled/BackdropUnstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Fade from '../Fade';
import { jsx as _jsx } from "react/jsx-runtime";
export var backdropClasses = backdropUnstyledClasses;

var extendUtilityClasses = function extendUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  return classes;
};

var BackdropRoot = styled('div', {
  name: 'MuiBackdrop',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.invisible && styles.invisible];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent'
  }, styleProps.invisible && {
    backgroundColor: 'transparent'
  });
});
var Backdrop = /*#__PURE__*/React.forwardRef(function Backdrop(inProps, ref) {
  var _componentsProps$root;

  var props = useThemeProps({
    props: inProps,
    name: 'MuiBackdrop'
  });

  var children = props.children,
      _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      className = props.className,
      _props$invisible = props.invisible,
      invisible = _props$invisible === void 0 ? false : _props$invisible,
      open = props.open,
      transitionDuration = props.transitionDuration,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Fade : _props$TransitionComp,
      other = _objectWithoutProperties(props, ["children", "components", "componentsProps", "className", "invisible", "open", "transitionDuration", "TransitionComponent"]);

  var styleProps = _extends({}, props, {
    invisible: invisible
  });

  var classes = extendUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(TransitionComponent, _extends({
    in: open,
    timeout: transitionDuration
  }, other, {
    children: /*#__PURE__*/_jsx(BackdropUnstyled, {
      className: className,
      invisible: invisible,
      components: _extends({
        Root: BackdropRoot
      }, components),
      componentsProps: {
        root: _extends({}, componentsProps.root, (!components.Root || !isHostComponent(components.Root)) && {
          styleProps: _extends({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.styleProps)
        })
      },
      classes: classes,
      ref: ref,
      children: children
    })
  }));
});
process.env.NODE_ENV !== "production" ? Backdrop.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

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
   * The components used for each slot inside the Backdrop.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Backdrop.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: PropTypes.bool,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
export default Backdrop;