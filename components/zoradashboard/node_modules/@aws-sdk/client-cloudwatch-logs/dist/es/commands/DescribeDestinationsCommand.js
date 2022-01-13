import { __extends } from "tslib";
import { DescribeDestinationsRequest, DescribeDestinationsResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeDestinationsCommand, serializeAws_json1_1DescribeDestinationsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists all your destinations. The results are ASCII-sorted by destination name.</p>
 */
var DescribeDestinationsCommand = /** @class */ (function (_super) {
    __extends(DescribeDestinationsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeDestinationsCommand(input) {
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
    DescribeDestinationsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "DescribeDestinationsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeDestinationsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeDestinationsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeDestinationsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeDestinationsCommand(input, context);
    };
    DescribeDestinationsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeDestinationsCommand(output, context);
    };
    return DescribeDestinationsCommand;
}($Command));
export { DescribeDestinationsCommand };
//# sourceMappingURL=DescribeDestinationsCommand.js.map