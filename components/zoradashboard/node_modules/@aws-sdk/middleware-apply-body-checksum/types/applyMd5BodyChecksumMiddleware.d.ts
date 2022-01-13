import { BuildHandlerOptions, BuildMiddleware, Pluggable } from "@aws-sdk/types";
import { Md5BodyChecksumResolvedConfig } from "./md5Configuration";
export declare function applyMd5BodyChecksumMiddleware(options: Md5BodyChecksumResolvedConfig): BuildMiddleware<any, any>;
export declare const applyMd5BodyChecksumMiddlewareOptions: BuildHandlerOptions;
export declare const getApplyMd5BodyChecksumPlugin: (config: Md5BodyChecksumResolvedConfig) => Pluggable<any, any>;
