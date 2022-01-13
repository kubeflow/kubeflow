import {
  AbortMultipartUploadCommandInput,
  AbortMultipartUploadCommandOutput,
} from "./commands/AbortMultipartUploadCommand";
import {
  CompleteMultipartUploadCommandInput,
  CompleteMultipartUploadCommandOutput,
} from "./commands/CompleteMultipartUploadCommand";
import { CopyObjectCommandInput, CopyObjectCommandOutput } from "./commands/CopyObjectCommand";
import { CreateBucketCommandInput, CreateBucketCommandOutput } from "./commands/CreateBucketCommand";
import {
  CreateMultipartUploadCommandInput,
  CreateMultipartUploadCommandOutput,
} from "./commands/CreateMultipartUploadCommand";
import {
  DeleteBucketAnalyticsConfigurationCommandInput,
  DeleteBucketAnalyticsConfigurationCommandOutput,
} from "./commands/DeleteBucketAnalyticsConfigurationCommand";
import { DeleteBucketCommandInput, DeleteBucketCommandOutput } from "./commands/DeleteBucketCommand";
import { DeleteBucketCorsCommandInput, DeleteBucketCorsCommandOutput } from "./commands/DeleteBucketCorsCommand";
import {
  DeleteBucketEncryptionCommandInput,
  DeleteBucketEncryptionCommandOutput,
} from "./commands/DeleteBucketEncryptionCommand";
import {
  DeleteBucketIntelligentTieringConfigurationCommandInput,
  DeleteBucketIntelligentTieringConfigurationCommandOutput,
} from "./commands/DeleteBucketIntelligentTieringConfigurationCommand";
import {
  DeleteBucketInventoryConfigurationCommandInput,
  DeleteBucketInventoryConfigurationCommandOutput,
} from "./commands/DeleteBucketInventoryConfigurationCommand";
import {
  DeleteBucketLifecycleCommandInput,
  DeleteBucketLifecycleCommandOutput,
} from "./commands/DeleteBucketLifecycleCommand";
import {
  DeleteBucketMetricsConfigurationCommandInput,
  DeleteBucketMetricsConfigurationCommandOutput,
} from "./commands/DeleteBucketMetricsConfigurationCommand";
import {
  DeleteBucketOwnershipControlsCommandInput,
  DeleteBucketOwnershipControlsCommandOutput,
} from "./commands/DeleteBucketOwnershipControlsCommand";
import { DeleteBucketPolicyCommandInput, DeleteBucketPolicyCommandOutput } from "./commands/DeleteBucketPolicyCommand";
import {
  DeleteBucketReplicationCommandInput,
  DeleteBucketReplicationCommandOutput,
} from "./commands/DeleteBucketReplicationCommand";
import {
  DeleteBucketTaggingCommandInput,
  DeleteBucketTaggingCommandOutput,
} from "./commands/DeleteBucketTaggingCommand";
import {
  DeleteBucketWebsiteCommandInput,
  DeleteBucketWebsiteCommandOutput,
} from "./commands/DeleteBucketWebsiteCommand";
import { DeleteObjectCommandInput, DeleteObjectCommandOutput } from "./commands/DeleteObjectCommand";
import {
  DeleteObjectTaggingCommandInput,
  DeleteObjectTaggingCommandOutput,
} from "./commands/DeleteObjectTaggingCommand";
import { DeleteObjectsCommandInput, DeleteObjectsCommandOutput } from "./commands/DeleteObjectsCommand";
import {
  DeletePublicAccessBlockCommandInput,
  DeletePublicAccessBlockCommandOutput,
} from "./commands/DeletePublicAccessBlockCommand";
import {
  GetBucketAccelerateConfigurationCommandInput,
  GetBucketAccelerateConfigurationCommandOutput,
} from "./commands/GetBucketAccelerateConfigurationCommand";
import { GetBucketAclCommandInput, GetBucketAclCommandOutput } from "./commands/GetBucketAclCommand";
import {
  GetBucketAnalyticsConfigurationCommandInput,
  GetBucketAnalyticsConfigurationCommandOutput,
} from "./commands/GetBucketAnalyticsConfigurationCommand";
import { GetBucketCorsCommandInput, GetBucketCorsCommandOutput } from "./commands/GetBucketCorsCommand";
import {
  GetBucketEncryptionCommandInput,
  GetBucketEncryptionCommandOutput,
} from "./commands/GetBucketEncryptionCommand";
import {
  GetBucketIntelligentTieringConfigurationCommandInput,
  GetBucketIntelligentTieringConfigurationCommandOutput,
} from "./commands/GetBucketIntelligentTieringConfigurationCommand";
import {
  GetBucketInventoryConfigurationCommandInput,
  GetBucketInventoryConfigurationCommandOutput,
} from "./commands/GetBucketInventoryConfigurationCommand";
import {
  GetBucketLifecycleConfigurationCommandInput,
  GetBucketLifecycleConfigurationCommandOutput,
} from "./commands/GetBucketLifecycleConfigurationCommand";
import { GetBucketLocationCommandInput, GetBucketLocationCommandOutput } from "./commands/GetBucketLocationCommand";
import { GetBucketLoggingCommandInput, GetBucketLoggingCommandOutput } from "./commands/GetBucketLoggingCommand";
import {
  GetBucketMetricsConfigurationCommandInput,
  GetBucketMetricsConfigurationCommandOutput,
} from "./commands/GetBucketMetricsConfigurationCommand";
import {
  GetBucketNotificationConfigurationCommandInput,
  GetBucketNotificationConfigurationCommandOutput,
} from "./commands/GetBucketNotificationConfigurationCommand";
import {
  GetBucketOwnershipControlsCommandInput,
  GetBucketOwnershipControlsCommandOutput,
} from "./commands/GetBucketOwnershipControlsCommand";
import { GetBucketPolicyCommandInput, GetBucketPolicyCommandOutput } from "./commands/GetBucketPolicyCommand";
import {
  GetBucketPolicyStatusCommandInput,
  GetBucketPolicyStatusCommandOutput,
} from "./commands/GetBucketPolicyStatusCommand";
import {
  GetBucketReplicationCommandInput,
  GetBucketReplicationCommandOutput,
} from "./commands/GetBucketReplicationCommand";
import {
  GetBucketRequestPaymentCommandInput,
  GetBucketRequestPaymentCommandOutput,
} from "./commands/GetBucketRequestPaymentCommand";
import { GetBucketTaggingCommandInput, GetBucketTaggingCommandOutput } from "./commands/GetBucketTaggingCommand";
import {
  GetBucketVersioningCommandInput,
  GetBucketVersioningCommandOutput,
} from "./commands/GetBucketVersioningCommand";
import { GetBucketWebsiteCommandInput, GetBucketWebsiteCommandOutput } from "./commands/GetBucketWebsiteCommand";
import { GetObjectAclCommandInput, GetObjectAclCommandOutput } from "./commands/GetObjectAclCommand";
import { GetObjectCommandInput, GetObjectCommandOutput } from "./commands/GetObjectCommand";
import { GetObjectLegalHoldCommandInput, GetObjectLegalHoldCommandOutput } from "./commands/GetObjectLegalHoldCommand";
import {
  GetObjectLockConfigurationCommandInput,
  GetObjectLockConfigurationCommandOutput,
} from "./commands/GetObjectLockConfigurationCommand";
import { GetObjectRetentionCommandInput, GetObjectRetentionCommandOutput } from "./commands/GetObjectRetentionCommand";
import { GetObjectTaggingCommandInput, GetObjectTaggingCommandOutput } from "./commands/GetObjectTaggingCommand";
import { GetObjectTorrentCommandInput, GetObjectTorrentCommandOutput } from "./commands/GetObjectTorrentCommand";
import {
  GetPublicAccessBlockCommandInput,
  GetPublicAccessBlockCommandOutput,
} from "./commands/GetPublicAccessBlockCommand";
import { HeadBucketCommandInput, HeadBucketCommandOutput } from "./commands/HeadBucketCommand";
import { HeadObjectCommandInput, HeadObjectCommandOutput } from "./commands/HeadObjectCommand";
import {
  ListBucketAnalyticsConfigurationsCommandInput,
  ListBucketAnalyticsConfigurationsCommandOutput,
} from "./commands/ListBucketAnalyticsConfigurationsCommand";
import {
  ListBucketIntelligentTieringConfigurationsCommandInput,
  ListBucketIntelligentTieringConfigurationsCommandOutput,
} from "./commands/ListBucketIntelligentTieringConfigurationsCommand";
import {
  ListBucketInventoryConfigurationsCommandInput,
  ListBucketInventoryConfigurationsCommandOutput,
} from "./commands/ListBucketInventoryConfigurationsCommand";
import {
  ListBucketMetricsConfigurationsCommandInput,
  ListBucketMetricsConfigurationsCommandOutput,
} from "./commands/ListBucketMetricsConfigurationsCommand";
import { ListBucketsCommandInput, ListBucketsCommandOutput } from "./commands/ListBucketsCommand";
import {
  ListMultipartUploadsCommandInput,
  ListMultipartUploadsCommandOutput,
} from "./commands/ListMultipartUploadsCommand";
import { ListObjectVersionsCommandInput, ListObjectVersionsCommandOutput } from "./commands/ListObjectVersionsCommand";
import { ListObjectsCommandInput, ListObjectsCommandOutput } from "./commands/ListObjectsCommand";
import { ListObjectsV2CommandInput, ListObjectsV2CommandOutput } from "./commands/ListObjectsV2Command";
import { ListPartsCommandInput, ListPartsCommandOutput } from "./commands/ListPartsCommand";
import {
  PutBucketAccelerateConfigurationCommandInput,
  PutBucketAccelerateConfigurationCommandOutput,
} from "./commands/PutBucketAccelerateConfigurationCommand";
import { PutBucketAclCommandInput, PutBucketAclCommandOutput } from "./commands/PutBucketAclCommand";
import {
  PutBucketAnalyticsConfigurationCommandInput,
  PutBucketAnalyticsConfigurationCommandOutput,
} from "./commands/PutBucketAnalyticsConfigurationCommand";
import { PutBucketCorsCommandInput, PutBucketCorsCommandOutput } from "./commands/PutBucketCorsCommand";
import {
  PutBucketEncryptionCommandInput,
  PutBucketEncryptionCommandOutput,
} from "./commands/PutBucketEncryptionCommand";
import {
  PutBucketIntelligentTieringConfigurationCommandInput,
  PutBucketIntelligentTieringConfigurationCommandOutput,
} from "./commands/PutBucketIntelligentTieringConfigurationCommand";
import {
  PutBucketInventoryConfigurationCommandInput,
  PutBucketInventoryConfigurationCommandOutput,
} from "./commands/PutBucketInventoryConfigurationCommand";
import {
  PutBucketLifecycleConfigurationCommandInput,
  PutBucketLifecycleConfigurationCommandOutput,
} from "./commands/PutBucketLifecycleConfigurationCommand";
import { PutBucketLoggingCommandInput, PutBucketLoggingCommandOutput } from "./commands/PutBucketLoggingCommand";
import {
  PutBucketMetricsConfigurationCommandInput,
  PutBucketMetricsConfigurationCommandOutput,
} from "./commands/PutBucketMetricsConfigurationCommand";
import {
  PutBucketNotificationConfigurationCommandInput,
  PutBucketNotificationConfigurationCommandOutput,
} from "./commands/PutBucketNotificationConfigurationCommand";
import {
  PutBucketOwnershipControlsCommandInput,
  PutBucketOwnershipControlsCommandOutput,
} from "./commands/PutBucketOwnershipControlsCommand";
import { PutBucketPolicyCommandInput, PutBucketPolicyCommandOutput } from "./commands/PutBucketPolicyCommand";
import {
  PutBucketReplicationCommandInput,
  PutBucketReplicationCommandOutput,
} from "./commands/PutBucketReplicationCommand";
import {
  PutBucketRequestPaymentCommandInput,
  PutBucketRequestPaymentCommandOutput,
} from "./commands/PutBucketRequestPaymentCommand";
import { PutBucketTaggingCommandInput, PutBucketTaggingCommandOutput } from "./commands/PutBucketTaggingCommand";
import {
  PutBucketVersioningCommandInput,
  PutBucketVersioningCommandOutput,
} from "./commands/PutBucketVersioningCommand";
import { PutBucketWebsiteCommandInput, PutBucketWebsiteCommandOutput } from "./commands/PutBucketWebsiteCommand";
import { PutObjectAclCommandInput, PutObjectAclCommandOutput } from "./commands/PutObjectAclCommand";
import { PutObjectCommandInput, PutObjectCommandOutput } from "./commands/PutObjectCommand";
import { PutObjectLegalHoldCommandInput, PutObjectLegalHoldCommandOutput } from "./commands/PutObjectLegalHoldCommand";
import {
  PutObjectLockConfigurationCommandInput,
  PutObjectLockConfigurationCommandOutput,
} from "./commands/PutObjectLockConfigurationCommand";
import { PutObjectRetentionCommandInput, PutObjectRetentionCommandOutput } from "./commands/PutObjectRetentionCommand";
import { PutObjectTaggingCommandInput, PutObjectTaggingCommandOutput } from "./commands/PutObjectTaggingCommand";
import {
  PutPublicAccessBlockCommandInput,
  PutPublicAccessBlockCommandOutput,
} from "./commands/PutPublicAccessBlockCommand";
import { RestoreObjectCommandInput, RestoreObjectCommandOutput } from "./commands/RestoreObjectCommand";
import {
  SelectObjectContentCommandInput,
  SelectObjectContentCommandOutput,
} from "./commands/SelectObjectContentCommand";
import { UploadPartCommandInput, UploadPartCommandOutput } from "./commands/UploadPartCommand";
import { UploadPartCopyCommandInput, UploadPartCopyCommandOutput } from "./commands/UploadPartCopyCommand";
import { ClientDefaultValues as __ClientDefaultValues } from "./runtimeConfig";
import {
  EndpointsInputConfig,
  EndpointsResolvedConfig,
  RegionInputConfig,
  RegionResolvedConfig,
  resolveEndpointsConfig,
  resolveRegionConfig,
} from "@aws-sdk/config-resolver";
import {
  EventStreamSerdeInputConfig,
  EventStreamSerdeResolvedConfig,
  resolveEventStreamSerdeConfig,
} from "@aws-sdk/eventstream-serde-config-resolver";
import {
  BucketEndpointInputConfig,
  BucketEndpointResolvedConfig,
  resolveBucketEndpointConfig,
} from "@aws-sdk/middleware-bucket-endpoint";
import { getContentLengthPlugin } from "@aws-sdk/middleware-content-length";
import { getAddExpectContinuePlugin } from "@aws-sdk/middleware-expect-continue";
import {
  HostHeaderInputConfig,
  HostHeaderResolvedConfig,
  getHostHeaderPlugin,
  resolveHostHeaderConfig,
} from "@aws-sdk/middleware-host-header";
import { getLoggerPlugin } from "@aws-sdk/middleware-logger";
import { RetryInputConfig, RetryResolvedConfig, getRetryPlugin, resolveRetryConfig } from "@aws-sdk/middleware-retry";
import { getUseRegionalEndpointPlugin, getValidateBucketNamePlugin } from "@aws-sdk/middleware-sdk-s3";
import {
  AwsAuthInputConfig,
  AwsAuthResolvedConfig,
  getAwsAuthPlugin,
  resolveAwsAuthConfig,
} from "@aws-sdk/middleware-signing";
import {
  UserAgentInputConfig,
  UserAgentResolvedConfig,
  getUserAgentPlugin,
  resolveUserAgentConfig,
} from "@aws-sdk/middleware-user-agent";
import { HttpHandler as __HttpHandler } from "@aws-sdk/protocol-http";
import {
  Client as __Client,
  SmithyConfiguration as __SmithyConfiguration,
  SmithyResolvedConfiguration as __SmithyResolvedConfiguration,
} from "@aws-sdk/smithy-client";
import {
  Provider,
  RegionInfoProvider,
  Credentials as __Credentials,
  Decoder as __Decoder,
  Encoder as __Encoder,
  EventStreamSerdeProvider as __EventStreamSerdeProvider,
  HashConstructor as __HashConstructor,
  HttpHandlerOptions as __HttpHandlerOptions,
  Logger as __Logger,
  Provider as __Provider,
  StreamCollector as __StreamCollector,
  StreamHasher as __StreamHasher,
  UrlParser as __UrlParser,
  UserAgent as __UserAgent,
} from "@aws-sdk/types";
import { Readable } from "stream";

export type ServiceInputTypes =
  | AbortMultipartUploadCommandInput
  | CompleteMultipartUploadCommandInput
  | CopyObjectCommandInput
  | CreateBucketCommandInput
  | CreateMultipartUploadCommandInput
  | DeleteBucketAnalyticsConfigurationCommandInput
  | DeleteBucketCommandInput
  | DeleteBucketCorsCommandInput
  | DeleteBucketEncryptionCommandInput
  | DeleteBucketIntelligentTieringConfigurationCommandInput
  | DeleteBucketInventoryConfigurationCommandInput
  | DeleteBucketLifecycleCommandInput
  | DeleteBucketMetricsConfigurationCommandInput
  | DeleteBucketOwnershipControlsCommandInput
  | DeleteBucketPolicyCommandInput
  | DeleteBucketReplicationCommandInput
  | DeleteBucketTaggingCommandInput
  | DeleteBucketWebsiteCommandInput
  | DeleteObjectCommandInput
  | DeleteObjectTaggingCommandInput
  | DeleteObjectsCommandInput
  | DeletePublicAccessBlockCommandInput
  | GetBucketAccelerateConfigurationCommandInput
  | GetBucketAclCommandInput
  | GetBucketAnalyticsConfigurationCommandInput
  | GetBucketCorsCommandInput
  | GetBucketEncryptionCommandInput
  | GetBucketIntelligentTieringConfigurationCommandInput
  | GetBucketInventoryConfigurationCommandInput
  | GetBucketLifecycleConfigurationCommandInput
  | GetBucketLocationCommandInput
  | GetBucketLoggingCommandInput
  | GetBucketMetricsConfigurationCommandInput
  | GetBucketNotificationConfigurationCommandInput
  | GetBucketOwnershipControlsCommandInput
  | GetBucketPolicyCommandInput
  | GetBucketPolicyStatusCommandInput
  | GetBucketReplicationCommandInput
  | GetBucketRequestPaymentCommandInput
  | GetBucketTaggingCommandInput
  | GetBucketVersioningCommandInput
  | GetBucketWebsiteCommandInput
  | GetObjectAclCommandInput
  | GetObjectCommandInput
  | GetObjectLegalHoldCommandInput
  | GetObjectLockConfigurationCommandInput
  | GetObjectRetentionCommandInput
  | GetObjectTaggingCommandInput
  | GetObjectTorrentCommandInput
  | GetPublicAccessBlockCommandInput
  | HeadBucketCommandInput
  | HeadObjectCommandInput
  | ListBucketAnalyticsConfigurationsCommandInput
  | ListBucketIntelligentTieringConfigurationsCommandInput
  | ListBucketInventoryConfigurationsCommandInput
  | ListBucketMetricsConfigurationsCommandInput
  | ListBucketsCommandInput
  | ListMultipartUploadsCommandInput
  | ListObjectVersionsCommandInput
  | ListObjectsCommandInput
  | ListObjectsV2CommandInput
  | ListPartsCommandInput
  | PutBucketAccelerateConfigurationCommandInput
  | PutBucketAclCommandInput
  | PutBucketAnalyticsConfigurationCommandInput
  | PutBucketCorsCommandInput
  | PutBucketEncryptionCommandInput
  | PutBucketIntelligentTieringConfigurationCommandInput
  | PutBucketInventoryConfigurationCommandInput
  | PutBucketLifecycleConfigurationCommandInput
  | PutBucketLoggingCommandInput
  | PutBucketMetricsConfigurationCommandInput
  | PutBucketNotificationConfigurationCommandInput
  | PutBucketOwnershipControlsCommandInput
  | PutBucketPolicyCommandInput
  | PutBucketReplicationCommandInput
  | PutBucketRequestPaymentCommandInput
  | PutBucketTaggingCommandInput
  | PutBucketVersioningCommandInput
  | PutBucketWebsiteCommandInput
  | PutObjectAclCommandInput
  | PutObjectCommandInput
  | PutObjectLegalHoldCommandInput
  | PutObjectLockConfigurationCommandInput
  | PutObjectRetentionCommandInput
  | PutObjectTaggingCommandInput
  | PutPublicAccessBlockCommandInput
  | RestoreObjectCommandInput
  | SelectObjectContentCommandInput
  | UploadPartCommandInput
  | UploadPartCopyCommandInput;

export type ServiceOutputTypes =
  | AbortMultipartUploadCommandOutput
  | CompleteMultipartUploadCommandOutput
  | CopyObjectCommandOutput
  | CreateBucketCommandOutput
  | CreateMultipartUploadCommandOutput
  | DeleteBucketAnalyticsConfigurationCommandOutput
  | DeleteBucketCommandOutput
  | DeleteBucketCorsCommandOutput
  | DeleteBucketEncryptionCommandOutput
  | DeleteBucketIntelligentTieringConfigurationCommandOutput
  | DeleteBucketInventoryConfigurationCommandOutput
  | DeleteBucketLifecycleCommandOutput
  | DeleteBucketMetricsConfigurationCommandOutput
  | DeleteBucketOwnershipControlsCommandOutput
  | DeleteBucketPolicyCommandOutput
  | DeleteBucketReplicationCommandOutput
  | DeleteBucketTaggingCommandOutput
  | DeleteBucketWebsiteCommandOutput
  | DeleteObjectCommandOutput
  | DeleteObjectTaggingCommandOutput
  | DeleteObjectsCommandOutput
  | DeletePublicAccessBlockCommandOutput
  | GetBucketAccelerateConfigurationCommandOutput
  | GetBucketAclCommandOutput
  | GetBucketAnalyticsConfigurationCommandOutput
  | GetBucketCorsCommandOutput
  | GetBucketEncryptionCommandOutput
  | GetBucketIntelligentTieringConfigurationCommandOutput
  | GetBucketInventoryConfigurationCommandOutput
  | GetBucketLifecycleConfigurationCommandOutput
  | GetBucketLocationCommandOutput
  | GetBucketLoggingCommandOutput
  | GetBucketMetricsConfigurationCommandOutput
  | GetBucketNotificationConfigurationCommandOutput
  | GetBucketOwnershipControlsCommandOutput
  | GetBucketPolicyCommandOutput
  | GetBucketPolicyStatusCommandOutput
  | GetBucketReplicationCommandOutput
  | GetBucketRequestPaymentCommandOutput
  | GetBucketTaggingCommandOutput
  | GetBucketVersioningCommandOutput
  | GetBucketWebsiteCommandOutput
  | GetObjectAclCommandOutput
  | GetObjectCommandOutput
  | GetObjectLegalHoldCommandOutput
  | GetObjectLockConfigurationCommandOutput
  | GetObjectRetentionCommandOutput
  | GetObjectTaggingCommandOutput
  | GetObjectTorrentCommandOutput
  | GetPublicAccessBlockCommandOutput
  | HeadBucketCommandOutput
  | HeadObjectCommandOutput
  | ListBucketAnalyticsConfigurationsCommandOutput
  | ListBucketIntelligentTieringConfigurationsCommandOutput
  | ListBucketInventoryConfigurationsCommandOutput
  | ListBucketMetricsConfigurationsCommandOutput
  | ListBucketsCommandOutput
  | ListMultipartUploadsCommandOutput
  | ListObjectVersionsCommandOutput
  | ListObjectsCommandOutput
  | ListObjectsV2CommandOutput
  | ListPartsCommandOutput
  | PutBucketAccelerateConfigurationCommandOutput
  | PutBucketAclCommandOutput
  | PutBucketAnalyticsConfigurationCommandOutput
  | PutBucketCorsCommandOutput
  | PutBucketEncryptionCommandOutput
  | PutBucketIntelligentTieringConfigurationCommandOutput
  | PutBucketInventoryConfigurationCommandOutput
  | PutBucketLifecycleConfigurationCommandOutput
  | PutBucketLoggingCommandOutput
  | PutBucketMetricsConfigurationCommandOutput
  | PutBucketNotificationConfigurationCommandOutput
  | PutBucketOwnershipControlsCommandOutput
  | PutBucketPolicyCommandOutput
  | PutBucketReplicationCommandOutput
  | PutBucketRequestPaymentCommandOutput
  | PutBucketTaggingCommandOutput
  | PutBucketVersioningCommandOutput
  | PutBucketWebsiteCommandOutput
  | PutObjectAclCommandOutput
  | PutObjectCommandOutput
  | PutObjectLegalHoldCommandOutput
  | PutObjectLockConfigurationCommandOutput
  | PutObjectRetentionCommandOutput
  | PutObjectTaggingCommandOutput
  | PutPublicAccessBlockCommandOutput
  | RestoreObjectCommandOutput
  | SelectObjectContentCommandOutput
  | UploadPartCommandOutput
  | UploadPartCopyCommandOutput;

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
   * A constructor for a class implementing the @aws-sdk/types.Hash interface
   * that computes MD5 hashes
   */
  md5?: __HashConstructor;

  /**
   * A function that, given a hash constructor and a stream, calculates the
   * hash of the streamed value
   */
  streamHasher?: __StreamHasher<Readable> | __StreamHasher<Blob>;

  /**
   * Whether to escape request path when signing the request.
   */
  signingEscapePath?: boolean;

  /**
   * Whether to override the request region with the region inferred from requested resource's ARN. Defaults to false.
   */
  useArnRegion?: boolean | Provider<boolean>;
  /**
   * The provider populating default tracking information to be sent with `user-agent`, `x-amz-user-agent` header
   * @internal
   */
  defaultUserAgentProvider?: Provider<__UserAgent>;

  /**
   * The function that provides necessary utilities for generating and parsing event stream
   */
  eventStreamSerdeProvider?: __EventStreamSerdeProvider;
}

export type S3ClientConfig = Partial<__SmithyConfiguration<__HttpHandlerOptions>> &
  ClientDefaults &
  RegionInputConfig &
  EndpointsInputConfig &
  AwsAuthInputConfig &
  RetryInputConfig &
  HostHeaderInputConfig &
  BucketEndpointInputConfig &
  UserAgentInputConfig &
  EventStreamSerdeInputConfig;

export type S3ClientResolvedConfig = __SmithyResolvedConfiguration<__HttpHandlerOptions> &
  Required<ClientDefaults> &
  RegionResolvedConfig &
  EndpointsResolvedConfig &
  AwsAuthResolvedConfig &
  RetryResolvedConfig &
  HostHeaderResolvedConfig &
  BucketEndpointResolvedConfig &
  UserAgentResolvedConfig &
  EventStreamSerdeResolvedConfig;

/**
 * <p></p>
 */
export class S3Client extends __Client<
  __HttpHandlerOptions,
  ServiceInputTypes,
  ServiceOutputTypes,
  S3ClientResolvedConfig
> {
  readonly config: S3ClientResolvedConfig;

  constructor(configuration: S3ClientConfig) {
    let _config_0 = {
      ...__ClientDefaultValues,
      ...configuration,
    };
    let _config_1 = resolveRegionConfig(_config_0);
    let _config_2 = resolveEndpointsConfig(_config_1);
    let _config_3 = resolveAwsAuthConfig(_config_2);
    let _config_4 = resolveRetryConfig(_config_3);
    let _config_5 = resolveHostHeaderConfig(_config_4);
    let _config_6 = resolveBucketEndpointConfig(_config_5);
    let _config_7 = resolveUserAgentConfig(_config_6);
    let _config_8 = resolveEventStreamSerdeConfig(_config_7);
    super(_config_8);
    this.config = _config_8;
    this.middlewareStack.use(getAwsAuthPlugin(this.config));
    this.middlewareStack.use(getRetryPlugin(this.config));
    this.middlewareStack.use(getContentLengthPlugin(this.config));
    this.middlewareStack.use(getHostHeaderPlugin(this.config));
    this.middlewareStack.use(getLoggerPlugin(this.config));
    this.middlewareStack.use(getValidateBucketNamePlugin(this.config));
    this.middlewareStack.use(getUseRegionalEndpointPlugin(this.config));
    this.middlewareStack.use(getAddExpectContinuePlugin(this.config));
    this.middlewareStack.use(getUserAgentPlugin(this.config));
  }

  destroy(): void {
    super.destroy();
  }
}
