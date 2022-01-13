import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import sliderUnstyledClasses from './sliderUnstyledClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useValueLabelClasses = function useValueLabelClasses(props) {
  var open = props.open;
  var utilityClasses = {
    offset: clsx(open && sliderUnstyledClasses.valueLabelOpen),
    circle: sliderUnstyledClasses.valueLabelCircle,
    label: sliderUnstyledClasses.valueLabelLabel
  };
  return utilityClasses;
};
/**
 * @ignore - internal component.
 */


function SliderValueLabelUnstyled(props) {
  var children = props.children,
      className = props.className,
      value = props.value,
      theme = props.theme;
  var classes = useValueLabelClasses(props);
  return /*#__PURE__*/React.cloneElement(children, {
    className: clsx(children.props.className)
  }, /*#__PURE__*/_jsxs(React.Fragment, {
    children: [children.props.children, /*#__PURE__*/_jsx("span", {
      className: clsx(classes.offset, className),
      theme: theme,
      "aria-hidden": true,
      children: /*#__PURE__*/_jsx("span", {
        className: classes.circle,
        children: /*#__PURE__*/_jsx("span", {
          className: classes.label,
          children: value
        })
      })
    })]
  }));
}

process.env.NODE_ENV !== "production" ? SliderValueLabelUnstyled.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  theme: PropTypes.any,
  value: PropTypes.node
} : void 0;
export default SliderValueLabelUnstyled;