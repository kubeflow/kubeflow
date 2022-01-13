"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExportTaskCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class CreateExportTaskCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "CloudWatchLogsClient";
        const commandName = "CreateExportTaskCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CreateExportTaskRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.CreateExportTaskResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1CreateExportTaskCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1CreateExportTaskCommand(output, context);
    }
}
exports.CreateExportTaskCommand = CreateExportTaskCommand;
//# sourceMappingURL=CreateExportTaskCommand.js.map