import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["align", "className", "selected", "typographyClassName", "value", "variant"];
import * as React from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import PickersToolbarText from './PickersToolbarText';
import { jsx as _jsx } from "react/jsx-runtime";
const PickersToolbarButtonRoot = styled(Button, {
  skipSx: true
})({
  padding: 0,
  minWidth: 16,
  textTransform: 'none'
});
const PickersToolbarButton = /*#__PURE__*/React.forwardRef(function PickersToolbarButton(props, ref) {
  const {
    align,
    className,
    selected,
    typographyClassName,
    value,
    variant
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

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