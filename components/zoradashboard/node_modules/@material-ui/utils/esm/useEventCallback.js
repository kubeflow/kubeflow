import * as React from 'react';
import useEnhancedEffect from './useEnhancedEffect';
/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */

export default function useEventCallback(fn) {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return React.useCallback((...args) => // @ts-expect-error hide `this`
  // tslint:disable-next-line:ban-comma-operator
  (0, ref.current)(...args), []);
}