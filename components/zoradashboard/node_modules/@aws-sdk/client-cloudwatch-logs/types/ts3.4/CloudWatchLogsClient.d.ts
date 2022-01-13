import { AssociateKmsKeyCommandInput, AssociateKmsKeyCommandOutput } from "./commands/AssociateKmsKeyCommand";
import { CancelExportTaskCommandInput, CancelExportTaskCommandOutput } from "./commands/CancelExportTaskCommand";
import { CreateExportTaskCommandInput, CreateExportTaskCommandOutput } from "./commands/CreateExportTaskCommand";
import { CreateLogGroupCommandInput, CreateLogGroupCommandOutput } from "./commands/CreateLogGroupCommand";
import { CreateLogStreamCommandInput, CreateLogStreamCommandOutput } from "./commands/CreateLogStreamCommand";
import { DeleteDestinationCommandInput, DeleteDestinationCommandOutput } from "./commands/DeleteDestinationCommand";
import { DeleteLogGroupCommandInput, DeleteLogGroupCommandOutput } from "./commands/DeleteLogGroupCommand";
import { DeleteLogStreamCommandInput, DeleteLogStreamCommandOutput } from "./commands/DeleteLogStreamCommand";
import { DeleteMetricFilterCommandInput, DeleteMetricFilterCommandOutput } from "./commands/DeleteMetricFilterCommand";
import { DeleteQueryDefinitionCommandInput, DeleteQueryDefinitionCommandOutput } from "./commands/DeleteQueryDefinitionCommand";
import { DeleteResourcePolicyCommandInput, DeleteResourcePolicyCommandOutput } from "./commands/DeleteResourcePolicyCommand";
import { DeleteRetentionPolicyCommandInput, DeleteRetentionPolicyCommandOutput } from "./commands/DeleteRetentionPolicyCommand";
import { DeleteSubscriptionFilterCommandInput, DeleteSubscriptionFilterCommandOutput } from "./commands/DeleteSubscriptionFilterCommand";
import { DescribeDestinationsCommandInput, DescribeDestinationsCommandOutput } from "./commands/DescribeDestinationsCommand";
import { DescribeExportTasksCommandInput, DescribeExportTasksCommandOutput } from "./commands/DescribeExportTasksCommand";
import { DescribeLogGroupsCommandInput, DescribeLogGroupsCommandOutput } from "./commands/DescribeLogGroupsCommand";
import { DescribeLogStreamsCommandInput, DescribeLogStreamsCommandOutput } from "./commands/DescribeLogStreamsCommand";
import { DescribeMetricFiltersCommandInput, DescribeMetricFiltersCommandOutput } from "./commands/DescribeMetricFiltersCommand";
import { DescribeQueriesCommandInput, DescribeQueriesCommandOutput } from "./commands/DescribeQueriesCommand";
import { DescribeQueryDefinitionsCommandInput, DescribeQueryDefinitionsCommandOutput } from "./commands/DescribeQueryDefinitionsCommand";
import { DescribeResourcePoliciesCommandInput, DescribeResourcePoliciesCommandOutput } from "./commands/DescribeResourcePoliciesCommand";
import { DescribeSubscriptionFiltersCommandInput, DescribeSubscriptionFiltersCommandOutput } from "./commands/DescribeSubscriptionFiltersCommand";
import { DisassociateKmsKeyCommandInput, DisassociateKmsKeyCommandOutput } from "./commands/DisassociateKmsKeyCommand";
import { FilterLogEventsCommandInput, FilterLogEventsCommandOutput } from "./commands/FilterLogEventsCommand";
import { GetLogEventsCommandInput, GetLogEventsCommandOutput } from "./commands/GetLogEventsCommand";
import { GetLogGroupFieldsCommandInput, GetLogGroupFieldsCommandOutput } from "./commands/GetLogGroupFieldsCommand";
import { GetLogRecordCommandInput, GetLogRecordCommandOutput } from "./commands/GetLogRecordCommand";
import { GetQueryResultsCommandInput, GetQueryResultsCommandOutput } from "./commands/GetQueryResultsCommand";
import { ListTagsLogGroupCommandInput, ListTagsLogGroupCommandOutput } from "./commands/ListTagsLogGroupCommand";
import { PutDestinationCommandInput, PutDestinationCommandOutput } from "./commands/PutDestinationCommand";
import { PutDestinationPolicyCommandInput, PutDestinationPolicyCommandOutput } from "./commands/PutDestinationPolicyCommand";
import { PutLogEventsCommandInput, PutLogEventsCommandOutput } from "./commands/PutLogEventsCommand";
import { PutMetricFilterCommandInput, PutMetricFilterCommandOutput } from "./commands/PutMetricFilterCommand";
import { PutQueryDefinitionCommandInput, PutQueryDefinitionCommandOutput } from "./commands/PutQueryDefinitionCommand";
import { PutResourcePolicyCommandInput, PutResourcePolicyCommandOutput } from "./commands/PutResourcePolicyCommand";
import { PutRetentionPolicyCommandInput, PutRetentionPolicyCommandOutput } from "./commands/PutRetentionPolicyCommand";
import { PutSubscriptionFilterCommandInput, PutSubscriptionFilterCommandOutput } from "./commands/PutSubscriptionFilterCommand";
import { StartQueryCommandInput, StartQueryCommandOutput } from "./commands/StartQueryCommand";
import { StopQueryCommandInput, StopQueryCommandOutput } from "./commands/StopQueryCommand";
import { TagLogGroupCommandInput, TagLogGroupCommandOutput } from "./commands/TagLogGroupCommand";
import { TestMetricFilterCommandInput, TestMetricFilterCommandOutput } from "./commands/TestMetricFilterCommand";
import { UntagLogGroupCommandInput, UntagLogGroupCommandOutput } from "./commands/UntagLogGroupCommand";
import { EndpointsInputConfig, EndpointsResolvedConfig, RegionInputConfig, RegionResolvedConfig } from "@aws-sdk/config-resolver";
import { HostHeaderInputConfig, HostHeaderResolvedConfig } from "@aws-sdk/middleware-host-header";
import { RetryInputConfig, RetryResolvedConfig } from "@aws-sdk/middleware-retry";
import { AwsAuthInputConfig, AwsAuthResolvedConfig } from "@aws-sdk/middleware-signing";
import { UserAgentInputConfig, UserAgentResolvedConfig } from "@aws-sdk/middleware-user-agent";
import { HttpHandler as __HttpHandler } from "@aws-sdk/protocol-http";
import { Client as __Client, SmithyConfiguration as __SmithyConfiguration, SmithyResolvedConfiguration as __SmithyResolvedConfiguration } from "@aws-sdk/smithy-client";
import { Provider, RegionInfoProvider, Credentials as __Credentials, Decoder as __Decoder, Encoder as __Encoder, HashConstructor as __HashConstructor, HttpHandlerOptions as __HttpHandlerOptions, Logger as __Logger, Provider as __Provider, StreamCollector as __StreamCollector, UrlParser as __UrlParser, UserAgent as __UserAgent } from "@aws-sdk/types";
export declare type ServiceInputTypes = AssociateKmsKeyCommandInput | CancelExportTaskCommandInput | CreateExportTaskCommandInput | CreateLogGroupCommandInput | CreateLogStreamCommandInput | DeleteDestinationCommandInput | DeleteLogGroupCommandInput | DeleteLogStreamCommandInput | DeleteMetricFilterCommandInput | DeleteQueryDefinitionCommandInput | DeleteResourcePolicyCommandInput | DeleteRetentionPolicyCommandInput | DeleteSubscriptionFilterCommandInput | DescribeDestinationsCommandInput | DescribeExportTasksCommandInput | DescribeLogGroupsCommandInput | DescribeLogStreamsCommandInput | DescribeMetricFiltersCommandInput | DescribeQueriesCommandInput | DescribeQueryDefinitionsCommandInput | DescribeResourcePoliciesCommandInput | DescribeSubscriptionFiltersCommandInput | DisassociateKmsKeyCommandInput | FilterLogEventsCommandInput | GetLogEventsCommandInput | GetLogGroupFieldsCommandInput | GetLogRecordCommandInput | GetQueryResultsCommandInput | ListTagsLogGroupCommandInput | PutDestinationCommandInput | PutDestinationPolicyCommandInput | PutLogEventsCommandInput | PutMetricFilterCommandInput | PutQueryDefinitionCommandInput | PutResourcePolicyCommandInput | PutRetentionPolicyCommandInput | PutSubscriptionFilterCommandInput | StartQueryCommandInput | StopQueryCommandInput | TagLogGroupCommandInput | TestMetricFilterCommandInput | UntagLogGroupCommandInput;
export declare type ServiceOutputTypes = AssociateKmsKeyCommandOutput | CancelExportTaskCommandOutput | CreateExportTaskCommandOutput | CreateLogGroupCommandOutput | CreateLogStreamCommandOutput | DeleteDestinationCommandOutput | DeleteLogGroupCommandOutput | DeleteLogStreamCommandOutput | DeleteMetricFilterCommandOutput | DeleteQueryDefinitionCommandOutput | DeleteResourcePolicyCommandOutput | DeleteRetentionPolicyCommandOutput | DeleteSubscriptionFilterCommandOutput | DescribeDestinationsCommandOutput | DescribeExportTasksCommandOutput | DescribeLogGroupsCommandOutput | DescribeLogStreamsCommandOutput | DescribeMetricFiltersCommandOutput | DescribeQueriesCommandOutput | DescribeQueryDefinitionsCommandOutput | DescribeResourcePoliciesCommandOutput | DescribeSubscriptionFiltersCommandOutput | DisassociateKmsKeyCommandOutput | FilterLogEventsCommandOutput | GetLogEventsCommandOutput | GetLogGroupFieldsCommandOutput | GetLogRecordCommandOutput | GetQueryResultsCommandOutput | ListTagsLogGroupCommandOutput | PutDestinationCommandOutput | PutDestinationPolicyCommandOutput | PutLogEventsCommandOutput | PutMetricFilterCommandOutput | PutQueryDefinitionCommandOutput | PutResourcePolicyCommandOutput | PutRetentionPolicyCommandOutput | PutSubscriptionFilterCommandOutput | StartQueryCommandOutput | StopQueryCommandOutput | TagLogGroupCommandOutput | TestMetricFilterCommandOutput | UntagLogGroupCommandOutput;
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
export declare type CloudWatchLogsClientConfig = Partial<__SmithyConfiguration<__HttpHandlerOptions>> & ClientDefaults & RegionInputConfig & EndpointsInputConfig & AwsAuthInputConfig & RetryInputConfig & HostHeaderInputConfig & UserAgentInputConfig;
export declare type CloudWatchLogsClientResolvedConfig = __SmithyResolvedConfiguration<__HttpHandlerOptions> & Required<ClientDefaults> & RegionResolvedConfig & EndpointsResolvedConfig & AwsAuthResolvedConfig & RetryResolvedConfig & HostHeaderResolvedConfig & UserAgentResolvedConfig;
/**
 * <p>You can use Amazon CloudWatch Logs to monitor, store, and access your log files from
 *       EC2 instances, AWS CloudTrail, or other sources. You can then retrieve the associated
 *       log data from CloudWatch Logs using the CloudWatch console, CloudWatch Logs commands in the
 *       AWS CLI, CloudWatch Logs API, or CloudWatch Logs SDK.</p>
 *          <p>You can use CloudWatch Logs to:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <b>Monitor logs from EC2 instances in real-time</b>: You
 *           can use CloudWatch Logs to monitor applications and systems using log data. For example,
 *           CloudWatch Logs can track the number of errors that occur in your application logs and
 *           send you a notification whenever the rate of errors exceeds a threshold that you specify.
 *           CloudWatch Logs uses your log data for monitoring so no code changes are required. For
 *           example, you can monitor application logs for specific literal terms (such as
 *           "NullReferenceException") or count the number of occurrences of a literal term at a
 *           particular position in log data (such as "404" status codes in an Apache access log). When
 *           the term you are searching for is found, CloudWatch Logs reports the data to a CloudWatch
 *           metric that you specify.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <b>Monitor AWS CloudTrail logged events</b>: You can
 *           create alarms in CloudWatch and receive notifications of particular API activity as
 *           captured by CloudTrail. You can use the notification to perform troubleshooting.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <b>Archive log data</b>: You can use CloudWatch Logs to
 *           store your log data in highly durable storage. You can change the log retention setting so
 *           that any log events older than this setting are automatically deleted. The CloudWatch Logs
 *           agent makes it easy to quickly send both rotated and non-rotated log data off of a host
 *           and into the log service. You can then access the raw log data when you need it.</p>
 *             </li>
 *          </ul>
 */
export declare class CloudWatchLogsClient extends __Client<__HttpHandlerOptions, ServiceInputTypes, ServiceOutputTypes, CloudWatchLogsClientResolvedConfig> {
    readonly config: CloudWatchLogsClientResolvedConfig;
    constructor(configuration: CloudWatchLogsClientConfig);
    destroy(): void;
}
