import { Writable } from "stream";
export class Collector extends Writable {
  public readonly bufferedBytes: Buffer[] = [];
  _write(chunk: Buffer, encoding: string, callback: (err?: Error) => void) {
    this.bufferedBytes.push(chunk);
    callback();
  }
}
