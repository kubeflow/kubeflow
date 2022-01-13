import { __extends } from "tslib";
import { DescribeDocumentClassificationJobRequest, DescribeDocumentClassificationJobResponse, } from "../models/models_0";
import { deserializeAws_json1_1DescribeDocumentClassificationJobCommand, serializeAws_json1_1DescribeDocumentClassificationJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the properties associated with a document classification job. Use this operation to
 *       get the status of a classification job.</p>
 */
var DescribeDocumentClassificationJobCommand = /** @class */ (function (_super) {
    __extends(DescribeDocumentClassificationJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeDocumentClassificationJobCommand(input) {
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
    DescribeDocumentClassificationJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DescribeDocumentClassificationJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeDocumentClassificationJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeDocumentClassificationJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeDocumentClassificationJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeDocumentClassificationJobCommand(input, context);
    };
    DescribeDocumentClassificationJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeDocumentClassificationJobCommand(output, context);
    };
    return DescribeDocumentClassificationJobCommand;
}($Command));
export { DescribeDocumentClassificationJobCommand };
//# sourceMappingURL=DescribeDocumentClassificationJobCommand.js.map