import { EventStreamMarshaller as EventMarshaller } from "@aws-sdk/eventstream-marshaller";
import { EventStreamMarshaller as UniversalEventStreamMarshaller } from "@aws-sdk/eventstream-serde-universal";
import { Decoder, Encoder, EventStreamMarshaller as IEventStreamMarshaller, Message } from "@aws-sdk/types";
import { Readable } from "stream";

import { readabletoIterable } from "./utils";

export interface EventStreamMarshaller extends IEventStreamMarshaller {}

export interface EventStreamMarshallerOptions {
  utf8Encoder: Encoder;
  utf8Decoder: Decoder;
}

export class EventStreamMarshaller {
  private readonly eventMarshaller: EventMarshaller;
  private readonly universalMarshaller: UniversalEventStreamMarshaller;
  constructor({ utf8Encoder, utf8Decoder }: EventStreamMarshallerOptions) {
    this.eventMarshaller = new EventMarshaller(utf8Encoder, utf8Decoder);
    this.universalMarshaller = new UniversalEventStreamMarshaller({
      utf8Decoder,
      utf8Encoder,
    });
  }

  deserialize<T>(body: Readable, deserializer: (input: { [event: string]: Message }) => Promise<T>): AsyncIterable<T> {
    //should use stream[Symbol.asyncIterable] when the api is stable
    //reference: https://nodejs.org/docs/latest-v11.x/api/stream.html#stream_readable_symbol_asynciterator
    const bodyIterable: AsyncIterable<Uint8Array> =
      typeof body[Symbol.asyncIterator] === "function" ? body : readabletoIterable(body);
    return this.universalMarshaller.deserialize(bodyIterable, deserializer);
  }

  serialize<T>(input: AsyncIterable<T>, serializer: (event: T) => Message): Readable {
    const serializedIterable = this.universalMarshaller.serialize(input, serializer);
    if (typeof Readable.from === "function") {
      //reference: https://nodejs.org/dist/latest-v13.x/docs/api/stream.html#stream_new_stream_readable_options
      return Readable.from(serializedIterable);
    } else {
      const iterator = serializedIterable[Symbol.asyncIterator]();
      const serializedStream = new Readable({
        autoDestroy: true,
        objectMode: true,
        async read() {
          iterator
            .next()
            .then(({ done, value }) => {
              if (done) {
                this.push(null);
              } else {
                this.push(value);
              }
            })
            .catch((err) => {
              this.destroy(err);
            });
        },
      });
      //TODO: use 'autoDestroy' when targeting Node 11
      serializedStream.on("error", () => {
        serializedStream.destroy();
      });
      serializedStream.on("end", () => {
        serializedStream.destroy();
      });
      return serializedStream;
    }
  }
}
