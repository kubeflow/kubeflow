import { __extends } from "tslib";
import { UntagLogGroupRequest } from "../models/models_0";
import { deserializeAws_json1_1UntagLogGroupCommand, serializeAws_json1_1UntagLogGroupCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Removes the specified tags from the specified log group.</p>
 *          <p>To list the tags for a log group, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_ListTagsLogGroup.html">ListTagsLogGroup</a>.
 *       To add tags, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_TagLogGroup.html">TagLogGroup</a>.</p>
 */
var UntagLogGroupCommand = /** @class */ (function (_super) {
    __extends(UntagLogGroupCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UntagLogGroupCommand(input) {
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
    UntagLogGroupCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "UntagLogGroupCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UntagLogGroupRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UntagLogGroupCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1UntagLogGroupCommand(input, context);
    };
    UntagLogGroupCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1UntagLogGroupCommand(output, context);
    };
    return UntagLogGroupCommand;
}($Command));
export { UntagLogGroupCommand };
//# sourceMappingURL=UntagLogGroupCommand.js.map