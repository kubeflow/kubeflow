import { __extends } from "tslib";
import { DescribeExportTasksRequest, DescribeExportTasksResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeExportTasksCommand, serializeAws_json1_1DescribeExportTasksCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the specified export tasks. You can list all your export tasks or filter
 *       the results based on task ID or task status.</p>
 */
var DescribeExportTasksCommand = /** @class */ (function (_super) {
    __extends(DescribeExportTasksCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeExportTasksCommand(input) {
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
    DescribeExportTasksCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "DescribeExportTasksCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeExportTasksRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeExportTasksResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeExportTasksCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeExportTasksCommand(input, context);
    };
    DescribeExportTasksCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeExportTasksCommand(output, context);
    };
    return DescribeExportTasksCommand;
}($Command));
export { DescribeExportTasksCommand };
//# sourceMappingURL=DescribeExportTasksCommand.js.map