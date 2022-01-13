import { __extends } from "tslib";
import { DescribeSentimentDetectionJobRequest, DescribeSentimentDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeSentimentDetectionJobCommand, serializeAws_json1_1DescribeSentimentDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the properties associated with a sentiment detection job. Use this operation to get
 *       the status of a detection job.</p>
 */
var DescribeSentimentDetectionJobCommand = /** @class */ (function (_super) {
    __extends(DescribeSentimentDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeSentimentDetectionJobCommand(input) {
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
    DescribeSentimentDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DescribeSentimentDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeSentimentDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeSentimentDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeSentimentDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeSentimentDetectionJobCommand(input, context);
    };
    DescribeSentimentDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeSentimentDetectionJobCommand(output, context);
    };
    return DescribeSentimentDetectionJobCommand;
}($Command));
export { DescribeSentimentDetectionJobCommand };
//# sourceMappingURL=DescribeSentimentDetectionJobCommand.js.map