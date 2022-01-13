import { __extends } from "tslib";
import { DetectDominantLanguageRequest, DetectDominantLanguageResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectDominantLanguageCommand, serializeAws_json1_1DetectDominantLanguageCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Determines the dominant language of the input text. For a list of languages that Amazon
 *       Comprehend can detect, see <a href="https://docs.aws.amazon.com/comprehend/latest/dg/how-languages.html">Amazon Comprehend Supported Languages</a>. </p>
 */
var DetectDominantLanguageCommand = /** @class */ (function (_super) {
    __extends(DetectDominantLanguageCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectDominantLanguageCommand(input) {
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
    DetectDominantLanguageCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DetectDominantLanguageCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectDominantLanguageRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectDominantLanguageResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectDominantLanguageCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectDominantLanguageCommand(input, context);
    };
    DetectDominantLanguageCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectDominantLanguageCommand(output, context);
    };
    return DetectDominantLanguageCommand;
}($Command));
export { DetectDominantLanguageCommand };
//# sourceMappingURL=DetectDominantLanguageCommand.js.map