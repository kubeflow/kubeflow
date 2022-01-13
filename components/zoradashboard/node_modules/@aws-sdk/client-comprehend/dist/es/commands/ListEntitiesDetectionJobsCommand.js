import { __extends } from "tslib";
import { ListEntitiesDetectionJobsRequest, ListEntitiesDetectionJobsResponse } from "../models/models_0";
import { deserializeAws_json1_1ListEntitiesDetectionJobsCommand, serializeAws_json1_1ListEntitiesDetectionJobsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets a list of the entity detection jobs that you have submitted.</p>
 */
var ListEntitiesDetectionJobsCommand = /** @class */ (function (_super) {
    __extends(ListEntitiesDetectionJobsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListEntitiesDetectionJobsCommand(input) {
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
    ListEntitiesDetectionJobsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "ListEntitiesDetectionJobsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListEntitiesDetectionJobsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListEntitiesDetectionJobsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListEntitiesDetectionJobsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListEntitiesDetectionJobsCommand(input, context);
    };
    ListEntitiesDetectionJobsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListEntitiesDetectionJobsCommand(output, context);
    };
    return ListEntitiesDetectionJobsCommand;
}($Command));
export { ListEntitiesDetectionJobsCommand };
//# sourceMappingURL=ListEntitiesDetectionJobsCommand.js.map