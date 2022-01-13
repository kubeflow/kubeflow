import { __extends } from "tslib";
import { DetectSyntaxRequest, DetectSyntaxResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectSyntaxCommand, serializeAws_json1_1DetectSyntaxCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Inspects text for syntax and the part of speech of words in the document. For more
 *       information, <a>how-syntax</a>.</p>
 */
var DetectSyntaxCommand = /** @class */ (function (_super) {
    __extends(DetectSyntaxCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectSyntaxCommand(input) {
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
    DetectSyntaxCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DetectSyntaxCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectSyntaxRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectSyntaxResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectSyntaxCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectSyntaxCommand(input, context);
    };
    DetectSyntaxCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectSyntaxCommand(output, context);
    };
    return DetectSyntaxCommand;
}($Command));
export { DetectSyntaxCommand };
//# sourceMappingURL=DetectSyntaxCommand.js.map