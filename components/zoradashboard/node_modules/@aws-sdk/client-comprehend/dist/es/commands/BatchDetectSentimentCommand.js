import { __extends } from "tslib";
import { BatchDetectSentimentRequest, BatchDetectSentimentResponse } from "../models/models_0";
import { deserializeAws_json1_1BatchDetectSentimentCommand, serializeAws_json1_1BatchDetectSentimentCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Inspects a batch of documents and returns an inference of the prevailing sentiment,
 *         <code>POSITIVE</code>, <code>NEUTRAL</code>, <code>MIXED</code>, or <code>NEGATIVE</code>,
 *       in each one.</p>
 */
var BatchDetectSentimentCommand = /** @class */ (function (_super) {
    __extends(BatchDetectSentimentCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function BatchDetectSentimentCommand(input) {
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
    BatchDetectSentimentCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "BatchDetectSentimentCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: BatchDetectSentimentRequest.filterSensitiveLog,
            outputFilterSensitiveLog: BatchDetectSentimentResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    BatchDetectSentimentCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1BatchDetectSentimentCommand(input, context);
    };
    BatchDetectSentimentCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1BatchDetectSentimentCommand(output, context);
    };
    return BatchDetectSentimentCommand;
}($Command));
export { BatchDetectSentimentCommand };
//# sourceMappingURL=BatchDetectSentimentCommand.js.map