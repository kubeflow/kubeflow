import { __extends } from "tslib";
import { ListKeyPhrasesDetectionJobsRequest, ListKeyPhrasesDetectionJobsResponse } from "../models/models_0";
import { deserializeAws_json1_1ListKeyPhrasesDetectionJobsCommand, serializeAws_json1_1ListKeyPhrasesDetectionJobsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Get a list of key phrase detection jobs that you have submitted.</p>
 */
var ListKeyPhrasesDetectionJobsCommand = /** @class */ (function (_super) {
    __extends(ListKeyPhrasesDetectionJobsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListKeyPhrasesDetectionJobsCommand(input) {
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
    ListKeyPhrasesDetectionJobsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "ListKeyPhrasesDetectionJobsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListKeyPhrasesDetectionJobsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListKeyPhrasesDetectionJobsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListKeyPhrasesDetectionJobsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListKeyPhrasesDetectionJobsCommand(input, context);
    };
    ListKeyPhrasesDetectionJobsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListKeyPhrasesDetectionJobsCommand(output, context);
    };
    return ListKeyPhrasesDetectionJobsCommand;
}($Command));
export { ListKeyPhrasesDetectionJobsCommand };
//# sourceMappingURL=ListKeyPhrasesDetectionJobsCommand.js.map