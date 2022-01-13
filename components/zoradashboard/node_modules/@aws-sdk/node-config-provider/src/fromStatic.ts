import { fromStatic as convertToProvider } from "@aws-sdk/property-provider";
import { Provider } from "@aws-sdk/types";

export type FromStaticConfig<T> = T | (() => T);
type Getter<T> = () => T;
const isFunction = <T>(func: FromStaticConfig<T>): func is Getter<T> => typeof func === "function";

export const fromStatic = <T>(defaultValue: FromStaticConfig<T>): Provider<T> =>
  isFunction(defaultValue) ? async () => defaultValue() : convertToProvider(defaultValue);
