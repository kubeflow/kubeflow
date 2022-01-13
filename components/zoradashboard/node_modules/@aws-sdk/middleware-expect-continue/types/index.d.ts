import { BuildHandlerOptions, BuildMiddleware, Pluggable } from "@aws-sdk/types";
interface PreviouslyResolved {
    runtime: string;
}
export declare function addExpectContinueMiddleware(options: PreviouslyResolved): BuildMiddleware<any, any>;
export declare const addExpectContinueMiddlewareOptions: BuildHandlerOptions;
export declare const getAddExpectContinuePlugin: (options: PreviouslyResolved) => Pluggable<any, any>;
export {};
