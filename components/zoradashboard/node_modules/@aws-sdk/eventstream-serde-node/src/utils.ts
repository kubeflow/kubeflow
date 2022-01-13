import { Readable } from "stream";

/**
 * Convert object stream piped in into an async iterable. This
 * daptor should be deprecated when Node stream iterator is stable.
 * Caveat: this adaptor won't have backpressure to inwards stream
 *
 * Reference: https://nodejs.org/docs/latest-v11.x/api/stream.html#stream_readable_symbol_asynciterator
 */

export async function* readabletoIterable<T>(readStream: Readable): AsyncIterable<T> {
  let streamEnded = false;
  let generationEnded = false;
  const records = new Array<T>();

  readStream.on("error", (err) => {
    if (!streamEnded) {
      streamEnded = true;
    }
    if (err) {
      throw err;
    }
  });

  readStream.on("data", (data) => {
    records.push(data);
  });

  readStream.on("end", () => {
    streamEnded = true;
  });

  while (!generationEnded) {
    // @ts-ignore TS2345: Argument of type 'T | undefined' is not assignable to type 'T | PromiseLike<T>'.
    const value = await new Promise<T>((resolve) => setTimeout(() => resolve(records.shift()), 0));
    if (value) {
      yield value;
    }
    generationEnded = streamEnded && records.length === 0;
  }
}
