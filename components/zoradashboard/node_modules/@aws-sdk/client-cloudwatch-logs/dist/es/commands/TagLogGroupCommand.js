import { __extends } from "tslib";
import { TagLogGroupRequest } from "../models/models_0";
import { deserializeAws_json1_1TagLogGroupCommand, serializeAws_json1_1TagLogGroupCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Adds or updates the specified tags for the specified log group.</p>
 *          <p>To list the tags for a log group, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_ListTagsLogGroup.html">ListTagsLogGroup</a>.
 *       To remove tags, use <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_UntagLogGroup.html">UntagLogGroup</a>.</p>
 *          <p>For more information about tags, see <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#log-group-tagging">Tag Log Groups in Amazon CloudWatch Logs</a>
 *       in the <i>Amazon CloudWatch Logs User Guide</i>.</p>
 */
var TagLogGroupCommand = /** @class */ (function (_super) {
    __extends(TagLogGroupCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function TagLogGroupCommand(input) {
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
    TagLogGroupCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "TagLogGroupCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: TagLogGroupRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    TagLogGroupCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1TagLogGroupCommand(input, context);
    };
    TagLogGroupCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1TagLogGroupCommand(output, context);
    };
    return TagLogGroupCommand;
}($Command));
export { TagLogGroupCommand };
//# sourceMappingURL=TagLogGroupCommand.js.map