import { __extends } from "tslib";
import { DescribeQueryDefinitionsRequest, DescribeQueryDefinitionsResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeQueryDefinitionsCommand, serializeAws_json1_1DescribeQueryDefinitionsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>This operation returns a paginated list of your saved CloudWatch Logs Insights query definitions.</p>
 *          <p>You can use the <code>queryDefinitionNamePrefix</code> parameter to limit the results to only the
 *       query definitions that have names that start with a certain string.</p>
 */
var DescribeQueryDefinitionsCommand = /** @class */ (function (_super) {
    __extends(DescribeQueryDefinitionsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeQueryDefinitionsCommand(input) {
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
    DescribeQueryDefinitionsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "DescribeQueryDefinitionsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeQueryDefinitionsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeQueryDefinitionsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeQueryDefinitionsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeQueryDefinitionsCommand(input, context);
    };
    DescribeQueryDefinitionsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeQueryDefinitionsCommand(output, context);
    };
    return DescribeQueryDefinitionsCommand;
}($Command));
export { DescribeQueryDefinitionsCommand };
//# sourceMappingURL=DescribeQueryDefinitionsCommand.js.map