import { StreamCollector } from "@aws-sdk/types";
import { fromBase64 } from "@aws-sdk/util-base64-browser";

//reference: https://snack.expo.io/r1JCSWRGU
export const streamCollector: StreamCollector = (stream: Blob | ReadableStream): Promise<Uint8Array> => {
  if (typeof Blob === "function" && stream instanceof Blob) {
    return collectBlob(stream);
  }

  return collectStream(stream as ReadableStream);
};

async function collectBlob(blob: Blob): Promise<Uint8Array> {
  const base64 = await readToBase64(blob);
  const arrayBuffer = fromBase64(base64);
  return new Uint8Array(arrayBuffer);
}

async function collectStream(stream: ReadableStream): Promise<Uint8Array> {
  let res = new Uint8Array(0);
  const reader = stream.getReader();
  let isDone = false;
  while (!isDone) {
    const { done, value } = await reader.read();
    if (value) {
      const prior = res;
      res = new Uint8Array(prior.length + value.length);
      res.set(prior);
      res.set(value, prior.length);
    }
    isDone = done;
  }
  return res;
}

function readToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // reference: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
      // response from readAsDataURL is always prepended with "data:*/*;base64,"
      if (reader.readyState !== 2) {
        return reject(new Error("Reader aborted too early"));
      }
      const result = (reader.result ?? "") as string;
      // Response can include only 'data:' for empty blob, return empty string in this case.
      // Otherwise, return the string after ','
      const commaIndex = result.indexOf(",");
      const dataOffset = commaIndex > -1 ? commaIndex + 1 : result.length;
      resolve(result.substring(dataOffset));
    };
    reader.onabort = () => reject(new Error("Read aborted"));
    reader.onerror = () => reject(reader.error);
    // reader.readAsArrayBuffer is not always available
    reader.readAsDataURL(blob);
  });
}
