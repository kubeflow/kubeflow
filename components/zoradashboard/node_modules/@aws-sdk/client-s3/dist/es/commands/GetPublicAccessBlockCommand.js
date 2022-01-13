import { __extends } from "tslib";
import { GetPublicAccessBlockOutput, GetPublicAccessBlockRequest } from "../models/models_0";
import { deserializeAws_restXmlGetPublicAccessBlockCommand, serializeAws_restXmlGetPublicAccessBlockCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Retrieves the <code>PublicAccessBlock</code> configuration for an Amazon S3 bucket. To use
 *          this operation, you must have the <code>s3:GetBucketPublicAccessBlock</code> permission.
 *          For more information about Amazon S3 permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions in a
 *          Policy</a>.</p>
 *
 *          <important>
 *             <p>When Amazon S3 evaluates the <code>PublicAccessBlock</code> configuration for a bucket or
 *             an object, it checks the <code>PublicAccessBlock</code> configuration for both the
 *             bucket (or the bucket that contains the object) and the bucket owner's account. If the
 *                <code>PublicAccessBlock</code> settings are different between the bucket and the
 *             account, Amazon S3 uses the most restrictive combination of the bucket-level and
 *             account-level settings.</p>
 *          </important>
 *
 *          <p>For more information about when Amazon S3 considers a bucket or an object public, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html#access-control-block-public-access-policy-status">The Meaning of "Public"</a>.</p>
 *
 *          <p>The following operations are related to <code>GetPublicAccessBlock</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html">Using Amazon S3 Block
 *                   Public Access</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutPublicAccessBlock.html">PutPublicAccessBlock</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetPublicAccessBlock.html">GetPublicAccessBlock</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeletePublicAccessBlock.html">DeletePublicAccessBlock</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetPublicAccessBlockCommand = /** @class */ (function (_super) {
    __extends(GetPublicAccessBlockCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetPublicAccessBlockCommand(input) {
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
    GetPublicAccessBlockCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetPublicAccessBlockCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetPublicAccessBlockRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetPublicAccessBlockOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetPublicAccessBlockCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetPublicAccessBlockCommand(input, context);
    };
    GetPublicAccessBlockCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetPublicAccessBlockCommand(output, context);
    };
    return GetPublicAccessBlockCommand;
}($Command));
export { GetPublicAccessBlockCommand };
//# sourceMappingURL=GetPublicAccessBlockCommand.js.map