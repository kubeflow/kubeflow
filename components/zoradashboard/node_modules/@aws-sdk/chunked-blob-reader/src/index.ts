export function blobReader(
  blob: Blob,
  onChunk: (chunk: Uint8Array) => void,
  chunkSize: number = 1024 * 1024
): Promise<void> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("error", reject);
    fileReader.addEventListener("abort", reject);

    const size = blob.size;
    let totalBytesRead = 0;

    function read() {
      if (totalBytesRead >= size) {
        resolve();
        return;
      }
      fileReader.readAsArrayBuffer(blob.slice(totalBytesRead, Math.min(size, totalBytesRead + chunkSize)));
    }

    fileReader.addEventListener("load", (event) => {
      const result = <ArrayBuffer>(event.target as any).result;
      onChunk(new Uint8Array(result));
      totalBytesRead += result.byteLength;
      // read the next block
      read();
    });

    // kick off the read
    read();
  });
}
