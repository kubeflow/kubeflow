import { __extends } from "tslib";
import { DetectSentimentRequest, DetectSentimentResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectSentimentCommand, serializeAws_json1_1DetectSentimentCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Inspects text and returns an inference of the prevailing sentiment
 *         (<code>POSITIVE</code>, <code>NEUTRAL</code>, <code>MIXED</code>, or <code>NEGATIVE</code>). </p>
 */
var DetectSentimentCommand = /** @class */ (function (_super) {
    __extends(DetectSentimentCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectSentimentCommand(input) {
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
    DetectSentimentCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DetectSentimentCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectSentimentRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectSentimentResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectSentimentCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectSentimentCommand(input, context);
    };
    DetectSentimentCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectSentimentCommand(output, context);
    };
    return DetectSentimentCommand;
}($Command));
export { DetectSentimentCommand };
//# sourceMappingURL=DetectSentimentCommand.js.map