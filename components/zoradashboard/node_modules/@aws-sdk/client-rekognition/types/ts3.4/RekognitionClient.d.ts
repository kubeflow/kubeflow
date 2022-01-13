import { CompareFacesCommandInput, CompareFacesCommandOutput } from "./commands/CompareFacesCommand";
import { CreateCollectionCommandInput, CreateCollectionCommandOutput } from "./commands/CreateCollectionCommand";
import { CreateProjectCommandInput, CreateProjectCommandOutput } from "./commands/CreateProjectCommand";
import { CreateProjectVersionCommandInput, CreateProjectVersionCommandOutput } from "./commands/CreateProjectVersionCommand";
import { CreateStreamProcessorCommandInput, CreateStreamProcessorCommandOutput } from "./commands/CreateStreamProcessorCommand";
import { DeleteCollectionCommandInput, DeleteCollectionCommandOutput } from "./commands/DeleteCollectionCommand";
import { DeleteFacesCommandInput, DeleteFacesCommandOutput } from "./commands/DeleteFacesCommand";
import { DeleteProjectCommandInput, DeleteProjectCommandOutput } from "./commands/DeleteProjectCommand";
import { DeleteProjectVersionCommandInput, DeleteProjectVersionCommandOutput } from "./commands/DeleteProjectVersionCommand";
import { DeleteStreamProcessorCommandInput, DeleteStreamProcessorCommandOutput } from "./commands/DeleteStreamProcessorCommand";
import { DescribeCollectionCommandInput, DescribeCollectionCommandOutput } from "./commands/DescribeCollectionCommand";
import { DescribeProjectVersionsCommandInput, DescribeProjectVersionsCommandOutput } from "./commands/DescribeProjectVersionsCommand";
import { DescribeProjectsCommandInput, DescribeProjectsCommandOutput } from "./commands/DescribeProjectsCommand";
import { DescribeStreamProcessorCommandInput, DescribeStreamProcessorCommandOutput } from "./commands/DescribeStreamProcessorCommand";
import { DetectCustomLabelsCommandInput, DetectCustomLabelsCommandOutput } from "./commands/DetectCustomLabelsCommand";
import { DetectFacesCommandInput, DetectFacesCommandOutput } from "./commands/DetectFacesCommand";
import { DetectLabelsCommandInput, DetectLabelsCommandOutput } from "./commands/DetectLabelsCommand";
import { DetectModerationLabelsCommandInput, DetectModerationLabelsCommandOutput } from "./commands/DetectModerationLabelsCommand";
import { DetectProtectiveEquipmentCommandInput, DetectProtectiveEquipmentCommandOutput } from "./commands/DetectProtectiveEquipmentCommand";
import { DetectTextCommandInput, DetectTextCommandOutput } from "./commands/DetectTextCommand";
import { GetCelebrityInfoCommandInput, GetCelebrityInfoCommandOutput } from "./commands/GetCelebrityInfoCommand";
import { GetCelebrityRecognitionCommandInput, GetCelebrityRecognitionCommandOutput } from "./commands/GetCelebrityRecognitionCommand";
import { GetContentModerationCommandInput, GetContentModerationCommandOutput } from "./commands/GetContentModerationCommand";
import { GetFaceDetectionCommandInput, GetFaceDetectionCommandOutput } from "./commands/GetFaceDetectionCommand";
import { GetFaceSearchCommandInput, GetFaceSearchCommandOutput } from "./commands/GetFaceSearchCommand";
import { GetLabelDetectionCommandInput, GetLabelDetectionCommandOutput } from "./commands/GetLabelDetectionCommand";
import { GetPersonTrackingCommandInput, GetPersonTrackingCommandOutput } from "./commands/GetPersonTrackingCommand";
import { GetSegmentDetectionCommandInput, GetSegmentDetectionCommandOutput } from "./commands/GetSegmentDetectionCommand";
import { GetTextDetectionCommandInput, GetTextDetectionCommandOutput } from "./commands/GetTextDetectionCommand";
import { IndexFacesCommandInput, IndexFacesCommandOutput } from "./commands/IndexFacesCommand";
import { ListCollectionsCommandInput, ListCollectionsCommandOutput } from "./commands/ListCollectionsCommand";
import { ListFacesCommandInput, ListFacesCommandOutput } from "./commands/ListFacesCommand";
import { ListStreamProcessorsCommandInput, ListStreamProcessorsCommandOutput } from "./commands/ListStreamProcessorsCommand";
import { RecognizeCelebritiesCommandInput, RecognizeCelebritiesCommandOutput } from "./commands/RecognizeCelebritiesCommand";
import { SearchFacesByImageCommandInput, SearchFacesByImageCommandOutput } from "./commands/SearchFacesByImageCommand";
import { SearchFacesCommandInput, SearchFacesCommandOutput } from "./commands/SearchFacesCommand";
import { StartCelebrityRecognitionCommandInput, StartCelebrityRecognitionCommandOutput } from "./commands/StartCelebrityRecognitionCommand";
import { StartContentModerationCommandInput, StartContentModerationCommandOutput } from "./commands/StartContentModerationCommand";
import { StartFaceDetectionCommandInput, StartFaceDetectionCommandOutput } from "./commands/StartFaceDetectionCommand";
import { StartFaceSearchCommandInput, StartFaceSearchCommandOutput } from "./commands/StartFaceSearchCommand";
import { StartLabelDetectionCommandInput, StartLabelDetectionCommandOutput } from "./commands/StartLabelDetectionCommand";
import { StartPersonTrackingCommandInput, StartPersonTrackingCommandOutput } from "./commands/StartPersonTrackingCommand";
import { StartProjectVersionCommandInput, StartProjectVersionCommandOutput } from "./commands/StartProjectVersionCommand";
import { StartSegmentDetectionCommandInput, StartSegmentDetectionCommandOutput } from "./commands/StartSegmentDetectionCommand";
import { StartStreamProcessorCommandInput, StartStreamProcessorCommandOutput } from "./commands/StartStreamProcessorCommand";
import { StartTextDetectionCommandInput, StartTextDetectionCommandOutput } from "./commands/StartTextDetectionCommand";
import { StopProjectVersionCommandInput, StopProjectVersionCommandOutput } from "./commands/StopProjectVersionCommand";
import { StopStreamProcessorCommandInput, StopStreamProcessorCommandOutput } from "./commands/StopStreamProcessorCommand";
import { EndpointsInputConfig, EndpointsResolvedConfig, RegionInputConfig, RegionResolvedConfig } from "@aws-sdk/config-resolver";
import { HostHeaderInputConfig, HostHeaderResolvedConfig } from "@aws-sdk/middleware-host-header";
import { RetryInputConfig, RetryResolvedConfig } from "@aws-sdk/middleware-retry";
import { AwsAuthInputConfig, AwsAuthResolvedConfig } from "@aws-sdk/middleware-signing";
import { UserAgentInputConfig, UserAgentResolvedConfig } from "@aws-sdk/middleware-user-agent";
import { HttpHandler as __HttpHandler } from "@aws-sdk/protocol-http";
import { Client as __Client, SmithyConfiguration as __SmithyConfiguration, SmithyResolvedConfiguration as __SmithyResolvedConfiguration } from "@aws-sdk/smithy-client";
import { Provider, RegionInfoProvider, Credentials as __Credentials, Decoder as __Decoder, Encoder as __Encoder, HashConstructor as __HashConstructor, HttpHandlerOptions as __HttpHandlerOptions, Logger as __Logger, Provider as __Provider, StreamCollector as __StreamCollector, UrlParser as __UrlParser, UserAgent as __UserAgent } from "@aws-sdk/types";
export declare type ServiceInputTypes = CompareFacesCommandInput | CreateCollectionCommandInput | CreateProjectCommandInput | CreateProjectVersionCommandInput | CreateStreamProcessorCommandInput | DeleteCollectionCommandInput | DeleteFacesCommandInput | DeleteProjectCommandInput | DeleteProjectVersionCommandInput | DeleteStreamProcessorCommandInput | DescribeCollectionCommandInput | DescribeProjectVersionsCommandInput | DescribeProjectsCommandInput | DescribeStreamProcessorCommandInput | DetectCustomLabelsCommandInput | DetectFacesCommandInput | DetectLabelsCommandInput | DetectModerationLabelsCommandInput | DetectProtectiveEquipmentCommandInput | DetectTextCommandInput | GetCelebrityInfoCommandInput | GetCelebrityRecognitionCommandInput | GetContentModerationCommandInput | GetFaceDetectionCommandInput | GetFaceSearchCommandInput | GetLabelDetectionCommandInput | GetPersonTrackingCommandInput | GetSegmentDetectionCommandInput | GetTextDetectionCommandInput | IndexFacesCommandInput | ListCollectionsCommandInput | ListFacesCommandInput | ListStreamProcessorsCommandInput | RecognizeCelebritiesCommandInput | SearchFacesByImageCommandInput | SearchFacesCommandInput | StartCelebrityRecognitionCommandInput | StartContentModerationCommandInput | StartFaceDetectionCommandInput | StartFaceSearchCommandInput | StartLabelDetectionCommandInput | StartPersonTrackingCommandInput | StartProjectVersionCommandInput | StartSegmentDetectionCommandInput | StartStreamProcessorCommandInput | StartTextDetectionCommandInput | StopProjectVersionCommandInput | StopStreamProcessorCommandInput;
export declare type ServiceOutputTypes = CompareFacesCommandOutput | CreateCollectionCommandOutput | CreateProjectCommandOutput | CreateProjectVersionCommandOutput | CreateStreamProcessorCommandOutput | DeleteCollectionCommandOutput | DeleteFacesCommandOutput | DeleteProjectCommandOutput | DeleteProjectVersionCommandOutput | DeleteStreamProcessorCommandOutput | DescribeCollectionCommandOutput | DescribeProjectVersionsCommandOutput | DescribeProjectsCommandOutput | DescribeStreamProcessorCommandOutput | DetectCustomLabelsCommandOutput | DetectFacesCommandOutput | DetectLabelsCommandOutput | DetectModerationLabelsCommandOutput | DetectProtectiveEquipmentCommandOutput | DetectTextCommandOutput | GetCelebrityInfoCommandOutput | GetCelebrityRecognitionCommandOutput | GetContentModerationCommandOutput | GetFaceDetectionCommandOutput | GetFaceSearchCommandOutput | GetLabelDetectionCommandOutput | GetPersonTrackingCommandOutput | GetSegmentDetectionCommandOutput | GetTextDetectionCommandOutput | IndexFacesCommandOutput | ListCollectionsCommandOutput | ListFacesCommandOutput | ListStreamProcessorsCommandOutput | RecognizeCelebritiesCommandOutput | SearchFacesByImageCommandOutput | SearchFacesCommandOutput | StartCelebrityRecognitionCommandOutput | StartContentModerationCommandOutput | StartFaceDetectionCommandOutput | StartFaceSearchCommandOutput | StartLabelDetectionCommandOutput | StartPersonTrackingCommandOutput | StartProjectVersionCommandOutput | StartSegmentDetectionCommandOutput | StartStreamProcessorCommandOutput | StartTextDetectionCommandOutput | StopProjectVersionCommandOutput | StopStreamProcessorCommandOutput;
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
export declare type RekognitionClientConfig = Partial<__SmithyConfiguration<__HttpHandlerOptions>> & ClientDefaults & RegionInputConfig & EndpointsInputConfig & AwsAuthInputConfig & RetryInputConfig & HostHeaderInputConfig & UserAgentInputConfig;
export declare type RekognitionClientResolvedConfig = __SmithyResolvedConfiguration<__HttpHandlerOptions> & Required<ClientDefaults> & RegionResolvedConfig & EndpointsResolvedConfig & AwsAuthResolvedConfig & RetryResolvedConfig & HostHeaderResolvedConfig & UserAgentResolvedConfig;
/**
 * <p>This is the Amazon Rekognition API reference.</p>
 */
export declare class RekognitionClient extends __Client<__HttpHandlerOptions, ServiceInputTypes, ServiceOutputTypes, RekognitionClientResolvedConfig> {
    readonly config: RekognitionClientResolvedConfig;
    constructor(configuration: RekognitionClientConfig);
    destroy(): void;
}
