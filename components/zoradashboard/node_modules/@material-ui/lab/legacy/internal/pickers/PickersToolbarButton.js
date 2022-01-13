import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import PickersToolbarText from './PickersToolbarText';
import { jsx as _jsx } from "react/jsx-runtime";
var PickersToolbarButtonRoot = styled(Button, {
  skipSx: true
})({
  padding: 0,
  minWidth: 16,
  textTransform: 'none'
});
var PickersToolbarButton = /*#__PURE__*/React.forwardRef(function PickersToolbarButton(props, ref) {
  var align = props.align,
      className = props.className,
      selected = props.selected,
      typographyClassName = props.typographyClassName,
      value = props.value,
      variant = props.variant,
      other = _objectWithoutProperties(props, ["align", "className", "selected", "typographyClassName", "value", "variant"]);

  return /*#__PURE__*/_jsx(PickersToolbarButtonRoot, _extends({
    variant: "text",
    ref: ref,
    className: className
  }, other, {
    children: /*#__PURE__*/_jsx(PickersToolbarText, {
      align: align,
      className: typographyClassName,
      variant: variant,
      value: value,
      selected: selected
    })
  }));
});
export default PickersToolbarButton;