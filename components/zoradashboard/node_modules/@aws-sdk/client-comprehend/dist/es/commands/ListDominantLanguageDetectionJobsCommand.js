import { __extends } from "tslib";
import { ListDominantLanguageDetectionJobsRequest, ListDominantLanguageDetectionJobsResponse, } from "../models/models_0";
import { deserializeAws_json1_1ListDominantLanguageDetectionJobsCommand, serializeAws_json1_1ListDominantLanguageDetectionJobsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets a list of the dominant language detection jobs that you have submitted.</p>
 */
var ListDominantLanguageDetectionJobsCommand = /** @class */ (function (_super) {
    __extends(ListDominantLanguageDetectionJobsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListDominantLanguageDetectionJobsCommand(input) {
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
    ListDominantLanguageDetectionJobsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "ListDominantLanguageDetectionJobsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListDominantLanguageDetectionJobsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListDominantLanguageDetectionJobsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListDominantLanguageDetectionJobsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListDominantLanguageDetectionJobsCommand(input, context);
    };
    ListDominantLanguageDetectionJobsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListDominantLanguageDetectionJobsCommand(output, context);
    };
    return ListDominantLanguageDetectionJobsCommand;
}($Command));
export { ListDominantLanguageDetectionJobsCommand };
//# sourceMappingURL=ListDominantLanguageDetectionJobsCommand.js.map