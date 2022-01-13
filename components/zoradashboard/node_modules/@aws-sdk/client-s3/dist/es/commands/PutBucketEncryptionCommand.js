import { __extends } from "tslib";
import { PutBucketEncryptionRequest } from "../models/models_0";
import { deserializeAws_restXmlPutBucketEncryptionCommand, serializeAws_restXmlPutBucketEncryptionCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>This operation uses the <code>encryption</code> subresource to configure default
 *          encryption and Amazon S3 Bucket Key for an existing bucket.</p>
 *          <p>Default encryption for a bucket can use server-side encryption with Amazon S3-managed keys
 *          (SSE-S3) or AWS KMS customer master keys (SSE-KMS). If you specify default encryption
 *          using SSE-KMS, you can also configure Amazon S3 Bucket Key. For information about default
 *          encryption, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html">Amazon S3 default bucket encryption</a>
 *          in the <i>Amazon Simple Storage Service Developer Guide</i>. For more information about S3 Bucket Keys,
 *          see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-key.html">Amazon S3 Bucket Keys</a> in the <i>Amazon Simple Storage Service Developer Guide</i>.</p>
 *          <important>
 *             <p>This operation requires AWS Signature Version 4. For more information, see <a href="sig-v4-authenticating-requests.html"> Authenticating Requests (AWS Signature
 *                Version 4)</a>. </p>
 *          </important>
 *          <p>To use this operation, you must have permissions to perform the
 *             <code>s3:PutEncryptionConfiguration</code> action. The bucket owner has this permission
 *          by default. The bucket owner can grant this permission to others. For more information
 *          about permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-bucket-subresources">Permissions Related to Bucket Subresource Operations</a> and <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html">Managing Access Permissions to Your Amazon S3
 *             Resources</a> in the Amazon Simple Storage Service Developer Guide. </p>
 *
 *          <p class="title">
 *             <b>Related Resources</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketEncryption.html">GetBucketEncryption</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketEncryption.html">DeleteBucketEncryption</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var PutBucketEncryptionCommand = /** @class */ (function (_super) {
    __extends(PutBucketEncryptionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutBucketEncryptionCommand(input) {
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
    PutBucketEncryptionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "PutBucketEncryptionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutBucketEncryptionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutBucketEncryptionCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlPutBucketEncryptionCommand(input, context);
    };
    PutBucketEncryptionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlPutBucketEncryptionCommand(output, context);
    };
    return PutBucketEncryptionCommand;
}($Command));
export { PutBucketEncryptionCommand };
//# sourceMappingURL=PutBucketEncryptionCommand.js.map