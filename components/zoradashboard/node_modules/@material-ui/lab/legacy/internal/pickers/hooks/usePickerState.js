import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useOpenState } from './useOpenState';
import { useUtils } from './useUtils';
export function usePickerState(props, valueManager) {
  var disableCloseOnSelect = props.disableCloseOnSelect,
      onAccept = props.onAccept,
      onChange = props.onChange,
      value = props.value;
  var utils = useUtils();

  var _useOpenState = useOpenState(props),
      isOpen = _useOpenState.isOpen,
      setIsOpen = _useOpenState.setIsOpen;

  function initDraftableDate(date) {
    return {
      committed: date,
      draft: date
    };
  }

  var parsedDateValue = valueManager.parseInput(utils, value);

  var _React$useReducer = React.useReducer(function (state, action) {
    switch (action.type) {
      case 'reset':
        return initDraftableDate(action.payload);

      case 'update':
        return _extends({}, state, {
          draft: action.payload
        });

      default:
        return state;
    }
  }, parsedDateValue, initDraftableDate),
      draftState = _React$useReducer[0],
      dispatch = _React$useReducer[1];

  if (!valueManager.areValuesEqual(utils, draftState.committed, parsedDateValue)) {
    dispatch({
      type: 'reset',
      payload: parsedDateValue
    });
  } // Mobile keyboard view is a special case.
  // When it's open picker should work like closed, cause we are just showing text field


  var _React$useState = React.useState(false),
      isMobileKeyboardViewOpen = _React$useState[0],
      setMobileKeyboardViewOpen = _React$useState[1];

  var acceptDate = React.useCallback(function (acceptedDate, needClosePicker) {
    onChange(acceptedDate);

    if (needClosePicker) {
      setIsOpen(false);

      if (onAccept) {
        onAccept(acceptedDate);
      }
    }
  }, [onAccept, onChange, setIsOpen]);
  var wrapperProps = React.useMemo(function () {
    return {
      open: isOpen,
      onClear: function onClear() {
        return acceptDate(valueManager.emptyValue, true);
      },
      onAccept: function onAccept() {
        return acceptDate(draftState.draft, true);
      },
      onDismiss: function onDismiss() {
        return setIsOpen(false);
      },
      onSetToday: function onSetToday() {
        var now = utils.date();
        dispatch({
          type: 'update',
          payload: now
        });
        acceptDate(now, !disableCloseOnSelect);
      }
    };
  }, [acceptDate, disableCloseOnSelect, isOpen, utils, draftState.draft, setIsOpen, valueManager.emptyValue]);
  var pickerProps = React.useMemo(function () {
    return {
      date: draftState.draft,
      isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
      toggleMobileKeyboardView: function toggleMobileKeyboardView() {
        return setMobileKeyboardViewOpen(!isMobileKeyboardViewOpen);
      },
      onDateChange: function onDateChange(newDate, wrapperVariant) {
        var selectionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'partial';
        dispatch({
          type: 'update',
          payload: newDate
        });

        if (selectionState === 'partial') {
          acceptDate(newDate, false);
        }

        if (selectionState === 'finish') {
          var shouldCloseOnSelect = !(disableCloseOnSelect != null ? disableCloseOnSelect : wrapperVariant === 'mobile');
          acceptDate(newDate, shouldCloseOnSelect);
        } // if selectionState === "shallow" do nothing (we already update the draft state)

      }
    };
  }, [acceptDate, disableCloseOnSelect, isMobileKeyboardViewOpen, draftState.draft]);
  var inputProps = React.useMemo(function () {
    return {
      onChange: onChange,
      open: isOpen,
      rawValue: value,
      openPicker: function openPicker() {
        return setIsOpen(true);
      }
    };
  }, [onChange, isOpen, value, setIsOpen]);
  var pickerState = {
    pickerProps: pickerProps,
    inputProps: inputProps,
    wrapperProps: wrapperProps
  };
  React.useDebugValue(pickerState, function () {
    return {
      MuiPickerState: {
        pickerDraft: draftState,
        other: pickerState
      }
    };
  });
  return pickerState;
}