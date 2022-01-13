import { __extends } from "tslib";
import { DeleteBucketPolicyRequest } from "../models/models_0";
import { deserializeAws_restXmlDeleteBucketPolicyCommand, serializeAws_restXmlDeleteBucketPolicyCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>This implementation of the DELETE operation uses the policy subresource to delete the
 *          policy of a specified bucket. If you are using an identity other than the root user of the
 *          AWS account that owns the bucket, the calling identity must have the
 *             <code>DeleteBucketPolicy</code> permissions on the specified bucket and belong to the
 *          bucket owner's account to use this operation. </p>
 *
 *          <p>If you don't have <code>DeleteBucketPolicy</code> permissions, Amazon S3 returns a <code>403
 *             Access Denied</code> error. If you have the correct permissions, but you're not using an
 *          identity that belongs to the bucket owner's account, Amazon S3 returns a <code>405 Method Not
 *             Allowed</code> error. </p>
 *
 *
 *          <important>
 *             <p>As a security precaution, the root user of the AWS account that owns a bucket can
 *             always use this operation, even if the policy explicitly denies the root user the
 *             ability to perform this action.</p>
 *          </important>
 *
 *          <p>For more information about bucket policies, see <a href=" https://docs.aws.amazon.com/AmazonS3/latest/dev/using-iam-policies.html">Using Bucket Policies and
 *             UserPolicies</a>. </p>
 *          <p>The following operations are related to <code>DeleteBucketPolicy</code>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html">CreateBucket</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var DeleteBucketPolicyCommand = /** @class */ (function (_super) {
    __extends(DeleteBucketPolicyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteBucketPolicyCommand(input) {
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
    DeleteBucketPolicyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "DeleteBucketPolicyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteBucketPolicyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteBucketPolicyCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlDeleteBucketPolicyCommand(input, context);
    };
    DeleteBucketPolicyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlDeleteBucketPolicyCommand(output, context);
    };
    return DeleteBucketPolicyCommand;
}($Command));
export { DeleteBucketPolicyCommand };
//# sourceMappingURL=DeleteBucketPolicyCommand.js.map