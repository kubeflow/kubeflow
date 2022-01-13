import { __extends } from "tslib";
import { GetQueryResultsRequest, GetQueryResultsResponse } from "../models/models_0";
import { deserializeAws_json1_1GetQueryResultsCommand, serializeAws_json1_1GetQueryResultsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var GetQueryResultsCommand = /** @class */ (function (_super) {
    __extends(GetQueryResultsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetQueryResultsCommand(input) {
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
    GetQueryResultsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "GetQueryResultsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetQueryResultsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetQueryResultsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetQueryResultsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1GetQueryResultsCommand(input, context);
    };
    GetQueryResultsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1GetQueryResultsCommand(output, context);
    };
    return GetQueryResultsCommand;
}($Command));
export { GetQueryResultsCommand };
//# sourceMappingURL=GetQueryResultsCommand.js.map