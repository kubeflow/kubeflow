"use strict";

exports.__esModule = true;
exports.default = void 0;

/* eslint-disable no-multi-assign */
var KASHIDA_PRIORITY = 0;
var NULL_PRIORITY = 3;

var getDistances = function getDistances(gap, factors) {
  var total = 0;
  var priorities = [];
  var unconstrained = [];

  for (var _priority = KASHIDA_PRIORITY; _priority <= NULL_PRIORITY; _priority += 1) {
    priorities[_priority] = unconstrained[_priority] = 0;
  } // sum the factors at each priority


  for (var j = 0; j < factors.length; j += 1) {
    var f = factors[j];
    var sum = f.before + f.after;
    total += sum;
    priorities[f.priority] += sum;

    if (f.unconstrained) {
      unconstrained[f.priority] += sum;
    }
  } // choose the priorities that need to be applied


  var highestPriority = -1;
  var highestPrioritySum = 0;
  var remainingGap = gap;
  var priority;

  for (priority = KASHIDA_PRIORITY; priority <= NULL_PRIORITY; priority += 1) {
    var prioritySum = priorities[priority];

    if (prioritySum !== 0) {
      if (highestPriority === -1) {
        highestPriority = priority;
        highestPrioritySum = prioritySum;
      } // if this priority covers the remaining gap, we're done


      if (Math.abs(remainingGap) <= Math.abs(prioritySum)) {
        priorities[priority] = remainingGap / prioritySum;
        unconstrained[priority] = 0;
        remainingGap = 0;
        break;
      } // mark that we need to use 100% of the adjustment from
      // this priority, and subtract the space that it consumes


      priorities[priority] = 1;
      remainingGap -= prioritySum; // if this priority has unconstrained glyphs, let them consume the remaining space

      if (unconstrained[priority] !== 0) {
        unconstrained[priority] = remainingGap / unconstrained[priority];
        remainingGap = 0;
        break;
      }
    }
  } // zero out remaining priorities (if any)


  for (var p = priority + 1; p <= NULL_PRIORITY; p += 1) {
    priorities[p] = 0;
    unconstrained[p] = 0;
  } // if there is still space left over, assign it to the highest priority that we saw.
  // this violates their factors, but it only happens in extreme cases


  if (remainingGap > 0 && highestPriority > -1) {
    priorities[highestPriority] = (highestPrioritySum + (gap - total)) / highestPrioritySum;
  } // create and return an array of distances to add to each glyph's advance


  var distances = [];

  for (var index = 0; index < factors.length; index += 1) {
    // the distance to add to this glyph is the sum of the space to add
    // after this glyph, and the space to add before the next glyph
    var _f = factors[index];
    var next = factors[index + 1];
    var dist = _f.after * priorities[_f.priority];

    if (next) {
      dist += next.before * priorities[next.priority];
    } // if this glyph is unconstrained, add the unconstrained distance as well


    if (_f.unconstrained) {
      dist += _f.after * unconstrained[_f.priority];

      if (next) {
        dist += next.before * unconstrained[next.priority];
      }
    }

    distances.push(dist);
  }

  return distances;
};

var _default = getDistances;
exports.default = _default;