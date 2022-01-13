import { __extends } from "tslib";
import { CreateExportTaskRequest, CreateExportTaskResponse } from "../models/models_0";
import { deserializeAws_json1_1CreateExportTaskCommand, serializeAws_json1_1CreateExportTaskCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var CreateExportTaskCommand = /** @class */ (function (_super) {
    __extends(CreateExportTaskCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateExportTaskCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    CreateExportTaskCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "CreateExportTaskCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateExportTaskRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateExportTaskResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateExportTaskCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1CreateExportTaskCommand(input, context);
    };
    CreateExportTaskCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1CreateExportTaskCommand(output, context);
    };
    return CreateExportTaskCommand;
}($Command));
export { CreateExportTaskCommand };
//# sourceMappingURL=CreateExportTaskCommand.js.map