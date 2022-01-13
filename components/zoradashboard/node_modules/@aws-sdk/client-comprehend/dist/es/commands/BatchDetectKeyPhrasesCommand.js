import { __extends } from "tslib";
import { BatchDetectKeyPhrasesRequest, BatchDetectKeyPhrasesResponse } from "../models/models_0";
import { deserializeAws_json1_1BatchDetectKeyPhrasesCommand, serializeAws_json1_1BatchDetectKeyPhrasesCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Detects the key noun phrases found in a batch of documents.</p>
 */
var BatchDetectKeyPhrasesCommand = /** @class */ (function (_super) {
    __extends(BatchDetectKeyPhrasesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function BatchDetectKeyPhrasesCommand(input) {
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
    BatchDetectKeyPhrasesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "BatchDetectKeyPhrasesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: BatchDetectKeyPhrasesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: BatchDetectKeyPhrasesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    BatchDetectKeyPhrasesCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1BatchDetectKeyPhrasesCommand(input, context);
    };
    BatchDetectKeyPhrasesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1BatchDetectKeyPhrasesCommand(output, context);
    };
    return BatchDetectKeyPhrasesCommand;
}($Command));
export { BatchDetectKeyPhrasesCommand };
//# sourceMappingURL=BatchDetectKeyPhrasesCommand.js.map