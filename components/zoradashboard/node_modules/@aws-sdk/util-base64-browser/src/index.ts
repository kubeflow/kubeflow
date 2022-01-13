const alphabetByEncoding: { [key: string]: number } = {};
const alphabetByValue: Array<string> = new Array(64);

for (let i = 0, start = "A".charCodeAt(0), limit = "Z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  alphabetByEncoding[char] = i;
  alphabetByValue[i] = char;
}

for (let i = 0, start = "a".charCodeAt(0), limit = "z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  const index = i + 26;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}

for (let i = 0; i < 10; i++) {
  alphabetByEncoding[i.toString(10)] = i + 52;
  const char = i.toString(10);
  const index = i + 52;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}

alphabetByEncoding["+"] = 62;
alphabetByValue[62] = "+";
alphabetByEncoding["/"] = 63;
alphabetByValue[63] = "/";

const bitsPerLetter = 6;
const bitsPerByte = 8;
const maxLetterValue = 0b111111;

/**
 * Converts a base-64 encoded string to a Uint8Array of bytes.
 *
 * @param input The base-64 encoded string
 *
 * @see https://tools.ietf.org/html/rfc4648#section-4
 */
export function fromBase64(input: string): Uint8Array {
  let totalByteLength = (input.length / 4) * 3;
  if (input.substr(-2) === "==") {
    totalByteLength -= 2;
  } else if (input.substr(-1) === "=") {
    totalByteLength--;
  }
  const out = new ArrayBuffer(totalByteLength);
  const dataView = new DataView(out);
  for (let i = 0; i < input.length; i += 4) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = i + 3; j <= limit; j++) {
      if (input[j] !== "=") {
        bits |= alphabetByEncoding[input[j]] << ((limit - j) * bitsPerLetter);
        bitLength += bitsPerLetter;
      } else {
        bits >>= bitsPerLetter;
      }
    }

    const chunkOffset = (i / 4) * 3;
    bits >>= bitLength % bitsPerByte;
    const byteLength = Math.floor(bitLength / bitsPerByte);
    for (let k = 0; k < byteLength; k++) {
      const offset = (byteLength - k - 1) * bitsPerByte;
      dataView.setUint8(chunkOffset + k, (bits & (255 << offset)) >> offset);
    }
  }

  return new Uint8Array(out);
}

/**
 * Converts a Uint8Array of binary data to a base-64 encoded string.
 *
 * @param input The binary data to encode
 *
 * @see https://tools.ietf.org/html/rfc4648#section-4
 */
export function toBase64(input: Uint8Array): string {
  let str = "";
  for (let i = 0; i < input.length; i += 3) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = Math.min(i + 3, input.length); j < limit; j++) {
      bits |= input[j] << ((limit - j - 1) * bitsPerByte);
      bitLength += bitsPerByte;
    }

    const bitClusterCount = Math.ceil(bitLength / bitsPerLetter);
    bits <<= bitClusterCount * bitsPerLetter - bitLength;
    for (let k = 1; k <= bitClusterCount; k++) {
      const offset = (bitClusterCount - k) * bitsPerLetter;
      str += alphabetByValue[(bits & (maxLetterValue << offset)) >> offset];
    }

    str += "==".slice(0, 4 - bitClusterCount);
  }

  return str;
}
