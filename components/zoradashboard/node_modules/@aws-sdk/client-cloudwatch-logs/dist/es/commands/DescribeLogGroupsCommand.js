import { __extends } from "tslib";
import { DescribeLogGroupsRequest, DescribeLogGroupsResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeLogGroupsCommand, serializeAws_json1_1DescribeLogGroupsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the specified log groups. You can list all your log groups or filter the results by prefix.
 *       The results are ASCII-sorted by log group name.</p>
 */
var DescribeLogGroupsCommand = /** @class */ (function (_super) {
    __extends(DescribeLogGroupsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeLogGroupsCommand(input) {
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
    DescribeLogGroupsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "DescribeLogGroupsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeLogGroupsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeLogGroupsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeLogGroupsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeLogGroupsCommand(input, context);
    };
    DescribeLogGroupsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeLogGroupsCommand(output, context);
    };
    return DescribeLogGroupsCommand;
}($Command));
export { DescribeLogGroupsCommand };
//# sourceMappingURL=DescribeLogGroupsCommand.js.map