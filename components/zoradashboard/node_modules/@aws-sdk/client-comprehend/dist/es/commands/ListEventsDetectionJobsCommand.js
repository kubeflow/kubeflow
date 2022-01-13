import { __extends } from "tslib";
import { ListEventsDetectionJobsRequest, ListEventsDetectionJobsResponse } from "../models/models_0";
import { deserializeAws_json1_1ListEventsDetectionJobsCommand, serializeAws_json1_1ListEventsDetectionJobsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets a list of the events detection jobs that you have submitted.</p>
 */
var ListEventsDetectionJobsCommand = /** @class */ (function (_super) {
    __extends(ListEventsDetectionJobsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListEventsDetectionJobsCommand(input) {
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
    ListEventsDetectionJobsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "ListEventsDetectionJobsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListEventsDetectionJobsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListEventsDetectionJobsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListEventsDetectionJobsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListEventsDetectionJobsCommand(input, context);
    };
    ListEventsDetectionJobsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListEventsDetectionJobsCommand(output, context);
    };
    return ListEventsDetectionJobsCommand;
}($Command));
export { ListEventsDetectionJobsCommand };
//# sourceMappingURL=ListEventsDetectionJobsCommand.js.map