import { StreamCollector } from "@aws-sdk/types";
import { Readable } from "stream";

import { Collector } from "./collector";

export const streamCollector: StreamCollector = (stream: Readable): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    const collector = new Collector();
    stream.pipe(collector);
    stream.on("error", (err) => {
      // if the source errors, the destination stream needs to manually end
      collector.end();
      reject(err);
    });
    collector.on("error", reject);
    collector.on("finish", function (this: Collector) {
      const bytes = new Uint8Array(Buffer.concat(this.bufferedBytes));
      resolve(bytes);
    });
  });
