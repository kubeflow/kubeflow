/* Use it instead of .includes method for IE support */
export function arrayIncludes(array, itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(item => array.indexOf(item) !== -1);
  }

  return array.indexOf(itemOrItems) !== -1;
}
export const onSpaceOrEnter = (innerFn, onFocus) => event => {
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

export const pipe = (...fns) => fns.reduceRight((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)), value => value);
export const executeInTheNextEventLoopTick = fn => {
  setTimeout(fn, 0);
};
export function createDelegatedEventHandler(fn, onEvent) {
  return event => {
    fn(event);

    if (onEvent) {
      onEvent(event);
    }
  };
}
export const doNothing = () => {};