import { __extends } from "tslib";
import { ListTagsLogGroupRequest, ListTagsLogGroupResponse } from "../models/models_0";
import { deserializeAws_json1_1ListTagsLogGroupCommand, serializeAws_json1_1ListTagsLogGroupCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the tags for the specified log group.</p>
 */
var ListTagsLogGroupCommand = /** @class */ (function (_super) {
    __extends(ListTagsLogGroupCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListTagsLogGroupCommand(input) {
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
    ListTagsLogGroupCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "ListTagsLogGroupCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListTagsLogGroupRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListTagsLogGroupResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListTagsLogGroupCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListTagsLogGroupCommand(input, context);
    };
    ListTagsLogGroupCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListTagsLogGroupCommand(output, context);
    };
    return ListTagsLogGroupCommand;
}($Command));
export { ListTagsLogGroupCommand };
//# sourceMappingURL=ListTagsLogGroupCommand.js.map