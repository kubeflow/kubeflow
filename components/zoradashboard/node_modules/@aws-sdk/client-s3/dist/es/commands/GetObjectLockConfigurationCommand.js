import { __extends } from "tslib";
import { GetObjectLockConfigurationOutput, GetObjectLockConfigurationRequest } from "../models/models_0";
import { deserializeAws_restXmlGetObjectLockConfigurationCommand, serializeAws_restXmlGetObjectLockConfigurationCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the Object Lock configuration for a bucket. The rule specified in the Object Lock
 *          configuration will be applied by default to every new object placed in the specified
 *          bucket. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking
 *             Objects</a>.</p>
 */
var GetObjectLockConfigurationCommand = /** @class */ (function (_super) {
    __extends(GetObjectLockConfigurationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetObjectLockConfigurationCommand(input) {
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
    GetObjectLockConfigurationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetObjectLockConfigurationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetObjectLockConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetObjectLockConfigurationOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetObjectLockConfigurationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetObjectLockConfigurationCommand(input, context);
    };
    GetObjectLockConfigurationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetObjectLockConfigurationCommand(output, context);
    };
    return GetObjectLockConfigurationCommand;
}($Command));
export { GetObjectLockConfigurationCommand };
//# sourceMappingURL=GetObjectLockConfigurationCommand.js.map