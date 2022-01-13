import { EventStreamMarshaller as EventMarshaller } from "@aws-sdk/eventstream-marshaller";
import { Encoder, Message } from "@aws-sdk/types";
export declare type UnmarshalledStreamOptions<T> = {
    eventMarshaller: EventMarshaller;
    deserializer: (input: {
        [name: string]: Message;
    }) => Promise<T>;
    toUtf8: Encoder;
};
export declare function getUnmarshalledStream<T extends {
    [key: string]: any;
}>(source: AsyncIterable<Uint8Array>, options: UnmarshalledStreamOptions<T>): AsyncIterable<T>;
