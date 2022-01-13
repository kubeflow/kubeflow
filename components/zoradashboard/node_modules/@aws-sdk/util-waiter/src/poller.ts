import { sleep } from "./utils/sleep";
import { WaiterOptions, WaiterResult, WaiterState } from "./waiter";

/**
 * Reference: https://awslabs.github.io/smithy/1.0/spec/waiters.html#waiter-retries
 */
const exponentialBackoffWithJitter = (minDelay: number, maxDelay: number, attemptCeiling: number, attempt: number) => {
  if (attempt > attemptCeiling) return maxDelay;
  const delay = minDelay * 2 ** (attempt - 1);
  return randomInRange(minDelay, delay);
};

const randomInRange = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Function that runs polling as part of waiters. This will make one inital attempt and then
 * subsequent attempts with an increasing delay.
 * @param params options passed to the waiter.
 * @param client AWS SDK Client
 * @param input client input
 * @param stateChecker function that checks the acceptor states on each poll.
 */
export const runPolling = async <Client, Input>(
  { minDelay, maxDelay, maxWaitTime, abortController, client }: WaiterOptions<Client>,
  input: Input,
  acceptorChecks: (client: Client, input: Input) => Promise<WaiterResult>
): Promise<WaiterResult> => {
  const { state } = await acceptorChecks(client, input);
  if (state !== WaiterState.RETRY) {
    return { state };
  }

  let currentAttempt = 1;
  const waitUntil = Date.now() + maxWaitTime * 1000;
  // The max attempt number that the derived delay time tend to increase.
  // Pre-compute this number to avoid Number type overflow.
  const attemptCeiling = Math.log(maxDelay / minDelay) / Math.log(2) + 1;
  while (true) {
    if (abortController?.signal?.aborted) {
      return { state: WaiterState.ABORTED };
    }
    const delay = exponentialBackoffWithJitter(minDelay, maxDelay, attemptCeiling, currentAttempt);
    // Resolve the promise explicitly at timeout or aborted. Otherwise this while loop will keep making API call until
    // `acceptorCheck` returns non-retry status, even with the Promise.race() outside.
    if (Date.now() + delay * 1000 > waitUntil) {
      return { state: WaiterState.TIMEOUT };
    }
    await sleep(delay);
    const { state } = await acceptorChecks(client, input);
    if (state !== WaiterState.RETRY) {
      return { state };
    }

    currentAttempt += 1;
  }
};
