import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import styled from '../styles/styled';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var RadioButtonIconRoot = styled('span')({
  position: 'relative',
  display: 'flex'
});
var RadioButtonIconBackground = styled(RadioButtonUncheckedIcon, {
  skipSx: true
})({
  // Scale applied to prevent dot misalignment in Safari
  transform: 'scale(1)'
});
var RadioButtonIconDot = styled(RadioButtonCheckedIcon, {
  skipSx: true
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    left: 0,
    position: 'absolute',
    transform: 'scale(0)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.shortest
    })
  }, styleProps.checked && {
    transform: 'scale(1)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest
    })
  });
});
/**
 * @ignore - internal component.
 */

function RadioButtonIcon(props) {
  var _props$checked = props.checked,
      checked = _props$checked === void 0 ? false : _props$checked,
      _props$classes = props.classes,
      classes = _props$classes === void 0 ? {} : _props$classes,
      fontSize = props.fontSize;

  var styleProps = _extends({}, props, {
    checked: checked
  });

  return /*#__PURE__*/_jsxs(RadioButtonIconRoot, {
    className: classes.root,
    styleProps: styleProps,
    children: [/*#__PURE__*/_jsx(RadioButtonIconBackground, {
      fontSize: fontSize,
      className: classes.background,
      styleProps: styleProps
    }), /*#__PURE__*/_jsx(RadioButtonIconDot, {
      fontSize: fontSize,
      className: classes.dot,
      styleProps: styleProps
    })]
  });
}

process.env.NODE_ENV !== "production" ? RadioButtonIcon.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: PropTypes.oneOf(['small', 'medium'])
} : void 0;
export default RadioButtonIcon;