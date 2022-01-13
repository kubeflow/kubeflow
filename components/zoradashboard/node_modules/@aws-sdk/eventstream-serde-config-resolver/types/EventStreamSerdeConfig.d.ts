import { EventStreamMarshaller, EventStreamSerdeProvider } from "@aws-sdk/types";
export interface EventStreamSerdeInputConfig {
}
export interface EventStreamSerdeResolvedConfig {
    eventStreamMarshaller: EventStreamMarshaller;
}
interface PreviouslyResolved {
    eventStreamSerdeProvider: EventStreamSerdeProvider;
}
export declare const resolveEventStreamSerdeConfig: <T>(input: T & PreviouslyResolved & EventStreamSerdeInputConfig) => T & EventStreamSerdeResolvedConfig;
export {};
