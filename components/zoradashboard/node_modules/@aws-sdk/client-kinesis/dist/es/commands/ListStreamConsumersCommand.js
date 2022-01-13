import { __extends } from "tslib";
import { ListStreamConsumersInput, ListStreamConsumersOutput } from "../models/models_0";
import { deserializeAws_json1_1ListStreamConsumersCommand, serializeAws_json1_1ListStreamConsumersCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the consumers registered to receive data from a stream using enhanced fan-out,
 *             and provides information about each consumer.</p>
 *         <p>This operation has a limit of 5 transactions per second per stream.</p>
 */
var ListStreamConsumersCommand = /** @class */ (function (_super) {
    __extends(ListStreamConsumersCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListStreamConsumersCommand(input) {
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
    ListStreamConsumersCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "ListStreamConsumersCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListStreamConsumersInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListStreamConsumersOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListStreamConsumersCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListStreamConsumersCommand(input, context);
    };
    ListStreamConsumersCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListStreamConsumersCommand(output, context);
    };
    return ListStreamConsumersCommand;
}($Command));
export { ListStreamConsumersCommand };
//# sourceMappingURL=ListStreamConsumersCommand.js.map