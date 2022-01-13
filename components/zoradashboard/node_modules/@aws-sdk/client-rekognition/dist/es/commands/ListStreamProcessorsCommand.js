import { __extends } from "tslib";
import { ListStreamProcessorsRequest, ListStreamProcessorsResponse } from "../models/models_0";
import { deserializeAws_json1_1ListStreamProcessorsCommand, serializeAws_json1_1ListStreamProcessorsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets a list of stream processors that you have created with <a>CreateStreamProcessor</a>. </p>
 */
var ListStreamProcessorsCommand = /** @class */ (function (_super) {
    __extends(ListStreamProcessorsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListStreamProcessorsCommand(input) {
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
    ListStreamProcessorsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "ListStreamProcessorsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListStreamProcessorsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListStreamProcessorsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListStreamProcessorsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListStreamProcessorsCommand(input, context);
    };
    ListStreamProcessorsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListStreamProcessorsCommand(output, context);
    };
    return ListStreamProcessorsCommand;
}($Command));
export { ListStreamProcessorsCommand };
//# sourceMappingURL=ListStreamProcessorsCommand.js.map