import { __extends } from "tslib";
import { StartTextTranslationJobRequest, StartTextTranslationJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StartTextTranslationJobCommand, serializeAws_json1_1StartTextTranslationJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts an asynchronous batch translation job. Batch translation jobs can be used to
 *       translate large volumes of text across multiple documents at once. For more information, see
 *         <a>async</a>.</p>
 *
 *          <p>Batch translation jobs can be described with the <a>DescribeTextTranslationJob</a> operation, listed with the <a>ListTextTranslationJobs</a> operation, and stopped with the <a>StopTextTranslationJob</a> operation.</p>
 *          <note>
 *             <p>Amazon Translate does not support batch translation of multiple source languages at once.</p>
 *          </note>
 */
var StartTextTranslationJobCommand = /** @class */ (function (_super) {
    __extends(StartTextTranslationJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartTextTranslationJobCommand(input) {
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
    StartTextTranslationJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TranslateClient";
        var commandName = "StartTextTranslationJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartTextTranslationJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartTextTranslationJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartTextTranslationJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartTextTranslationJobCommand(input, context);
    };
    StartTextTranslationJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartTextTranslationJobCommand(output, context);
    };
    return StartTextTranslationJobCommand;
}($Command));
export { StartTextTranslationJobCommand };
//# sourceMappingURL=StartTextTranslationJobCommand.js.map