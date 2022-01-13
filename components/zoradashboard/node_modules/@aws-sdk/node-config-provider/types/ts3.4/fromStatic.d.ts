import { Provider } from "@aws-sdk/types";
export declare type FromStaticConfig<T> = T | (() => T);
export declare const fromStatic: <T>(defaultValue: FromStaticConfig<T>) => Provider<T>;
