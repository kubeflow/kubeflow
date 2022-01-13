import { Readable, ReadableOptions } from "stream";

export interface MockEventMessageSourceOptions extends ReadableOptions {
  messages: Array<Buffer>;
  emitSize: number;
  throwError?: Error;
}

export class MockEventMessageSource extends Readable {
  private readonly data: Buffer;
  private readonly emitSize: number;
  private readonly throwError?: Error;
  private readCount = 0;
  constructor(options: MockEventMessageSourceOptions) {
    super(options);
    this.data = Buffer.concat(options.messages);
    this.emitSize = options.emitSize;
    this.throwError = options.throwError;
  }

  _read() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    if (this.readCount === this.data.length) {
      if (this.throwError) {
        process.nextTick(function () {
          self.emit("error", new Error("Throwing an error!"));
        });
        return;
      } else {
        this.push(null);
        return;
      }
    }

    const bytesLeft = this.data.length - this.readCount;
    const numBytesToSend = Math.min(bytesLeft, this.emitSize);

    const chunk = this.data.slice(this.readCount, this.readCount + numBytesToSend);
    this.readCount += numBytesToSend;
    this.push(chunk);
  }
}
