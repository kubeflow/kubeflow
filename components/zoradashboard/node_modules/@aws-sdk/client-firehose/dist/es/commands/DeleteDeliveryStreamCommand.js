import { __extends } from "tslib";
import { DeleteDeliveryStreamInput, DeleteDeliveryStreamOutput } from "../models/models_0";
import { deserializeAws_json1_1DeleteDeliveryStreamCommand, serializeAws_json1_1DeleteDeliveryStreamCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes a delivery stream and its data.</p>
 *          <p>To check the state of a delivery stream, use <a>DescribeDeliveryStream</a>. You can delete a delivery stream only if it is in one of the following states:
 *             <code>ACTIVE</code>, <code>DELETING</code>, <code>CREATING_FAILED</code>, or
 *             <code>DELETING_FAILED</code>. You can't delete a delivery stream that is in the
 *             <code>CREATING</code> state. While the deletion request is in process, the delivery
 *          stream is in the <code>DELETING</code> state.</p>
 *          <p>While the delivery stream is in the <code>DELETING</code> state, the service might
 *          continue to accept records, but it doesn't make any guarantees with respect to delivering
 *          the data. Therefore, as a best practice, first stop any applications that are sending
 *          records before you delete a delivery stream.</p>
 */
var DeleteDeliveryStreamCommand = /** @class */ (function (_super) {
    __extends(DeleteDeliveryStreamCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteDeliveryStreamCommand(input) {
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
    DeleteDeliveryStreamCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "FirehoseClient";
        var commandName = "DeleteDeliveryStreamCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteDeliveryStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteDeliveryStreamOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteDeliveryStreamCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteDeliveryStreamCommand(input, context);
    };
    DeleteDeliveryStreamCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteDeliveryStreamCommand(output, context);
    };
    return DeleteDeliveryStreamCommand;
}($Command));
export { DeleteDeliveryStreamCommand };
//# sourceMappingURL=DeleteDeliveryStreamCommand.js.map