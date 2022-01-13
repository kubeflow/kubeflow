import { EventStreamMarshaller as EventMarshaller } from "@aws-sdk/eventstream-marshaller";
import { Encoder, Message } from "@aws-sdk/types";

export type UnmarshalledStreamOptions<T> = {
  eventMarshaller: EventMarshaller;
  deserializer: (input: { [name: string]: Message }) => Promise<T>;
  toUtf8: Encoder;
};

export function getUnmarshalledStream<T extends { [key: string]: any }>(
  source: AsyncIterable<Uint8Array>,
  options: UnmarshalledStreamOptions<T>
): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator]: async function* () {
      for await (const chunk of source) {
        const message = options.eventMarshaller.unmarshall(chunk);
        const { value: messageType } = message.headers[":message-type"];
        if (messageType === "error") {
          // Unmodeled exception in event
          const unmodeledError = new Error((message.headers[":error-message"].value as string) || "UnknownError");
          unmodeledError.name = message.headers[":error-code"].value as string;
          throw unmodeledError;
        } else if (messageType === "exception") {
          // For modeled exception, push it to deserializer and throw after deserializing
          const code = message.headers[":exception-type"].value as string;
          const exception = { [code]: message };
          // Get parsed exception event in key(error code) value(structured error) pair.
          const deserializedException = await options.deserializer(exception);
          if (deserializedException.$unknown) {
            //this is an unmodeled exception then try parsing it with best effort
            const error = new Error(options.toUtf8(message.body));
            error.name = code;
            throw error;
          }
          throw deserializedException[code];
        } else if (messageType === "event") {
          const event = {
            [message.headers[":event-type"].value as string]: message,
          };
          const deserialized = await options.deserializer(event);
          if (deserialized.$unknown) continue;
          yield deserialized;
        } else {
          throw Error(`Unrecognizable event type: ${message.headers[":event-type"].value}`);
        }
      }
    },
  };
}
