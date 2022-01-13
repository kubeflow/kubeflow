import { __extends } from "tslib";
import { ListTopicsDetectionJobsRequest, ListTopicsDetectionJobsResponse } from "../models/models_0";
import { deserializeAws_json1_1ListTopicsDetectionJobsCommand, serializeAws_json1_1ListTopicsDetectionJobsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets a list of the topic detection jobs that you have submitted.</p>
 */
var ListTopicsDetectionJobsCommand = /** @class */ (function (_super) {
    __extends(ListTopicsDetectionJobsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListTopicsDetectionJobsCommand(input) {
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
    ListTopicsDetectionJobsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "ListTopicsDetectionJobsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListTopicsDetectionJobsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListTopicsDetectionJobsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListTopicsDetectionJobsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListTopicsDetectionJobsCommand(input, context);
    };
    ListTopicsDetectionJobsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListTopicsDetectionJobsCommand(output, context);
    };
    return ListTopicsDetectionJobsCommand;
}($Command));
export { ListTopicsDetectionJobsCommand };
//# sourceMappingURL=ListTopicsDetectionJobsCommand.js.map