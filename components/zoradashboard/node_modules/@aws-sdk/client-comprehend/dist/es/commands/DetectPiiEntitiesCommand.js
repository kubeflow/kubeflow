import { __extends } from "tslib";
import { DetectPiiEntitiesRequest, DetectPiiEntitiesResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectPiiEntitiesCommand, serializeAws_json1_1DetectPiiEntitiesCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Inspects the input text for entities that contain personally identifiable information
 *       (PII) and returns information about them.</p>
 */
var DetectPiiEntitiesCommand = /** @class */ (function (_super) {
    __extends(DetectPiiEntitiesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectPiiEntitiesCommand(input) {
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
    DetectPiiEntitiesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DetectPiiEntitiesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectPiiEntitiesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectPiiEntitiesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectPiiEntitiesCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectPiiEntitiesCommand(input, context);
    };
    DetectPiiEntitiesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectPiiEntitiesCommand(output, context);
    };
    return DetectPiiEntitiesCommand;
}($Command));
export { DetectPiiEntitiesCommand };
//# sourceMappingURL=DetectPiiEntitiesCommand.js.map