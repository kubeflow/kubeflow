import { HttpRequest } from "@aws-sdk/protocol-http";
import { isThrottlingError } from "@aws-sdk/service-error-classification";
import { SdkError } from "@aws-sdk/smithy-client";
import { FinalizeHandler, FinalizeHandlerArguments, MetadataBearer, Provider, RetryStrategy } from "@aws-sdk/types";
import { v4 } from "uuid";

import {
  DEFAULT_RETRY_DELAY_BASE,
  INITIAL_RETRY_TOKENS,
  INVOCATION_ID_HEADER,
  REQUEST_HEADER,
  THROTTLING_RETRY_DELAY_BASE,
} from "./constants";
import { getDefaultRetryQuota } from "./defaultRetryQuota";
import { defaultDelayDecider } from "./delayDecider";
import { defaultRetryDecider } from "./retryDecider";

/**
 * The default value for how many HTTP requests an SDK should make for a
 * single SDK operation invocation before giving up
 */
export const DEFAULT_MAX_ATTEMPTS = 3;

/**
 * The default retry algorithm to use.
 */
export const DEFAULT_RETRY_MODE = "standard";

/**
 * Determines whether an error is retryable based on the number of retries
 * already attempted, the HTTP status code, and the error received (if any).
 *
 * @param error         The error encountered.
 */
export interface RetryDecider {
  (error: SdkError): boolean;
}

/**
 * Determines the number of milliseconds to wait before retrying an action.
 *
 * @param delayBase The base delay (in milliseconds).
 * @param attempts  The number of times the action has already been tried.
 */
export interface DelayDecider {
  (delayBase: number, attempts: number): number;
}

/**
 * Interface that specifies the retry quota behavior.
 */
export interface RetryQuota {
  /**
   * returns true if retry tokens are available from the retry quota bucket.
   */
  hasRetryTokens: (error: SdkError) => boolean;

  /**
   * returns token amount from the retry quota bucket.
   * throws error is retry tokens are not available.
   */
  retrieveRetryTokens: (error: SdkError) => number;

  /**
   * releases tokens back to the retry quota.
   */
  releaseRetryTokens: (releaseCapacityAmount?: number) => void;
}

/**
 * Strategy options to be passed to StandardRetryStrategy
 */
export interface StandardRetryStrategyOptions {
  retryDecider?: RetryDecider;
  delayDecider?: DelayDecider;
  retryQuota?: RetryQuota;
}

export class StandardRetryStrategy implements RetryStrategy {
  private retryDecider: RetryDecider;
  private delayDecider: DelayDecider;
  private retryQuota: RetryQuota;
  public readonly mode = DEFAULT_RETRY_MODE;

  constructor(private readonly maxAttemptsProvider: Provider<number>, options?: StandardRetryStrategyOptions) {
    this.retryDecider = options?.retryDecider ?? defaultRetryDecider;
    this.delayDecider = options?.delayDecider ?? defaultDelayDecider;
    this.retryQuota = options?.retryQuota ?? getDefaultRetryQuota(INITIAL_RETRY_TOKENS);
  }

  private shouldRetry(error: SdkError, attempts: number, maxAttempts: number) {
    return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
  }

  private async getMaxAttempts() {
    let maxAttempts: number;
    try {
      maxAttempts = await this.maxAttemptsProvider();
    } catch (error) {
      maxAttempts = DEFAULT_MAX_ATTEMPTS;
    }
    return maxAttempts;
  }

  async retry<Input extends object, Ouput extends MetadataBearer>(
    next: FinalizeHandler<Input, Ouput>,
    args: FinalizeHandlerArguments<Input>
  ) {
    let retryTokenAmount;
    let attempts = 0;
    let totalDelay = 0;

    const maxAttempts = await this.getMaxAttempts();

    const { request } = args;
    if (HttpRequest.isInstance(request)) {
      request.headers[INVOCATION_ID_HEADER] = v4();
    }

    while (true) {
      try {
        if (HttpRequest.isInstance(request)) {
          request.headers[REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
        }
        const { response, output } = await next(args);

        this.retryQuota.releaseRetryTokens(retryTokenAmount);
        output.$metadata.attempts = attempts + 1;
        output.$metadata.totalRetryDelay = totalDelay;

        return { response, output };
      } catch (err) {
        attempts++;
        if (this.shouldRetry(err as SdkError, attempts, maxAttempts)) {
          retryTokenAmount = this.retryQuota.retrieveRetryTokens(err);
          const delay = this.delayDecider(
            isThrottlingError(err) ? THROTTLING_RETRY_DELAY_BASE : DEFAULT_RETRY_DELAY_BASE,
            attempts
          );
          totalDelay += delay;

          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        if (!err.$metadata) {
          err.$metadata = {};
        }

        err.$metadata.attempts = attempts;
        err.$metadata.totalRetryDelay = totalDelay;
        throw err;
      }
    }
  }
}
