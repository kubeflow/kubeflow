import { __extends } from "tslib";
import { CancelExportTaskRequest } from "../models/models_0";
import { deserializeAws_json1_1CancelExportTaskCommand, serializeAws_json1_1CancelExportTaskCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Cancels the specified export task.</p>
 *          <p>The task must be in the <code>PENDING</code> or <code>RUNNING</code> state.</p>
 */
var CancelExportTaskCommand = /** @class */ (function (_super) {
    __extends(CancelExportTaskCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CancelExportTaskCommand(input) {
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
    CancelExportTaskCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "CancelExportTaskCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CancelExportTaskRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CancelExportTaskCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1CancelExportTaskCommand(input, context);
    };
    CancelExportTaskCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1CancelExportTaskCommand(output, context);
    };
    return CancelExportTaskCommand;
}($Command));
export { CancelExportTaskCommand };
//# sourceMappingURL=CancelExportTaskCommand.js.map