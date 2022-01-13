import { __extends } from "tslib";
import { ListTextTranslationJobsRequest, ListTextTranslationJobsResponse } from "../models/models_0";
import { deserializeAws_json1_1ListTextTranslationJobsCommand, serializeAws_json1_1ListTextTranslationJobsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets a list of the batch translation jobs that you have submitted.</p>
 */
var ListTextTranslationJobsCommand = /** @class */ (function (_super) {
    __extends(ListTextTranslationJobsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListTextTranslationJobsCommand(input) {
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
    ListTextTranslationJobsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TranslateClient";
        var commandName = "ListTextTranslationJobsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListTextTranslationJobsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListTextTranslationJobsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListTextTranslationJobsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListTextTranslationJobsCommand(input, context);
    };
    ListTextTranslationJobsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListTextTranslationJobsCommand(output, context);
    };
    return ListTextTranslationJobsCommand;
}($Command));
export { ListTextTranslationJobsCommand };
//# sourceMappingURL=ListTextTranslationJobsCommand.js.map