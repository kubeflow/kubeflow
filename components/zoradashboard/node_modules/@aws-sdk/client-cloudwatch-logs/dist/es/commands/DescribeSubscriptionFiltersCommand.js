import { __extends } from "tslib";
import { DescribeSubscriptionFiltersRequest, DescribeSubscriptionFiltersResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeSubscriptionFiltersCommand, serializeAws_json1_1DescribeSubscriptionFiltersCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the subscription filters for the specified log group. You can list all the subscription filters or filter the results by prefix.
 *       The results are ASCII-sorted by filter name.</p>
 */
var DescribeSubscriptionFiltersCommand = /** @class */ (function (_super) {
    __extends(DescribeSubscriptionFiltersCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeSubscriptionFiltersCommand(input) {
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
    DescribeSubscriptionFiltersCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "DescribeSubscriptionFiltersCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeSubscriptionFiltersRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeSubscriptionFiltersResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeSubscriptionFiltersCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeSubscriptionFiltersCommand(input, context);
    };
    DescribeSubscriptionFiltersCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeSubscriptionFiltersCommand(output, context);
    };
    return DescribeSubscriptionFiltersCommand;
}($Command));
export { DescribeSubscriptionFiltersCommand };
//# sourceMappingURL=DescribeSubscriptionFiltersCommand.js.map