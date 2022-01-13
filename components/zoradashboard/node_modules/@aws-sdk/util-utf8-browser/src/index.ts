import { fromUtf8 as jsFromUtf8, toUtf8 as jsToUtf8 } from "./pureJs";
import { fromUtf8 as textEncoderFromUtf8, toUtf8 as textEncoderToUtf8 } from "./whatwgEncodingApi";

declare const TextDecoder: Function | undefined;
declare const TextEncoder: Function | undefined;

export const fromUtf8 = (input: string): Uint8Array =>
  typeof TextEncoder === "function" ? textEncoderFromUtf8(input) : jsFromUtf8(input);

export const toUtf8 = (input: Uint8Array): string =>
  typeof TextDecoder === "function" ? textEncoderToUtf8(input) : jsToUtf8(input);
