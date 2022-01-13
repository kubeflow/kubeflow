import { CloudWatchLogsClient } from "./CloudWatchLogsClient";
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
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
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
export declare class CloudWatchLogs extends CloudWatchLogsClient {
    /**
     * <p>Associates the specified AWS Key Management Service (AWS KMS) customer master key (CMK) with the specified log group.</p>
     *          <p>Associating an AWS KMS CMK with a log group overrides any existing associations between the log group and a CMK.
     *       After a CMK is associated with a log group, all newly ingested data for the log group is encrypted using the CMK.
     *       This association is stored as long as the data encrypted with the CMK is still within Amazon CloudWatch Logs.
     *       This enables Amazon CloudWatch Logs to decrypt this data whenever it is requested.</p>
     *          <important>
     *             <p>CloudWatch Logs supports only symmetric CMKs. Do not use an associate an asymmetric CMK
     *         with your log group. For more information, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html">Using Symmetric and Asymmetric
     *           Keys</a>.</p>
     *          </important>
     *          <p>It can take up to 5 minutes for this operation to take effect.</p>
     *          <p>If you attempt to associate a CMK with a log group but the CMK does not exist or the
     *       CMK is disabled, you receive an <code>InvalidParameterException</code> error. </p>
     */
    associateKmsKey(args: AssociateKmsKeyCommandInput, options?: __HttpHandlerOptions): Promise<AssociateKmsKeyCommandOutput>;
    associateKmsKey(args: AssociateKmsKeyCommandInput, cb: (err: any, data?: AssociateKmsKeyCommandOutput) => void): void;
    associateKmsKey(args: AssociateKmsKeyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: AssociateKmsKeyCommandOutput) => void): void;
    /**
     * <p>Cancels the specified export task.</p>
     *          <p>The task must be in the <code>PENDING</code> or <code>RUNNING</code> state.</p>
     */
    cancelExportTask(args: CancelExportTaskCommandInput, options?: __HttpHandlerOptions): Promise<CancelExportTaskCommandOutput>;
    cancelExportTask(args: CancelExportTaskCommandInput, cb: (err: any, data?: CancelExportTaskCommandOutput) => void): void;
    cancelExportTask(args: CancelExportTaskCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CancelExportTaskCommandOutput) => void): void;
    /**
     * <p>Creates an export task, which allows you to efficiently export data from a
     *       log group to an Amazon S3 bucket. When you perform a <code>CreateExportTask</code>
     *       operation, you must use credentials that have permission to write to the S3 bucket
     *       that you specify as the destination.</p>
     *          <p>This is an asynchronous call. If all the required information is provided, this
     *       operation initiates an export task and responds with the ID of the task. After the task has started,
     *       you can use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_DescribeExportTasks.html">DescribeExportTasks</a> to get the status of the export task. Each account can
     *       only have one active (<code>RUNNING</code> or <code>PENDING</code>) export task at a time.
     *       To cancel an export task, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_CancelExportTask.html">CancelExportTask</a>.</p>
     *          <p>You can export logs from multiple log groups or multiple time ranges to the same S3
     *       bucket. To separate out log data for each export task, you can specify a prefix to be used as
     *       the Amazon S3 key prefix for all exported objects.</p>
     *          <p>Exporting to S3 buckets that are encrypted with AES-256 is supported. Exporting to S3 buckets
     *       encrypted with SSE-KMS is not supported. </p>
     */
    createExportTask(args: CreateExportTaskCommandInput, options?: __HttpHandlerOptions): Promise<CreateExportTaskCommandOutput>;
    createExportTask(args: CreateExportTaskCommandInput, cb: (err: any, data?: CreateExportTaskCommandOutput) => void): void;
    createExportTask(args: CreateExportTaskCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateExportTaskCommandOutput) => void): void;
    /**
     * <p>Creates a log group with the specified name. You can create up to 20,000 log groups per account.</p>
     *          <p>You must use the following guidelines when naming a log group:</p>
     *          <ul>
     *             <li>
     *                <p>Log group names must be unique within a region for an AWS account.</p>
     *             </li>
     *             <li>
     *                <p>Log group names can be between 1 and 512 characters long.</p>
     *             </li>
     *             <li>
     *                <p>Log group names consist of the following characters: a-z, A-Z, 0-9, '_' (underscore), '-' (hyphen),
     *           '/' (forward slash), '.' (period), and '#' (number sign)</p>
     *             </li>
     *          </ul>
     *          <p>When you create a log group, by default the log events in the log group never expire. To set
     *     a retention policy so that events expire and are deleted after a specified time, use
     *       <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutRetentionPolicy.html">PutRetentionPolicy</a>.</p>
     *          <p>If you associate a AWS Key Management Service (AWS KMS) customer master key (CMK) with the log group, ingested data is encrypted using the CMK.
     *       This association is stored as long as the data encrypted with the CMK is still within Amazon CloudWatch Logs.
     *       This enables Amazon CloudWatch Logs to decrypt this data whenever it is requested.</p>
     *          <p>If you attempt to associate a CMK with the log group but the CMK does not exist or the
     *       CMK is disabled, you receive an <code>InvalidParameterException</code> error. </p>
     *          <important>
     *             <p> CloudWatch Logs supports only symmetric CMKs. Do not associate an asymmetric CMK with
     *         your log group. For more information, see <a href="https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html">Using Symmetric and Asymmetric
     *           Keys</a>.</p>
     *          </important>
     */
    createLogGroup(args: CreateLogGroupCommandInput, options?: __HttpHandlerOptions): Promise<CreateLogGroupCommandOutput>;
    createLogGroup(args: CreateLogGroupCommandInput, cb: (err: any, data?: CreateLogGroupCommandOutput) => void): void;
    createLogGroup(args: CreateLogGroupCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateLogGroupCommandOutput) => void): void;
    /**
     * <p>Creates a log stream for the specified log group. A log stream is a sequence of log events
     *       that originate from a single source, such as an application instance or a resource that is
     *       being monitored.</p>
     *          <p>There is no limit on the number of log streams that you can create for a log group. There is a limit
     *     of 50 TPS on <code>CreateLogStream</code> operations, after which transactions are throttled.</p>
     *          <p>You must use the following guidelines when naming a log stream:</p>
     *          <ul>
     *             <li>
     *                <p>Log stream names must be unique within the log group.</p>
     *             </li>
     *             <li>
     *                <p>Log stream names can be between 1 and 512 characters long.</p>
     *             </li>
     *             <li>
     *                <p>The ':' (colon) and '*' (asterisk) characters are not allowed.</p>
     *             </li>
     *          </ul>
     */
    createLogStream(args: CreateLogStreamCommandInput, options?: __HttpHandlerOptions): Promise<CreateLogStreamCommandOutput>;
    createLogStream(args: CreateLogStreamCommandInput, cb: (err: any, data?: CreateLogStreamCommandOutput) => void): void;
    createLogStream(args: CreateLogStreamCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateLogStreamCommandOutput) => void): void;
    /**
     * <p>Deletes the specified destination, and eventually disables all the
     *       subscription filters that publish to it. This operation does not delete the
     *       physical resource encapsulated by the destination.</p>
     */
    deleteDestination(args: DeleteDestinationCommandInput, options?: __HttpHandlerOptions): Promise<DeleteDestinationCommandOutput>;
    deleteDestination(args: DeleteDestinationCommandInput, cb: (err: any, data?: DeleteDestinationCommandOutput) => void): void;
    deleteDestination(args: DeleteDestinationCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteDestinationCommandOutput) => void): void;
    /**
     * <p>Deletes the specified log group and permanently deletes all the archived
     *       log events associated with the log group.</p>
     */
    deleteLogGroup(args: DeleteLogGroupCommandInput, options?: __HttpHandlerOptions): Promise<DeleteLogGroupCommandOutput>;
    deleteLogGroup(args: DeleteLogGroupCommandInput, cb: (err: any, data?: DeleteLogGroupCommandOutput) => void): void;
    deleteLogGroup(args: DeleteLogGroupCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteLogGroupCommandOutput) => void): void;
    /**
     * <p>Deletes the specified log stream and permanently deletes all the archived log events associated
     *       with the log stream.</p>
     */
    deleteLogStream(args: DeleteLogStreamCommandInput, options?: __HttpHandlerOptions): Promise<DeleteLogStreamCommandOutput>;
    deleteLogStream(args: DeleteLogStreamCommandInput, cb: (err: any, data?: DeleteLogStreamCommandOutput) => void): void;
    deleteLogStream(args: DeleteLogStreamCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteLogStreamCommandOutput) => void): void;
    /**
     * <p>Deletes the specified metric filter.</p>
     */
    deleteMetricFilter(args: DeleteMetricFilterCommandInput, options?: __HttpHandlerOptions): Promise<DeleteMetricFilterCommandOutput>;
    deleteMetricFilter(args: DeleteMetricFilterCommandInput, cb: (err: any, data?: DeleteMetricFilterCommandOutput) => void): void;
    deleteMetricFilter(args: DeleteMetricFilterCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteMetricFilterCommandOutput) => void): void;
    /**
     * <p>Deletes a saved CloudWatch Logs Insights query definition.
     *       A query definition contains details about a saved CloudWatch Logs Insights query.</p>
     *          <p>Each <code>DeleteQueryDefinition</code> operation can delete one query definition.</p>
     *          <p>You must have the <code>logs:DeleteQueryDefinition</code> permission to be able to perform
     *       this operation.</p>
     */
    deleteQueryDefinition(args: DeleteQueryDefinitionCommandInput, options?: __HttpHandlerOptions): Promise<DeleteQueryDefinitionCommandOutput>;
    deleteQueryDefinition(args: DeleteQueryDefinitionCommandInput, cb: (err: any, data?: DeleteQueryDefinitionCommandOutput) => void): void;
    deleteQueryDefinition(args: DeleteQueryDefinitionCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteQueryDefinitionCommandOutput) => void): void;
    /**
     * <p>Deletes a resource policy from this account. This revokes
     *     the access of the identities in that policy to put log events to this account.</p>
     */
    deleteResourcePolicy(args: DeleteResourcePolicyCommandInput, options?: __HttpHandlerOptions): Promise<DeleteResourcePolicyCommandOutput>;
    deleteResourcePolicy(args: DeleteResourcePolicyCommandInput, cb: (err: any, data?: DeleteResourcePolicyCommandOutput) => void): void;
    deleteResourcePolicy(args: DeleteResourcePolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteResourcePolicyCommandOutput) => void): void;
    /**
     * <p>Deletes the specified retention policy.</p>
     *          <p>Log events do not expire if they belong to log groups without a retention policy.</p>
     */
    deleteRetentionPolicy(args: DeleteRetentionPolicyCommandInput, options?: __HttpHandlerOptions): Promise<DeleteRetentionPolicyCommandOutput>;
    deleteRetentionPolicy(args: DeleteRetentionPolicyCommandInput, cb: (err: any, data?: DeleteRetentionPolicyCommandOutput) => void): void;
    deleteRetentionPolicy(args: DeleteRetentionPolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteRetentionPolicyCommandOutput) => void): void;
    /**
     * <p>Deletes the specified subscription filter.</p>
     */
    deleteSubscriptionFilter(args: DeleteSubscriptionFilterCommandInput, options?: __HttpHandlerOptions): Promise<DeleteSubscriptionFilterCommandOutput>;
    deleteSubscriptionFilter(args: DeleteSubscriptionFilterCommandInput, cb: (err: any, data?: DeleteSubscriptionFilterCommandOutput) => void): void;
    deleteSubscriptionFilter(args: DeleteSubscriptionFilterCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteSubscriptionFilterCommandOutput) => void): void;
    /**
     * <p>Lists all your destinations. The results are ASCII-sorted by destination name.</p>
     */
    describeDestinations(args: DescribeDestinationsCommandInput, options?: __HttpHandlerOptions): Promise<DescribeDestinationsCommandOutput>;
    describeDestinations(args: DescribeDestinationsCommandInput, cb: (err: any, data?: DescribeDestinationsCommandOutput) => void): void;
    describeDestinations(args: DescribeDestinationsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeDestinationsCommandOutput) => void): void;
    /**
     * <p>Lists the specified export tasks. You can list all your export tasks or filter
     *       the results based on task ID or task status.</p>
     */
    describeExportTasks(args: DescribeExportTasksCommandInput, options?: __HttpHandlerOptions): Promise<DescribeExportTasksCommandOutput>;
    describeExportTasks(args: DescribeExportTasksCommandInput, cb: (err: any, data?: DescribeExportTasksCommandOutput) => void): void;
    describeExportTasks(args: DescribeExportTasksCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeExportTasksCommandOutput) => void): void;
    /**
     * <p>Lists the specified log groups. You can list all your log groups or filter the results by prefix.
     *       The results are ASCII-sorted by log group name.</p>
     */
    describeLogGroups(args: DescribeLogGroupsCommandInput, options?: __HttpHandlerOptions): Promise<DescribeLogGroupsCommandOutput>;
    describeLogGroups(args: DescribeLogGroupsCommandInput, cb: (err: any, data?: DescribeLogGroupsCommandOutput) => void): void;
    describeLogGroups(args: DescribeLogGroupsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeLogGroupsCommandOutput) => void): void;
    /**
     * <p>Lists the log streams for the specified log group.
     *       You can list all the log streams or filter the results by prefix.
     *       You can also control how the results are ordered.</p>
     *          <p>This operation has a limit of five transactions per second, after which transactions are throttled.</p>
     */
    describeLogStreams(args: DescribeLogStreamsCommandInput, options?: __HttpHandlerOptions): Promise<DescribeLogStreamsCommandOutput>;
    describeLogStreams(args: DescribeLogStreamsCommandInput, cb: (err: any, data?: DescribeLogStreamsCommandOutput) => void): void;
    describeLogStreams(args: DescribeLogStreamsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeLogStreamsCommandOutput) => void): void;
    /**
     * <p>Lists the specified metric filters. You can list all of the metric filters or filter
     *       the results by log name, prefix, metric name, or metric namespace. The results are
     *       ASCII-sorted by filter name.</p>
     */
    describeMetricFilters(args: DescribeMetricFiltersCommandInput, options?: __HttpHandlerOptions): Promise<DescribeMetricFiltersCommandOutput>;
    describeMetricFilters(args: DescribeMetricFiltersCommandInput, cb: (err: any, data?: DescribeMetricFiltersCommandOutput) => void): void;
    describeMetricFilters(args: DescribeMetricFiltersCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeMetricFiltersCommandOutput) => void): void;
    /**
     * <p>Returns a list of CloudWatch Logs Insights queries that are scheduled, executing, or have
     *       been executed recently in this account. You can request all queries or limit it to queries of
     *       a specific log group or queries with a certain status.</p>
     */
    describeQueries(args: DescribeQueriesCommandInput, options?: __HttpHandlerOptions): Promise<DescribeQueriesCommandOutput>;
    describeQueries(args: DescribeQueriesCommandInput, cb: (err: any, data?: DescribeQueriesCommandOutput) => void): void;
    describeQueries(args: DescribeQueriesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeQueriesCommandOutput) => void): void;
    /**
     * <p>This operation returns a paginated list of your saved CloudWatch Logs Insights query definitions.</p>
     *          <p>You can use the <code>queryDefinitionNamePrefix</code> parameter to limit the results to only the
     *       query definitions that have names that start with a certain string.</p>
     */
    describeQueryDefinitions(args: DescribeQueryDefinitionsCommandInput, options?: __HttpHandlerOptions): Promise<DescribeQueryDefinitionsCommandOutput>;
    describeQueryDefinitions(args: DescribeQueryDefinitionsCommandInput, cb: (err: any, data?: DescribeQueryDefinitionsCommandOutput) => void): void;
    describeQueryDefinitions(args: DescribeQueryDefinitionsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeQueryDefinitionsCommandOutput) => void): void;
    /**
     * <p>Lists the resource policies in this account.</p>
     */
    describeResourcePolicies(args: DescribeResourcePoliciesCommandInput, options?: __HttpHandlerOptions): Promise<DescribeResourcePoliciesCommandOutput>;
    describeResourcePolicies(args: DescribeResourcePoliciesCommandInput, cb: (err: any, data?: DescribeResourcePoliciesCommandOutput) => void): void;
    describeResourcePolicies(args: DescribeResourcePoliciesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeResourcePoliciesCommandOutput) => void): void;
    /**
     * <p>Lists the subscription filters for the specified log group. You can list all the subscription filters or filter the results by prefix.
     *       The results are ASCII-sorted by filter name.</p>
     */
    describeSubscriptionFilters(args: DescribeSubscriptionFiltersCommandInput, options?: __HttpHandlerOptions): Promise<DescribeSubscriptionFiltersCommandOutput>;
    describeSubscriptionFilters(args: DescribeSubscriptionFiltersCommandInput, cb: (err: any, data?: DescribeSubscriptionFiltersCommandOutput) => void): void;
    describeSubscriptionFilters(args: DescribeSubscriptionFiltersCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DescribeSubscriptionFiltersCommandOutput) => void): void;
    /**
     * <p>Disassociates the associated AWS Key Management Service (AWS KMS) customer master key (CMK) from the specified log group.</p>
     *          <p>After the AWS KMS CMK is disassociated from the log group, AWS CloudWatch Logs stops encrypting newly ingested data for the log group.
     *       All previously ingested data remains encrypted, and AWS CloudWatch Logs requires permissions for the CMK whenever the encrypted data is requested.</p>
     *          <p>Note that it can take up to 5 minutes for this operation to take effect.</p>
     */
    disassociateKmsKey(args: DisassociateKmsKeyCommandInput, options?: __HttpHandlerOptions): Promise<DisassociateKmsKeyCommandOutput>;
    disassociateKmsKey(args: DisassociateKmsKeyCommandInput, cb: (err: any, data?: DisassociateKmsKeyCommandOutput) => void): void;
    disassociateKmsKey(args: DisassociateKmsKeyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DisassociateKmsKeyCommandOutput) => void): void;
    /**
     * <p>Lists log events from the specified log group. You can list all the log events or filter the results
     *       using a filter pattern, a time range, and the name of the log stream.</p>
     *          <p>By default, this operation returns as many log events as can fit in 1 MB (up to 10,000
     *       log events) or all the events found within the time range that you specify. If the results
     *       include a token, then there are more log events available, and you can get additional results
     *       by specifying the token in a subsequent call. This operation can return empty results
     *     while there are more log events available through the token.</p>
     *          <p>The returned log events are sorted by event timestamp, the timestamp when the event was ingested
     *     by CloudWatch Logs, and the ID of the <code>PutLogEvents</code> request.</p>
     */
    filterLogEvents(args: FilterLogEventsCommandInput, options?: __HttpHandlerOptions): Promise<FilterLogEventsCommandOutput>;
    filterLogEvents(args: FilterLogEventsCommandInput, cb: (err: any, data?: FilterLogEventsCommandOutput) => void): void;
    filterLogEvents(args: FilterLogEventsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: FilterLogEventsCommandOutput) => void): void;
    /**
     * <p>Lists log events from the specified log stream. You can list all of the log events or
     *       filter using a time range.</p>
     *
     *          <p>By default, this operation returns as many log events as can fit in a response size of 1MB (up to 10,000 log events).
     *       You can get additional log events by specifying one of the tokens in a subsequent call.
     *       This operation can return empty results while there are more log events available through the token.</p>
     */
    getLogEvents(args: GetLogEventsCommandInput, options?: __HttpHandlerOptions): Promise<GetLogEventsCommandOutput>;
    getLogEvents(args: GetLogEventsCommandInput, cb: (err: any, data?: GetLogEventsCommandOutput) => void): void;
    getLogEvents(args: GetLogEventsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetLogEventsCommandOutput) => void): void;
    /**
     * <p>Returns a list of the fields that are included in log events in the specified log group, along with the percentage of log events
     *     that contain each field. The search is limited to a time period that you specify.</p>
     *          <p>In the results, fields that start with @ are fields generated by CloudWatch Logs. For
     *       example, <code>@timestamp</code> is the timestamp of each log event. For more information about the fields that are
     *       generated by CloudWatch logs, see
     *       <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_AnalyzeLogData-discoverable-fields.html">Supported Logs and Discovered Fields</a>.</p>
     *          <p>The response results are sorted by the frequency percentage, starting
     *     with the highest percentage.</p>
     */
    getLogGroupFields(args: GetLogGroupFieldsCommandInput, options?: __HttpHandlerOptions): Promise<GetLogGroupFieldsCommandOutput>;
    getLogGroupFields(args: GetLogGroupFieldsCommandInput, cb: (err: any, data?: GetLogGroupFieldsCommandOutput) => void): void;
    getLogGroupFields(args: GetLogGroupFieldsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetLogGroupFieldsCommandOutput) => void): void;
    /**
     * <p>Retrieves all of the fields and values of a single log event. All fields are retrieved,
     *       even if the original query that produced the <code>logRecordPointer</code> retrieved only a
     *       subset of fields. Fields are returned as field name/field value pairs.</p>
     *          <p>The full unparsed log event is returned within <code>@message</code>.</p>
     */
    getLogRecord(args: GetLogRecordCommandInput, options?: __HttpHandlerOptions): Promise<GetLogRecordCommandOutput>;
    getLogRecord(args: GetLogRecordCommandInput, cb: (err: any, data?: GetLogRecordCommandOutput) => void): void;
    getLogRecord(args: GetLogRecordCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetLogRecordCommandOutput) => void): void;
    /**
     * <p>Returns the results from the specified query.</p>
     *          <p>Only the fields requested in the query are returned, along with a <code>@ptr</code>
     *       field, which is the identifier for the log record. You can use the value of <code>@ptr</code>
     *       in a <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_GetLogRecord.html">GetLogRecord</a>
     *       operation to get the full log record.</p>
     *          <p>
     *             <code>GetQueryResults</code>
     *       does not start a query execution. To run a query, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_StartQuery.html">StartQuery</a>.</p>
     *          <p>If the value of the <code>Status</code> field in the output is <code>Running</code>, this operation
     *       returns only partial results. If you see a value of <code>Scheduled</code> or <code>Running</code> for the status,
     *       you can retry the operation later to see the final results. </p>
     */
    getQueryResults(args: GetQueryResultsCommandInput, options?: __HttpHandlerOptions): Promise<GetQueryResultsCommandOutput>;
    getQueryResults(args: GetQueryResultsCommandInput, cb: (err: any, data?: GetQueryResultsCommandOutput) => void): void;
    getQueryResults(args: GetQueryResultsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetQueryResultsCommandOutput) => void): void;
    /**
     * <p>Lists the tags for the specified log group.</p>
     */
    listTagsLogGroup(args: ListTagsLogGroupCommandInput, options?: __HttpHandlerOptions): Promise<ListTagsLogGroupCommandOutput>;
    listTagsLogGroup(args: ListTagsLogGroupCommandInput, cb: (err: any, data?: ListTagsLogGroupCommandOutput) => void): void;
    listTagsLogGroup(args: ListTagsLogGroupCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListTagsLogGroupCommandOutput) => void): void;
    /**
     * <p>Creates or updates a destination. This operation is used only to create destinations for cross-account subscriptions.</p>
     *          <p>A destination encapsulates a physical resource (such
     *       as an Amazon Kinesis stream) and enables you to subscribe to a real-time stream of log events
     *       for a different account, ingested using <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html">PutLogEvents</a>.</p>
     *          <p>Through an access policy, a destination controls what is written to it.
     *       By default, <code>PutDestination</code> does not set any access policy with the destination,
     *       which means a cross-account user cannot call <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html">PutSubscriptionFilter</a> against
     *       this destination. To enable this, the destination owner must call <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutDestinationPolicy.html">PutDestinationPolicy</a> after <code>PutDestination</code>.</p>
     *          <p>To perform a <code>PutDestination</code> operation, you must also have the
     *     <code>iam:PassRole</code> permission.</p>
     */
    putDestination(args: PutDestinationCommandInput, options?: __HttpHandlerOptions): Promise<PutDestinationCommandOutput>;
    putDestination(args: PutDestinationCommandInput, cb: (err: any, data?: PutDestinationCommandOutput) => void): void;
    putDestination(args: PutDestinationCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutDestinationCommandOutput) => void): void;
    /**
     * <p>Creates or updates an access policy associated with an existing
     *       destination. An access policy is an <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/policies_overview.html">IAM policy document</a> that is used
     *       to authorize claims to register a subscription filter against a given destination.</p>
     */
    putDestinationPolicy(args: PutDestinationPolicyCommandInput, options?: __HttpHandlerOptions): Promise<PutDestinationPolicyCommandOutput>;
    putDestinationPolicy(args: PutDestinationPolicyCommandInput, cb: (err: any, data?: PutDestinationPolicyCommandOutput) => void): void;
    putDestinationPolicy(args: PutDestinationPolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutDestinationPolicyCommandOutput) => void): void;
    /**
     * <p>Uploads a batch of log events to the specified log stream.</p>
     *          <p>You must include the sequence token obtained from the response of the previous call. An
     *       upload in a newly created log stream does not require a sequence token. You can also get the
     *       sequence token in the <code>expectedSequenceToken</code> field from
     *         <code>InvalidSequenceTokenException</code>. If you call <code>PutLogEvents</code> twice
     *       within a narrow time period using the same value for <code>sequenceToken</code>, both calls
     *       might be successful or one might be rejected.</p>
     *          <p>The batch of events must satisfy the following constraints:</p>
     *          <ul>
     *             <li>
     *                <p>The maximum batch size is 1,048,576 bytes. This size is calculated as the sum of
     *           all event messages in UTF-8, plus 26 bytes for each log event.</p>
     *             </li>
     *             <li>
     *                <p>None of the log events in the batch can be more than 2 hours in the future.</p>
     *             </li>
     *             <li>
     *                <p>None of the log events in the batch can be older than 14 days or older than the retention
     *           period of the log group.</p>
     *             </li>
     *             <li>
     *                <p>The log events in the batch must be in chronological order by their timestamp. The
     *           timestamp is the time the event occurred, expressed as the number of milliseconds after
     *           Jan 1, 1970 00:00:00 UTC. (In AWS Tools for PowerShell and the AWS SDK for .NET, the
     *           timestamp is specified in .NET format: yyyy-mm-ddThh:mm:ss. For example,
     *           2017-09-15T13:45:30.) </p>
     *             </li>
     *             <li>
     *                <p>A batch of log events in a single request cannot span more than 24 hours. Otherwise, the operation fails.</p>
     *             </li>
     *             <li>
     *                <p>The maximum number of log events in a batch is 10,000.</p>
     *             </li>
     *             <li>
     *                <p>There is a quota of 5 requests per second per log stream. Additional requests are throttled. This quota can't be changed.</p>
     *             </li>
     *          </ul>
     *          <p>If a call to <code>PutLogEvents</code> returns "UnrecognizedClientException" the most likely cause is an invalid AWS access key ID or secret key. </p>
     */
    putLogEvents(args: PutLogEventsCommandInput, options?: __HttpHandlerOptions): Promise<PutLogEventsCommandOutput>;
    putLogEvents(args: PutLogEventsCommandInput, cb: (err: any, data?: PutLogEventsCommandOutput) => void): void;
    putLogEvents(args: PutLogEventsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutLogEventsCommandOutput) => void): void;
    /**
     * <p>Creates or updates a metric filter and associates it with the specified log group.
     *       Metric filters allow you to configure rules to extract metric data from log events ingested
     *       through <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html">PutLogEvents</a>.</p>
     *          <p>The maximum number of metric filters that can be associated with a log group is
     *       100.</p>
     */
    putMetricFilter(args: PutMetricFilterCommandInput, options?: __HttpHandlerOptions): Promise<PutMetricFilterCommandOutput>;
    putMetricFilter(args: PutMetricFilterCommandInput, cb: (err: any, data?: PutMetricFilterCommandOutput) => void): void;
    putMetricFilter(args: PutMetricFilterCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutMetricFilterCommandOutput) => void): void;
    /**
     * <p>Creates or updates a query definition for CloudWatch Logs Insights. For
     *       more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html">Analyzing Log Data with CloudWatch Logs Insights</a>.</p>
     *
     *          <p>To update a query definition, specify its
     *         <code>queryDefinitionId</code> in your request. The values of <code>name</code>, <code>queryString</code>,
     *       and <code>logGroupNames</code> are changed to the values that you specify in your update
     *       operation. No current values are retained from the current query definition. For example, if
     *       you update a current query definition that includes log groups, and you don't specify the
     *         <code>logGroupNames</code> parameter in your update operation, the query definition changes
     *       to contain no log groups.</p>
     *          <p>You must have the <code>logs:PutQueryDefinition</code> permission to be able to perform
     *     this operation.</p>
     */
    putQueryDefinition(args: PutQueryDefinitionCommandInput, options?: __HttpHandlerOptions): Promise<PutQueryDefinitionCommandOutput>;
    putQueryDefinition(args: PutQueryDefinitionCommandInput, cb: (err: any, data?: PutQueryDefinitionCommandOutput) => void): void;
    putQueryDefinition(args: PutQueryDefinitionCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutQueryDefinitionCommandOutput) => void): void;
    /**
     * <p>Creates or updates a resource policy allowing other AWS services to put log events to
     *       this account, such as Amazon Route 53. An account can have up to 10 resource policies per AWS
     *       Region.</p>
     */
    putResourcePolicy(args: PutResourcePolicyCommandInput, options?: __HttpHandlerOptions): Promise<PutResourcePolicyCommandOutput>;
    putResourcePolicy(args: PutResourcePolicyCommandInput, cb: (err: any, data?: PutResourcePolicyCommandOutput) => void): void;
    putResourcePolicy(args: PutResourcePolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutResourcePolicyCommandOutput) => void): void;
    /**
     * <p>Sets the retention of the specified log group. A retention policy allows you to
     *       configure the number of days for which to retain log events in the specified log
     *       group.</p>
     */
    putRetentionPolicy(args: PutRetentionPolicyCommandInput, options?: __HttpHandlerOptions): Promise<PutRetentionPolicyCommandOutput>;
    putRetentionPolicy(args: PutRetentionPolicyCommandInput, cb: (err: any, data?: PutRetentionPolicyCommandOutput) => void): void;
    putRetentionPolicy(args: PutRetentionPolicyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutRetentionPolicyCommandOutput) => void): void;
    /**
     * <p>Creates or updates a subscription filter and associates it with the specified log
     *       group. Subscription filters allow you to subscribe to a real-time stream of log events
     *       ingested through <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html">PutLogEvents</a> and have them delivered to a specific
     *       destination. When log events are sent to the
     *       receiving service, they are Base64 encoded
     *       and compressed with the gzip format.</p>
     *          <p>The following destinations are supported for subscription filters:</p>
     *          <ul>
     *             <li>
     *                <p>An Amazon Kinesis stream belonging to the same account as the subscription filter,
     *           for same-account delivery.</p>
     *             </li>
     *             <li>
     *                <p>A logical destination that belongs to a different account, for cross-account delivery.</p>
     *             </li>
     *             <li>
     *                <p>An Amazon Kinesis Firehose delivery stream that belongs to the same account as the
     *           subscription filter, for same-account delivery.</p>
     *             </li>
     *             <li>
     *                <p>An AWS Lambda function that belongs to the same account as the subscription filter,
     *           for same-account delivery.</p>
     *             </li>
     *          </ul>
     *          <p>There can only be one subscription filter associated with a log group. If you are
     *       updating an existing filter, you must specify the correct name in <code>filterName</code>.
     *       Otherwise, the call fails because you cannot associate a second filter with a log
     *       group.</p>
     *          <p>To perform a <code>PutSubscriptionFilter</code> operation, you must also have the
     *       <code>iam:PassRole</code> permission.</p>
     */
    putSubscriptionFilter(args: PutSubscriptionFilterCommandInput, options?: __HttpHandlerOptions): Promise<PutSubscriptionFilterCommandOutput>;
    putSubscriptionFilter(args: PutSubscriptionFilterCommandInput, cb: (err: any, data?: PutSubscriptionFilterCommandOutput) => void): void;
    putSubscriptionFilter(args: PutSubscriptionFilterCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutSubscriptionFilterCommandOutput) => void): void;
    /**
     * <p>Schedules a query of a log group using CloudWatch Logs Insights. You specify the log group
     *       and time range to query and the query string to use.</p>
     *          <p>For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html">CloudWatch Logs Insights Query Syntax</a>.</p>
     *
     *          <p>Queries time out after 15 minutes of execution. If your queries are timing out, reduce the
     *       time range being searched or partition your query into a number of queries.</p>
     */
    startQuery(args: StartQueryCommandInput, options?: __HttpHandlerOptions): Promise<StartQueryCommandOutput>;
    startQuery(args: StartQueryCommandInput, cb: (err: any, data?: StartQueryCommandOutput) => void): void;
    startQuery(args: StartQueryCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartQueryCommandOutput) => void): void;
    /**
     * <p>Stops a CloudWatch Logs Insights query that is in progress. If the query has already ended, the operation
     *     returns an error indicating that the specified query is not running.</p>
     */
    stopQuery(args: StopQueryCommandInput, options?: __HttpHandlerOptions): Promise<StopQueryCommandOutput>;
    stopQuery(args: StopQueryCommandInput, cb: (err: any, data?: StopQueryCommandOutput) => void): void;
    stopQuery(args: StopQueryCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StopQueryCommandOutput) => void): void;
    /**
     * <p>Adds or updates the specified tags for the specified log group.</p>
     *          <p>To list the tags for a log group, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_ListTagsLogGroup.html">ListTagsLogGroup</a>.
     *       To remove tags, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_UntagLogGroup.html">UntagLogGroup</a>.</p>
     *          <p>For more information about tags, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#log-group-tagging">Tag Log Groups in Amazon CloudWatch Logs</a>
     *       in the <i>Amazon CloudWatch Logs User Guide</i>.</p>
     */
    tagLogGroup(args: TagLogGroupCommandInput, options?: __HttpHandlerOptions): Promise<TagLogGroupCommandOutput>;
    tagLogGroup(args: TagLogGroupCommandInput, cb: (err: any, data?: TagLogGroupCommandOutput) => void): void;
    tagLogGroup(args: TagLogGroupCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: TagLogGroupCommandOutput) => void): void;
    /**
     * <p>Tests the filter pattern of a metric filter against a sample of log event messages. You
     *       can use this operation to validate the correctness of a metric filter pattern.</p>
     */
    testMetricFilter(args: TestMetricFilterCommandInput, options?: __HttpHandlerOptions): Promise<TestMetricFilterCommandOutput>;
    testMetricFilter(args: TestMetricFilterCommandInput, cb: (err: any, data?: TestMetricFilterCommandOutput) => void): void;
    testMetricFilter(args: TestMetricFilterCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: TestMetricFilterCommandOutput) => void): void;
    /**
     * <p>Removes the specified tags from the specified log group.</p>
     *          <p>To list the tags for a log group, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_ListTagsLogGroup.html">ListTagsLogGroup</a>.
     *       To add tags, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_TagLogGroup.html">TagLogGroup</a>.</p>
     */
    untagLogGroup(args: UntagLogGroupCommandInput, options?: __HttpHandlerOptions): Promise<UntagLogGroupCommandOutput>;
    untagLogGroup(args: UntagLogGroupCommandInput, cb: (err: any, data?: UntagLogGroupCommandOutput) => void): void;
    untagLogGroup(args: UntagLogGroupCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UntagLogGroupCommandOutput) => void): void;
}
