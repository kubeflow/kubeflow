import { Provider } from "@aws-sdk/types";

import { ProviderError } from "./ProviderError";

/**
 * Compose a single credential provider function from multiple credential
 * providers. The first provider in the argument list will always be invoked;
 * subsequent providers in the list will be invoked in the order in which the
 * were received if the preceding provider did not successfully resolve.
 *
 * If no providers were received or no provider resolves successfully, the
 * returned promise will be rejected.
 */
export function chain<T>(...providers: Array<Provider<T>>): Provider<T> {
  return () => {
    let promise: Promise<T> = Promise.reject(new ProviderError("No providers in chain"));
    for (const provider of providers) {
      promise = promise.catch((err: any) => {
        if (err?.tryNextLink) {
          return provider();
        }

        throw err;
      });
    }

    return promise;
  };
}
