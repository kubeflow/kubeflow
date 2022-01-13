import { ProviderError } from "@aws-sdk/property-provider";
import { Provider } from "@aws-sdk/types";

export type GetterFromEnv<T> = (env: NodeJS.ProcessEnv) => T | undefined;

/**
 * Get config value given the environment variable name or getter from
 * environment variable.
 */
export const fromEnv = <T = string>(envVarSelector: GetterFromEnv<T>): Provider<T> => async () => {
  try {
    const config = envVarSelector(process.env);
    if (config === undefined) {
      throw new Error();
    }
    return config as T;
  } catch (e) {
    throw new ProviderError(
      e.message || `Cannot load config from environment variables with getter: ${envVarSelector}`
    );
  }
};
