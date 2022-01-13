import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["disabled", "onSelect", "selected", "value"];
import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import { onSpaceOrEnter } from '../internal/pickers/utils';
import { jsx as _jsx } from "react/jsx-runtime";
const classes = generateUtilityClasses('PrivatePickersMonth', ['root', 'selected']);
const PickersMonthRoot = styled(Typography, {
  skipSx: true
})(({
  theme
}) => ({
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
  },
  [`&.${classes.selected}`]: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium
  }
}));
/**
 * @ignore - do not document.
 */

const PickersMonth = props => {
  const {
    disabled,
    onSelect,
    selected,
    value
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const handleSelection = () => {
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