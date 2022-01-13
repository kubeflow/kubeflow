"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePickerState = usePickerState;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _useOpenState = require("./useOpenState");

var _useUtils = require("./useUtils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function usePickerState(props, valueManager) {
  const {
    disableCloseOnSelect,
    onAccept,
    onChange,
    value
  } = props;
  const utils = (0, _useUtils.useUtils)();
  const {
    isOpen,
    setIsOpen
  } = (0, _useOpenState.useOpenState)(props);

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
        return (0, _extends2.default)({}, state, {
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