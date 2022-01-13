export interface RetryableProvider<T> {
  (): Promise<T>;
}

/**
 * @internal
 */
export const retry = <T>(toRetry: RetryableProvider<T>, maxRetries: number): Promise<T> => {
  let promise = toRetry();
  for (let i = 0; i < maxRetries; i++) {
    promise = promise.catch(toRetry);
  }

  return promise;
};
