import { __extends } from "tslib";
import { ListSentimentDetectionJobsRequest, ListSentimentDetectionJobsResponse } from "../models/models_0";
import { deserializeAws_json1_1ListSentimentDetectionJobsCommand, serializeAws_json1_1ListSentimentDetectionJobsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets a list of sentiment detection jobs that you have submitted.</p>
 */
var ListSentimentDetectionJobsCommand = /** @class */ (function (_super) {
    __extends(ListSentimentDetectionJobsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListSentimentDetectionJobsCommand(input) {
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
    ListSentimentDetectionJobsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "ListSentimentDetectionJobsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListSentimentDetectionJobsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListSentimentDetectionJobsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListSentimentDetectionJobsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListSentimentDetectionJobsCommand(input, context);
    };
    ListSentimentDetectionJobsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListSentimentDetectionJobsCommand(output, context);
    };
    return ListSentimentDetectionJobsCommand;
}($Command));
export { ListSentimentDetectionJobsCommand };
//# sourceMappingURL=ListSentimentDetectionJobsCommand.js.map