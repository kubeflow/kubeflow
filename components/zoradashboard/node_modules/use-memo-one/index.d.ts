type DependencyList = ReadonlyArray<any>;

declare function useMemoOne<T>(
  // getResult changes on every call,
  getResult: () => T,
  // the inputs array changes on every call
  inputs: DependencyList | undefined,
): T;

declare function useCallbackOne<T extends (...args: any[]) => any>(
  // getResult changes on every call,
  callback: T,
  // the inputs array changes on every call
  inputs: DependencyList | undefined,
): T;

export {
  useMemoOne,
  useCallbackOne,
  useMemoOne as useMemo,
  useCallbackOne as useCallback
};
