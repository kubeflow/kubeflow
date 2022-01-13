import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["currentlySelectingRangeEnd", "disableOpenPicker", "endText", "onBlur", "onChange", "open", "openPicker", "rawValue", "rawValue", "readOnly", "renderInput", "setCurrentlySelectingRangeEnd", "startText", "TextFieldProps", "validationError"];
import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { useMaskedInput } from '../internal/pickers/hooks/useMaskedInput';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { executeInTheNextEventLoopTick } from '../internal/pickers/utils';
import { jsx as _jsx } from "react/jsx-runtime";
const DateRangePickerInputRoot = styled('div', {
  skipSx: true
})(({
  theme
}) => ({
  display: 'flex',
  alignItems: 'baseline',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

/**
 * @ignore - internal component.
 */
const DateRangePickerInput = /*#__PURE__*/React.forwardRef(function DateRangePickerInput(props, ref) {
  const {
    currentlySelectingRangeEnd,
    disableOpenPicker,
    endText,
    onBlur,
    onChange,
    open,
    openPicker,
    rawValue: [start, end],
    readOnly,
    renderInput,
    setCurrentlySelectingRangeEnd,
    startText,
    TextFieldProps,
    validationError: [startValidationError, endValidationError]
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const utils = useUtils();
  const startRef = React.useRef(null);
  const endRef = React.useRef(null);
  const wrapperVariant = React.useContext(WrapperVariantContext);
  React.useEffect(() => {
    if (!open) {
      return;
    }

    if (currentlySelectingRangeEnd === 'start') {
      startRef.current?.focus();
    } else if (currentlySelectingRangeEnd === 'end') {
      endRef.current?.focus();
    }
  }, [currentlySelectingRangeEnd, open]); // TODO: rethink this approach. We do not need to wait for calendar to be updated to rerender input (looks like freezing)
  // TODO: so simply break 1 react's commit phase in 2 (first for input and second for calendars) by executing onChange in the next tick

  const lazyHandleChangeCallback = React.useCallback((...args) => executeInTheNextEventLoopTick(() => onChange(...args)), [onChange]);

  const handleStartChange = (date, inputString) => {
    lazyHandleChangeCallback([date, utils.date(end)], inputString);
  };

  const handleEndChange = (date, inputString) => {
    lazyHandleChangeCallback([utils.date(start), date], inputString);
  };

  const openRangeStartSelection = () => {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('start');
    }

    if (!readOnly && !disableOpenPicker) {
      openPicker();
    }
  };

  const openRangeEndSelection = () => {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('end');
    }

    if (!readOnly && !disableOpenPicker) {
      openPicker();
    }
  };

  const openOnFocus = wrapperVariant === 'desktop';
  const startInputProps = useMaskedInput(_extends({}, other, {
    readOnly,
    rawValue: start,
    onChange: handleStartChange,
    label: startText,
    validationError: startValidationError !== null,
    TextFieldProps: _extends({}, TextFieldProps, {
      ref: startRef,
      focused: open && currentlySelectingRangeEnd === 'start'
    }),
    inputProps: {
      onClick: !openOnFocus ? openRangeStartSelection : undefined,
      onFocus: openOnFocus ? openRangeStartSelection : undefined
    }
  }));
  const endInputProps = useMaskedInput(_extends({}, other, {
    readOnly,
    label: endText,
    rawValue: end,
    onChange: handleEndChange,
    validationError: endValidationError !== null,
    TextFieldProps: _extends({}, TextFieldProps, {
      ref: endRef,
      focused: open && currentlySelectingRangeEnd === 'end'
    }),
    inputProps: {
      onClick: !openOnFocus ? openRangeEndSelection : undefined,
      onFocus: openOnFocus ? openRangeEndSelection : undefined
    }
  }));
  return /*#__PURE__*/_jsx(DateRangePickerInputRoot, {
    onBlur: onBlur,
    ref: ref,
    children: renderInput(startInputProps, endInputProps)
  });
});
export default DateRangePickerInput;