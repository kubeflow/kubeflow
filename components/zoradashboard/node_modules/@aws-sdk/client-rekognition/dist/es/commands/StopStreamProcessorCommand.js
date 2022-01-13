import { __extends } from "tslib";
import { StopStreamProcessorRequest, StopStreamProcessorResponse } from "../models/models_0";
import { deserializeAws_json1_1StopStreamProcessorCommand, serializeAws_json1_1StopStreamProcessorCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Stops a running stream processor that was created by <a>CreateStreamProcessor</a>.</p>
 */
var StopStreamProcessorCommand = /** @class */ (function (_super) {
    __extends(StopStreamProcessorCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StopStreamProcessorCommand(input) {
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
    StopStreamProcessorCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "StopStreamProcessorCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StopStreamProcessorRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StopStreamProcessorResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StopStreamProcessorCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StopStreamProcessorCommand(input, context);
    };
    StopStreamProcessorCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StopStreamProcessorCommand(output, context);
    };
    return StopStreamProcessorCommand;
}($Command));
export { StopStreamProcessorCommand };
//# sourceMappingURL=StopStreamProcessorCommand.js.map