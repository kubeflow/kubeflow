import { CreateParallelDataCommandInput, CreateParallelDataCommandOutput } from "./commands/CreateParallelDataCommand";
import { DeleteParallelDataCommandInput, DeleteParallelDataCommandOutput } from "./commands/DeleteParallelDataCommand";
import { DeleteTerminologyCommandInput, DeleteTerminologyCommandOutput } from "./commands/DeleteTerminologyCommand";
import { DescribeTextTranslationJobCommandInput, DescribeTextTranslationJobCommandOutput } from "./commands/DescribeTextTranslationJobCommand";
import { GetParallelDataCommandInput, GetParallelDataCommandOutput } from "./commands/GetParallelDataCommand";
import { GetTerminologyCommandInput, GetTerminologyCommandOutput } from "./commands/GetTerminologyCommand";
import { ImportTerminologyCommandInput, ImportTerminologyCommandOutput } from "./commands/ImportTerminologyCommand";
import { ListParallelDataCommandInput, ListParallelDataCommandOutput } from "./commands/ListParallelDataCommand";
import { ListTerminologiesCommandInput, ListTerminologiesCommandOutput } from "./commands/ListTerminologiesCommand";
import { ListTextTranslationJobsCommandInput, ListTextTranslationJobsCommandOutput } from "./commands/ListTextTranslationJobsCommand";
import { StartTextTranslationJobCommandInput, StartTextTranslationJobCommandOutput } from "./commands/StartTextTranslationJobCommand";
import { StopTextTranslationJobCommandInput, StopTextTranslationJobCommandOutput } from "./commands/StopTextTranslationJobCommand";
import { TranslateTextCommandInput, TranslateTextCommandOutput } from "./commands/TranslateTextCommand";
import { UpdateParallelDataCommandInput, UpdateParallelDataCommandOutput } from "./commands/UpdateParallelDataCommand";
import { EndpointsInputConfig, EndpointsResolvedConfig, RegionInputConfig, RegionResolvedConfig } from "@aws-sdk/config-resolver";
import { HostHeaderInputConfig, HostHeaderResolvedConfig } from "@aws-sdk/middleware-host-header";
import { RetryInputConfig, RetryResolvedConfig } from "@aws-sdk/middleware-retry";
import { AwsAuthInputConfig, AwsAuthResolvedConfig } from "@aws-sdk/middleware-signing";
import { UserAgentInputConfig, UserAgentResolvedConfig } from "@aws-sdk/middleware-user-agent";
import { HttpHandler as __HttpHandler } from "@aws-sdk/protocol-http";
import { Client as __Client, SmithyConfiguration as __SmithyConfiguration, SmithyResolvedConfiguration as __SmithyResolvedConfiguration } from "@aws-sdk/smithy-client";
import { Provider, RegionInfoProvider, Credentials as __Credentials, Decoder as __Decoder, Encoder as __Encoder, HashConstructor as __HashConstructor, HttpHandlerOptions as __HttpHandlerOptions, Logger as __Logger, Provider as __Provider, StreamCollector as __StreamCollector, UrlParser as __UrlParser, UserAgent as __UserAgent } from "@aws-sdk/types";
export declare type ServiceInputTypes = CreateParallelDataCommandInput | DeleteParallelDataCommandInput | DeleteTerminologyCommandInput | DescribeTextTranslationJobCommandInput | GetParallelDataCommandInput | GetTerminologyCommandInput | ImportTerminologyCommandInput | ListParallelDataCommandInput | ListTerminologiesCommandInput | ListTextTranslationJobsCommandInput | StartTextTranslationJobCommandInput | StopTextTranslationJobCommandInput | TranslateTextCommandInput | UpdateParallelDataCommandInput;
export declare type ServiceOutputTypes = CreateParallelDataCommandOutput | DeleteParallelDataCommandOutput | DeleteTerminologyCommandOutput | DescribeTextTranslationJobCommandOutput | GetParallelDataCommandOutput | GetTerminologyCommandOutput | ImportTerminologyCommandOutput | ListParallelDataCommandOutput | ListTerminologiesCommandOutput | ListTextTranslationJobsCommandOutput | StartTextTranslationJobCommandOutput | StopTextTranslationJobCommandOutput | TranslateTextCommandOutput | UpdateParallelDataCommandOutput;
export interface ClientDefaults extends Partial<__SmithyResolvedConfiguration<__HttpHandlerOptions>> {
    /**
     * The HTTP handler to use. Fetch in browser and Https in Nodejs.
     */
    requestHandler?: __HttpHandler;
    /**
     * A constructor for a class implementing the @aws-sdk/types.Hash interface
     * that computes the SHA-256 HMAC or checksum of a string or binary buffer.
     */
    sha256?: __HashConstructor;
    /**
     * The function that will be used to convert strings into HTTP endpoints.
     */
    urlParser?: __UrlParser;
    /**
     * A function that can calculate the length of a request body.
     */
    bodyLengthChecker?: (body: any) => number | undefined;
    /**
     * A function that converts a stream into an array of bytes.
     */
    streamCollector?: __StreamCollector;
    /**
     * The function that will be used to convert a base64-encoded string to a byte array
     */
    base64Decoder?: __Decoder;
    /**
     * The function that will be used to convert binary data to a base64-encoded string
     */
    base64Encoder?: __Encoder;
    /**
     * The function that will be used to convert a UTF8-encoded string to a byte array
     */
    utf8Decoder?: __Decoder;
    /**
     * The function that will be used to convert binary data to a UTF-8 encoded string
     */
    utf8Encoder?: __Encoder;
    /**
     * The runtime environment
     */
    runtime?: string;
    /**
     * Disable dyanamically changing the endpoint of the client based on the hostPrefix
     * trait of an operation.
     */
    disableHostPrefix?: boolean;
    /**
     * Unique service identifier.
     * @internal
     */
    serviceId?: string;
    /**
     * Default credentials provider; Not available in browser runtime
     */
    credentialDefaultProvider?: (input: any) => __Provider<__Credentials>;
    /**
     * The AWS region to which this client will send requests
     */
    region?: string | __Provider<string>;
    /**
     * Value for how many times a request will be made at most in case of retry.
     */
    maxAttempts?: number | __Provider<number>;
    /**
     * Optional logger for logging debug/info/warn/error.
     */
    logger?: __Logger;
    /**
     * Fetch related hostname, signing name or signing region with given region.
     */
    regionInfoProvider?: RegionInfoProvider;
    /**
     * The provider populating default tracking information to be sent with `user-agent`, `x-amz-user-agent` header
     * @internal
     */
    defaultUserAgentProvider?: Provider<__UserAgent>;
}
export declare type TranslateClientConfig = Partial<__SmithyConfiguration<__HttpHandlerOptions>> & ClientDefaults & RegionInputConfig & EndpointsInputConfig & AwsAuthInputConfig & RetryInputConfig & HostHeaderInputConfig & UserAgentInputConfig;
export declare type TranslateClientResolvedConfig = __SmithyResolvedConfiguration<__HttpHandlerOptions> & Required<ClientDefaults> & RegionResolvedConfig & EndpointsResolvedConfig & AwsAuthResolvedConfig & RetryResolvedConfig & HostHeaderResolvedConfig & UserAgentResolvedConfig;
/**
 * <p>Provides translation between one source language and another of the same set of
 *       languages.</p>
 */
export declare class TranslateClient extends __Client<__HttpHandlerOptions, ServiceInputTypes, ServiceOutputTypes, TranslateClientResolvedConfig> {
    readonly config: TranslateClientResolvedConfig;
    constructor(configuration: TranslateClientConfig);
    destroy(): void;
}
