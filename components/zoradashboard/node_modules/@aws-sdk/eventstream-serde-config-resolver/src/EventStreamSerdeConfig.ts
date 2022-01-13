import { EventStreamMarshaller, EventStreamSerdeProvider } from "@aws-sdk/types";

export interface EventStreamSerdeInputConfig {}

export interface EventStreamSerdeResolvedConfig {
  eventStreamMarshaller: EventStreamMarshaller;
}

interface PreviouslyResolved {
  eventStreamSerdeProvider: EventStreamSerdeProvider;
}

export const resolveEventStreamSerdeConfig = <T>(
  input: T & PreviouslyResolved & EventStreamSerdeInputConfig
): T & EventStreamSerdeResolvedConfig => ({
  ...input,
  eventStreamMarshaller: input.eventStreamSerdeProvider(input),
});
