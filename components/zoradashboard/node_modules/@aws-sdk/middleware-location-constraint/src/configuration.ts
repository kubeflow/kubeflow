import { Provider } from "@aws-sdk/types";

export interface LocationConstraintInputConfig {}

interface PreviouslyResolved {
  region: Provider<string>;
}

export interface LocationConstraintResolvedConfig {
  region: Provider<string>;
}
export function resolveLocationConstraintConfig<T>(
  input: T & LocationConstraintInputConfig & PreviouslyResolved
): T & LocationConstraintResolvedConfig {
  return { ...input };
}
