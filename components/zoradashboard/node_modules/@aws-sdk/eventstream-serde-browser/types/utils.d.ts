/**
 * A util function converting ReadableStream into an async iterable.
 * Reference: https://jakearchibald.com/2017/async-iterators-and-generators/#making-streams-iterate
 */
export declare const readableStreamtoIterable: <T>(readableStream: ReadableStream<T>) => AsyncIterable<T>;
/**
 * A util function converting async iterable to a ReadableStream.
 */
export declare const iterableToReadableStream: <T>(asyncIterable: AsyncIterable<T>) => ReadableStream<T>;
