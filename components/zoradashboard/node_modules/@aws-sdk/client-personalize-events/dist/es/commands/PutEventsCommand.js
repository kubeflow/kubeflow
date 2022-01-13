import { __extends } from "tslib";
import { PutEventsRequest } from "../models/models_0";
import { deserializeAws_restJson1PutEventsCommand, serializeAws_restJson1PutEventsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Records user interaction event data. For more information see <a>event-record-api</a>.</p>
 */
var PutEventsCommand = /** @class */ (function (_super) {
    __extends(PutEventsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutEventsCommand(input) {
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
    PutEventsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PersonalizeEventsClient";
        var commandName = "PutEventsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutEventsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutEventsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1PutEventsCommand(input, context);
    };
    PutEventsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1PutEventsCommand(output, context);
    };
    return PutEventsCommand;
}($Command));
export { PutEventsCommand };
//# sourceMappingURL=PutEventsCommand.js.map