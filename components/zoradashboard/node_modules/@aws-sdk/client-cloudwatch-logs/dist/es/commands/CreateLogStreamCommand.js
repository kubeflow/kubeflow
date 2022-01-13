import { __extends } from "tslib";
import { CreateLogStreamRequest } from "../models/models_0";
import { deserializeAws_json1_1CreateLogStreamCommand, serializeAws_json1_1CreateLogStreamCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var CreateLogStreamCommand = /** @class */ (function (_super) {
    __extends(CreateLogStreamCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateLogStreamCommand(input) {
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
    CreateLogStreamCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "CreateLogStreamCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateLogStreamRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateLogStreamCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1CreateLogStreamCommand(input, context);
    };
    CreateLogStreamCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1CreateLogStreamCommand(output, context);
    };
    return CreateLogStreamCommand;
}($Command));
export { CreateLogStreamCommand };
//# sourceMappingURL=CreateLogStreamCommand.js.map