import { SmithyException as __SmithyException } from "@aws-sdk/smithy-client";
import { MetadataBearer as $MetadataBearer } from "@aws-sdk/types";

export interface AssociateKmsKeyRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The Amazon Resource Name (ARN) of the CMK to use when encrypting log data. This must be a symmetric CMK.
   *       For more information, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-kms">Amazon Resource Names - AWS Key Management Service (AWS KMS)</a> and <a href="https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html">Using Symmetric and Asymmetric Keys</a>.</p>
   */
  kmsKeyId: string | undefined;
}

export namespace AssociateKmsKeyRequest {
  export const filterSensitiveLog = (obj: AssociateKmsKeyRequest): any => ({
    ...obj,
  });
}

/**
 * <p>A parameter is specified incorrectly.</p>
 */
export interface InvalidParameterException extends __SmithyException, $MetadataBearer {
  name: "InvalidParameterException";
  $fault: "client";
  message?: string;
}

export namespace InvalidParameterException {
  export const filterSensitiveLog = (obj: InvalidParameterException): any => ({
    ...obj,
  });
}

/**
 * <p>Multiple requests to update the same resource were in conflict.</p>
 */
export interface OperationAbortedException extends __SmithyException, $MetadataBearer {
  name: "OperationAbortedException";
  $fault: "client";
  message?: string;
}

export namespace OperationAbortedException {
  export const filterSensitiveLog = (obj: OperationAbortedException): any => ({
    ...obj,
  });
}

/**
 * <p>The specified resource does not exist.</p>
 */
export interface ResourceNotFoundException extends __SmithyException, $MetadataBearer {
  name: "ResourceNotFoundException";
  $fault: "client";
  message?: string;
}

export namespace ResourceNotFoundException {
  export const filterSensitiveLog = (obj: ResourceNotFoundException): any => ({
    ...obj,
  });
}

/**
 * <p>The service cannot complete the request.</p>
 */
export interface ServiceUnavailableException extends __SmithyException, $MetadataBearer {
  name: "ServiceUnavailableException";
  $fault: "server";
  message?: string;
}

export namespace ServiceUnavailableException {
  export const filterSensitiveLog = (obj: ServiceUnavailableException): any => ({
    ...obj,
  });
}

export interface CancelExportTaskRequest {
  /**
   * <p>The ID of the export task.</p>
   */
  taskId: string | undefined;
}

export namespace CancelExportTaskRequest {
  export const filterSensitiveLog = (obj: CancelExportTaskRequest): any => ({
    ...obj,
  });
}

/**
 * <p>The operation is not valid on the specified resource.</p>
 */
export interface InvalidOperationException extends __SmithyException, $MetadataBearer {
  name: "InvalidOperationException";
  $fault: "client";
  message?: string;
}

export namespace InvalidOperationException {
  export const filterSensitiveLog = (obj: InvalidOperationException): any => ({
    ...obj,
  });
}

export interface CreateExportTaskRequest {
  /**
   * <p>The name of the export task.</p>
   */
  taskName?: string;

  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>Export only log streams that match the provided prefix. If you don't
   *       specify a value, no prefix filter is applied.</p>
   */
  logStreamNamePrefix?: string;

  /**
   * <p>The start time of the range for the request, expressed as the number of milliseconds
   *       after Jan 1, 1970 00:00:00 UTC. Events with a timestamp earlier than this time are not
   *       exported.</p>
   */
  from: number | undefined;

  /**
   * <p>The end time of the range for the request, expressed as the number of milliseconds
   *       after Jan 1, 1970 00:00:00 UTC. Events with a timestamp later than this time are not
   *       exported.</p>
   */
  to: number | undefined;

  /**
   * <p>The name of S3 bucket for the exported log data. The bucket must be in the same AWS region.</p>
   */
  destination: string | undefined;

  /**
   * <p>The prefix used as the start of the key for every object exported. If you don't
   *       specify a value, the default is <code>exportedlogs</code>.</p>
   */
  destinationPrefix?: string;
}

export namespace CreateExportTaskRequest {
  export const filterSensitiveLog = (obj: CreateExportTaskRequest): any => ({
    ...obj,
  });
}

export interface CreateExportTaskResponse {
  /**
   * <p>The ID of the export task.</p>
   */
  taskId?: string;
}

export namespace CreateExportTaskResponse {
  export const filterSensitiveLog = (obj: CreateExportTaskResponse): any => ({
    ...obj,
  });
}

/**
 * <p>You have reached the maximum number of resources that can be created.</p>
 */
export interface LimitExceededException extends __SmithyException, $MetadataBearer {
  name: "LimitExceededException";
  $fault: "client";
  message?: string;
}

export namespace LimitExceededException {
  export const filterSensitiveLog = (obj: LimitExceededException): any => ({
    ...obj,
  });
}

/**
 * <p>The specified resource already exists.</p>
 */
export interface ResourceAlreadyExistsException extends __SmithyException, $MetadataBearer {
  name: "ResourceAlreadyExistsException";
  $fault: "client";
  message?: string;
}

export namespace ResourceAlreadyExistsException {
  export const filterSensitiveLog = (obj: ResourceAlreadyExistsException): any => ({
    ...obj,
  });
}

export interface CreateLogGroupRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The Amazon Resource Name (ARN) of the CMK to use when encrypting log data.
   *       For more information, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-kms">Amazon Resource Names - AWS Key Management Service (AWS KMS)</a>.</p>
   */
  kmsKeyId?: string;

  /**
   * <p>The key-value pairs to use for the tags.</p>
   */
  tags?: { [key: string]: string };
}

export namespace CreateLogGroupRequest {
  export const filterSensitiveLog = (obj: CreateLogGroupRequest): any => ({
    ...obj,
  });
}

export interface CreateLogStreamRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The name of the log stream.</p>
   */
  logStreamName: string | undefined;
}

export namespace CreateLogStreamRequest {
  export const filterSensitiveLog = (obj: CreateLogStreamRequest): any => ({
    ...obj,
  });
}

/**
 * <p>The event was already logged.</p>
 */
export interface DataAlreadyAcceptedException extends __SmithyException, $MetadataBearer {
  name: "DataAlreadyAcceptedException";
  $fault: "client";
  expectedSequenceToken?: string;
  message?: string;
}

export namespace DataAlreadyAcceptedException {
  export const filterSensitiveLog = (obj: DataAlreadyAcceptedException): any => ({
    ...obj,
  });
}

export interface DeleteDestinationRequest {
  /**
   * <p>The name of the destination.</p>
   */
  destinationName: string | undefined;
}

export namespace DeleteDestinationRequest {
  export const filterSensitiveLog = (obj: DeleteDestinationRequest): any => ({
    ...obj,
  });
}

export interface DeleteLogGroupRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;
}

export namespace DeleteLogGroupRequest {
  export const filterSensitiveLog = (obj: DeleteLogGroupRequest): any => ({
    ...obj,
  });
}

export interface DeleteLogStreamRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The name of the log stream.</p>
   */
  logStreamName: string | undefined;
}

export namespace DeleteLogStreamRequest {
  export const filterSensitiveLog = (obj: DeleteLogStreamRequest): any => ({
    ...obj,
  });
}

export interface DeleteMetricFilterRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The name of the metric filter.</p>
   */
  filterName: string | undefined;
}

export namespace DeleteMetricFilterRequest {
  export const filterSensitiveLog = (obj: DeleteMetricFilterRequest): any => ({
    ...obj,
  });
}

export interface DeleteQueryDefinitionRequest {
  /**
   * <p>The ID of the query definition that you want to delete. You can use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_DescribeQueryDefinitions.html">DescribeQueryDefinitions</a> to retrieve the
   *       IDs of your saved query definitions.</p>
   */
  queryDefinitionId: string | undefined;
}

export namespace DeleteQueryDefinitionRequest {
  export const filterSensitiveLog = (obj: DeleteQueryDefinitionRequest): any => ({
    ...obj,
  });
}

export interface DeleteQueryDefinitionResponse {
  /**
   * <p>A value of TRUE indicates that the operation succeeded. FALSE indicates that the operation
   *       failed.</p>
   */
  success?: boolean;
}

export namespace DeleteQueryDefinitionResponse {
  export const filterSensitiveLog = (obj: DeleteQueryDefinitionResponse): any => ({
    ...obj,
  });
}

export interface DeleteResourcePolicyRequest {
  /**
   * <p>The name of the policy to be revoked. This parameter is required.</p>
   */
  policyName?: string;
}

export namespace DeleteResourcePolicyRequest {
  export const filterSensitiveLog = (obj: DeleteResourcePolicyRequest): any => ({
    ...obj,
  });
}

export interface DeleteRetentionPolicyRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;
}

export namespace DeleteRetentionPolicyRequest {
  export const filterSensitiveLog = (obj: DeleteRetentionPolicyRequest): any => ({
    ...obj,
  });
}

export interface DeleteSubscriptionFilterRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The name of the subscription filter.</p>
   */
  filterName: string | undefined;
}

export namespace DeleteSubscriptionFilterRequest {
  export const filterSensitiveLog = (obj: DeleteSubscriptionFilterRequest): any => ({
    ...obj,
  });
}

export interface DescribeDestinationsRequest {
  /**
   * <p>The prefix to match. If you don't specify a value, no prefix filter is applied.</p>
   */
  DestinationNamePrefix?: string;

  /**
   * <p>The token for the next set of items to return. (You received this token from a previous call.)</p>
   */
  nextToken?: string;

  /**
   * <p>The maximum number of items returned. If you don't specify a value, the default is up to 50 items.</p>
   */
  limit?: number;
}

export namespace DescribeDestinationsRequest {
  export const filterSensitiveLog = (obj: DescribeDestinationsRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Represents a cross-account destination that receives subscription log events.</p>
 */
export interface Destination {
  /**
   * <p>The name of the destination.</p>
   */
  destinationName?: string;

  /**
   * <p>The Amazon Resource Name (ARN) of the physical target where the log events are
   *       delivered (for example, a Kinesis stream).</p>
   */
  targetArn?: string;

  /**
   * <p>A role for impersonation, used when delivering log events to the target.</p>
   */
  roleArn?: string;

  /**
   * <p>An IAM policy document that governs which AWS accounts can create subscription filters
   *       against this destination.</p>
   */
  accessPolicy?: string;

  /**
   * <p>The ARN of this destination.</p>
   */
  arn?: string;

  /**
   * <p>The creation time of the destination, expressed as the number of milliseconds after Jan
   *       1, 1970 00:00:00 UTC.</p>
   */
  creationTime?: number;
}

export namespace Destination {
  export const filterSensitiveLog = (obj: Destination): any => ({
    ...obj,
  });
}

export interface DescribeDestinationsResponse {
  /**
   * <p>The destinations.</p>
   */
  destinations?: Destination[];

  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace DescribeDestinationsResponse {
  export const filterSensitiveLog = (obj: DescribeDestinationsResponse): any => ({
    ...obj,
  });
}

export enum ExportTaskStatusCode {
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  PENDING = "PENDING",
  PENDING_CANCEL = "PENDING_CANCEL",
  RUNNING = "RUNNING",
}

export interface DescribeExportTasksRequest {
  /**
   * <p>The ID of the export task. Specifying a task ID filters the results to zero or one export tasks.</p>
   */
  taskId?: string;

  /**
   * <p>The status code of the export task. Specifying a status code filters the results to zero or more export tasks.</p>
   */
  statusCode?: ExportTaskStatusCode | string;

  /**
   * <p>The token for the next set of items to return. (You received this token from a previous call.)</p>
   */
  nextToken?: string;

  /**
   * <p>The maximum number of items returned. If you don't specify a value, the default is up to 50 items.</p>
   */
  limit?: number;
}

export namespace DescribeExportTasksRequest {
  export const filterSensitiveLog = (obj: DescribeExportTasksRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the status of an export task.</p>
 */
export interface ExportTaskExecutionInfo {
  /**
   * <p>The creation time of the export task, expressed as the number of milliseconds after Jan
   *       1, 1970 00:00:00 UTC.</p>
   */
  creationTime?: number;

  /**
   * <p>The completion time of the export task, expressed as the number of milliseconds after
   *       Jan 1, 1970 00:00:00 UTC.</p>
   */
  completionTime?: number;
}

export namespace ExportTaskExecutionInfo {
  export const filterSensitiveLog = (obj: ExportTaskExecutionInfo): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the status of an export task.</p>
 */
export interface ExportTaskStatus {
  /**
   * <p>The status code of the export task.</p>
   */
  code?: ExportTaskStatusCode | string;

  /**
   * <p>The status message related to the status code.</p>
   */
  message?: string;
}

export namespace ExportTaskStatus {
  export const filterSensitiveLog = (obj: ExportTaskStatus): any => ({
    ...obj,
  });
}

/**
 * <p>Represents an export task.</p>
 */
export interface ExportTask {
  /**
   * <p>The ID of the export task.</p>
   */
  taskId?: string;

  /**
   * <p>The name of the export task.</p>
   */
  taskName?: string;

  /**
   * <p>The name of the log group from which logs data was exported.</p>
   */
  logGroupName?: string;

  /**
   * <p>The start time, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.
   *       Events with a timestamp before this time are not exported.</p>
   */
  from?: number;

  /**
   * <p>The end time, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.
   *       Events with a timestamp later than this time are not exported.</p>
   */
  to?: number;

  /**
   * <p>The name of the S3 bucket to which the log data was exported.</p>
   */
  destination?: string;

  /**
   * <p>The prefix that was used as the start of Amazon S3 key for every object exported.</p>
   */
  destinationPrefix?: string;

  /**
   * <p>The status of the export task.</p>
   */
  status?: ExportTaskStatus;

  /**
   * <p>Execution information about the export task.</p>
   */
  executionInfo?: ExportTaskExecutionInfo;
}

export namespace ExportTask {
  export const filterSensitiveLog = (obj: ExportTask): any => ({
    ...obj,
  });
}

export interface DescribeExportTasksResponse {
  /**
   * <p>The export tasks.</p>
   */
  exportTasks?: ExportTask[];

  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace DescribeExportTasksResponse {
  export const filterSensitiveLog = (obj: DescribeExportTasksResponse): any => ({
    ...obj,
  });
}

export interface DescribeLogGroupsRequest {
  /**
   * <p>The prefix to match.</p>
   */
  logGroupNamePrefix?: string;

  /**
   * <p>The token for the next set of items to return. (You received this token from a previous call.)</p>
   */
  nextToken?: string;

  /**
   * <p>The maximum number of items returned. If you don't specify a value, the default is up to 50 items.</p>
   */
  limit?: number;
}

export namespace DescribeLogGroupsRequest {
  export const filterSensitiveLog = (obj: DescribeLogGroupsRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Represents a log group.</p>
 */
export interface LogGroup {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName?: string;

  /**
   * <p>The creation time of the log group, expressed as the number of milliseconds after Jan
   *       1, 1970 00:00:00 UTC.</p>
   */
  creationTime?: number;

  /**
   * <p>The number of days to retain the log events in the specified log group.
   *       Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, and 3653.</p>
   *          <p>If you omit <code>retentionInDays</code> in a <code>PutRetentionPolicy</code> operation,
   *   the events in the log group are always retained and never expire.</p>
   */
  retentionInDays?: number;

  /**
   * <p>The number of metric filters.</p>
   */
  metricFilterCount?: number;

  /**
   * <p>The Amazon Resource Name (ARN) of the log group.</p>
   */
  arn?: string;

  /**
   * <p>The number of bytes stored.</p>
   */
  storedBytes?: number;

  /**
   * <p>The Amazon Resource Name (ARN) of the CMK to use when encrypting log data.</p>
   */
  kmsKeyId?: string;
}

export namespace LogGroup {
  export const filterSensitiveLog = (obj: LogGroup): any => ({
    ...obj,
  });
}

export interface DescribeLogGroupsResponse {
  /**
   * <p>The log groups.</p>
   *          <p>If the <code>retentionInDays</code> value if not included for a log group, then that log group
   *     is set to have its events never expire.</p>
   */
  logGroups?: LogGroup[];

  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace DescribeLogGroupsResponse {
  export const filterSensitiveLog = (obj: DescribeLogGroupsResponse): any => ({
    ...obj,
  });
}

export enum OrderBy {
  LastEventTime = "LastEventTime",
  LogStreamName = "LogStreamName",
}

export interface DescribeLogStreamsRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The prefix to match.</p>
   *          <p>If <code>orderBy</code> is <code>LastEventTime</code>, you cannot specify this
   *       parameter.</p>
   */
  logStreamNamePrefix?: string;

  /**
   * <p>If the value is <code>LogStreamName</code>, the results are ordered by log stream name.
   *       If the value is <code>LastEventTime</code>, the results are ordered by the event time.
   *       The default value is <code>LogStreamName</code>.</p>
   *          <p>If you order the results by event time, you cannot specify the <code>logStreamNamePrefix</code> parameter.</p>
   *          <p>
   *             <code>lastEventTimeStamp</code> represents the time of the most recent log event in the
   *       log stream in CloudWatch Logs. This number is expressed as the number of milliseconds after
   *       Jan 1, 1970 00:00:00 UTC. <code>lastEventTimeStamp</code> updates on an eventual consistency
   *       basis. It typically updates in less than an hour from ingestion, but in rare situations might
   *       take longer.</p>
   */
  orderBy?: OrderBy | string;

  /**
   * <p>If the value is true, results are returned in descending order.
   *       If the value is to false, results are returned in ascending order.
   *       The default value is false.</p>
   */
  descending?: boolean;

  /**
   * <p>The token for the next set of items to return. (You received this token from a previous call.)</p>
   */
  nextToken?: string;

  /**
   * <p>The maximum number of items returned. If you don't specify a value, the default is up to 50 items.</p>
   */
  limit?: number;
}

export namespace DescribeLogStreamsRequest {
  export const filterSensitiveLog = (obj: DescribeLogStreamsRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Represents a log stream, which is a sequence of log events from
 *       a single emitter of logs.</p>
 */
export interface LogStream {
  /**
   * <p>The name of the log stream.</p>
   */
  logStreamName?: string;

  /**
   * <p>The creation time of the stream, expressed as the number of milliseconds after Jan 1,
   *       1970 00:00:00 UTC.</p>
   */
  creationTime?: number;

  /**
   * <p>The time of the first event, expressed as the number of milliseconds after Jan 1, 1970
   *       00:00:00 UTC.</p>
   */
  firstEventTimestamp?: number;

  /**
   * <p>The time of the most recent log event in the log stream in CloudWatch Logs. This number
   *       is expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC. The
   *         <code>lastEventTime</code> value updates on an eventual consistency basis. It typically
   *       updates in less than an hour from ingestion, but in rare situations might take
   *       longer.</p>
   */
  lastEventTimestamp?: number;

  /**
   * <p>The ingestion time, expressed as the number of milliseconds after Jan 1, 1970 00:00:00
   *       UTC.</p>
   */
  lastIngestionTime?: number;

  /**
   * <p>The sequence token.</p>
   */
  uploadSequenceToken?: string;

  /**
   * <p>The Amazon Resource Name (ARN) of the log stream.</p>
   */
  arn?: string;

  /**
   * @deprecated
   *
   * <p>The number of bytes stored.</p>
   *          <p>
   *             <b>Important:</b> On June 17, 2019, this parameter was
   *       deprecated for log streams, and is always reported as zero. This change applies only to log
   *       streams. The <code>storedBytes</code> parameter for log groups is not affected.</p>
   */
  storedBytes?: number;
}

export namespace LogStream {
  export const filterSensitiveLog = (obj: LogStream): any => ({
    ...obj,
  });
}

export interface DescribeLogStreamsResponse {
  /**
   * <p>The log streams.</p>
   */
  logStreams?: LogStream[];

  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace DescribeLogStreamsResponse {
  export const filterSensitiveLog = (obj: DescribeLogStreamsResponse): any => ({
    ...obj,
  });
}

export interface DescribeMetricFiltersRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName?: string;

  /**
   * <p>The prefix to match. CloudWatch Logs uses the value you set here
   *     only if you also include the <code>logGroupName</code> parameter in your request.</p>
   */
  filterNamePrefix?: string;

  /**
   * <p>The token for the next set of items to return. (You received this token from a previous call.)</p>
   */
  nextToken?: string;

  /**
   * <p>The maximum number of items returned. If you don't specify a value, the default is up to 50 items.</p>
   */
  limit?: number;

  /**
   * <p>Filters results to include only those with the specified metric name. If you include this parameter in your request, you
   *     must also include the <code>metricNamespace</code> parameter.</p>
   */
  metricName?: string;

  /**
   * <p>Filters results to include only those in the specified namespace. If you include this parameter in your request, you
   *     must also include the <code>metricName</code> parameter.</p>
   */
  metricNamespace?: string;
}

export namespace DescribeMetricFiltersRequest {
  export const filterSensitiveLog = (obj: DescribeMetricFiltersRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Indicates how to transform ingested log events to metric data in a CloudWatch
 *       metric.</p>
 */
export interface MetricTransformation {
  /**
   * <p>The name of the CloudWatch metric.</p>
   */
  metricName: string | undefined;

  /**
   * <p>A custom namespace to contain your metric in CloudWatch. Use namespaces to group together metrics
   *       that are similar. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Namespace">Namespaces</a>.</p>
   */
  metricNamespace: string | undefined;

  /**
   * <p>The value to publish to the CloudWatch metric when a filter pattern matches a log event.</p>
   */
  metricValue: string | undefined;

  /**
   * <p>(Optional) The value to emit when a filter pattern does not match a log event.
   *       This value can be null.</p>
   */
  defaultValue?: number;
}

export namespace MetricTransformation {
  export const filterSensitiveLog = (obj: MetricTransformation): any => ({
    ...obj,
  });
}

/**
 * <p>Metric filters express how CloudWatch Logs would extract metric observations
 *       from ingested log events and transform them into metric data in a CloudWatch metric.</p>
 */
export interface MetricFilter {
  /**
   * <p>The name of the metric filter.</p>
   */
  filterName?: string;

  /**
   * <p>A symbolic description of how CloudWatch Logs should interpret the data in each log
   *       event. For example, a log event can contain timestamps, IP addresses, strings, and so on. You
   *       use the filter pattern to specify what to look for in the log event message.</p>
   */
  filterPattern?: string;

  /**
   * <p>The metric transformations.</p>
   */
  metricTransformations?: MetricTransformation[];

  /**
   * <p>The creation time of the metric filter, expressed as the number of milliseconds after
   *       Jan 1, 1970 00:00:00 UTC.</p>
   */
  creationTime?: number;

  /**
   * <p>The name of the log group.</p>
   */
  logGroupName?: string;
}

export namespace MetricFilter {
  export const filterSensitiveLog = (obj: MetricFilter): any => ({
    ...obj,
  });
}

export interface DescribeMetricFiltersResponse {
  /**
   * <p>The metric filters.</p>
   */
  metricFilters?: MetricFilter[];

  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace DescribeMetricFiltersResponse {
  export const filterSensitiveLog = (obj: DescribeMetricFiltersResponse): any => ({
    ...obj,
  });
}

export enum QueryStatus {
  Cancelled = "Cancelled",
  Complete = "Complete",
  Failed = "Failed",
  Running = "Running",
  Scheduled = "Scheduled",
}

export interface DescribeQueriesRequest {
  /**
   * <p>Limits the returned queries to only those for the specified log group.</p>
   */
  logGroupName?: string;

  /**
   * <p>Limits the returned queries to only those that have the specified status. Valid values are <code>Cancelled</code>,
   *       <code>Complete</code>, <code>Failed</code>, <code>Running</code>, and <code>Scheduled</code>.</p>
   */
  status?: QueryStatus | string;

  /**
   * <p>Limits the number of returned queries to the specified number.</p>
   */
  maxResults?: number;

  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace DescribeQueriesRequest {
  export const filterSensitiveLog = (obj: DescribeQueriesRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Information about one CloudWatch Logs Insights query that matches the request in a <code>DescribeQueries</code> operation. </p>
 */
export interface QueryInfo {
  /**
   * <p>The unique ID number of this query.</p>
   */
  queryId?: string;

  /**
   * <p>The query string used in this query.</p>
   */
  queryString?: string;

  /**
   * <p>The status of this query. Possible values are <code>Cancelled</code>,
   *       <code>Complete</code>, <code>Failed</code>, <code>Running</code>, <code>Scheduled</code>, and <code>Unknown</code>.</p>
   */
  status?: QueryStatus | string;

  /**
   * <p>The date and time that this query was created.</p>
   */
  createTime?: number;

  /**
   * <p>The name of the log group scanned by this query.</p>
   */
  logGroupName?: string;
}

export namespace QueryInfo {
  export const filterSensitiveLog = (obj: QueryInfo): any => ({
    ...obj,
  });
}

export interface DescribeQueriesResponse {
  /**
   * <p>The list of queries that match the request.</p>
   */
  queries?: QueryInfo[];

  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace DescribeQueriesResponse {
  export const filterSensitiveLog = (obj: DescribeQueriesResponse): any => ({
    ...obj,
  });
}

export interface DescribeQueryDefinitionsRequest {
  /**
   * <p>Use this parameter to filter your results to only the query definitions that have names that start with the prefix you specify.</p>
   */
  queryDefinitionNamePrefix?: string;

  /**
   * <p>Limits the number of returned query definitions to the specified number.</p>
   */
  maxResults?: number;

  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace DescribeQueryDefinitionsRequest {
  export const filterSensitiveLog = (obj: DescribeQueryDefinitionsRequest): any => ({
    ...obj,
  });
}

/**
 * <p>This structure contains details about a saved CloudWatch Logs Insights query definition.</p>
 */
export interface QueryDefinition {
  /**
   * <p>The unique ID of the query definition.</p>
   */
  queryDefinitionId?: string;

  /**
   * <p>The name of the query definition.</p>
   */
  name?: string;

  /**
   * <p>The query string to use for this definition.
   *       For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html">CloudWatch Logs Insights Query Syntax</a>.</p>
   */
  queryString?: string;

  /**
   * <p>The date that the query definition was most recently modified.</p>
   */
  lastModified?: number;

  /**
   * <p>If this query definition contains a list of log groups that it is limited to, that list appears here.</p>
   */
  logGroupNames?: string[];
}

export namespace QueryDefinition {
  export const filterSensitiveLog = (obj: QueryDefinition): any => ({
    ...obj,
  });
}

export interface DescribeQueryDefinitionsResponse {
  /**
   * <p>The list of query definitions that match your request.</p>
   */
  queryDefinitions?: QueryDefinition[];

  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace DescribeQueryDefinitionsResponse {
  export const filterSensitiveLog = (obj: DescribeQueryDefinitionsResponse): any => ({
    ...obj,
  });
}

export interface DescribeResourcePoliciesRequest {
  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;

  /**
   * <p>The maximum number of resource policies to be displayed with one call of this API.</p>
   */
  limit?: number;
}

export namespace DescribeResourcePoliciesRequest {
  export const filterSensitiveLog = (obj: DescribeResourcePoliciesRequest): any => ({
    ...obj,
  });
}

/**
 * <p>A policy enabling one or more entities to put logs to a log group in this account.</p>
 */
export interface ResourcePolicy {
  /**
   * <p>The name of the resource policy.</p>
   */
  policyName?: string;

  /**
   * <p>The details of the policy.</p>
   */
  policyDocument?: string;

  /**
   * <p>Timestamp showing when this policy was last updated, expressed as the number of
   *       milliseconds after Jan 1, 1970 00:00:00 UTC.</p>
   */
  lastUpdatedTime?: number;
}

export namespace ResourcePolicy {
  export const filterSensitiveLog = (obj: ResourcePolicy): any => ({
    ...obj,
  });
}

export interface DescribeResourcePoliciesResponse {
  /**
   * <p>The resource policies that exist in this account.</p>
   */
  resourcePolicies?: ResourcePolicy[];

  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace DescribeResourcePoliciesResponse {
  export const filterSensitiveLog = (obj: DescribeResourcePoliciesResponse): any => ({
    ...obj,
  });
}

export interface DescribeSubscriptionFiltersRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The prefix to match. If you don't specify a value, no prefix filter is applied.</p>
   */
  filterNamePrefix?: string;

  /**
   * <p>The token for the next set of items to return. (You received this token from a previous call.)</p>
   */
  nextToken?: string;

  /**
   * <p>The maximum number of items returned. If you don't specify a value, the default is up to 50 items.</p>
   */
  limit?: number;
}

export namespace DescribeSubscriptionFiltersRequest {
  export const filterSensitiveLog = (obj: DescribeSubscriptionFiltersRequest): any => ({
    ...obj,
  });
}

export enum Distribution {
  ByLogStream = "ByLogStream",
  Random = "Random",
}

/**
 * <p>Represents a subscription filter.</p>
 */
export interface SubscriptionFilter {
  /**
   * <p>The name of the subscription filter.</p>
   */
  filterName?: string;

  /**
   * <p>The name of the log group.</p>
   */
  logGroupName?: string;

  /**
   * <p>A symbolic description of how CloudWatch Logs should interpret the data in each log
   *       event. For example, a log event can contain timestamps, IP addresses, strings, and so on. You
   *       use the filter pattern to specify what to look for in the log event message.</p>
   */
  filterPattern?: string;

  /**
   * <p>The Amazon Resource Name (ARN) of the destination.</p>
   */
  destinationArn?: string;

  /**
   * <p></p>
   */
  roleArn?: string;

  /**
   * <p>The method used to distribute log data to the destination, which can be either
   *       random or grouped by log stream.</p>
   */
  distribution?: Distribution | string;

  /**
   * <p>The creation time of the subscription filter, expressed as the number of milliseconds
   *       after Jan 1, 1970 00:00:00 UTC.</p>
   */
  creationTime?: number;
}

export namespace SubscriptionFilter {
  export const filterSensitiveLog = (obj: SubscriptionFilter): any => ({
    ...obj,
  });
}

export interface DescribeSubscriptionFiltersResponse {
  /**
   * <p>The subscription filters.</p>
   */
  subscriptionFilters?: SubscriptionFilter[];

  /**
   * <p>The token for the next set of items to return. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace DescribeSubscriptionFiltersResponse {
  export const filterSensitiveLog = (obj: DescribeSubscriptionFiltersResponse): any => ({
    ...obj,
  });
}

export interface DisassociateKmsKeyRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;
}

export namespace DisassociateKmsKeyRequest {
  export const filterSensitiveLog = (obj: DisassociateKmsKeyRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Represents a matched event.</p>
 */
export interface FilteredLogEvent {
  /**
   * <p>The name of the log stream to which this event belongs.</p>
   */
  logStreamName?: string;

  /**
   * <p>The time the event occurred, expressed as the number of milliseconds after Jan 1, 1970
   *       00:00:00 UTC.</p>
   */
  timestamp?: number;

  /**
   * <p>The data contained in the log event.</p>
   */
  message?: string;

  /**
   * <p>The time the event was ingested, expressed as the number of milliseconds after Jan 1,
   *       1970 00:00:00 UTC.</p>
   */
  ingestionTime?: number;

  /**
   * <p>The ID of the event.</p>
   */
  eventId?: string;
}

export namespace FilteredLogEvent {
  export const filterSensitiveLog = (obj: FilteredLogEvent): any => ({
    ...obj,
  });
}

export interface FilterLogEventsRequest {
  /**
   * <p>The name of the log group to search.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>Filters the results to only logs from the log streams in this list.</p>
   *          <p>If you specify a value for both <code>logStreamNamePrefix</code> and <code>logStreamNames</code>, the action
   *       returns an <code>InvalidParameterException</code> error.</p>
   */
  logStreamNames?: string[];

  /**
   * <p>Filters the results to include only events from log streams that have names starting with this prefix.</p>
   *          <p>If you specify a value for both <code>logStreamNamePrefix</code> and <code>logStreamNames</code>, but the value for
   *       <code>logStreamNamePrefix</code> does not match any log stream names specified in <code>logStreamNames</code>, the action
   *     returns an <code>InvalidParameterException</code> error.</p>
   */
  logStreamNamePrefix?: string;

  /**
   * <p>The start of the time range, expressed as the number of milliseconds after Jan 1, 1970
   *       00:00:00 UTC. Events with a timestamp before this time are not returned.</p>
   *          <p>If you omit <code>startTime</code> and <code>endTime</code> the most recent log events
   *     are retrieved, to up 1 MB or 10,000 log events.</p>
   */
  startTime?: number;

  /**
   * <p>The end of the time range, expressed as the number of milliseconds after Jan 1, 1970
   *       00:00:00 UTC. Events with a timestamp later than this time are not returned.</p>
   */
  endTime?: number;

  /**
   * <p>The filter pattern to use. For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html">Filter and Pattern Syntax</a>.</p>
   *          <p>If not provided, all the events are matched.</p>
   */
  filterPattern?: string;

  /**
   * <p>The token for the next set of events to return. (You received this token from a previous call.)</p>
   */
  nextToken?: string;

  /**
   * <p>The maximum number of events to return. The default is 10,000 events.</p>
   */
  limit?: number;

  /**
   * @deprecated
   *
   * <p>If the value is true, the operation makes a best effort to provide responses that
   *       contain events from multiple log streams within the log group, interleaved in a single
   *       response. If the value is false, all the matched log events in the first log stream are
   *       searched first, then those in the next log stream, and so on. The default is false.</p>
   *          <p>
   *             <b>Important:</b> Starting on June 17, 2019, this parameter
   *       is ignored and the value is assumed to be true. The response from this operation always
   *       interleaves events from multiple log streams within a log group.</p>
   */
  interleaved?: boolean;
}

export namespace FilterLogEventsRequest {
  export const filterSensitiveLog = (obj: FilterLogEventsRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the search status of a log stream.</p>
 */
export interface SearchedLogStream {
  /**
   * <p>The name of the log stream.</p>
   */
  logStreamName?: string;

  /**
   * <p>Indicates whether all the events in this log stream were searched.</p>
   */
  searchedCompletely?: boolean;
}

export namespace SearchedLogStream {
  export const filterSensitiveLog = (obj: SearchedLogStream): any => ({
    ...obj,
  });
}

export interface FilterLogEventsResponse {
  /**
   * <p>The matched events.</p>
   */
  events?: FilteredLogEvent[];

  /**
   * <p>
   *             <b>IMPORTANT</b> Starting on May 15, 2020,
   *     this parameter will be deprecated. This parameter will be an empty list
   *     after the deprecation occurs.</p>
   *          <p>Indicates which log streams have been searched and whether each has been searched completely.</p>
   */
  searchedLogStreams?: SearchedLogStream[];

  /**
   * <p>The token to use when requesting the next set of items. The token expires after 24 hours.</p>
   */
  nextToken?: string;
}

export namespace FilterLogEventsResponse {
  export const filterSensitiveLog = (obj: FilterLogEventsResponse): any => ({
    ...obj,
  });
}

export interface GetLogEventsRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The name of the log stream.</p>
   */
  logStreamName: string | undefined;

  /**
   * <p>The start of the time range, expressed as the number of milliseconds after Jan 1, 1970
   *       00:00:00 UTC. Events with a timestamp equal to this time or later than this time are included.
   *       Events with a timestamp earlier than this time are not included.</p>
   */
  startTime?: number;

  /**
   * <p>The end of the time range, expressed as the number of milliseconds after Jan 1, 1970
   *       00:00:00 UTC. Events with a timestamp equal to or later than this time are not
   *       included.</p>
   */
  endTime?: number;

  /**
   * <p>The token for the next set of items to return. (You received this token from a previous call.)</p>
   *          <p>Using this token works only when you specify <code>true</code> for <code>startFromHead</code>.</p>
   */
  nextToken?: string;

  /**
   * <p>The maximum number of log events returned. If you don't specify a value, the maximum is
   *       as many log events as can fit in a response size of 1 MB, up to 10,000 log events.</p>
   */
  limit?: number;

  /**
   * <p>If the value is true, the earliest log events are returned first.
   *       If the value is false, the latest log events are returned first.
   *       The default value is false.</p>
   *          <p>If you are using <code>nextToken</code> in this operation, you must specify <code>true</code> for <code>startFromHead</code>.</p>
   */
  startFromHead?: boolean;
}

export namespace GetLogEventsRequest {
  export const filterSensitiveLog = (obj: GetLogEventsRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Represents a log event.</p>
 */
export interface OutputLogEvent {
  /**
   * <p>The time the event occurred, expressed as the number of milliseconds after Jan 1, 1970
   *       00:00:00 UTC.</p>
   */
  timestamp?: number;

  /**
   * <p>The data contained in the log event.</p>
   */
  message?: string;

  /**
   * <p>The time the event was ingested, expressed as the number of milliseconds after Jan 1,
   *       1970 00:00:00 UTC.</p>
   */
  ingestionTime?: number;
}

export namespace OutputLogEvent {
  export const filterSensitiveLog = (obj: OutputLogEvent): any => ({
    ...obj,
  });
}

export interface GetLogEventsResponse {
  /**
   * <p>The events.</p>
   */
  events?: OutputLogEvent[];

  /**
   * <p>The token for the next set of items in the forward direction. The token expires after
   *       24 hours. If you have reached the end of the stream, it returns the same token you passed
   *       in.</p>
   */
  nextForwardToken?: string;

  /**
   * <p>The token for the next set of items in the backward direction. The token expires after
   *       24 hours. This token is never null. If you have reached the end of the stream, it returns the
   *       same token you passed in.</p>
   */
  nextBackwardToken?: string;
}

export namespace GetLogEventsResponse {
  export const filterSensitiveLog = (obj: GetLogEventsResponse): any => ({
    ...obj,
  });
}

export interface GetLogGroupFieldsRequest {
  /**
   * <p>The name of the log group to search.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The time to set as the center of the query. If you specify <code>time</code>, the 8
   *       minutes before and 8 minutes after this time are searched. If you omit <code>time</code>, the
   *       past 15 minutes are queried.</p>
   *          <p>The <code>time</code> value is specified as epoch time, the number of seconds since
   *       January 1, 1970, 00:00:00 UTC.</p>
   */
  time?: number;
}

export namespace GetLogGroupFieldsRequest {
  export const filterSensitiveLog = (obj: GetLogGroupFieldsRequest): any => ({
    ...obj,
  });
}

/**
 * <p>The fields contained in log events found by a <code>GetLogGroupFields</code> operation,
 *       along with the percentage of queried log events in which each field appears.</p>
 */
export interface LogGroupField {
  /**
   * <p>The name of a log field.</p>
   */
  name?: string;

  /**
   * <p>The percentage of log events queried that contained the field.</p>
   */
  percent?: number;
}

export namespace LogGroupField {
  export const filterSensitiveLog = (obj: LogGroupField): any => ({
    ...obj,
  });
}

export interface GetLogGroupFieldsResponse {
  /**
   * <p>The array of fields found in the query. Each object in the array contains the name of the field, along with the
   *     percentage of time it appeared in the log events that were queried.</p>
   */
  logGroupFields?: LogGroupField[];
}

export namespace GetLogGroupFieldsResponse {
  export const filterSensitiveLog = (obj: GetLogGroupFieldsResponse): any => ({
    ...obj,
  });
}

export interface GetLogRecordRequest {
  /**
   * <p>The pointer corresponding to the log event record you want to retrieve. You get this from
   *       the response of a <code>GetQueryResults</code> operation. In that response, the value of the
   *         <code>@ptr</code> field for a log event is the value to use as <code>logRecordPointer</code>
   *       to retrieve that complete log event record.</p>
   */
  logRecordPointer: string | undefined;
}

export namespace GetLogRecordRequest {
  export const filterSensitiveLog = (obj: GetLogRecordRequest): any => ({
    ...obj,
  });
}

export interface GetLogRecordResponse {
  /**
   * <p>The requested log event, as a JSON string.</p>
   */
  logRecord?: { [key: string]: string };
}

export namespace GetLogRecordResponse {
  export const filterSensitiveLog = (obj: GetLogRecordResponse): any => ({
    ...obj,
  });
}

export interface GetQueryResultsRequest {
  /**
   * <p>The ID number of the query.</p>
   */
  queryId: string | undefined;
}

export namespace GetQueryResultsRequest {
  export const filterSensitiveLog = (obj: GetQueryResultsRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Contains one field from one log event returned by a CloudWatch Logs Insights query, along with the value of that field.</p>
 *          <p>For more information about the fields that are
 *       generated by CloudWatch logs, see
 *       <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_AnalyzeLogData-discoverable-fields.html">Supported Logs and Discovered Fields</a>.</p>
 */
export interface ResultField {
  /**
   * <p>The log event field.</p>
   */
  field?: string;

  /**
   * <p>The value of this field.</p>
   */
  value?: string;
}

export namespace ResultField {
  export const filterSensitiveLog = (obj: ResultField): any => ({
    ...obj,
  });
}

/**
 * <p>Contains the number of log events scanned by the query, the number of log events that matched the
 *       query criteria, and the total number of bytes in the log events that were scanned.</p>
 */
export interface QueryStatistics {
  /**
   * <p>The number of log events that matched the query string.</p>
   */
  recordsMatched?: number;

  /**
   * <p>The total number of log events scanned during the query.</p>
   */
  recordsScanned?: number;

  /**
   * <p>The total number of bytes in the log events scanned during the query.</p>
   */
  bytesScanned?: number;
}

export namespace QueryStatistics {
  export const filterSensitiveLog = (obj: QueryStatistics): any => ({
    ...obj,
  });
}

export interface GetQueryResultsResponse {
  /**
   * <p>The log events that matched the query criteria during the most recent time it ran.</p>
   *          <p>The <code>results</code> value is an array of arrays. Each log event is one object in the
   *       top-level array. Each of these log event objects is an array of
   *         <code>field</code>/<code>value</code> pairs.</p>
   */
  results?: ResultField[][];

  /**
   * <p>Includes the number of log events scanned by the query, the number of log events that matched the
   *     query criteria, and the total number of bytes in the log events that were scanned. These values
   *     reflect the full raw results of the query.</p>
   */
  statistics?: QueryStatistics;

  /**
   * <p>The status of the most recent running of the query. Possible values are <code>Cancelled</code>,
   *       <code>Complete</code>, <code>Failed</code>, <code>Running</code>, <code>Scheduled</code>,
   *       <code>Timeout</code>, and <code>Unknown</code>.</p>
   *          <p>Queries time out after 15 minutes of execution. To avoid having your queries time out,
   *       reduce the time range being searched or partition your query into a number of queries.</p>
   */
  status?: QueryStatus | string;
}

export namespace GetQueryResultsResponse {
  export const filterSensitiveLog = (obj: GetQueryResultsResponse): any => ({
    ...obj,
  });
}

/**
 * <p>Represents a log event, which is a record of activity that was recorded
 *       by the application or resource being monitored.</p>
 */
export interface InputLogEvent {
  /**
   * <p>The time the event occurred, expressed as the number of milliseconds after Jan 1, 1970
   *       00:00:00 UTC.</p>
   */
  timestamp: number | undefined;

  /**
   * <p>The raw event message.</p>
   */
  message: string | undefined;
}

export namespace InputLogEvent {
  export const filterSensitiveLog = (obj: InputLogEvent): any => ({
    ...obj,
  });
}

/**
 * <p>The sequence token is not valid. You can get the correct sequence token in
 *       the <code>expectedSequenceToken</code> field in the <code>InvalidSequenceTokenException</code>
 *     message. </p>
 */
export interface InvalidSequenceTokenException extends __SmithyException, $MetadataBearer {
  name: "InvalidSequenceTokenException";
  $fault: "client";
  expectedSequenceToken?: string;
  message?: string;
}

export namespace InvalidSequenceTokenException {
  export const filterSensitiveLog = (obj: InvalidSequenceTokenException): any => ({
    ...obj,
  });
}

export interface ListTagsLogGroupRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;
}

export namespace ListTagsLogGroupRequest {
  export const filterSensitiveLog = (obj: ListTagsLogGroupRequest): any => ({
    ...obj,
  });
}

export interface ListTagsLogGroupResponse {
  /**
   * <p>The tags for the log group.</p>
   */
  tags?: { [key: string]: string };
}

export namespace ListTagsLogGroupResponse {
  export const filterSensitiveLog = (obj: ListTagsLogGroupResponse): any => ({
    ...obj,
  });
}

export interface PutDestinationRequest {
  /**
   * <p>A name for the destination.</p>
   */
  destinationName: string | undefined;

  /**
   * <p>The ARN of an Amazon Kinesis stream to which to deliver matching log events.</p>
   */
  targetArn: string | undefined;

  /**
   * <p>The ARN of an IAM role that grants CloudWatch Logs permissions to call the Amazon
   *       Kinesis <code>PutRecord</code> operation on the destination stream.</p>
   */
  roleArn: string | undefined;
}

export namespace PutDestinationRequest {
  export const filterSensitiveLog = (obj: PutDestinationRequest): any => ({
    ...obj,
  });
}

export interface PutDestinationResponse {
  /**
   * <p>The destination.</p>
   */
  destination?: Destination;
}

export namespace PutDestinationResponse {
  export const filterSensitiveLog = (obj: PutDestinationResponse): any => ({
    ...obj,
  });
}

export interface PutDestinationPolicyRequest {
  /**
   * <p>A name for an existing destination.</p>
   */
  destinationName: string | undefined;

  /**
   * <p>An IAM policy document that authorizes cross-account users to deliver their log events
   *       to the associated destination. This can be up to 5120 bytes.</p>
   */
  accessPolicy: string | undefined;
}

export namespace PutDestinationPolicyRequest {
  export const filterSensitiveLog = (obj: PutDestinationPolicyRequest): any => ({
    ...obj,
  });
}

export interface PutLogEventsRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The name of the log stream.</p>
   */
  logStreamName: string | undefined;

  /**
   * <p>The log events.</p>
   */
  logEvents: InputLogEvent[] | undefined;

  /**
   * <p>The sequence token obtained from the response of the previous <code>PutLogEvents</code>
   *       call. An upload in a newly created log stream does not require a sequence token. You can also
   *       get the sequence token using <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_DescribeLogStreams.html">DescribeLogStreams</a>. If you call <code>PutLogEvents</code> twice within a narrow
   *       time period using the same value for <code>sequenceToken</code>, both calls might be
   *       successful or one might be rejected.</p>
   */
  sequenceToken?: string;
}

export namespace PutLogEventsRequest {
  export const filterSensitiveLog = (obj: PutLogEventsRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Represents the rejected events.</p>
 */
export interface RejectedLogEventsInfo {
  /**
   * <p>The log events that are too new.</p>
   */
  tooNewLogEventStartIndex?: number;

  /**
   * <p>The log events that are too old.</p>
   */
  tooOldLogEventEndIndex?: number;

  /**
   * <p>The expired log events.</p>
   */
  expiredLogEventEndIndex?: number;
}

export namespace RejectedLogEventsInfo {
  export const filterSensitiveLog = (obj: RejectedLogEventsInfo): any => ({
    ...obj,
  });
}

export interface PutLogEventsResponse {
  /**
   * <p>The next sequence token.</p>
   */
  nextSequenceToken?: string;

  /**
   * <p>The rejected events.</p>
   */
  rejectedLogEventsInfo?: RejectedLogEventsInfo;
}

export namespace PutLogEventsResponse {
  export const filterSensitiveLog = (obj: PutLogEventsResponse): any => ({
    ...obj,
  });
}

/**
 * <p>The most likely cause is an invalid AWS access key ID or secret key.</p>
 */
export interface UnrecognizedClientException extends __SmithyException, $MetadataBearer {
  name: "UnrecognizedClientException";
  $fault: "client";
  message?: string;
}

export namespace UnrecognizedClientException {
  export const filterSensitiveLog = (obj: UnrecognizedClientException): any => ({
    ...obj,
  });
}

export interface PutMetricFilterRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>A name for the metric filter.</p>
   */
  filterName: string | undefined;

  /**
   * <p>A filter pattern for extracting metric data out of ingested log events.</p>
   */
  filterPattern: string | undefined;

  /**
   * <p>A collection of information that defines how metric data gets emitted.</p>
   */
  metricTransformations: MetricTransformation[] | undefined;
}

export namespace PutMetricFilterRequest {
  export const filterSensitiveLog = (obj: PutMetricFilterRequest): any => ({
    ...obj,
  });
}

export interface PutQueryDefinitionRequest {
  /**
   * <p>A name for the query definition. If you are saving a lot of query definitions, we
   *       recommend that you name them so that you can easily find the ones you want by using the first
   *       part of the name as a filter in the <code>queryDefinitionNamePrefix</code> parameter of <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_DescribeQueryDefinitions.html">DescribeQueryDefinitions</a>.</p>
   */
  name: string | undefined;

  /**
   * <p>If you are updating a query definition, use this parameter to specify the ID of the query
   *       definition that you want to update. You can use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_DescribeQueryDefinitions.html">DescribeQueryDefinitions</a> to retrieve the IDs of your saved query
   *       definitions.</p>
   *          <p>If you are creating a query definition, do not specify this parameter. CloudWatch
   *       generates a unique ID for the new query definition and include it in the response to this
   *       operation.</p>
   */
  queryDefinitionId?: string;

  /**
   * <p>Use this parameter to include specific log groups as part of your query definition.</p>
   *          <p>If you are updating a query definition and you omit this parameter, then the updated
   *       definition will contain no log groups.</p>
   */
  logGroupNames?: string[];

  /**
   * <p>The query string to use for this definition.
   *       For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html">CloudWatch Logs Insights Query Syntax</a>.</p>
   */
  queryString: string | undefined;
}

export namespace PutQueryDefinitionRequest {
  export const filterSensitiveLog = (obj: PutQueryDefinitionRequest): any => ({
    ...obj,
  });
}

export interface PutQueryDefinitionResponse {
  /**
   * <p>The ID of the query definition.</p>
   */
  queryDefinitionId?: string;
}

export namespace PutQueryDefinitionResponse {
  export const filterSensitiveLog = (obj: PutQueryDefinitionResponse): any => ({
    ...obj,
  });
}

export interface PutResourcePolicyRequest {
  /**
   * <p>Name of the new policy. This parameter is required.</p>
   */
  policyName?: string;

  /**
   * <p>Details of the new policy, including the identity of the principal that is enabled to put logs to this account. This is formatted as a JSON string.
   *     This parameter is required.</p>
   *          <p>The following example creates a resource policy enabling the Route 53 service to put
   *       DNS query logs in to the specified log group. Replace <code>"logArn"</code> with the ARN of your CloudWatch Logs resource, such as a log group or log stream.</p>
   *          <p>
   *             <code>{
   *    "Version": "2012-10-17",
   *    "Statement": [
   *      {
   *        "Sid": "Route53LogsToCloudWatchLogs",
   *        "Effect": "Allow",
   *        "Principal": {
   *         "Service": [
   *                 "route53.amazonaws.com"
   *                ]
   *             },
   *          "Action":"logs:PutLogEvents",
   *          "Resource": "logArn"
   *       }
   *     ]
   * } </code>
   *
   *          </p>
   */
  policyDocument?: string;
}

export namespace PutResourcePolicyRequest {
  export const filterSensitiveLog = (obj: PutResourcePolicyRequest): any => ({
    ...obj,
  });
}

export interface PutResourcePolicyResponse {
  /**
   * <p>The new policy.</p>
   */
  resourcePolicy?: ResourcePolicy;
}

export namespace PutResourcePolicyResponse {
  export const filterSensitiveLog = (obj: PutResourcePolicyResponse): any => ({
    ...obj,
  });
}

export interface PutRetentionPolicyRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The number of days to retain the log events in the specified log group.
   *       Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, and 3653.</p>
   *          <p>If you omit <code>retentionInDays</code> in a <code>PutRetentionPolicy</code> operation,
   *   the events in the log group are always retained and never expire.</p>
   */
  retentionInDays: number | undefined;
}

export namespace PutRetentionPolicyRequest {
  export const filterSensitiveLog = (obj: PutRetentionPolicyRequest): any => ({
    ...obj,
  });
}

export interface PutSubscriptionFilterRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>A name for the subscription filter. If you are updating an existing filter, you must
   *       specify the correct name in <code>filterName</code>. Otherwise, the call fails because you
   *       cannot associate a second filter with a log group. To find the name of the filter currently
   *       associated with a log group, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_DescribeSubscriptionFilters.html">DescribeSubscriptionFilters</a>.</p>
   */
  filterName: string | undefined;

  /**
   * <p>A filter pattern for subscribing to a filtered stream of log events.</p>
   */
  filterPattern: string | undefined;

  /**
   * <p>The ARN of the destination to deliver matching log events to. Currently, the supported
   *       destinations are:</p>
   *          <ul>
   *             <li>
   *                <p>An Amazon Kinesis stream belonging to the same account as the subscription filter,
   *           for same-account delivery.</p>
   *             </li>
   *             <li>
   *                <p>A logical destination (specified using an ARN) belonging to a different account,
   *           for cross-account delivery.</p>
   *             </li>
   *             <li>
   *                <p>An Amazon Kinesis Firehose delivery stream belonging to the same account as the
   *           subscription filter, for same-account delivery.</p>
   *             </li>
   *             <li>
   *                <p>An AWS Lambda function belonging to the same account as the subscription filter,
   *           for same-account delivery.</p>
   *             </li>
   *          </ul>
   */
  destinationArn: string | undefined;

  /**
   * <p>The ARN of an IAM role that grants CloudWatch Logs permissions to deliver ingested log
   *       events to the destination stream. You don't need to provide the ARN when you are working with
   *       a logical destination for cross-account delivery.</p>
   */
  roleArn?: string;

  /**
   * <p>The method used to distribute log data to the destination. By default, log data is
   *       grouped by log stream, but the grouping can be set to random for a more even distribution.
   *       This property is only applicable when the destination is an Amazon Kinesis stream. </p>
   */
  distribution?: Distribution | string;
}

export namespace PutSubscriptionFilterRequest {
  export const filterSensitiveLog = (obj: PutSubscriptionFilterRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Reserved.</p>
 */
export interface QueryCompileErrorLocation {
  /**
   * <p>Reserved.</p>
   */
  startCharOffset?: number;

  /**
   * <p>Reserved.</p>
   */
  endCharOffset?: number;
}

export namespace QueryCompileErrorLocation {
  export const filterSensitiveLog = (obj: QueryCompileErrorLocation): any => ({
    ...obj,
  });
}

/**
 * <p>Reserved.</p>
 */
export interface QueryCompileError {
  /**
   * <p>Reserved.</p>
   */
  location?: QueryCompileErrorLocation;

  /**
   * <p>Reserved.</p>
   */
  message?: string;
}

export namespace QueryCompileError {
  export const filterSensitiveLog = (obj: QueryCompileError): any => ({
    ...obj,
  });
}

/**
 * <p>The query string is not valid. Details about this error are displayed in a
 *       <code>QueryCompileError</code> object. For more information, see
 *       <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_QueryCompileError.html">QueryCompileError</a>.</p>
 *          <p>For more information about valid query syntax, see
 *       <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html">CloudWatch Logs Insights Query Syntax</a>.</p>
 */
export interface MalformedQueryException extends __SmithyException, $MetadataBearer {
  name: "MalformedQueryException";
  $fault: "client";
  /**
   * <p>Reserved.</p>
   */
  queryCompileError?: QueryCompileError;

  message?: string;
}

export namespace MalformedQueryException {
  export const filterSensitiveLog = (obj: MalformedQueryException): any => ({
    ...obj,
  });
}

export interface StartQueryRequest {
  /**
   * <p>The log group on which to perform the query.</p>
   *          <p>A <code>StartQuery</code> operation must include a <code>logGroupNames</code> or a <code>logGroupName</code> parameter, but
   *       not both.</p>
   */
  logGroupName?: string;

  /**
   * <p>The list of log groups to be queried. You can include up to 20 log groups.</p>
   *          <p>A <code>StartQuery</code> operation must include a <code>logGroupNames</code> or a <code>logGroupName</code> parameter, but
   *     not both.</p>
   */
  logGroupNames?: string[];

  /**
   * <p>The beginning of the time range to query. The range is inclusive, so the specified
   *       start time is included in the query. Specified as epoch time, the
   *       number of seconds since January 1, 1970, 00:00:00 UTC.</p>
   */
  startTime: number | undefined;

  /**
   * <p>The end of the time range to query. The range is inclusive, so the specified
   *       end time is included in the query. Specified as epoch
   *       time, the number of seconds since January 1, 1970, 00:00:00 UTC.</p>
   */
  endTime: number | undefined;

  /**
   * <p>The query string to use.
   *       For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html">CloudWatch Logs Insights Query Syntax</a>.</p>
   */
  queryString: string | undefined;

  /**
   * <p>The maximum number of log events to return in the query. If the query string uses the <code>fields</code> command,
   *     only the specified fields and their values are returned. The default is 1000.</p>
   */
  limit?: number;
}

export namespace StartQueryRequest {
  export const filterSensitiveLog = (obj: StartQueryRequest): any => ({
    ...obj,
  });
}

export interface StartQueryResponse {
  /**
   * <p>The unique ID of the query. </p>
   */
  queryId?: string;
}

export namespace StartQueryResponse {
  export const filterSensitiveLog = (obj: StartQueryResponse): any => ({
    ...obj,
  });
}

export interface StopQueryRequest {
  /**
   * <p>The ID number of the query to stop. To find this ID number, use
   *         <code>DescribeQueries</code>.</p>
   */
  queryId: string | undefined;
}

export namespace StopQueryRequest {
  export const filterSensitiveLog = (obj: StopQueryRequest): any => ({
    ...obj,
  });
}

export interface StopQueryResponse {
  /**
   * <p>This is true if the query was stopped by the <code>StopQuery</code> operation.</p>
   */
  success?: boolean;
}

export namespace StopQueryResponse {
  export const filterSensitiveLog = (obj: StopQueryResponse): any => ({
    ...obj,
  });
}

export interface TagLogGroupRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The key-value pairs to use for the tags.</p>
   */
  tags: { [key: string]: string } | undefined;
}

export namespace TagLogGroupRequest {
  export const filterSensitiveLog = (obj: TagLogGroupRequest): any => ({
    ...obj,
  });
}

export interface TestMetricFilterRequest {
  /**
   * <p>A symbolic description of how CloudWatch Logs should interpret the data in each log
   *       event. For example, a log event can contain timestamps, IP addresses, strings, and so on. You
   *       use the filter pattern to specify what to look for in the log event message.</p>
   */
  filterPattern: string | undefined;

  /**
   * <p>The log event messages to test.</p>
   */
  logEventMessages: string[] | undefined;
}

export namespace TestMetricFilterRequest {
  export const filterSensitiveLog = (obj: TestMetricFilterRequest): any => ({
    ...obj,
  });
}

/**
 * <p>Represents a matched event.</p>
 */
export interface MetricFilterMatchRecord {
  /**
   * <p>The event number.</p>
   */
  eventNumber?: number;

  /**
   * <p>The raw event data.</p>
   */
  eventMessage?: string;

  /**
   * <p>The values extracted from the event data by the filter.</p>
   */
  extractedValues?: { [key: string]: string };
}

export namespace MetricFilterMatchRecord {
  export const filterSensitiveLog = (obj: MetricFilterMatchRecord): any => ({
    ...obj,
  });
}

export interface TestMetricFilterResponse {
  /**
   * <p>The matched events.</p>
   */
  matches?: MetricFilterMatchRecord[];
}

export namespace TestMetricFilterResponse {
  export const filterSensitiveLog = (obj: TestMetricFilterResponse): any => ({
    ...obj,
  });
}

export interface UntagLogGroupRequest {
  /**
   * <p>The name of the log group.</p>
   */
  logGroupName: string | undefined;

  /**
   * <p>The tag keys. The corresponding tags are removed from the log group.</p>
   */
  tags: string[] | undefined;
}

export namespace UntagLogGroupRequest {
  export const filterSensitiveLog = (obj: UntagLogGroupRequest): any => ({
    ...obj,
  });
}
