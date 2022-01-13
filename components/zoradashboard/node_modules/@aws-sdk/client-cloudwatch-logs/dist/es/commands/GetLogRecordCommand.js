import { __extends } from "tslib";
import { GetLogRecordRequest, GetLogRecordResponse } from "../models/models_0";
import { deserializeAws_json1_1GetLogRecordCommand, serializeAws_json1_1GetLogRecordCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Retrieves all of the fields and values of a single log event. All fields are retrieved,
 *       even if the original query that produced the <code>logRecordPointer</code> retrieved only a
 *       subset of fields. Fields are returned as field name/field value pairs.</p>
 *          <p>The full unparsed log event is returned within <code>@message</code>.</p>
 */
var GetLogRecordCommand = /** @class */ (function (_super) {
    __extends(GetLogRecordCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetLogRecordCommand(input) {
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
    GetLogRecordCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "GetLogRecordCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetLogRecordRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetLogRecordResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetLogRecordCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1GetLogRecordCommand(input, context);
    };
    GetLogRecordCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1GetLogRecordCommand(output, context);
    };
    return GetLogRecordCommand;
}($Command));
export { GetLogRecordCommand };
//# sourceMappingURL=GetLogRecordCommand.js.map