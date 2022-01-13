import { fromArrayBuffer, fromString } from "@aws-sdk/util-buffer-from";

/**
 * Converts a base-64 encoded string to a Uint8Array of bytes using Node.JS's
 * `buffer` module.
 *
 * @param input The base-64 encoded string
 */
export function fromBase64(input: string): Uint8Array {
  const buffer = fromString(input, "base64");

  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}

/**
 * Converts a Uint8Array of binary data to a base-64 encoded string using
 * Node.JS's `buffer` module.
 *
 * @param input The binary data to encode
 */
export function toBase64(input: Uint8Array): string {
  return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("base64");
}
