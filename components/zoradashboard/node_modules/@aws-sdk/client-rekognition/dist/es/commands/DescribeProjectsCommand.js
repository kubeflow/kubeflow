import { __extends } from "tslib";
import { DescribeProjectsRequest, DescribeProjectsResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeProjectsCommand, serializeAws_json1_1DescribeProjectsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists and gets information about your Amazon Rekognition Custom Labels projects.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:DescribeProjects</code> action.</p>
 */
var DescribeProjectsCommand = /** @class */ (function (_super) {
    __extends(DescribeProjectsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeProjectsCommand(input) {
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
    DescribeProjectsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DescribeProjectsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeProjectsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeProjectsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeProjectsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeProjectsCommand(input, context);
    };
    DescribeProjectsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeProjectsCommand(output, context);
    };
    return DescribeProjectsCommand;
}($Command));
export { DescribeProjectsCommand };
//# sourceMappingURL=DescribeProjectsCommand.js.map