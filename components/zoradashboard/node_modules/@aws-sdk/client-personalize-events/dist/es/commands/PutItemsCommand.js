import { __extends } from "tslib";
import { PutItemsRequest } from "../models/models_0";
import { deserializeAws_restJson1PutItemsCommand, serializeAws_restJson1PutItemsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Adds one or more items to an Items dataset. For more information see
 *       <a>importing-items</a>.</p>
 */
var PutItemsCommand = /** @class */ (function (_super) {
    __extends(PutItemsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutItemsCommand(input) {
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
    PutItemsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PersonalizeEventsClient";
        var commandName = "PutItemsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutItemsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutItemsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1PutItemsCommand(input, context);
    };
    PutItemsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1PutItemsCommand(output, context);
    };
    return PutItemsCommand;
}($Command));
export { PutItemsCommand };
//# sourceMappingURL=PutItemsCommand.js.map