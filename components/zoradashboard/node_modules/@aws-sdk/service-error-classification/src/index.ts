import { SdkError } from "@aws-sdk/smithy-client";

import {
  CLOCK_SKEW_ERROR_CODES,
  THROTTLING_ERROR_CODES,
  TRANSIENT_ERROR_CODES,
  TRANSIENT_ERROR_STATUS_CODES,
} from "./constants";

export const isRetryableByTrait = (error: SdkError) => error.$retryable !== undefined;

export const isClockSkewError = (error: SdkError) => CLOCK_SKEW_ERROR_CODES.includes(error.name);

export const isThrottlingError = (error: SdkError) =>
  error.$metadata?.httpStatusCode === 429 ||
  THROTTLING_ERROR_CODES.includes(error.name) ||
  error.$retryable?.throttling == true;

export const isTransientError = (error: SdkError) =>
  TRANSIENT_ERROR_CODES.includes(error.name) ||
  TRANSIENT_ERROR_STATUS_CODES.includes(error.$metadata?.httpStatusCode || 0);
