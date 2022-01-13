import { __extends } from "tslib";
import { DescribeProjectVersionsRequest, DescribeProjectVersionsResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeProjectVersionsCommand, serializeAws_json1_1DescribeProjectVersionsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists and describes the models in an Amazon Rekognition Custom Labels project. You
 *          can specify up to 10 model versions in <code>ProjectVersionArns</code>. If
 *          you don't specify a value, descriptions for all models are returned.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:DescribeProjectVersions</code>
 *             action.</p>
 */
var DescribeProjectVersionsCommand = /** @class */ (function (_super) {
    __extends(DescribeProjectVersionsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeProjectVersionsCommand(input) {
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
    DescribeProjectVersionsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DescribeProjectVersionsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeProjectVersionsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeProjectVersionsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeProjectVersionsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeProjectVersionsCommand(input, context);
    };
    DescribeProjectVersionsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeProjectVersionsCommand(output, context);
    };
    return DescribeProjectVersionsCommand;
}($Command));
export { DescribeProjectVersionsCommand };
//# sourceMappingURL=DescribeProjectVersionsCommand.js.map