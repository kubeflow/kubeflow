/// <reference types="node" />
import { Decoder, Encoder, EventStreamMarshaller as IEventStreamMarshaller, Message } from "@aws-sdk/types";
import { Readable } from "stream";
export interface EventStreamMarshaller extends IEventStreamMarshaller {
}
export interface EventStreamMarshallerOptions {
    utf8Encoder: Encoder;
    utf8Decoder: Decoder;
}
export declare class EventStreamMarshaller {
    private readonly eventMarshaller;
    private readonly universalMarshaller;
    constructor({ utf8Encoder, utf8Decoder }: EventStreamMarshallerOptions);
    deserialize<T>(body: Readable, deserializer: (input: {
        [event: string]: Message;
    }) => Promise<T>): AsyncIterable<T>;
    serialize<T>(input: AsyncIterable<T>, serializer: (event: T) => Message): Readable;
}
