import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["anchor", "classes", "className", "width", "style"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styled from '../styles/styled';
import capitalize from '../utils/capitalize';
import { isHorizontal } from '../Drawer/Drawer';
import { jsx as _jsx } from "react/jsx-runtime";
const SwipeAreaRoot = styled('div', {
  skipSx: true
})(({
  theme,
  styleProps
}) => _extends({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: theme.zIndex.drawer - 1
}, styleProps.anchor === 'left' && {
  right: 'auto'
}, styleProps.anchor === 'right' && {
  left: 'auto',
  right: 0
}, styleProps.anchor === 'top' && {
  bottom: 'auto',
  right: 0
}, styleProps.anchor === 'bottom' && {
  top: 'auto',
  bottom: 0,
  right: 0
}));
/**
 * @ignore - internal component.
 */

const SwipeArea = /*#__PURE__*/React.forwardRef(function SwipeArea(props, ref) {
  const {
    anchor,
    classes = {},
    className,
    width,
    style
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const styleProps = props;
  return /*#__PURE__*/_jsx(SwipeAreaRoot, _extends({
    className: clsx('PrivateSwipeArea-root', classes.root, classes[`anchor${capitalize(anchor)}`], className),
    ref: ref,
    style: _extends({
      [isHorizontal(anchor) ? 'width' : 'height']: width
    }, style),
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? SwipeArea.propTypes = {
  /**
   * Side on which to attach the discovery area.
   */
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']).isRequired,

  /**
   * @ignore
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The width of the left most (or right most) area in `px` where the
   * drawer can be swiped open from.
   */
  width: PropTypes.number.isRequired
} : void 0;
export default SwipeArea;