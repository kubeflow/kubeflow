import { Int64 } from "./Int64";

/**
 * An event stream message. The headers and body properties will always be
 * defined, with empty headers represented as an object with no keys and an
 * empty body represented as a zero-length Uint8Array.
 */
export interface Message {
  headers: MessageHeaders;
  body: Uint8Array;
}

export interface MessageHeaders {
  [name: string]: MessageHeaderValue;
}

export interface BooleanHeaderValue {
  type: "boolean";
  value: boolean;
}

export interface ByteHeaderValue {
  type: "byte";
  value: number;
}

export interface ShortHeaderValue {
  type: "short";
  value: number;
}

export interface IntegerHeaderValue {
  type: "integer";
  value: number;
}

export interface LongHeaderValue {
  type: "long";
  value: Int64;
}

export interface BinaryHeaderValue {
  type: "binary";
  value: Uint8Array;
}

export interface StringHeaderValue {
  type: "string";
  value: string;
}

export interface TimestampHeaderValue {
  type: "timestamp";
  value: Date;
}

export interface UuidHeaderValue {
  type: "uuid";
  value: string;
}

export type MessageHeaderValue =
  | BooleanHeaderValue
  | ByteHeaderValue
  | ShortHeaderValue
  | IntegerHeaderValue
  | LongHeaderValue
  | BinaryHeaderValue
  | StringHeaderValue
  | TimestampHeaderValue
  | UuidHeaderValue;
