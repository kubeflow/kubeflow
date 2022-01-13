import { __extends } from "tslib";
import { ListTagsForStreamInput, ListTagsForStreamOutput } from "../models/models_0";
import { deserializeAws_json1_1ListTagsForStreamCommand, serializeAws_json1_1ListTagsForStreamCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the tags for the specified Kinesis data stream. This operation has a limit of
 *             five transactions per second per account.</p>
 */
var ListTagsForStreamCommand = /** @class */ (function (_super) {
    __extends(ListTagsForStreamCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListTagsForStreamCommand(input) {
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
    ListTagsForStreamCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "ListTagsForStreamCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListTagsForStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListTagsForStreamOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListTagsForStreamCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListTagsForStreamCommand(input, context);
    };
    ListTagsForStreamCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListTagsForStreamCommand(output, context);
    };
    return ListTagsForStreamCommand;
}($Command));
export { ListTagsForStreamCommand };
//# sourceMappingURL=ListTagsForStreamCommand.js.map