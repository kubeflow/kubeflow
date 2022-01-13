import { __extends } from "tslib";
import { DescribeStreamProcessorRequest, DescribeStreamProcessorResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeStreamProcessorCommand, serializeAws_json1_1DescribeStreamProcessorCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Provides information about a stream processor created by <a>CreateStreamProcessor</a>. You can get information about the input and output streams, the input parameters for the face recognition being performed,
 *             and the current status of the stream processor.</p>
 */
var DescribeStreamProcessorCommand = /** @class */ (function (_super) {
    __extends(DescribeStreamProcessorCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeStreamProcessorCommand(input) {
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
    DescribeStreamProcessorCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DescribeStreamProcessorCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeStreamProcessorRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeStreamProcessorResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeStreamProcessorCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeStreamProcessorCommand(input, context);
    };
    DescribeStreamProcessorCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeStreamProcessorCommand(output, context);
    };
    return DescribeStreamProcessorCommand;
}($Command));
export { DescribeStreamProcessorCommand };
//# sourceMappingURL=DescribeStreamProcessorCommand.js.map