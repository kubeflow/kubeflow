(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.useMemoOne = {}, global.React));
}(this, function (exports, react) { 'use strict';

  function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
      return false;
    }

    for (var i = 0; i < newInputs.length; i++) {
      if (newInputs[i] !== lastInputs[i]) {
        return false;
      }
    }

    return true;
  }

  function useMemoOne(getResult, inputs) {
    var initial = react.useState(function () {
      return {
        inputs: inputs,
        result: getResult()
      };
    })[0];
    var isFirstRun = react.useRef(true);
    var committed = react.useRef(initial);
    var useCache = isFirstRun.current || Boolean(inputs && committed.current.inputs && areInputsEqual(inputs, committed.current.inputs));
    var cache = useCache ? committed.current : {
      inputs: inputs,
      result: getResult()
    };
    react.useEffect(function () {
      isFirstRun.current = false;
      committed.current = cache;
    }, [cache]);
    return cache.result;
  }
  function useCallbackOne(callback, inputs) {
    return useMemoOne(function () {
      return callback;
    }, inputs);
  }
  var useMemo = useMemoOne;
  var useCallback = useCallbackOne;

  exports.useCallback = useCallback;
  exports.useCallbackOne = useCallbackOne;
  exports.useMemo = useMemo;
  exports.useMemoOne = useMemoOne;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
