import { Crc32 } from "@aws-crypto/crc32";
import { Message, MessageHeaders } from "@aws-sdk/types";
import { Decoder, Encoder } from "@aws-sdk/types";

import { HeaderMarshaller } from "./HeaderMarshaller";
import { splitMessage } from "./splitMessage";

/**
 * A marshaller that can convert binary-packed event stream messages into
 * JavaScript objects and back again into their binary format.
 */
export class EventStreamMarshaller {
  private readonly headerMarshaller: HeaderMarshaller;

  constructor(toUtf8: Encoder, fromUtf8: Decoder) {
    this.headerMarshaller = new HeaderMarshaller(toUtf8, fromUtf8);
  }

  /**
   * Convert a structured JavaScript object with tagged headers into a binary
   * event stream message.
   */
  marshall({ headers: rawHeaders, body }: Message): Uint8Array {
    const headers = this.headerMarshaller.format(rawHeaders);
    const length = headers.byteLength + body.byteLength + 16;

    const out = new Uint8Array(length);
    const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    const checksum = new Crc32();

    // Format message
    view.setUint32(0, length, false);
    view.setUint32(4, headers.byteLength, false);
    view.setUint32(8, checksum.update(out.subarray(0, 8)).digest(), false);
    out.set(headers, 12);
    out.set(body, headers.byteLength + 12);

    // Write trailing message checksum
    view.setUint32(length - 4, checksum.update(out.subarray(8, length - 4)).digest(), false);

    return out;
  }

  /**
   * Convert a binary event stream message into a JavaScript object with an
   * opaque, binary body and tagged, parsed headers.
   */
  unmarshall(message: ArrayBufferView): Message {
    const { headers, body } = splitMessage(message);

    return { headers: this.headerMarshaller.parse(headers), body };
  }

  /**
   * Convert a structured JavaScript object with tagged headers into a binary
   * event stream message header.
   */
  formatHeaders(rawHeaders: MessageHeaders): Uint8Array {
    return this.headerMarshaller.format(rawHeaders);
  }
}
