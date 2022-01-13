import { __extends } from "tslib";
import { RemoveTagsFromStreamInput } from "../models/models_0";
import { deserializeAws_json1_1RemoveTagsFromStreamCommand, serializeAws_json1_1RemoveTagsFromStreamCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Removes tags from the specified Kinesis data stream. Removed tags are deleted and
 *             cannot be recovered after this operation successfully completes.</p>
 *         <p>If you specify a tag that does not exist, it is ignored.</p>
 *         <p>
 *             <a>RemoveTagsFromStream</a> has a limit of five transactions per second per
 *             account.</p>
 */
var RemoveTagsFromStreamCommand = /** @class */ (function (_super) {
    __extends(RemoveTagsFromStreamCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function RemoveTagsFromStreamCommand(input) {
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
    RemoveTagsFromStreamCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "RemoveTagsFromStreamCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: RemoveTagsFromStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    RemoveTagsFromStreamCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1RemoveTagsFromStreamCommand(input, context);
    };
    RemoveTagsFromStreamCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1RemoveTagsFromStreamCommand(output, context);
    };
    return RemoveTagsFromStreamCommand;
}($Command));
export { RemoveTagsFromStreamCommand };
//# sourceMappingURL=RemoveTagsFromStreamCommand.js.map