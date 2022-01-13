import { __extends } from "tslib";
import { FilterLogEventsRequest, FilterLogEventsResponse } from "../models/models_0";
import { deserializeAws_json1_1FilterLogEventsCommand, serializeAws_json1_1FilterLogEventsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var FilterLogEventsCommand = /** @class */ (function (_super) {
    __extends(FilterLogEventsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function FilterLogEventsCommand(input) {
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
    FilterLogEventsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "FilterLogEventsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: FilterLogEventsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: FilterLogEventsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    FilterLogEventsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1FilterLogEventsCommand(input, context);
    };
    FilterLogEventsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1FilterLogEventsCommand(output, context);
    };
    return FilterLogEventsCommand;
}($Command));
export { FilterLogEventsCommand };
//# sourceMappingURL=FilterLogEventsCommand.js.map