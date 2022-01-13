import { blobReader } from "@aws-sdk/chunked-blob-reader";
import { HashConstructor, StreamHasher } from "@aws-sdk/types";

export const blobHasher: StreamHasher<Blob> = async function blobHasher(
  hashCtor: HashConstructor,
  blob: Blob
): Promise<Uint8Array> {
  const hash = new hashCtor();

  await blobReader(blob, (chunk) => {
    hash.update(chunk);
  });

  return hash.digest();
};
