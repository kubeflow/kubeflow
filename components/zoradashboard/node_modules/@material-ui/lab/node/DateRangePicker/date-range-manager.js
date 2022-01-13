"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateRangeChange = calculateRangeChange;
exports.calculateRangePreview = calculateRangePreview;

function calculateRangeChange({
  utils,
  range,
  newDate: selectedDate,
  currentlySelectingRangeEnd
}) {
  const [start, end] = range;

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

function calculateRangePreview(options) {
  if (!options.newDate) {
    return [null, null];
  }

  const [start, end] = options.range;
  const {
    newRange
  } = calculateRangeChange(options);

  if (!start || !end) {
    return newRange;
  }

  const [previewStart, previewEnd] = newRange;
  return options.currentlySelectingRangeEnd === 'end' ? [end, previewEnd] : [previewStart, start];
}