import { __extends } from "tslib";
import { CloudWatchLogsClient } from "./CloudWatchLogsClient";
import { AssociateKmsKeyCommand, } from "./commands/AssociateKmsKeyCommand";
import { CancelExportTaskCommand, } from "./commands/CancelExportTaskCommand";
import { CreateExportTaskCommand, } from "./commands/CreateExportTaskCommand";
import { CreateLogGroupCommand, } from "./commands/CreateLogGroupCommand";
import { CreateLogStreamCommand, } from "./commands/CreateLogStreamCommand";
import { DeleteDestinationCommand, } from "./commands/DeleteDestinationCommand";
import { DeleteLogGroupCommand, } from "./commands/DeleteLogGroupCommand";
import { DeleteLogStreamCommand, } from "./commands/DeleteLogStreamCommand";
import { DeleteMetricFilterCommand, } from "./commands/DeleteMetricFilterCommand";
import { DeleteQueryDefinitionCommand, } from "./commands/DeleteQueryDefinitionCommand";
import { DeleteResourcePolicyCommand, } from "./commands/DeleteResourcePolicyCommand";
import { DeleteRetentionPolicyCommand, } from "./commands/DeleteRetentionPolicyCommand";
import { DeleteSubscriptionFilterCommand, } from "./commands/DeleteSubscriptionFilterCommand";
import { DescribeDestinationsCommand, } from "./commands/DescribeDestinationsCommand";
import { DescribeExportTasksCommand, } from "./commands/DescribeExportTasksCommand";
import { DescribeLogGroupsCommand, } from "./commands/DescribeLogGroupsCommand";
import { DescribeLogStreamsCommand, } from "./commands/DescribeLogStreamsCommand";
import { DescribeMetricFiltersCommand, } from "./commands/DescribeMetricFiltersCommand";
import { DescribeQueriesCommand, } from "./commands/DescribeQueriesCommand";
import { DescribeQueryDefinitionsCommand, } from "./commands/DescribeQueryDefinitionsCommand";
import { DescribeResourcePoliciesCommand, } from "./commands/DescribeResourcePoliciesCommand";
import { DescribeSubscriptionFiltersCommand, } from "./commands/DescribeSubscriptionFiltersCommand";
import { DisassociateKmsKeyCommand, } from "./commands/DisassociateKmsKeyCommand";
import { FilterLogEventsCommand, } from "./commands/FilterLogEventsCommand";
import { GetLogEventsCommand, } from "./commands/GetLogEventsCommand";
import { GetLogGroupFieldsCommand, } from "./commands/GetLogGroupFieldsCommand";
import { GetLogRecordCommand, } from "./commands/GetLogRecordCommand";
import { GetQueryResultsCommand, } from "./commands/GetQueryResultsCommand";
import { ListTagsLogGroupCommand, } from "./commands/ListTagsLogGroupCommand";
import { PutDestinationCommand, } from "./commands/PutDestinationCommand";
import { PutDestinationPolicyCommand, } from "./commands/PutDestinationPolicyCommand";
import { PutLogEventsCommand, } from "./commands/PutLogEventsCommand";
import { PutMetricFilterCommand, } from "./commands/PutMetricFilterCommand";
import { PutQueryDefinitionCommand, } from "./commands/PutQueryDefinitionCommand";
import { PutResourcePolicyCommand, } from "./commands/PutResourcePolicyCommand";
import { PutRetentionPolicyCommand, } from "./commands/PutRetentionPolicyCommand";
import { PutSubscriptionFilterCommand, } from "./commands/PutSubscriptionFilterCommand";
import { StartQueryCommand } from "./commands/StartQueryCommand";
import { StopQueryCommand } from "./commands/StopQueryCommand";
import { TagLogGroupCommand } from "./commands/TagLogGroupCommand";
import { TestMetricFilterCommand, } from "./commands/TestMetricFilterCommand";
import { UntagLogGroupCommand, } from "./commands/UntagLogGroupCommand";
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
var CloudWatchLogs = /** @class */ (function (_super) {
    __extends(CloudWatchLogs, _super);
    function CloudWatchLogs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloudWatchLogs.prototype.associateKmsKey = function (args, optionsOrCb, cb) {
        var command = new AssociateKmsKeyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.cancelExportTask = function (args, optionsOrCb, cb) {
        var command = new CancelExportTaskCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.createExportTask = function (args, optionsOrCb, cb) {
        var command = new CreateExportTaskCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.createLogGroup = function (args, optionsOrCb, cb) {
        var command = new CreateLogGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.createLogStream = function (args, optionsOrCb, cb) {
        var command = new CreateLogStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.deleteDestination = function (args, optionsOrCb, cb) {
        var command = new DeleteDestinationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.deleteLogGroup = function (args, optionsOrCb, cb) {
        var command = new DeleteLogGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.deleteLogStream = function (args, optionsOrCb, cb) {
        var command = new DeleteLogStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.deleteMetricFilter = function (args, optionsOrCb, cb) {
        var command = new DeleteMetricFilterCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.deleteQueryDefinition = function (args, optionsOrCb, cb) {
        var command = new DeleteQueryDefinitionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.deleteResourcePolicy = function (args, optionsOrCb, cb) {
        var command = new DeleteResourcePolicyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.deleteRetentionPolicy = function (args, optionsOrCb, cb) {
        var command = new DeleteRetentionPolicyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.deleteSubscriptionFilter = function (args, optionsOrCb, cb) {
        var command = new DeleteSubscriptionFilterCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.describeDestinations = function (args, optionsOrCb, cb) {
        var command = new DescribeDestinationsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.describeExportTasks = function (args, optionsOrCb, cb) {
        var command = new DescribeExportTasksCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.describeLogGroups = function (args, optionsOrCb, cb) {
        var command = new DescribeLogGroupsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.describeLogStreams = function (args, optionsOrCb, cb) {
        var command = new DescribeLogStreamsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.describeMetricFilters = function (args, optionsOrCb, cb) {
        var command = new DescribeMetricFiltersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.describeQueries = function (args, optionsOrCb, cb) {
        var command = new DescribeQueriesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.describeQueryDefinitions = function (args, optionsOrCb, cb) {
        var command = new DescribeQueryDefinitionsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.describeResourcePolicies = function (args, optionsOrCb, cb) {
        var command = new DescribeResourcePoliciesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.describeSubscriptionFilters = function (args, optionsOrCb, cb) {
        var command = new DescribeSubscriptionFiltersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.disassociateKmsKey = function (args, optionsOrCb, cb) {
        var command = new DisassociateKmsKeyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.filterLogEvents = function (args, optionsOrCb, cb) {
        var command = new FilterLogEventsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.getLogEvents = function (args, optionsOrCb, cb) {
        var command = new GetLogEventsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.getLogGroupFields = function (args, optionsOrCb, cb) {
        var command = new GetLogGroupFieldsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.getLogRecord = function (args, optionsOrCb, cb) {
        var command = new GetLogRecordCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.getQueryResults = function (args, optionsOrCb, cb) {
        var command = new GetQueryResultsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.listTagsLogGroup = function (args, optionsOrCb, cb) {
        var command = new ListTagsLogGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.putDestination = function (args, optionsOrCb, cb) {
        var command = new PutDestinationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.putDestinationPolicy = function (args, optionsOrCb, cb) {
        var command = new PutDestinationPolicyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.putLogEvents = function (args, optionsOrCb, cb) {
        var command = new PutLogEventsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.putMetricFilter = function (args, optionsOrCb, cb) {
        var command = new PutMetricFilterCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.putQueryDefinition = function (args, optionsOrCb, cb) {
        var command = new PutQueryDefinitionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.putResourcePolicy = function (args, optionsOrCb, cb) {
        var command = new PutResourcePolicyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.putRetentionPolicy = function (args, optionsOrCb, cb) {
        var command = new PutRetentionPolicyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.putSubscriptionFilter = function (args, optionsOrCb, cb) {
        var command = new PutSubscriptionFilterCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.startQuery = function (args, optionsOrCb, cb) {
        var command = new StartQueryCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.stopQuery = function (args, optionsOrCb, cb) {
        var command = new StopQueryCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.tagLogGroup = function (args, optionsOrCb, cb) {
        var command = new TagLogGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.testMetricFilter = function (args, optionsOrCb, cb) {
        var command = new TestMetricFilterCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudWatchLogs.prototype.untagLogGroup = function (args, optionsOrCb, cb) {
        var command = new UntagLogGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get " + typeof optionsOrCb);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    return CloudWatchLogs;
}(CloudWatchLogsClient));
export { CloudWatchLogs };
//# sourceMappingURL=CloudWatchLogs.js.map