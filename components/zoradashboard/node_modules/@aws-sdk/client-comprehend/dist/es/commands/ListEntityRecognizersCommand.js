import { __extends } from "tslib";
import { ListEntityRecognizersRequest, ListEntityRecognizersResponse } from "../models/models_0";
import { deserializeAws_json1_1ListEntityRecognizersCommand, serializeAws_json1_1ListEntityRecognizersCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets a list of the properties of all entity recognizers that you created, including
 *       recognizers currently in training. Allows you to filter the list of recognizers based on
 *       criteria such as status and submission time. This call returns up to 500 entity recognizers in
 *       the list, with a default number of 100 recognizers in the list.</p>
 *          <p>The results of this list are not in any particular order. Please get the list and sort
 *       locally if needed.</p>
 */
var ListEntityRecognizersCommand = /** @class */ (function (_super) {
    __extends(ListEntityRecognizersCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListEntityRecognizersCommand(input) {
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
    ListEntityRecognizersCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "ListEntityRecognizersCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListEntityRecognizersRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListEntityRecognizersResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListEntityRecognizersCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListEntityRecognizersCommand(input, context);
    };
    ListEntityRecognizersCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListEntityRecognizersCommand(output, context);
    };
    return ListEntityRecognizersCommand;
}($Command));
export { ListEntityRecognizersCommand };
//# sourceMappingURL=ListEntityRecognizersCommand.js.map