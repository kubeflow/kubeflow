import { CloudWatchLogsClient } from "./CloudWatchLogsClient";
import {
  AssociateKmsKeyCommand,
  AssociateKmsKeyCommandInput,
  AssociateKmsKeyCommandOutput,
} from "./commands/AssociateKmsKeyCommand";
import {
  CancelExportTaskCommand,
  CancelExportTaskCommandInput,
  CancelExportTaskCommandOutput,
} from "./commands/CancelExportTaskCommand";
import {
  CreateExportTaskCommand,
  CreateExportTaskCommandInput,
  CreateExportTaskCommandOutput,
} from "./commands/CreateExportTaskCommand";
import {
  CreateLogGroupCommand,
  CreateLogGroupCommandInput,
  CreateLogGroupCommandOutput,
} from "./commands/CreateLogGroupCommand";
import {
  CreateLogStreamCommand,
  CreateLogStreamCommandInput,
  CreateLogStreamCommandOutput,
} from "./commands/CreateLogStreamCommand";
import {
  DeleteDestinationCommand,
  DeleteDestinationCommandInput,
  DeleteDestinationCommandOutput,
} from "./commands/DeleteDestinationCommand";
import {
  DeleteLogGroupCommand,
  DeleteLogGroupCommandInput,
  DeleteLogGroupCommandOutput,
} from "./commands/DeleteLogGroupCommand";
import {
  DeleteLogStreamCommand,
  DeleteLogStreamCommandInput,
  DeleteLogStreamCommandOutput,
} from "./commands/DeleteLogStreamCommand";
import {
  DeleteMetricFilterCommand,
  DeleteMetricFilterCommandInput,
  DeleteMetricFilterCommandOutput,
} from "./commands/DeleteMetricFilterCommand";
import {
  DeleteQueryDefinitionCommand,
  DeleteQueryDefinitionCommandInput,
  DeleteQueryDefinitionCommandOutput,
} from "./commands/DeleteQueryDefinitionCommand";
import {
  DeleteResourcePolicyCommand,
  DeleteResourcePolicyCommandInput,
  DeleteResourcePolicyCommandOutput,
} from "./commands/DeleteResourcePolicyCommand";
import {
  DeleteRetentionPolicyCommand,
  DeleteRetentionPolicyCommandInput,
  DeleteRetentionPolicyCommandOutput,
} from "./commands/DeleteRetentionPolicyCommand";
import {
  DeleteSubscriptionFilterCommand,
  DeleteSubscriptionFilterCommandInput,
  DeleteSubscriptionFilterCommandOutput,
} from "./commands/DeleteSubscriptionFilterCommand";
import {
  DescribeDestinationsCommand,
  DescribeDestinationsCommandInput,
  DescribeDestinationsCommandOutput,
} from "./commands/DescribeDestinationsCommand";
import {
  DescribeExportTasksCommand,
  DescribeExportTasksCommandInput,
  DescribeExportTasksCommandOutput,
} from "./commands/DescribeExportTasksCommand";
import {
  DescribeLogGroupsCommand,
  DescribeLogGroupsCommandInput,
  DescribeLogGroupsCommandOutput,
} from "./commands/DescribeLogGroupsCommand";
import {
  DescribeLogStreamsCommand,
  DescribeLogStreamsCommandInput,
  DescribeLogStreamsCommandOutput,
} from "./commands/DescribeLogStreamsCommand";
import {
  DescribeMetricFiltersCommand,
  DescribeMetricFiltersCommandInput,
  DescribeMetricFiltersCommandOutput,
} from "./commands/DescribeMetricFiltersCommand";
import {
  DescribeQueriesCommand,
  DescribeQueriesCommandInput,
  DescribeQueriesCommandOutput,
} from "./commands/DescribeQueriesCommand";
import {
  DescribeQueryDefinitionsCommand,
  DescribeQueryDefinitionsCommandInput,
  DescribeQueryDefinitionsCommandOutput,
} from "./commands/DescribeQueryDefinitionsCommand";
import {
  DescribeResourcePoliciesCommand,
  DescribeResourcePoliciesCommandInput,
  DescribeResourcePoliciesCommandOutput,
} from "./commands/DescribeResourcePoliciesCommand";
import {
  DescribeSubscriptionFiltersCommand,
  DescribeSubscriptionFiltersCommandInput,
  DescribeSubscriptionFiltersCommandOutput,
} from "./commands/DescribeSubscriptionFiltersCommand";
import {
  DisassociateKmsKeyCommand,
  DisassociateKmsKeyCommandInput,
  DisassociateKmsKeyCommandOutput,
} from "./commands/DisassociateKmsKeyCommand";
import {
  FilterLogEventsCommand,
  FilterLogEventsCommandInput,
  FilterLogEventsCommandOutput,
} from "./commands/FilterLogEventsCommand";
import {
  GetLogEventsCommand,
  GetLogEventsCommandInput,
  GetLogEventsCommandOutput,
} from "./commands/GetLogEventsCommand";
import {
  GetLogGroupFieldsCommand,
  GetLogGroupFieldsCommandInput,
  GetLogGroupFieldsCommandOutput,
} from "./commands/GetLogGroupFieldsCommand";
import {
  GetLogRecordCommand,
  GetLogRecordCommandInput,
  GetLogRecordCommandOutput,
} from "./commands/GetLogRecordCommand";
import {
  GetQueryResultsCommand,
  GetQueryResultsCommandInput,
  GetQueryResultsCommandOutput,
} from "./commands/GetQueryResultsCommand";
import {
  ListTagsLogGroupCommand,
  ListTagsLogGroupCommandInput,
  ListTagsLogGroupCommandOutput,
} from "./commands/ListTagsLogGroupCommand";
import {
  PutDestinationCommand,
  PutDestinationCommandInput,
  PutDestinationCommandOutput,
} from "./commands/PutDestinationCommand";
import {
  PutDestinationPolicyCommand,
  PutDestinationPolicyCommandInput,
  PutDestinationPolicyCommandOutput,
} from "./commands/PutDestinationPolicyCommand";
import {
  PutLogEventsCommand,
  PutLogEventsCommandInput,
  PutLogEventsCommandOutput,
} from "./commands/PutLogEventsCommand";
import {
  PutMetricFilterCommand,
  PutMetricFilterCommandInput,
  PutMetricFilterCommandOutput,
} from "./commands/PutMetricFilterCommand";
import {
  PutQueryDefinitionCommand,
  PutQueryDefinitionCommandInput,
  PutQueryDefinitionCommandOutput,
} from "./commands/PutQueryDefinitionCommand";
import {
  PutResourcePolicyCommand,
  PutResourcePolicyCommandInput,
  PutResourcePolicyCommandOutput,
} from "./commands/PutResourcePolicyCommand";
import {
  PutRetentionPolicyCommand,
  PutRetentionPolicyCommandInput,
  PutRetentionPolicyCommandOutput,
} from "./commands/PutRetentionPolicyCommand";
import {
  PutSubscriptionFilterCommand,
  PutSubscriptionFilterCommandInput,
  PutSubscriptionFilterCommandOutput,
} from "./commands/PutSubscriptionFilterCommand";
import { StartQueryCommand, StartQueryCommandInput, StartQueryCommandOutput } from "./commands/StartQueryCommand";
import { StopQueryCommand, StopQueryCommandInput, StopQueryCommandOutput } from "./commands/StopQueryCommand";
import { TagLogGroupCommand, TagLogGroupCommandInput, TagLogGroupCommandOutput } from "./commands/TagLogGroupCommand";
import {
  TestMetricFilterCommand,
  TestMetricFilterCommandInput,
  TestMetricFilterCommandOutput,
} from "./commands/TestMetricFilterCommand";
import {
  UntagLogGroupCommand,
  UntagLogGroupCommandInput,
  UntagLogGroupCommandOutput,
} from "./commands/UntagLogGroupCommand";
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
export class CloudWatchLogs extends CloudWatchLogsClient {
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
  public associateKmsKey(
    args: AssociateKmsKeyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<AssociateKmsKeyCommandOutput>;
  public associateKmsKey(
    args: AssociateKmsKeyCommandInput,
    cb: (err: any, data?: AssociateKmsKeyCommandOutput) => void
  ): void;
  public associateKmsKey(
    args: AssociateKmsKeyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: AssociateKmsKeyCommandOutput) => void
  ): void;
  public associateKmsKey(
    args: AssociateKmsKeyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: AssociateKmsKeyCommandOutput) => void),
    cb?: (err: any, data?: AssociateKmsKeyCommandOutput) => void
  ): Promise<AssociateKmsKeyCommandOutput> | void {
    const command = new AssociateKmsKeyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Cancels the specified export task.</p>
   *          <p>The task must be in the <code>PENDING</code> or <code>RUNNING</code> state.</p>
   */
  public cancelExportTask(
    args: CancelExportTaskCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CancelExportTaskCommandOutput>;
  public cancelExportTask(
    args: CancelExportTaskCommandInput,
    cb: (err: any, data?: CancelExportTaskCommandOutput) => void
  ): void;
  public cancelExportTask(
    args: CancelExportTaskCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CancelExportTaskCommandOutput) => void
  ): void;
  public cancelExportTask(
    args: CancelExportTaskCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CancelExportTaskCommandOutput) => void),
    cb?: (err: any, data?: CancelExportTaskCommandOutput) => void
  ): Promise<CancelExportTaskCommandOutput> | void {
    const command = new CancelExportTaskCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public createExportTask(
    args: CreateExportTaskCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateExportTaskCommandOutput>;
  public createExportTask(
    args: CreateExportTaskCommandInput,
    cb: (err: any, data?: CreateExportTaskCommandOutput) => void
  ): void;
  public createExportTask(
    args: CreateExportTaskCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateExportTaskCommandOutput) => void
  ): void;
  public createExportTask(
    args: CreateExportTaskCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateExportTaskCommandOutput) => void),
    cb?: (err: any, data?: CreateExportTaskCommandOutput) => void
  ): Promise<CreateExportTaskCommandOutput> | void {
    const command = new CreateExportTaskCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public createLogGroup(
    args: CreateLogGroupCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateLogGroupCommandOutput>;
  public createLogGroup(
    args: CreateLogGroupCommandInput,
    cb: (err: any, data?: CreateLogGroupCommandOutput) => void
  ): void;
  public createLogGroup(
    args: CreateLogGroupCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateLogGroupCommandOutput) => void
  ): void;
  public createLogGroup(
    args: CreateLogGroupCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateLogGroupCommandOutput) => void),
    cb?: (err: any, data?: CreateLogGroupCommandOutput) => void
  ): Promise<CreateLogGroupCommandOutput> | void {
    const command = new CreateLogGroupCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public createLogStream(
    args: CreateLogStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateLogStreamCommandOutput>;
  public createLogStream(
    args: CreateLogStreamCommandInput,
    cb: (err: any, data?: CreateLogStreamCommandOutput) => void
  ): void;
  public createLogStream(
    args: CreateLogStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateLogStreamCommandOutput) => void
  ): void;
  public createLogStream(
    args: CreateLogStreamCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateLogStreamCommandOutput) => void),
    cb?: (err: any, data?: CreateLogStreamCommandOutput) => void
  ): Promise<CreateLogStreamCommandOutput> | void {
    const command = new CreateLogStreamCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the specified destination, and eventually disables all the
   *       subscription filters that publish to it. This operation does not delete the
   *       physical resource encapsulated by the destination.</p>
   */
  public deleteDestination(
    args: DeleteDestinationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteDestinationCommandOutput>;
  public deleteDestination(
    args: DeleteDestinationCommandInput,
    cb: (err: any, data?: DeleteDestinationCommandOutput) => void
  ): void;
  public deleteDestination(
    args: DeleteDestinationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteDestinationCommandOutput) => void
  ): void;
  public deleteDestination(
    args: DeleteDestinationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteDestinationCommandOutput) => void),
    cb?: (err: any, data?: DeleteDestinationCommandOutput) => void
  ): Promise<DeleteDestinationCommandOutput> | void {
    const command = new DeleteDestinationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the specified log group and permanently deletes all the archived
   *       log events associated with the log group.</p>
   */
  public deleteLogGroup(
    args: DeleteLogGroupCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteLogGroupCommandOutput>;
  public deleteLogGroup(
    args: DeleteLogGroupCommandInput,
    cb: (err: any, data?: DeleteLogGroupCommandOutput) => void
  ): void;
  public deleteLogGroup(
    args: DeleteLogGroupCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteLogGroupCommandOutput) => void
  ): void;
  public deleteLogGroup(
    args: DeleteLogGroupCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteLogGroupCommandOutput) => void),
    cb?: (err: any, data?: DeleteLogGroupCommandOutput) => void
  ): Promise<DeleteLogGroupCommandOutput> | void {
    const command = new DeleteLogGroupCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the specified log stream and permanently deletes all the archived log events associated
   *       with the log stream.</p>
   */
  public deleteLogStream(
    args: DeleteLogStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteLogStreamCommandOutput>;
  public deleteLogStream(
    args: DeleteLogStreamCommandInput,
    cb: (err: any, data?: DeleteLogStreamCommandOutput) => void
  ): void;
  public deleteLogStream(
    args: DeleteLogStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteLogStreamCommandOutput) => void
  ): void;
  public deleteLogStream(
    args: DeleteLogStreamCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteLogStreamCommandOutput) => void),
    cb?: (err: any, data?: DeleteLogStreamCommandOutput) => void
  ): Promise<DeleteLogStreamCommandOutput> | void {
    const command = new DeleteLogStreamCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the specified metric filter.</p>
   */
  public deleteMetricFilter(
    args: DeleteMetricFilterCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteMetricFilterCommandOutput>;
  public deleteMetricFilter(
    args: DeleteMetricFilterCommandInput,
    cb: (err: any, data?: DeleteMetricFilterCommandOutput) => void
  ): void;
  public deleteMetricFilter(
    args: DeleteMetricFilterCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteMetricFilterCommandOutput) => void
  ): void;
  public deleteMetricFilter(
    args: DeleteMetricFilterCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteMetricFilterCommandOutput) => void),
    cb?: (err: any, data?: DeleteMetricFilterCommandOutput) => void
  ): Promise<DeleteMetricFilterCommandOutput> | void {
    const command = new DeleteMetricFilterCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a saved CloudWatch Logs Insights query definition.
   *       A query definition contains details about a saved CloudWatch Logs Insights query.</p>
   *          <p>Each <code>DeleteQueryDefinition</code> operation can delete one query definition.</p>
   *          <p>You must have the <code>logs:DeleteQueryDefinition</code> permission to be able to perform
   *       this operation.</p>
   */
  public deleteQueryDefinition(
    args: DeleteQueryDefinitionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteQueryDefinitionCommandOutput>;
  public deleteQueryDefinition(
    args: DeleteQueryDefinitionCommandInput,
    cb: (err: any, data?: DeleteQueryDefinitionCommandOutput) => void
  ): void;
  public deleteQueryDefinition(
    args: DeleteQueryDefinitionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteQueryDefinitionCommandOutput) => void
  ): void;
  public deleteQueryDefinition(
    args: DeleteQueryDefinitionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteQueryDefinitionCommandOutput) => void),
    cb?: (err: any, data?: DeleteQueryDefinitionCommandOutput) => void
  ): Promise<DeleteQueryDefinitionCommandOutput> | void {
    const command = new DeleteQueryDefinitionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a resource policy from this account. This revokes
   *     the access of the identities in that policy to put log events to this account.</p>
   */
  public deleteResourcePolicy(
    args: DeleteResourcePolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteResourcePolicyCommandOutput>;
  public deleteResourcePolicy(
    args: DeleteResourcePolicyCommandInput,
    cb: (err: any, data?: DeleteResourcePolicyCommandOutput) => void
  ): void;
  public deleteResourcePolicy(
    args: DeleteResourcePolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteResourcePolicyCommandOutput) => void
  ): void;
  public deleteResourcePolicy(
    args: DeleteResourcePolicyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteResourcePolicyCommandOutput) => void),
    cb?: (err: any, data?: DeleteResourcePolicyCommandOutput) => void
  ): Promise<DeleteResourcePolicyCommandOutput> | void {
    const command = new DeleteResourcePolicyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the specified retention policy.</p>
   *          <p>Log events do not expire if they belong to log groups without a retention policy.</p>
   */
  public deleteRetentionPolicy(
    args: DeleteRetentionPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteRetentionPolicyCommandOutput>;
  public deleteRetentionPolicy(
    args: DeleteRetentionPolicyCommandInput,
    cb: (err: any, data?: DeleteRetentionPolicyCommandOutput) => void
  ): void;
  public deleteRetentionPolicy(
    args: DeleteRetentionPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteRetentionPolicyCommandOutput) => void
  ): void;
  public deleteRetentionPolicy(
    args: DeleteRetentionPolicyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteRetentionPolicyCommandOutput) => void),
    cb?: (err: any, data?: DeleteRetentionPolicyCommandOutput) => void
  ): Promise<DeleteRetentionPolicyCommandOutput> | void {
    const command = new DeleteRetentionPolicyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the specified subscription filter.</p>
   */
  public deleteSubscriptionFilter(
    args: DeleteSubscriptionFilterCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteSubscriptionFilterCommandOutput>;
  public deleteSubscriptionFilter(
    args: DeleteSubscriptionFilterCommandInput,
    cb: (err: any, data?: DeleteSubscriptionFilterCommandOutput) => void
  ): void;
  public deleteSubscriptionFilter(
    args: DeleteSubscriptionFilterCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteSubscriptionFilterCommandOutput) => void
  ): void;
  public deleteSubscriptionFilter(
    args: DeleteSubscriptionFilterCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteSubscriptionFilterCommandOutput) => void),
    cb?: (err: any, data?: DeleteSubscriptionFilterCommandOutput) => void
  ): Promise<DeleteSubscriptionFilterCommandOutput> | void {
    const command = new DeleteSubscriptionFilterCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists all your destinations. The results are ASCII-sorted by destination name.</p>
   */
  public describeDestinations(
    args: DescribeDestinationsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeDestinationsCommandOutput>;
  public describeDestinations(
    args: DescribeDestinationsCommandInput,
    cb: (err: any, data?: DescribeDestinationsCommandOutput) => void
  ): void;
  public describeDestinations(
    args: DescribeDestinationsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeDestinationsCommandOutput) => void
  ): void;
  public describeDestinations(
    args: DescribeDestinationsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeDestinationsCommandOutput) => void),
    cb?: (err: any, data?: DescribeDestinationsCommandOutput) => void
  ): Promise<DescribeDestinationsCommandOutput> | void {
    const command = new DescribeDestinationsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the specified export tasks. You can list all your export tasks or filter
   *       the results based on task ID or task status.</p>
   */
  public describeExportTasks(
    args: DescribeExportTasksCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeExportTasksCommandOutput>;
  public describeExportTasks(
    args: DescribeExportTasksCommandInput,
    cb: (err: any, data?: DescribeExportTasksCommandOutput) => void
  ): void;
  public describeExportTasks(
    args: DescribeExportTasksCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeExportTasksCommandOutput) => void
  ): void;
  public describeExportTasks(
    args: DescribeExportTasksCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeExportTasksCommandOutput) => void),
    cb?: (err: any, data?: DescribeExportTasksCommandOutput) => void
  ): Promise<DescribeExportTasksCommandOutput> | void {
    const command = new DescribeExportTasksCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the specified log groups. You can list all your log groups or filter the results by prefix.
   *       The results are ASCII-sorted by log group name.</p>
   */
  public describeLogGroups(
    args: DescribeLogGroupsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeLogGroupsCommandOutput>;
  public describeLogGroups(
    args: DescribeLogGroupsCommandInput,
    cb: (err: any, data?: DescribeLogGroupsCommandOutput) => void
  ): void;
  public describeLogGroups(
    args: DescribeLogGroupsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeLogGroupsCommandOutput) => void
  ): void;
  public describeLogGroups(
    args: DescribeLogGroupsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeLogGroupsCommandOutput) => void),
    cb?: (err: any, data?: DescribeLogGroupsCommandOutput) => void
  ): Promise<DescribeLogGroupsCommandOutput> | void {
    const command = new DescribeLogGroupsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the log streams for the specified log group.
   *       You can list all the log streams or filter the results by prefix.
   *       You can also control how the results are ordered.</p>
   *          <p>This operation has a limit of five transactions per second, after which transactions are throttled.</p>
   */
  public describeLogStreams(
    args: DescribeLogStreamsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeLogStreamsCommandOutput>;
  public describeLogStreams(
    args: DescribeLogStreamsCommandInput,
    cb: (err: any, data?: DescribeLogStreamsCommandOutput) => void
  ): void;
  public describeLogStreams(
    args: DescribeLogStreamsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeLogStreamsCommandOutput) => void
  ): void;
  public describeLogStreams(
    args: DescribeLogStreamsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeLogStreamsCommandOutput) => void),
    cb?: (err: any, data?: DescribeLogStreamsCommandOutput) => void
  ): Promise<DescribeLogStreamsCommandOutput> | void {
    const command = new DescribeLogStreamsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the specified metric filters. You can list all of the metric filters or filter
   *       the results by log name, prefix, metric name, or metric namespace. The results are
   *       ASCII-sorted by filter name.</p>
   */
  public describeMetricFilters(
    args: DescribeMetricFiltersCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeMetricFiltersCommandOutput>;
  public describeMetricFilters(
    args: DescribeMetricFiltersCommandInput,
    cb: (err: any, data?: DescribeMetricFiltersCommandOutput) => void
  ): void;
  public describeMetricFilters(
    args: DescribeMetricFiltersCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeMetricFiltersCommandOutput) => void
  ): void;
  public describeMetricFilters(
    args: DescribeMetricFiltersCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeMetricFiltersCommandOutput) => void),
    cb?: (err: any, data?: DescribeMetricFiltersCommandOutput) => void
  ): Promise<DescribeMetricFiltersCommandOutput> | void {
    const command = new DescribeMetricFiltersCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Returns a list of CloudWatch Logs Insights queries that are scheduled, executing, or have
   *       been executed recently in this account. You can request all queries or limit it to queries of
   *       a specific log group or queries with a certain status.</p>
   */
  public describeQueries(
    args: DescribeQueriesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeQueriesCommandOutput>;
  public describeQueries(
    args: DescribeQueriesCommandInput,
    cb: (err: any, data?: DescribeQueriesCommandOutput) => void
  ): void;
  public describeQueries(
    args: DescribeQueriesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeQueriesCommandOutput) => void
  ): void;
  public describeQueries(
    args: DescribeQueriesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeQueriesCommandOutput) => void),
    cb?: (err: any, data?: DescribeQueriesCommandOutput) => void
  ): Promise<DescribeQueriesCommandOutput> | void {
    const command = new DescribeQueriesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>This operation returns a paginated list of your saved CloudWatch Logs Insights query definitions.</p>
   *          <p>You can use the <code>queryDefinitionNamePrefix</code> parameter to limit the results to only the
   *       query definitions that have names that start with a certain string.</p>
   */
  public describeQueryDefinitions(
    args: DescribeQueryDefinitionsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeQueryDefinitionsCommandOutput>;
  public describeQueryDefinitions(
    args: DescribeQueryDefinitionsCommandInput,
    cb: (err: any, data?: DescribeQueryDefinitionsCommandOutput) => void
  ): void;
  public describeQueryDefinitions(
    args: DescribeQueryDefinitionsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeQueryDefinitionsCommandOutput) => void
  ): void;
  public describeQueryDefinitions(
    args: DescribeQueryDefinitionsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeQueryDefinitionsCommandOutput) => void),
    cb?: (err: any, data?: DescribeQueryDefinitionsCommandOutput) => void
  ): Promise<DescribeQueryDefinitionsCommandOutput> | void {
    const command = new DescribeQueryDefinitionsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the resource policies in this account.</p>
   */
  public describeResourcePolicies(
    args: DescribeResourcePoliciesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeResourcePoliciesCommandOutput>;
  public describeResourcePolicies(
    args: DescribeResourcePoliciesCommandInput,
    cb: (err: any, data?: DescribeResourcePoliciesCommandOutput) => void
  ): void;
  public describeResourcePolicies(
    args: DescribeResourcePoliciesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeResourcePoliciesCommandOutput) => void
  ): void;
  public describeResourcePolicies(
    args: DescribeResourcePoliciesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeResourcePoliciesCommandOutput) => void),
    cb?: (err: any, data?: DescribeResourcePoliciesCommandOutput) => void
  ): Promise<DescribeResourcePoliciesCommandOutput> | void {
    const command = new DescribeResourcePoliciesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the subscription filters for the specified log group. You can list all the subscription filters or filter the results by prefix.
   *       The results are ASCII-sorted by filter name.</p>
   */
  public describeSubscriptionFilters(
    args: DescribeSubscriptionFiltersCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DescribeSubscriptionFiltersCommandOutput>;
  public describeSubscriptionFilters(
    args: DescribeSubscriptionFiltersCommandInput,
    cb: (err: any, data?: DescribeSubscriptionFiltersCommandOutput) => void
  ): void;
  public describeSubscriptionFilters(
    args: DescribeSubscriptionFiltersCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DescribeSubscriptionFiltersCommandOutput) => void
  ): void;
  public describeSubscriptionFilters(
    args: DescribeSubscriptionFiltersCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DescribeSubscriptionFiltersCommandOutput) => void),
    cb?: (err: any, data?: DescribeSubscriptionFiltersCommandOutput) => void
  ): Promise<DescribeSubscriptionFiltersCommandOutput> | void {
    const command = new DescribeSubscriptionFiltersCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disassociates the associated AWS Key Management Service (AWS KMS) customer master key (CMK) from the specified log group.</p>
   *          <p>After the AWS KMS CMK is disassociated from the log group, AWS CloudWatch Logs stops encrypting newly ingested data for the log group.
   *       All previously ingested data remains encrypted, and AWS CloudWatch Logs requires permissions for the CMK whenever the encrypted data is requested.</p>
   *          <p>Note that it can take up to 5 minutes for this operation to take effect.</p>
   */
  public disassociateKmsKey(
    args: DisassociateKmsKeyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DisassociateKmsKeyCommandOutput>;
  public disassociateKmsKey(
    args: DisassociateKmsKeyCommandInput,
    cb: (err: any, data?: DisassociateKmsKeyCommandOutput) => void
  ): void;
  public disassociateKmsKey(
    args: DisassociateKmsKeyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DisassociateKmsKeyCommandOutput) => void
  ): void;
  public disassociateKmsKey(
    args: DisassociateKmsKeyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DisassociateKmsKeyCommandOutput) => void),
    cb?: (err: any, data?: DisassociateKmsKeyCommandOutput) => void
  ): Promise<DisassociateKmsKeyCommandOutput> | void {
    const command = new DisassociateKmsKeyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public filterLogEvents(
    args: FilterLogEventsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<FilterLogEventsCommandOutput>;
  public filterLogEvents(
    args: FilterLogEventsCommandInput,
    cb: (err: any, data?: FilterLogEventsCommandOutput) => void
  ): void;
  public filterLogEvents(
    args: FilterLogEventsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: FilterLogEventsCommandOutput) => void
  ): void;
  public filterLogEvents(
    args: FilterLogEventsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: FilterLogEventsCommandOutput) => void),
    cb?: (err: any, data?: FilterLogEventsCommandOutput) => void
  ): Promise<FilterLogEventsCommandOutput> | void {
    const command = new FilterLogEventsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists log events from the specified log stream. You can list all of the log events or
   *       filter using a time range.</p>
   *
   *          <p>By default, this operation returns as many log events as can fit in a response size of 1MB (up to 10,000 log events).
   *       You can get additional log events by specifying one of the tokens in a subsequent call.
   *       This operation can return empty results while there are more log events available through the token.</p>
   */
  public getLogEvents(
    args: GetLogEventsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetLogEventsCommandOutput>;
  public getLogEvents(args: GetLogEventsCommandInput, cb: (err: any, data?: GetLogEventsCommandOutput) => void): void;
  public getLogEvents(
    args: GetLogEventsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetLogEventsCommandOutput) => void
  ): void;
  public getLogEvents(
    args: GetLogEventsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetLogEventsCommandOutput) => void),
    cb?: (err: any, data?: GetLogEventsCommandOutput) => void
  ): Promise<GetLogEventsCommandOutput> | void {
    const command = new GetLogEventsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public getLogGroupFields(
    args: GetLogGroupFieldsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetLogGroupFieldsCommandOutput>;
  public getLogGroupFields(
    args: GetLogGroupFieldsCommandInput,
    cb: (err: any, data?: GetLogGroupFieldsCommandOutput) => void
  ): void;
  public getLogGroupFields(
    args: GetLogGroupFieldsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetLogGroupFieldsCommandOutput) => void
  ): void;
  public getLogGroupFields(
    args: GetLogGroupFieldsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetLogGroupFieldsCommandOutput) => void),
    cb?: (err: any, data?: GetLogGroupFieldsCommandOutput) => void
  ): Promise<GetLogGroupFieldsCommandOutput> | void {
    const command = new GetLogGroupFieldsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves all of the fields and values of a single log event. All fields are retrieved,
   *       even if the original query that produced the <code>logRecordPointer</code> retrieved only a
   *       subset of fields. Fields are returned as field name/field value pairs.</p>
   *          <p>The full unparsed log event is returned within <code>@message</code>.</p>
   */
  public getLogRecord(
    args: GetLogRecordCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetLogRecordCommandOutput>;
  public getLogRecord(args: GetLogRecordCommandInput, cb: (err: any, data?: GetLogRecordCommandOutput) => void): void;
  public getLogRecord(
    args: GetLogRecordCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetLogRecordCommandOutput) => void
  ): void;
  public getLogRecord(
    args: GetLogRecordCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetLogRecordCommandOutput) => void),
    cb?: (err: any, data?: GetLogRecordCommandOutput) => void
  ): Promise<GetLogRecordCommandOutput> | void {
    const command = new GetLogRecordCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public getQueryResults(
    args: GetQueryResultsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetQueryResultsCommandOutput>;
  public getQueryResults(
    args: GetQueryResultsCommandInput,
    cb: (err: any, data?: GetQueryResultsCommandOutput) => void
  ): void;
  public getQueryResults(
    args: GetQueryResultsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetQueryResultsCommandOutput) => void
  ): void;
  public getQueryResults(
    args: GetQueryResultsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetQueryResultsCommandOutput) => void),
    cb?: (err: any, data?: GetQueryResultsCommandOutput) => void
  ): Promise<GetQueryResultsCommandOutput> | void {
    const command = new GetQueryResultsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Lists the tags for the specified log group.</p>
   */
  public listTagsLogGroup(
    args: ListTagsLogGroupCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListTagsLogGroupCommandOutput>;
  public listTagsLogGroup(
    args: ListTagsLogGroupCommandInput,
    cb: (err: any, data?: ListTagsLogGroupCommandOutput) => void
  ): void;
  public listTagsLogGroup(
    args: ListTagsLogGroupCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListTagsLogGroupCommandOutput) => void
  ): void;
  public listTagsLogGroup(
    args: ListTagsLogGroupCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListTagsLogGroupCommandOutput) => void),
    cb?: (err: any, data?: ListTagsLogGroupCommandOutput) => void
  ): Promise<ListTagsLogGroupCommandOutput> | void {
    const command = new ListTagsLogGroupCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public putDestination(
    args: PutDestinationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutDestinationCommandOutput>;
  public putDestination(
    args: PutDestinationCommandInput,
    cb: (err: any, data?: PutDestinationCommandOutput) => void
  ): void;
  public putDestination(
    args: PutDestinationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutDestinationCommandOutput) => void
  ): void;
  public putDestination(
    args: PutDestinationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutDestinationCommandOutput) => void),
    cb?: (err: any, data?: PutDestinationCommandOutput) => void
  ): Promise<PutDestinationCommandOutput> | void {
    const command = new PutDestinationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates or updates an access policy associated with an existing
   *       destination. An access policy is an <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/policies_overview.html">IAM policy document</a> that is used
   *       to authorize claims to register a subscription filter against a given destination.</p>
   */
  public putDestinationPolicy(
    args: PutDestinationPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutDestinationPolicyCommandOutput>;
  public putDestinationPolicy(
    args: PutDestinationPolicyCommandInput,
    cb: (err: any, data?: PutDestinationPolicyCommandOutput) => void
  ): void;
  public putDestinationPolicy(
    args: PutDestinationPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutDestinationPolicyCommandOutput) => void
  ): void;
  public putDestinationPolicy(
    args: PutDestinationPolicyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutDestinationPolicyCommandOutput) => void),
    cb?: (err: any, data?: PutDestinationPolicyCommandOutput) => void
  ): Promise<PutDestinationPolicyCommandOutput> | void {
    const command = new PutDestinationPolicyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public putLogEvents(
    args: PutLogEventsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutLogEventsCommandOutput>;
  public putLogEvents(args: PutLogEventsCommandInput, cb: (err: any, data?: PutLogEventsCommandOutput) => void): void;
  public putLogEvents(
    args: PutLogEventsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutLogEventsCommandOutput) => void
  ): void;
  public putLogEvents(
    args: PutLogEventsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutLogEventsCommandOutput) => void),
    cb?: (err: any, data?: PutLogEventsCommandOutput) => void
  ): Promise<PutLogEventsCommandOutput> | void {
    const command = new PutLogEventsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates or updates a metric filter and associates it with the specified log group.
   *       Metric filters allow you to configure rules to extract metric data from log events ingested
   *       through <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html">PutLogEvents</a>.</p>
   *          <p>The maximum number of metric filters that can be associated with a log group is
   *       100.</p>
   */
  public putMetricFilter(
    args: PutMetricFilterCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutMetricFilterCommandOutput>;
  public putMetricFilter(
    args: PutMetricFilterCommandInput,
    cb: (err: any, data?: PutMetricFilterCommandOutput) => void
  ): void;
  public putMetricFilter(
    args: PutMetricFilterCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutMetricFilterCommandOutput) => void
  ): void;
  public putMetricFilter(
    args: PutMetricFilterCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutMetricFilterCommandOutput) => void),
    cb?: (err: any, data?: PutMetricFilterCommandOutput) => void
  ): Promise<PutMetricFilterCommandOutput> | void {
    const command = new PutMetricFilterCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public putQueryDefinition(
    args: PutQueryDefinitionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutQueryDefinitionCommandOutput>;
  public putQueryDefinition(
    args: PutQueryDefinitionCommandInput,
    cb: (err: any, data?: PutQueryDefinitionCommandOutput) => void
  ): void;
  public putQueryDefinition(
    args: PutQueryDefinitionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutQueryDefinitionCommandOutput) => void
  ): void;
  public putQueryDefinition(
    args: PutQueryDefinitionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutQueryDefinitionCommandOutput) => void),
    cb?: (err: any, data?: PutQueryDefinitionCommandOutput) => void
  ): Promise<PutQueryDefinitionCommandOutput> | void {
    const command = new PutQueryDefinitionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates or updates a resource policy allowing other AWS services to put log events to
   *       this account, such as Amazon Route 53. An account can have up to 10 resource policies per AWS
   *       Region.</p>
   */
  public putResourcePolicy(
    args: PutResourcePolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutResourcePolicyCommandOutput>;
  public putResourcePolicy(
    args: PutResourcePolicyCommandInput,
    cb: (err: any, data?: PutResourcePolicyCommandOutput) => void
  ): void;
  public putResourcePolicy(
    args: PutResourcePolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutResourcePolicyCommandOutput) => void
  ): void;
  public putResourcePolicy(
    args: PutResourcePolicyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutResourcePolicyCommandOutput) => void),
    cb?: (err: any, data?: PutResourcePolicyCommandOutput) => void
  ): Promise<PutResourcePolicyCommandOutput> | void {
    const command = new PutResourcePolicyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Sets the retention of the specified log group. A retention policy allows you to
   *       configure the number of days for which to retain log events in the specified log
   *       group.</p>
   */
  public putRetentionPolicy(
    args: PutRetentionPolicyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutRetentionPolicyCommandOutput>;
  public putRetentionPolicy(
    args: PutRetentionPolicyCommandInput,
    cb: (err: any, data?: PutRetentionPolicyCommandOutput) => void
  ): void;
  public putRetentionPolicy(
    args: PutRetentionPolicyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutRetentionPolicyCommandOutput) => void
  ): void;
  public putRetentionPolicy(
    args: PutRetentionPolicyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutRetentionPolicyCommandOutput) => void),
    cb?: (err: any, data?: PutRetentionPolicyCommandOutput) => void
  ): Promise<PutRetentionPolicyCommandOutput> | void {
    const command = new PutRetentionPolicyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

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
  public putSubscriptionFilter(
    args: PutSubscriptionFilterCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutSubscriptionFilterCommandOutput>;
  public putSubscriptionFilter(
    args: PutSubscriptionFilterCommandInput,
    cb: (err: any, data?: PutSubscriptionFilterCommandOutput) => void
  ): void;
  public putSubscriptionFilter(
    args: PutSubscriptionFilterCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutSubscriptionFilterCommandOutput) => void
  ): void;
  public putSubscriptionFilter(
    args: PutSubscriptionFilterCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutSubscriptionFilterCommandOutput) => void),
    cb?: (err: any, data?: PutSubscriptionFilterCommandOutput) => void
  ): Promise<PutSubscriptionFilterCommandOutput> | void {
    const command = new PutSubscriptionFilterCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Schedules a query of a log group using CloudWatch Logs Insights. You specify the log group
   *       and time range to query and the query string to use.</p>
   *          <p>For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html">CloudWatch Logs Insights Query Syntax</a>.</p>
   *
   *          <p>Queries time out after 15 minutes of execution. If your queries are timing out, reduce the
   *       time range being searched or partition your query into a number of queries.</p>
   */
  public startQuery(args: StartQueryCommandInput, options?: __HttpHandlerOptions): Promise<StartQueryCommandOutput>;
  public startQuery(args: StartQueryCommandInput, cb: (err: any, data?: StartQueryCommandOutput) => void): void;
  public startQuery(
    args: StartQueryCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartQueryCommandOutput) => void
  ): void;
  public startQuery(
    args: StartQueryCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartQueryCommandOutput) => void),
    cb?: (err: any, data?: StartQueryCommandOutput) => void
  ): Promise<StartQueryCommandOutput> | void {
    const command = new StartQueryCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Stops a CloudWatch Logs Insights query that is in progress. If the query has already ended, the operation
   *     returns an error indicating that the specified query is not running.</p>
   */
  public stopQuery(args: StopQueryCommandInput, options?: __HttpHandlerOptions): Promise<StopQueryCommandOutput>;
  public stopQuery(args: StopQueryCommandInput, cb: (err: any, data?: StopQueryCommandOutput) => void): void;
  public stopQuery(
    args: StopQueryCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StopQueryCommandOutput) => void
  ): void;
  public stopQuery(
    args: StopQueryCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StopQueryCommandOutput) => void),
    cb?: (err: any, data?: StopQueryCommandOutput) => void
  ): Promise<StopQueryCommandOutput> | void {
    const command = new StopQueryCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Adds or updates the specified tags for the specified log group.</p>
   *          <p>To list the tags for a log group, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_ListTagsLogGroup.html">ListTagsLogGroup</a>.
   *       To remove tags, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_UntagLogGroup.html">UntagLogGroup</a>.</p>
   *          <p>For more information about tags, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#log-group-tagging">Tag Log Groups in Amazon CloudWatch Logs</a>
   *       in the <i>Amazon CloudWatch Logs User Guide</i>.</p>
   */
  public tagLogGroup(args: TagLogGroupCommandInput, options?: __HttpHandlerOptions): Promise<TagLogGroupCommandOutput>;
  public tagLogGroup(args: TagLogGroupCommandInput, cb: (err: any, data?: TagLogGroupCommandOutput) => void): void;
  public tagLogGroup(
    args: TagLogGroupCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: TagLogGroupCommandOutput) => void
  ): void;
  public tagLogGroup(
    args: TagLogGroupCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: TagLogGroupCommandOutput) => void),
    cb?: (err: any, data?: TagLogGroupCommandOutput) => void
  ): Promise<TagLogGroupCommandOutput> | void {
    const command = new TagLogGroupCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Tests the filter pattern of a metric filter against a sample of log event messages. You
   *       can use this operation to validate the correctness of a metric filter pattern.</p>
   */
  public testMetricFilter(
    args: TestMetricFilterCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<TestMetricFilterCommandOutput>;
  public testMetricFilter(
    args: TestMetricFilterCommandInput,
    cb: (err: any, data?: TestMetricFilterCommandOutput) => void
  ): void;
  public testMetricFilter(
    args: TestMetricFilterCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: TestMetricFilterCommandOutput) => void
  ): void;
  public testMetricFilter(
    args: TestMetricFilterCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: TestMetricFilterCommandOutput) => void),
    cb?: (err: any, data?: TestMetricFilterCommandOutput) => void
  ): Promise<TestMetricFilterCommandOutput> | void {
    const command = new TestMetricFilterCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Removes the specified tags from the specified log group.</p>
   *          <p>To list the tags for a log group, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_ListTagsLogGroup.html">ListTagsLogGroup</a>.
   *       To add tags, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_TagLogGroup.html">TagLogGroup</a>.</p>
   */
  public untagLogGroup(
    args: UntagLogGroupCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UntagLogGroupCommandOutput>;
  public untagLogGroup(
    args: UntagLogGroupCommandInput,
    cb: (err: any, data?: UntagLogGroupCommandOutput) => void
  ): void;
  public untagLogGroup(
    args: UntagLogGroupCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UntagLogGroupCommandOutput) => void
  ): void;
  public untagLogGroup(
    args: UntagLogGroupCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UntagLogGroupCommandOutput) => void),
    cb?: (err: any, data?: UntagLogGroupCommandOutput) => void
  ): Promise<UntagLogGroupCommandOutput> | void {
    const command = new UntagLogGroupCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }
}
