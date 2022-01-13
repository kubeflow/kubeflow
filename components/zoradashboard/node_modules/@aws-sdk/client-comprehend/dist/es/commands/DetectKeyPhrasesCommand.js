import { __extends } from "tslib";
import { DetectKeyPhrasesRequest, DetectKeyPhrasesResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectKeyPhrasesCommand, serializeAws_json1_1DetectKeyPhrasesCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Detects the key noun phrases found in the text. </p>
 */
var DetectKeyPhrasesCommand = /** @class */ (function (_super) {
    __extends(DetectKeyPhrasesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectKeyPhrasesCommand(input) {
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
    DetectKeyPhrasesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DetectKeyPhrasesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectKeyPhrasesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectKeyPhrasesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectKeyPhrasesCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectKeyPhrasesCommand(input, context);
    };
    DetectKeyPhrasesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectKeyPhrasesCommand(output, context);
    };
    return DetectKeyPhrasesCommand;
}($Command));
export { DetectKeyPhrasesCommand };
//# sourceMappingURL=DetectKeyPhrasesCommand.js.map