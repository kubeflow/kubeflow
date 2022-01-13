import { __extends } from "tslib";
import { ListTagsForDeliveryStreamInput, ListTagsForDeliveryStreamOutput } from "../models/models_0";
import { deserializeAws_json1_1ListTagsForDeliveryStreamCommand, serializeAws_json1_1ListTagsForDeliveryStreamCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the tags for the specified delivery stream. This operation has a limit of five
 *          transactions per second per account. </p>
 */
var ListTagsForDeliveryStreamCommand = /** @class */ (function (_super) {
    __extends(ListTagsForDeliveryStreamCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListTagsForDeliveryStreamCommand(input) {
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
    ListTagsForDeliveryStreamCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "FirehoseClient";
        var commandName = "ListTagsForDeliveryStreamCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListTagsForDeliveryStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListTagsForDeliveryStreamOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListTagsForDeliveryStreamCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListTagsForDeliveryStreamCommand(input, context);
    };
    ListTagsForDeliveryStreamCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListTagsForDeliveryStreamCommand(output, context);
    };
    return ListTagsForDeliveryStreamCommand;
}($Command));
export { ListTagsForDeliveryStreamCommand };
//# sourceMappingURL=ListTagsForDeliveryStreamCommand.js.map