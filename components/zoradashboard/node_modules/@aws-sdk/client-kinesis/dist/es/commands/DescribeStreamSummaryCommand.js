import { __extends } from "tslib";
import { DescribeStreamSummaryInput, DescribeStreamSummaryOutput } from "../models/models_0";
import { deserializeAws_json1_1DescribeStreamSummaryCommand, serializeAws_json1_1DescribeStreamSummaryCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Provides a summarized description of the specified Kinesis data stream without the
 *             shard list.</p>
 *         <p>The information returned includes the stream name, Amazon Resource Name (ARN),
 *             status, record retention period, approximate creation time, monitoring, encryption
 *             details, and open shard count. </p>
 *         <p>
 *             <a>DescribeStreamSummary</a> has a limit of 20 transactions per second
 *             per account.</p>
 */
var DescribeStreamSummaryCommand = /** @class */ (function (_super) {
    __extends(DescribeStreamSummaryCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeStreamSummaryCommand(input) {
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
    DescribeStreamSummaryCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "DescribeStreamSummaryCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeStreamSummaryInput.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeStreamSummaryOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeStreamSummaryCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeStreamSummaryCommand(input, context);
    };
    DescribeStreamSummaryCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeStreamSummaryCommand(output, context);
    };
    return DescribeStreamSummaryCommand;
}($Command));
export { DescribeStreamSummaryCommand };
//# sourceMappingURL=DescribeStreamSummaryCommand.js.map