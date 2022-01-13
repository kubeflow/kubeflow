import { Int64 as IInt64 } from "@aws-sdk/types";
import { toHex } from "@aws-sdk/util-hex-encoding";

export interface Int64 extends IInt64 {}

/**
 * A lossless representation of a signed, 64-bit integer. Instances of this
 * class may be used in arithmetic expressions as if they were numeric
 * primitives, but the binary representation will be preserved unchanged as the
 * `bytes` property of the object. The bytes should be encoded as big-endian,
 * two's complement integers.
 */
export class Int64 {
  constructor(readonly bytes: Uint8Array) {
    if (bytes.byteLength !== 8) {
      throw new Error("Int64 buffers must be exactly 8 bytes");
    }
  }

  static fromNumber(number: number): Int64 {
    if (number > 9223372036854775807 || number < -9223372036854775808) {
      throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
    }

    const bytes = new Uint8Array(8);
    for (let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) {
      bytes[i] = remaining;
    }

    if (number < 0) {
      negate(bytes);
    }

    return new Int64(bytes);
  }

  /**
   * Called implicitly by infix arithmetic operators.
   */
  valueOf(): number {
    const bytes = this.bytes.slice(0);
    const negative = bytes[0] & 0b10000000;
    if (negative) {
      negate(bytes);
    }

    return parseInt(toHex(bytes), 16) * (negative ? -1 : 1);
  }

  toString() {
    return String(this.valueOf());
  }
}

function negate(bytes: Uint8Array): void {
  for (let i = 0; i < 8; i++) {
    bytes[i] ^= 0xff;
  }

  for (let i = 7; i > -1; i--) {
    bytes[i]++;
    if (bytes[i] !== 0) break;
  }
}
