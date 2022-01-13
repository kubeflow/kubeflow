import { MAXIMUM_RETRY_DELAY } from "./constants";

/**
 * Calculate a capped, fully-jittered exponential backoff time.
 */
export const defaultDelayDecider = (delayBase: number, attempts: number) =>
  Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
