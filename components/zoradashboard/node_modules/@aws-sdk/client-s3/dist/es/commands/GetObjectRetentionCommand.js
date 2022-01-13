import { __extends } from "tslib";
import { GetObjectRetentionOutput, GetObjectRetentionRequest } from "../models/models_0";
import { deserializeAws_restXmlGetObjectRetentionCommand, serializeAws_restXmlGetObjectRetentionCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Retrieves an object's retention settings. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking Objects</a>.</p>
 *          <p>This action is not supported by Amazon S3 on Outposts.</p>
 */
var GetObjectRetentionCommand = /** @class */ (function (_super) {
    __extends(GetObjectRetentionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetObjectRetentionCommand(input) {
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
    GetObjectRetentionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetObjectRetentionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetObjectRetentionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetObjectRetentionOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetObjectRetentionCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetObjectRetentionCommand(input, context);
    };
    GetObjectRetentionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetObjectRetentionCommand(output, context);
    };
    return GetObjectRetentionCommand;
}($Command));
export { GetObjectRetentionCommand };
//# sourceMappingURL=GetObjectRetentionCommand.js.map