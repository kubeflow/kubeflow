import { __extends } from "tslib";
import { PutObjectLockConfigurationOutput, PutObjectLockConfigurationRequest } from "../models/models_0";
import { deserializeAws_restXmlPutObjectLockConfigurationCommand, serializeAws_restXmlPutObjectLockConfigurationCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Places an Object Lock configuration on the specified bucket. The rule specified in the
 *          Object Lock configuration will be applied by default to every new object placed in the
 *          specified bucket.</p>
 *          <note>
 *             <p>
 *                <code>DefaultRetention</code> requires either Days or Years. You can't specify both
 *             at the same time.</p>
 *          </note>
 *          <p class="title">
 *             <b>Related Resources</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock.html">Locking
 *                   Objects</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var PutObjectLockConfigurationCommand = /** @class */ (function (_super) {
    __extends(PutObjectLockConfigurationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutObjectLockConfigurationCommand(input) {
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
    PutObjectLockConfigurationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "PutObjectLockConfigurationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutObjectLockConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: PutObjectLockConfigurationOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutObjectLockConfigurationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlPutObjectLockConfigurationCommand(input, context);
    };
    PutObjectLockConfigurationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlPutObjectLockConfigurationCommand(output, context);
    };
    return PutObjectLockConfigurationCommand;
}($Command));
export { PutObjectLockConfigurationCommand };
//# sourceMappingURL=PutObjectLockConfigurationCommand.js.map