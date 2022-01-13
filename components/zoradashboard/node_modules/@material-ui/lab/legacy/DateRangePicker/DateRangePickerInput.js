import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { useMaskedInput } from '../internal/pickers/hooks/useMaskedInput';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { executeInTheNextEventLoopTick } from '../internal/pickers/utils';
import { jsx as _jsx } from "react/jsx-runtime";
var DateRangePickerInputRoot = styled('div', {
  skipSx: true
})(function (_ref) {
  var theme = _ref.theme;
  return _defineProperty({
    display: 'flex',
    alignItems: 'baseline'
  }, theme.breakpoints.down('xs'), {
    flexDirection: 'column',
    alignItems: 'center'
  });
});

/**
 * @ignore - internal component.
 */
var DateRangePickerInput = /*#__PURE__*/React.forwardRef(function DateRangePickerInput(props, ref) {
  var currentlySelectingRangeEnd = props.currentlySelectingRangeEnd,
      disableOpenPicker = props.disableOpenPicker,
      endText = props.endText,
      onBlur = props.onBlur,
      onChange = props.onChange,
      open = props.open,
      openPicker = props.openPicker,
      rawValue = props.rawValue,
      _props$rawValue = _slicedToArray(props.rawValue, 2),
      start = _props$rawValue[0],
      end = _props$rawValue[1],
      readOnly = props.readOnly,
      renderInput = props.renderInput,
      setCurrentlySelectingRangeEnd = props.setCurrentlySelectingRangeEnd,
      startText = props.startText,
      TextFieldProps = props.TextFieldProps,
      _props$validationErro = _slicedToArray(props.validationError, 2),
      startValidationError = _props$validationErro[0],
      endValidationError = _props$validationErro[1],
      other = _objectWithoutProperties(props, ["currentlySelectingRangeEnd", "disableOpenPicker", "endText", "onBlur", "onChange", "open", "openPicker", "rawValue", "rawValue", "readOnly", "renderInput", "setCurrentlySelectingRangeEnd", "startText", "TextFieldProps", "validationError"]);

  var utils = useUtils();
  var startRef = React.useRef(null);
  var endRef = React.useRef(null);
  var wrapperVariant = React.useContext(WrapperVariantContext);
  React.useEffect(function () {
    if (!open) {
      return;
    }

    if (currentlySelectingRangeEnd === 'start') {
      var _startRef$current;

      (_startRef$current = startRef.current) == null ? void 0 : _startRef$current.focus();
    } else if (currentlySelectingRangeEnd === 'end') {
      var _endRef$current;

      (_endRef$current = endRef.current) == null ? void 0 : _endRef$current.focus();
    }
  }, [currentlySelectingRangeEnd, open]); // TODO: rethink this approach. We do not need to wait for calendar to be updated to rerender input (looks like freezing)
  // TODO: so simply break 1 react's commit phase in 2 (first for input and second for calendars) by executing onChange in the next tick

  var lazyHandleChangeCallback = React.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return executeInTheNextEventLoopTick(function () {
      return onChange.apply(void 0, args);
    });
  }, [onChange]);

  var handleStartChange = function handleStartChange(date, inputString) {
    lazyHandleChangeCallback([date, utils.date(end)], inputString);
  };

  var handleEndChange = function handleEndChange(date, inputString) {
    lazyHandleChangeCallback([utils.date(start), date], inputString);
  };

  var openRangeStartSelection = function openRangeStartSelection() {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('start');
    }

    if (!readOnly && !disableOpenPicker) {
      openPicker();
    }
  };

  var openRangeEndSelection = function openRangeEndSelection() {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('end');
    }

    if (!readOnly && !disableOpenPicker) {
      openPicker();
    }
  };

  var openOnFocus = wrapperVariant === 'desktop';
  var startInputProps = useMaskedInput(_extends({}, other, {
    readOnly: readOnly,
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
  var endInputProps = useMaskedInput(_extends({}, other, {
    readOnly: readOnly,
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