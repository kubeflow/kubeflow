import { __extends } from "tslib";
import { TestMetricFilterRequest, TestMetricFilterResponse } from "../models/models_0";
import { deserializeAws_json1_1TestMetricFilterCommand, serializeAws_json1_1TestMetricFilterCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Tests the filter pattern of a metric filter against a sample of log event messages. You
 *       can use this operation to validate the correctness of a metric filter pattern.</p>
 */
var TestMetricFilterCommand = /** @class */ (function (_super) {
    __extends(TestMetricFilterCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function TestMetricFilterCommand(input) {
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
    TestMetricFilterCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "TestMetricFilterCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: TestMetricFilterRequest.filterSensitiveLog,
            outputFilterSensitiveLog: TestMetricFilterResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    TestMetricFilterCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1TestMetricFilterCommand(input, context);
    };
    TestMetricFilterCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1TestMetricFilterCommand(output, context);
    };
    return TestMetricFilterCommand;
}($Command));
export { TestMetricFilterCommand };
//# sourceMappingURL=TestMetricFilterCommand.js.map