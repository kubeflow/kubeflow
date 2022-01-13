"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayIncludes = arrayIncludes;
exports.createDelegatedEventHandler = createDelegatedEventHandler;
exports.doNothing = exports.executeInTheNextEventLoopTick = exports.pipe = exports.onSpaceOrEnter = void 0;

/* Use it instead of .includes method for IE support */
function arrayIncludes(array, itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(item => array.indexOf(item) !== -1);
  }

  return array.indexOf(itemOrItems) !== -1;
}

const onSpaceOrEnter = (innerFn, onFocus) => event => {
  if (event.key === 'Enter' || event.key === ' ') {
    innerFn(); // prevent any side effects

    event.preventDefault();
    event.stopPropagation();
  }

  if (onFocus) {
    onFocus(event);
  }
};
/* Quick untyped helper to improve function composition readability */


exports.onSpaceOrEnter = onSpaceOrEnter;

const pipe = (...fns) => fns.reduceRight((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)), value => value);

exports.pipe = pipe;

const executeInTheNextEventLoopTick = fn => {
  setTimeout(fn, 0);
};

exports.executeInTheNextEventLoopTick = executeInTheNextEventLoopTick;

function createDelegatedEventHandler(fn, onEvent) {
  return event => {
    fn(event);

    if (onEvent) {
      onEvent(event);
    }
  };
}

const doNothing = () => {};

exports.doNothing = doNothing;