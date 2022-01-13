import { __extends } from "tslib";
import { DescribeTextTranslationJobRequest, DescribeTextTranslationJobResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeTextTranslationJobCommand, serializeAws_json1_1DescribeTextTranslationJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the properties associated with an asycnhronous batch translation job including name,
 *       ID, status, source and target languages, input/output S3 buckets, and so on.</p>
 */
var DescribeTextTranslationJobCommand = /** @class */ (function (_super) {
    __extends(DescribeTextTranslationJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeTextTranslationJobCommand(input) {
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
    DescribeTextTranslationJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TranslateClient";
        var commandName = "DescribeTextTranslationJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeTextTranslationJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeTextTranslationJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeTextTranslationJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeTextTranslationJobCommand(input, context);
    };
    DescribeTextTranslationJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeTextTranslationJobCommand(output, context);
    };
    return DescribeTextTranslationJobCommand;
}($Command));
export { DescribeTextTranslationJobCommand };
//# sourceMappingURL=DescribeTextTranslationJobCommand.js.map