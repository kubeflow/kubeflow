import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "selected", "value"];
import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import { jsx as _jsx } from "react/jsx-runtime";
const classes = generateUtilityClasses('PrivatePickersToolbarText', ['selected']);
const PickersToolbarTextRoot = styled(Typography, {
  skipSx: true
})(({
  theme
}) => ({
  transition: theme.transitions.create('color'),
  color: theme.palette.text.secondary,
  [`&.${classes.selected}`]: {
    color: theme.palette.text.primary
  }
}));
const PickersToolbarText = /*#__PURE__*/React.forwardRef(function PickersToolbarText(props, ref) {
  const {
    className,
    selected,
    value
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  return /*#__PURE__*/_jsx(PickersToolbarTextRoot, _extends({
    ref: ref,
    className: clsx(className, selected && classes.selected),
    component: "span"
  }, other, {
    children: value
  }));
});
export default PickersToolbarText;