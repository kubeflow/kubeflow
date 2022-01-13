/**
 * Create a `ReadableStream` from a string.
 *
 * @param content - Bundle in string.
 * @param bytesPerRead - How many bytes to read from the underlying buffer from
 * each read through the stream.
 */
export declare function byteStreamReaderFromString(content: string, bytesPerRead: number): ReadableStreamReader<Uint8Array>;
