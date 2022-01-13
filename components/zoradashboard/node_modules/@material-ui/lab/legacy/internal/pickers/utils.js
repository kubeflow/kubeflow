/* Use it instead of .includes method for IE support */
export function arrayIncludes(array, itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(function (item) {
      return array.indexOf(item) !== -1;
    });
  }

  return array.indexOf(itemOrItems) !== -1;
}
export var onSpaceOrEnter = function onSpaceOrEnter(innerFn, onFocus) {
  return function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      innerFn(); // prevent any side effects

      event.preventDefault();
      event.stopPropagation();
    }

    if (onFocus) {
      onFocus(event);
    }
  };
};
/* Quick untyped helper to improve function composition readability */

export var pipe = function pipe() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduceRight(function (prevFn, nextFn) {
    return function () {
      return nextFn(prevFn.apply(void 0, arguments));
    };
  }, function (value) {
    return value;
  });
};
export var executeInTheNextEventLoopTick = function executeInTheNextEventLoopTick(fn) {
  setTimeout(fn, 0);
};
export function createDelegatedEventHandler(fn, onEvent) {
  return function (event) {
    fn(event);

    if (onEvent) {
      onEvent(event);
    }
  };
}
export var doNothing = function doNothing() {};