import { AbortSignal } from "@aws-sdk/types";

import { runPolling } from "./poller";
import { validateWaiterOptions } from "./utils";
import { WaiterOptions, WaiterResult, waiterServiceDefaults, WaiterState } from "./waiter";

const abortTimeout = async (abortSignal: AbortSignal): Promise<WaiterResult> => {
  return new Promise((resolve) => {
    abortSignal.onabort = () => resolve({ state: WaiterState.ABORTED });
  });
};

/**
 * Create a waiter promise that only resolves when:
 * 1. Abort controller is signaled
 * 2. Max wait time is reached
 * 3. `acceptorChecks` succeeds, or fails
 * Otherwise, it invokes `acceptorChecks` with exponential-backoff delay.
 *
 * @internal
 */
export const createWaiter = async <Client, Input>(
  options: WaiterOptions<Client>,
  input: Input,
  acceptorChecks: (client: Client, input: Input) => Promise<WaiterResult>
): Promise<WaiterResult> => {
  const params = {
    ...waiterServiceDefaults,
    ...options,
  };
  validateWaiterOptions(params);

  const exitConditions = [runPolling<Client, Input>(params, input, acceptorChecks)];
  if (options.abortController) {
    exitConditions.push(abortTimeout(options.abortController.signal));
  }
  return Promise.race(exitConditions);
};
