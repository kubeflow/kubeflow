import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import { jsx as _jsx } from "react/jsx-runtime";
var classes = generateUtilityClasses('PrivatePickersToolbarText', ['selected']);
var PickersToolbarTextRoot = styled(Typography, {
  skipSx: true
})(function (_ref) {
  var theme = _ref.theme;
  return _defineProperty({
    transition: theme.transitions.create('color'),
    color: theme.palette.text.secondary
  }, "&.".concat(classes.selected), {
    color: theme.palette.text.primary
  });
});
var PickersToolbarText = /*#__PURE__*/React.forwardRef(function PickersToolbarText(props, ref) {
  var className = props.className,
      selected = props.selected,
      value = props.value,
      other = _objectWithoutProperties(props, ["className", "selected", "value"]);

  return /*#__PURE__*/_jsx(PickersToolbarTextRoot, _extends({
    ref: ref,
    className: clsx(className, selected && classes.selected),
    component: "span"
  }, other, {
    children: value
  }));
});
export default PickersToolbarText;