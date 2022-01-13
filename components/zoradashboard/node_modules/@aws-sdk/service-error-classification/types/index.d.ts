import { SdkError } from "@aws-sdk/smithy-client";
export declare const isRetryableByTrait: (error: SdkError) => boolean;
export declare const isClockSkewError: (error: SdkError) => boolean;
export declare const isThrottlingError: (error: SdkError) => boolean;
export declare const isTransientError: (error: SdkError) => boolean;
