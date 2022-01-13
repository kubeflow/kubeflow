import { __extends } from "tslib";
import { DescribeEntitiesDetectionJobRequest, DescribeEntitiesDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeEntitiesDetectionJobCommand, serializeAws_json1_1DescribeEntitiesDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the properties associated with an entities detection job. Use this operation to get
 *       the status of a detection job.</p>
 */
var DescribeEntitiesDetectionJobCommand = /** @class */ (function (_super) {
    __extends(DescribeEntitiesDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeEntitiesDetectionJobCommand(input) {
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
    DescribeEntitiesDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DescribeEntitiesDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeEntitiesDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeEntitiesDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeEntitiesDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeEntitiesDetectionJobCommand(input, context);
    };
    DescribeEntitiesDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeEntitiesDetectionJobCommand(output, context);
    };
    return DescribeEntitiesDetectionJobCommand;
}($Command));
export { DescribeEntitiesDetectionJobCommand };
//# sourceMappingURL=DescribeEntitiesDetectionJobCommand.js.map