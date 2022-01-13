import { EventStreamMarshaller as EventMarshaller } from "@aws-sdk/eventstream-marshaller";
import { Decoder, Encoder, EventStreamMarshaller as IEventStreamMarshaller, Message } from "@aws-sdk/types";

import { getChunkedStream } from "./getChunkedStream";
import { getUnmarshalledStream } from "./getUnmarshalledStream";

export interface EventStreamMarshaller extends IEventStreamMarshaller {}

export interface EventStreamMarshallerOptions {
  utf8Encoder: Encoder;
  utf8Decoder: Decoder;
}

export class EventStreamMarshaller {
  private readonly eventMarshaller: EventMarshaller;
  private readonly utfEncoder: Encoder;
  constructor({ utf8Encoder, utf8Decoder }: EventStreamMarshallerOptions) {
    this.eventMarshaller = new EventMarshaller(utf8Encoder, utf8Decoder);
    this.utfEncoder = utf8Encoder;
  }

  deserialize<T>(
    body: AsyncIterable<Uint8Array>,
    deserializer: (input: { [event: string]: Message }) => Promise<T>
  ): AsyncIterable<T> {
    const chunkedStream = getChunkedStream(body);
    const unmarshalledStream = getUnmarshalledStream(chunkedStream, {
      eventMarshaller: this.eventMarshaller,
      deserializer,
      toUtf8: this.utfEncoder,
    });
    return unmarshalledStream;
  }

  serialize<T>(input: AsyncIterable<T>, serializer: (event: T) => Message): AsyncIterable<Uint8Array> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const serializedIterator = async function* () {
      for await (const chunk of input) {
        const payloadBuf = self.eventMarshaller.marshall(serializer(chunk));
        yield payloadBuf;
      }
      // Ending frame
      yield new Uint8Array(0);
    };
    return {
      [Symbol.asyncIterator]: serializedIterator,
    };
  }
}
