import { __extends } from "tslib";
import { DetectEntitiesRequest, DetectEntitiesResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectEntitiesCommand, serializeAws_json1_1DetectEntitiesCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Inspects text for named entities, and returns information about them. For more
 *       information, about named entities, see <a>how-entities</a>. </p>
 */
var DetectEntitiesCommand = /** @class */ (function (_super) {
    __extends(DetectEntitiesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectEntitiesCommand(input) {
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
    DetectEntitiesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DetectEntitiesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectEntitiesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectEntitiesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectEntitiesCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectEntitiesCommand(input, context);
    };
    DetectEntitiesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectEntitiesCommand(output, context);
    };
    return DetectEntitiesCommand;
}($Command));
export { DetectEntitiesCommand };
//# sourceMappingURL=DetectEntitiesCommand.js.map