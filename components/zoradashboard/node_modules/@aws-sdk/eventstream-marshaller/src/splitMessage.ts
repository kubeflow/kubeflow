import { Crc32 } from "@aws-crypto/crc32";

// All prelude components are unsigned, 32-bit integers
const PRELUDE_MEMBER_LENGTH = 4;
// The prelude consists of two components
const PRELUDE_LENGTH = PRELUDE_MEMBER_LENGTH * 2;
// Checksums are always CRC32 hashes.
const CHECKSUM_LENGTH = 4;
// Messages must include a full prelude, a prelude checksum, and a message checksum
const MINIMUM_MESSAGE_LENGTH = PRELUDE_LENGTH + CHECKSUM_LENGTH * 2;

/**
 * @internal
 */
export interface MessageParts {
  headers: DataView;
  body: Uint8Array;
}

/**
 * @internal
 */
export function splitMessage({ byteLength, byteOffset, buffer }: ArrayBufferView): MessageParts {
  if (byteLength < MINIMUM_MESSAGE_LENGTH) {
    throw new Error("Provided message too short to accommodate event stream message overhead");
  }

  const view = new DataView(buffer, byteOffset, byteLength);

  const messageLength = view.getUint32(0, false);

  if (byteLength !== messageLength) {
    throw new Error("Reported message length does not match received message length");
  }

  const headerLength = view.getUint32(PRELUDE_MEMBER_LENGTH, false);
  const expectedPreludeChecksum = view.getUint32(PRELUDE_LENGTH, false);
  const expectedMessageChecksum = view.getUint32(byteLength - CHECKSUM_LENGTH, false);

  const checksummer = new Crc32().update(new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH));
  if (expectedPreludeChecksum !== checksummer.digest()) {
    throw new Error(
      `The prelude checksum specified in the message (${expectedPreludeChecksum}) does not match the calculated CRC32 checksum (${checksummer.digest()})`
    );
  }

  checksummer.update(
    new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH, byteLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH))
  );
  if (expectedMessageChecksum !== checksummer.digest()) {
    throw new Error(
      `The message checksum (${checksummer.digest()}) did not match the expected value of ${expectedMessageChecksum}`
    );
  }

  return {
    headers: new DataView(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH, headerLength),
    body: new Uint8Array(
      buffer,
      byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH + headerLength,
      messageLength - headerLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH + CHECKSUM_LENGTH)
    ),
  };
}
