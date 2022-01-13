import { Endpoint } from "./http";
import {
  FinalizeHandler,
  FinalizeHandlerArguments,
  FinalizeHandlerOutput,
  HandlerExecutionContext,
} from "./middleware";
import { MetadataBearer } from "./response";

/**
 * A function that, given a TypedArray of bytes, can produce a string
 * representation thereof.
 *
 * @example An encoder function that converts bytes to hexadecimal
 * representation would return `'deadbeef'` when given `new
 * Uint8Array([0xde, 0xad, 0xbe, 0xef])`.
 */
export interface Encoder {
  (input: Uint8Array): string;
}

/**
 * A function that, given a string, can derive the bytes represented by that
 * string.
 *
 * @example A decoder function that converts bytes to hexadecimal
 * representation would return `new Uint8Array([0xde, 0xad, 0xbe, 0xef])` when
 * given the string `'deadbeef'`.
 */
export interface Decoder {
  (input: string): Uint8Array;
}

/**
 * A function that, when invoked, returns a promise that will be fulfilled with
 * a value of type T.
 *
 * @example A function that reads credentials from shared SDK configuration
 * files, assuming roles and collecting MFA tokens as necessary.
 */
export interface Provider<T> {
  (): Promise<T>;
}

/**
 * A function that, given a request body, determines the
 * length of the body. This is used to determine the Content-Length
 * that should be sent with a request.
 *
 * @example A function that reads a file stream and calculates
 * the size of the file.
 */
export interface BodyLengthCalculator {
  (body: any): number | undefined;
}

/**
 * Interface that specifies the retry behavior
 */
export interface RetryStrategy {
  /**
   * The retry mode describing how the retry strategy control the traffic flow.
   */
  mode?: string;
  /**
   * the retry behavior the will invoke the next handler and handle the retry accordingly.
   * This function should also update the $metadata from the response accordingly.
   * @see {@link ResponseMetadata}
   */
  retry: <Input extends object, Output extends MetadataBearer>(
    next: FinalizeHandler<Input, Output>,
    args: FinalizeHandlerArguments<Input>
  ) => Promise<FinalizeHandlerOutput<Output>>;
}

/**
 * Parses a URL in string form into an Endpoint object.
 */
export interface UrlParser {
  (url: string): Endpoint;
}

/**
 * Object containing regionalization information of
 * AWS services.
 */
export interface RegionInfo {
  hostname: string;
  partition: string;
  path?: string;
  signingService?: string;
  signingRegion?: string;
}

/**
 * Function returns designated service's regionalization
 * information from given region. Each service client
 * comes with its regionalization provider. it serves
 * to provide the default values of related configurations
 */
export interface RegionInfoProvider {
  (region: string, options?: any): Promise<RegionInfo | undefined>;
}

/**
 * A tuple that represents an API name and optional version
 * of a library built using the AWS SDK.
 */
export type UserAgentPair = [name: string, version?: string];

/**
 * User agent data that to be put into the request's user
 * agent.
 */
export type UserAgent = UserAgentPair[];
