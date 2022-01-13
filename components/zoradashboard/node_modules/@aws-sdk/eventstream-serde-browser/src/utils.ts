/**
 * A util function converting ReadableStream into an async iterable.
 * Reference: https://jakearchibald.com/2017/async-iterators-and-generators/#making-streams-iterate
 */
export const readableStreamtoIterable = <T>(readableStream: ReadableStream<T>): AsyncIterable<T> => ({
  [Symbol.asyncIterator]: async function* () {
    const reader = readableStream.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) return;
        yield value as T;
      }
    } finally {
      reader.releaseLock();
    }
  },
});

/**
 * A util function converting async iterable to a ReadableStream.
 */
export const iterableToReadableStream = <T>(asyncIterable: AsyncIterable<T>): ReadableStream<T> => {
  const iterator = asyncIterable[Symbol.asyncIterator]();
  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await iterator.next();
      if (done) {
        return controller.close();
      }
      controller.enqueue(value);
    },
  });
};
