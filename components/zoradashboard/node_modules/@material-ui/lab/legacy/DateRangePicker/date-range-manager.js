import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
export function calculateRangeChange(_ref) {
  var utils = _ref.utils,
      range = _ref.range,
      selectedDate = _ref.newDate,
      currentlySelectingRangeEnd = _ref.currentlySelectingRangeEnd;

  var _range = _slicedToArray(range, 2),
      start = _range[0],
      end = _range[1];

  if (currentlySelectingRangeEnd === 'start') {
    return Boolean(end) && utils.isAfter(selectedDate, end) ? {
      nextSelection: 'end',
      newRange: [selectedDate, null]
    } : {
      nextSelection: 'end',
      newRange: [selectedDate, end]
    };
  }

  return Boolean(start) && utils.isBefore(selectedDate, start) ? {
    nextSelection: 'end',
    newRange: [selectedDate, null]
  } : {
    nextSelection: 'start',
    newRange: [start, selectedDate]
  };
}
export function calculateRangePreview(options) {
  if (!options.newDate) {
    return [null, null];
  }

  var _options$range = _slicedToArray(options.range, 2),
      start = _options$range[0],
      end = _options$range[1];

  var _calculateRangeChange = calculateRangeChange(options),
      newRange = _calculateRangeChange.newRange;

  if (!start || !end) {
    return newRange;
  }

  var _newRange = _slicedToArray(newRange, 2),
      previewStart = _newRange[0],
      previewEnd = _newRange[1];

  return options.currentlySelectingRangeEnd === 'end' ? [end, previewEnd] : [previewStart, start];
}