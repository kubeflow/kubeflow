import { __extends } from "tslib";
import { StartQueryRequest, StartQueryResponse } from "../models/models_0";
import { deserializeAws_json1_1StartQueryCommand, serializeAws_json1_1StartQueryCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Schedules a query of a log group using CloudWatch Logs Insights. You specify the log group
 *       and time range to query and the query string to use.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html">CloudWatch Logs Insights Query Syntax</a>.</p>
 *
 *          <p>Queries time out after 15 minutes of execution. If your queries are timing out, reduce the
 *       time range being searched or partition your query into a number of queries.</p>
 */
var StartQueryCommand = /** @class */ (function (_super) {
    __extends(StartQueryCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartQueryCommand(input) {
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
    StartQueryCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "StartQueryCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartQueryRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartQueryResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartQueryCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartQueryCommand(input, context);
    };
    StartQueryCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartQueryCommand(output, context);
    };
    return StartQueryCommand;
}($Command));
export { StartQueryCommand };
//# sourceMappingURL=StartQueryCommand.js.map