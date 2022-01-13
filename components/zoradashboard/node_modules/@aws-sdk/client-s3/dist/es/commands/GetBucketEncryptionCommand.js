import { __extends } from "tslib";
import { GetBucketEncryptionOutput, GetBucketEncryptionRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketEncryptionCommand, serializeAws_restXmlGetBucketEncryptionCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the default encryption configuration for an Amazon S3 bucket. For information about
 *          the Amazon S3 default encryption feature, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html">Amazon S3 Default Bucket Encryption</a>.</p>
 *
 *          <p> To use this operation, you must have permission to perform the
 *             <code>s3:GetEncryptionConfiguration</code> action. The bucket owner has this permission
 *          by default. The bucket owner can grant this permission to others. For more information
 *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a>.</p>
 *          <p>The following operations are related to <code>GetBucketEncryption</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketEncryption.html">PutBucketEncryption</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketEncryption.html">DeleteBucketEncryption</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketEncryptionCommand = /** @class */ (function (_super) {
    __extends(GetBucketEncryptionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketEncryptionCommand(input) {
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
    GetBucketEncryptionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketEncryptionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketEncryptionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketEncryptionOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketEncryptionCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketEncryptionCommand(input, context);
    };
    GetBucketEncryptionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketEncryptionCommand(output, context);
    };
    return GetBucketEncryptionCommand;
}($Command));
export { GetBucketEncryptionCommand };
//# sourceMappingURL=GetBucketEncryptionCommand.js.map