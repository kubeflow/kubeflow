import { __extends } from "tslib";
import { GetBucketPolicyStatusOutput, GetBucketPolicyStatusRequest } from "../models/models_0";
import { deserializeAws_restXmlGetBucketPolicyStatusCommand, serializeAws_restXmlGetBucketPolicyStatusCommand, } from "../protocols/Aws_restXml";
import { getBucketEndpointPlugin } from "@aws-sdk/middleware-bucket-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Retrieves the policy status for an Amazon S3 bucket, indicating whether the bucket is public.
 *          In order to use this operation, you must have the <code>s3:GetBucketPolicyStatus</code>
 *          permission. For more information about Amazon S3 permissions, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html">Specifying Permissions in a
 *          Policy</a>.</p>
 *
 *          <p> For more information about when Amazon S3 considers a bucket public, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html#access-control-block-public-access-policy-status">The Meaning of "Public"</a>. </p>
 *
 *          <p>The following operations are related to <code>GetBucketPolicyStatus</code>:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html">Using Amazon S3 Block
 *                   Public Access</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetPublicAccessBlock.html">GetPublicAccessBlock</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutPublicAccessBlock.html">PutPublicAccessBlock</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeletePublicAccessBlock.html">DeletePublicAccessBlock</a>
 *                </p>
 *             </li>
 *          </ul>
 */
var GetBucketPolicyStatusCommand = /** @class */ (function (_super) {
    __extends(GetBucketPolicyStatusCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetBucketPolicyStatusCommand(input) {
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
    GetBucketPolicyStatusCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        this.middlewareStack.use(getBucketEndpointPlugin(configuration));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "S3Client";
        var commandName = "GetBucketPolicyStatusCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetBucketPolicyStatusRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetBucketPolicyStatusOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetBucketPolicyStatusCommand.prototype.serialize = function (input, context) {
        return serializeAws_restXmlGetBucketPolicyStatusCommand(input, context);
    };
    GetBucketPolicyStatusCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restXmlGetBucketPolicyStatusCommand(output, context);
    };
    return GetBucketPolicyStatusCommand;
}($Command));
export { GetBucketPolicyStatusCommand };
//# sourceMappingURL=GetBucketPolicyStatusCommand.js.map