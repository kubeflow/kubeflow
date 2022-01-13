import { __extends } from "tslib";
import { BatchDetectSyntaxRequest, BatchDetectSyntaxResponse } from "../models/models_0";
import { deserializeAws_json1_1BatchDetectSyntaxCommand, serializeAws_json1_1BatchDetectSyntaxCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Inspects the text of a batch of documents for the syntax and part of speech of the words
 *       in the document and returns information about them. For more information, see <a>how-syntax</a>.</p>
 */
var BatchDetectSyntaxCommand = /** @class */ (function (_super) {
    __extends(BatchDetectSyntaxCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function BatchDetectSyntaxCommand(input) {
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
    BatchDetectSyntaxCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "BatchDetectSyntaxCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: BatchDetectSyntaxRequest.filterSensitiveLog,
            outputFilterSensitiveLog: BatchDetectSyntaxResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    BatchDetectSyntaxCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1BatchDetectSyntaxCommand(input, context);
    };
    BatchDetectSyntaxCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1BatchDetectSyntaxCommand(output, context);
    };
    return BatchDetectSyntaxCommand;
}($Command));
export { BatchDetectSyntaxCommand };
//# sourceMappingURL=BatchDetectSyntaxCommand.js.map