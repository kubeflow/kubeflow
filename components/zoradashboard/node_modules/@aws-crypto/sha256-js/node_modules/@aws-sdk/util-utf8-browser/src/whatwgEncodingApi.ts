/**
 * A declaration of the global TextEncoder and TextDecoder constructors.
 *
 * @see https://encoding.spec.whatwg.org/
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Encoding {
  interface TextDecoderOptions {
    fatal?: boolean;
    ignoreBOM?: boolean;
  }

  interface TextDecodeOptions {
    stream?: boolean;
  }

  interface TextDecoder {
    readonly encoding: string;
    readonly fatal: boolean;
    readonly ignoreBOM: boolean;
    decode(input?: ArrayBuffer | ArrayBufferView, options?: TextDecodeOptions): string;
  }

  export interface TextDecoderConstructor {
    new (label?: string, options?: TextDecoderOptions): TextDecoder;
  }

  interface TextEncoder {
    readonly encoding: "utf-8";
    encode(input?: string): Uint8Array;
  }

  export interface TextEncoderConstructor {
    new (): TextEncoder;
  }
}

declare const TextDecoder: Encoding.TextDecoderConstructor;

declare const TextEncoder: Encoding.TextEncoderConstructor;

export function fromUtf8(input: string): Uint8Array {
  return new TextEncoder().encode(input);
}

export function toUtf8(input: Uint8Array): string {
  return new TextDecoder("utf-8").decode(input);
}
