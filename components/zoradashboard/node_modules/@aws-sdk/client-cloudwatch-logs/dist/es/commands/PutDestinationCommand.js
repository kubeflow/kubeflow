import { __extends } from "tslib";
import { PutDestinationRequest, PutDestinationResponse } from "../models/models_0";
import { deserializeAws_json1_1PutDestinationCommand, serializeAws_json1_1PutDestinationCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates or updates a destination. This operation is used only to create destinations for cross-account subscriptions.</p>
 *          <p>A destination encapsulates a physical resource (such
 *       as an Amazon Kinesis stream) and enables you to subscribe to a real-time stream of log events
 *       for a different account, ingested using <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html">PutLogEvents</a>.</p>
 *          <p>Through an access policy, a destination controls what is written to it.
 *       By default, <code>PutDestination</code> does not set any access policy with the destination,
 *       which means a cross-account user cannot call <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html">PutSubscriptionFilter</a> against
 *       this destination. To enable this, the destination owner must call <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutDestinationPolicy.html">PutDestinationPolicy</a> after <code>PutDestination</code>.</p>
 *          <p>To perform a <code>PutDestination</code> operation, you must also have the
 *     <code>iam:PassRole</code> permission.</p>
 */
var PutDestinationCommand = /** @class */ (function (_super) {
    __extends(PutDestinationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutDestinationCommand(input) {
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
    PutDestinationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "PutDestinationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutDestinationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: PutDestinationResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutDestinationCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1PutDestinationCommand(input, context);
    };
    PutDestinationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1PutDestinationCommand(output, context);
    };
    return PutDestinationCommand;
}($Command));
export { PutDestinationCommand };
//# sourceMappingURL=PutDestinationCommand.js.map