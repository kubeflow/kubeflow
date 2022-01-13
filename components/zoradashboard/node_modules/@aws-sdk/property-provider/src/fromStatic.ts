import { Provider } from "@aws-sdk/types";

export const fromStatic = <T>(staticValue: T): Provider<T> => () => Promise.resolve(staticValue);
