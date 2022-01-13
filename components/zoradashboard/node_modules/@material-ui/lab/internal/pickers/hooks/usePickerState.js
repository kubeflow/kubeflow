import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useOpenState } from './useOpenState';
import { useUtils } from './useUtils';
export function usePickerState(props, valueManager) {
  const {
    disableCloseOnSelect,
    onAccept,
    onChange,
    value
  } = props;
  const utils = useUtils();
  const {
    isOpen,
    setIsOpen
  } = useOpenState(props);

  function initDraftableDate(date) {
    return {
      committed: date,
      draft: date
    };
  }

  const parsedDateValue = valueManager.parseInput(utils, value);
  const [draftState, dispatch] = React.useReducer((state, action) => {
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
  }, parsedDateValue, initDraftableDate);

  if (!valueManager.areValuesEqual(utils, draftState.committed, parsedDateValue)) {
    dispatch({
      type: 'reset',
      payload: parsedDateValue
    });
  } // Mobile keyboard view is a special case.
  // When it's open picker should work like closed, cause we are just showing text field


  const [isMobileKeyboardViewOpen, setMobileKeyboardViewOpen] = React.useState(false);
  const acceptDate = React.useCallback((acceptedDate, needClosePicker) => {
    onChange(acceptedDate);

    if (needClosePicker) {
      setIsOpen(false);

      if (onAccept) {
        onAccept(acceptedDate);
      }
    }
  }, [onAccept, onChange, setIsOpen]);
  const wrapperProps = React.useMemo(() => ({
    open: isOpen,
    onClear: () => acceptDate(valueManager.emptyValue, true),
    onAccept: () => acceptDate(draftState.draft, true),
    onDismiss: () => setIsOpen(false),
    onSetToday: () => {
      const now = utils.date();
      dispatch({
        type: 'update',
        payload: now
      });
      acceptDate(now, !disableCloseOnSelect);
    }
  }), [acceptDate, disableCloseOnSelect, isOpen, utils, draftState.draft, setIsOpen, valueManager.emptyValue]);
  const pickerProps = React.useMemo(() => ({
    date: draftState.draft,
    isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: () => setMobileKeyboardViewOpen(!isMobileKeyboardViewOpen),
    onDateChange: (newDate, wrapperVariant, selectionState = 'partial') => {
      dispatch({
        type: 'update',
        payload: newDate
      });

      if (selectionState === 'partial') {
        acceptDate(newDate, false);
      }

      if (selectionState === 'finish') {
        const shouldCloseOnSelect = !(disableCloseOnSelect != null ? disableCloseOnSelect : wrapperVariant === 'mobile');
        acceptDate(newDate, shouldCloseOnSelect);
      } // if selectionState === "shallow" do nothing (we already update the draft state)

    }
  }), [acceptDate, disableCloseOnSelect, isMobileKeyboardViewOpen, draftState.draft]);
  const inputProps = React.useMemo(() => ({
    onChange,
    open: isOpen,
    rawValue: value,
    openPicker: () => setIsOpen(true)
  }), [onChange, isOpen, value, setIsOpen]);
  const pickerState = {
    pickerProps,
    inputProps,
    wrapperProps
  };
  React.useDebugValue(pickerState, () => ({
    MuiPickerState: {
      pickerDraft: draftState,
      other: pickerState
    }
  }));
  return pickerState;
}