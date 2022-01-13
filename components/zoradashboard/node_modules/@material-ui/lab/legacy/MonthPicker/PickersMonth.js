import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import { onSpaceOrEnter } from '../internal/pickers/utils';
import { jsx as _jsx } from "react/jsx-runtime";
var classes = generateUtilityClasses('PrivatePickersMonth', ['root', 'selected']);
var PickersMonthRoot = styled(Typography, {
  skipSx: true
})(function (_ref) {
  var theme = _ref.theme;
  return _defineProperty({
    flex: '1 0 33.33%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    height: 64,
    outline: 0,
    transition: theme.transitions.create('font-size', {
      duration: '100ms'
    }),
    '&:focus': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:disabled': {
      pointerEvents: 'none',
      color: theme.palette.text.secondary
    }
  }, "&.".concat(classes.selected), {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium
  });
});
/**
 * @ignore - do not document.
 */

var PickersMonth = function PickersMonth(props) {
  var disabled = props.disabled,
      onSelect = props.onSelect,
      selected = props.selected,
      value = props.value,
      other = _objectWithoutProperties(props, ["disabled", "onSelect", "selected", "value"]);

  var handleSelection = function handleSelection() {
    onSelect(value);
  };

  return /*#__PURE__*/_jsx(PickersMonthRoot, _extends({
    component: "button",
    className: clsx(classes.root, selected && classes.selected),
    tabIndex: disabled ? -1 : 0,
    onClick: handleSelection,
    onKeyDown: onSpaceOrEnter(handleSelection),
    color: selected ? 'primary' : undefined,
    variant: selected ? 'h5' : 'subtitle1',
    disabled: disabled
  }, other));
};

export default PickersMonth;