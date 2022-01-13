import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import ClockNumber from './ClockNumber';
import { jsx as _jsx } from "react/jsx-runtime";

/**
 * @ignore - internal component.
 */
export var getHourNumbers = function getHourNumbers(_ref) {
  var ampm = _ref.ampm,
      date = _ref.date,
      getClockNumberText = _ref.getClockNumberText,
      isDisabled = _ref.isDisabled,
      selectedId = _ref.selectedId,
      utils = _ref.utils;
  var currentHours = date ? utils.getHours(date) : null;
  var hourNumbers = [];
  var startHour = ampm ? 1 : 0;
  var endHour = ampm ? 12 : 23;

  var isSelected = function isSelected(hour) {
    if (currentHours === null) {
      return false;
    }

    if (ampm) {
      if (hour === 12) {
        return currentHours === 12 || currentHours === 0;
      }

      return currentHours === hour || currentHours - 12 === hour;
    }

    return currentHours === hour;
  };

  for (var _hour = startHour; _hour <= endHour; _hour += 1) {
    var label = _hour.toString();

    if (_hour === 0) {
      label = '00';
    }

    var inner = !ampm && (_hour === 0 || _hour > 12);
    label = utils.formatNumber(label);
    var selected = isSelected(_hour);
    hourNumbers.push( /*#__PURE__*/_jsx(ClockNumber, {
      id: selected ? selectedId : undefined,
      index: _hour,
      inner: inner,
      selected: selected,
      disabled: isDisabled(_hour),
      label: label,
      "aria-label": getClockNumberText(label)
    }, _hour));
  }

  return hourNumbers;
};
export var getMinutesNumbers = function getMinutesNumbers(_ref2) {
  var utils = _ref2.utils,
      value = _ref2.value,
      isDisabled = _ref2.isDisabled,
      getClockNumberText = _ref2.getClockNumberText,
      selectedId = _ref2.selectedId;
  var f = utils.formatNumber;
  return [[5, f('05')], [10, f('10')], [15, f('15')], [20, f('20')], [25, f('25')], [30, f('30')], [35, f('35')], [40, f('40')], [45, f('45')], [50, f('50')], [55, f('55')], [0, f('00')]].map(function (_ref3, index) {
    var _ref4 = _slicedToArray(_ref3, 2),
        numberValue = _ref4[0],
        label = _ref4[1];

    var selected = numberValue === value;
    return /*#__PURE__*/_jsx(ClockNumber, {
      label: label,
      id: selected ? selectedId : undefined,
      index: index + 1,
      inner: false,
      disabled: isDisabled(numberValue),
      selected: selected,
      "aria-label": getClockNumberText(label)
    }, numberValue);
  });
};